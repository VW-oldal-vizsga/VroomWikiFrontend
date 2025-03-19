import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core'; // OnInit hozzáadva az interfészhez
import { NavbarComponent } from '../../navbar/navbar.component';
import { Router } from '@angular/router';
import { IColor, IEngine, ITransmissionType } from '../../../models/configurator.interface';

import { forkJoin } from 'rxjs';
import { oldModelsService } from '../../../services/oldModelsService.service';
import { ICard } from '../../../models/oldModels.interface';


@Component({
  selector: 'app-configurator-main',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './configurator-main.component.html',
  styleUrls: ['./configurator-main.component.css']
})



export class ConfiguratorMainComponent implements OnInit { 
  oldModelsData:ICard[] = [];
  poloData:ICard[] = []
  poloId:number | undefined = 0
  cardImages: { [key: number]: string } = {};

  constructor(private router: Router, private oldModels: oldModelsService) {}

  

  ngOnInit(): void {
    this.loadData();

  }

  loadData(): void {
    forkJoin({
      oldModelsData: this.oldModels.getOldModels()
    }).subscribe({
      next: (results) => {
        this.oldModelsData = results.oldModelsData
        this.poloData = this.getPoloData()
        this.poloId = this.getPoloId()
        console.log(this.poloId); 

        this.loadCardImages();
      },
      error: (err) => {
        console.error('Hiba az adatok betöltésekor:', err);
      }
    })
    
  }

  navigateToCar(): void {
    this.router.navigate(['/configPreComp']);
  }
  getPoloData(): ICard[] {
    return this.oldModelsData.filter((data) => data.name === 'Volkswagen Polo');
  }
  getPoloId(): number | undefined {
    const polo = this.poloData.find((adat) => true); 
    return polo?.id; 
  }

  private loadCardImages(): void {
    this.oldModelsData.forEach(card => {
      this.oldModels.getOldModelsImage(this.poloId).subscribe({
        next: (imageBlob) => {
          const objectURL = URL.createObjectURL(imageBlob);
          this.cardImages[card.id] = objectURL; 
        },
        error: (error) => {
          console.error(`Hiba a kép lekérdezése során (ID: ${card.id}):`, error); 
        }
      });
    });
  }
  


}