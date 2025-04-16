import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ConfiguratorService } from '../../services/configurator.service';
import { IConfiguratorPut } from '../../models/configurator.interface';
import { UpdateModalComponent } from '../modals/update-modal/update-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { ConfigModalComponent } from '../modals/config-modal/config-modal.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  userData: any = null;
  errorMessage: string | null = null;
  configurator: IConfiguratorPut[] = [];
  cardImages: { [key: number]: string } = {};

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router,
    private configuratorService: ConfiguratorService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    if (!this.userService.isAuthenticated()) {
      this.router.navigate(['/maincontent']);
      return;
    }

    this.loadProfileData().subscribe({
      next: () => {
        this.getConfiguratorById();
      },
      error: () => {
        this.errorMessage = 'Hiba történt a profiladatok betöltésekor.';
      }
    });
  }

  loadProfileData(): Observable<any> {
    const token = this.userService.getToken();

    return new Observable(observer => {
      if (token) {
        this.http.get('http://localhost:5269/api/Auth').subscribe({
          next: (data) => {
            this.userData = data;
            localStorage.setItem('user_id', this.userData.id);
            observer.next(data);
            observer.complete();
          },
          error: (error) => {
            if (error.status === 401) {
              this.userService.logout();
              this.errorMessage = 'A munkamenet lejárt, kérlek jelentkezz be újra.';
            } else {
              this.errorMessage = 'Hiba történt az adatok lekérésekor.';
              console.error(error);
            }
            observer.error(error);
          }
        });
      } else {
        observer.error('No token found');
      }
    });
  }

  loadCardImages(): void {
    this.configurator.forEach(color => {
      this.configuratorService.getConfiguratorColorImage(color.color_Id).subscribe({
        next: (imageBlob) => {
          const objectURL = URL.createObjectURL(imageBlob);
          this.cardImages[color.color_Id] = objectURL;
        },
        error: (error) => {
          console.error(`Hiba a kép lekérdezése során (ID: ${color.id}):`, error);
        }
      });
    });
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/login-signup']);
  }

  getConfiguratorById(): void {
    const userId = localStorage.getItem('user_id');

    if (userId) {
      this.configuratorService.getConfigurators().subscribe({
        next: (configuratorData: IConfiguratorPut[]) => {
          this.configurator = configuratorData.filter(config => config.user_Id === Number(userId));
          this.loadCardImages();
        },
        error: (error) => {
          this.errorMessage = 'Hiba történt a konfigurátor adatok lekérésekor.';
          console.error('Configurator fetch error:', error);
        }
      });
    } else {
      this.errorMessage = 'Nem található felhasználó azonosító.';
      console.error('No user ID found in localStorage');
    }
  }

  navigateToConfigurator() {
    this.router.navigate(['/configuratorMain']);
  }

  openModal(config: IConfiguratorPut) {
    const modalRef = this.modalService.open(ConfigModalComponent, { size: 'lg' });
    modalRef.componentInstance.configData = config;
    modalRef.componentInstance.isEditing = false; 
  }

  deleteConfig(id: number) {
    this.configuratorService.deleteConfigurators(id).subscribe({
      next: () => {
        this.configurator = this.configurator.filter(config => config.id !== id);
        this.errorMessage = 'Konfiguráció sikeresen törölve!';
        this.loadCardImages();
      },
      error: (error) => {
        this.errorMessage = 'Hiba történt a konfiguráció törlésekor.';
        console.error('Delete config error:', error);
      }
    });
  }

  startEditing(id: number) {
    const config = this.configurator.find(c => c.id === id);
    if (config) {
      const modalRef = this.modalService.open(UpdateModalComponent, { size: 'lg' });
      modalRef.componentInstance.configData = { ...config }; 
      modalRef.componentInstance.isEditing = true; 
      modalRef.result.then(
        (result) => {
          if (result) {
            const index = this.configurator.findIndex(c => c.id === result.id);
            if (index !== -1) {
              this.configurator[index] = result;
              this.loadCardImages();
            }
            this.errorMessage = 'Konfiguráció sikeresen frissítve!';
          }
        },
        (reason) => {
          console.log('Modal dismissed:', reason);
        }
      );
    } else {
      this.errorMessage = 'Nem található konfiguráció az adott azonosítóval.';
    }
  }
}