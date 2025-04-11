import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone:true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'

})
export class ProfileComponent {
  userData: any = null;
  errorMessage: string | null = null;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.userService.isAuthenticated()) {
      this.router.navigate(['/maincontent']);
      return;
    }

    this.loadProfileData();
  }

  loadProfileData(): void {
    const token = this.userService.getToken();
    console.log("load", token);
    
    
    if (token) {
      this.http.get('http://localhost:5269/api/Auth')
        .subscribe({
          next: (data) => {
            this.userData = data;
            localStorage.setItem('user_id', this.userData.id)
            console.log(this.userData.id);
            
          },
          error: (error) => {
            if (error.status === 401) {
              this.userService.logout();
              this.errorMessage = 'A munkamenet lejárt, kérlek jelentkezz be újra.';
            } else {
              this.errorMessage = 'Hiba történt az adatok lekérésekor.';
              console.error(error);
            }
          }
        });
    }
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/login-signup']);
  }
}
