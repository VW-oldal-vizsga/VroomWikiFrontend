import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ICard } from '../../../models/oldModels.interface';
import { FormsModule } from '@angular/forms';
import { oldModelsService } from '../../../services/oldModelsService.service';
import { TranslatePipe } from '@ngx-translate/core';


@Component({
  selector: 'app-past-model-new',
  imports: [CommonModule, FormsModule, TranslatePipe],
  templateUrl: './past-model-new.component.html',
  styleUrl: './past-model-new.component.css',
  providers: [NgbModal]
})
export class PastModelNewComponent {
  newCard: ICard[] = [{
    id: 0,
    name: '',
    descriptionHU: '',
    descriptionEN: '',
    descriptionDE: '',
    releaseDate: 0,
    designHU: '',
    designDE: '',
    designEN: '',
    designer: '',
    assembly: [],
    production: [], 
    engine: '',
    horsepower: '',
    imageBase64: ''
  }];

  imageError: string | null = null;
  assemblyInput: string = '';
  productionInput: string = ''; 

  constructor(
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private oldModelsService: oldModelsService
  ) {}

  open() {
    const modalRef = this.modalService.open(PastModelNewComponent);
    modalRef.componentInstance.name = 'New';
  }

  close() {
    this.modalService.dismissAll();
  }

  addAssembly() {
    if (this.assemblyInput.trim()) {
      (this.newCard[0].assembly as string[]).push(this.assemblyInput.trim());
      this.assemblyInput = '';
    }
  }

  removeAssembly(index: number) {
    (this.newCard[0].assembly as string[]).splice(index, 1);
  }

  addProduction() {
    if (this.productionInput.trim()) {
      (this.newCard[0].production as string[]).push(this.productionInput.trim());
      this.productionInput = '';
    }
  }

  removeProduction(index: number) {
    (this.newCard[0].production as string[]).splice(index, 1);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      if (!file.type.startsWith('image/')) {
        this.imageError = 'Csak képek tölthetők fel!';
        this.newCard[0].imageBase64 = '';
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        const base64String = result.split(',')[1];
        this.newCard[0].imageBase64 = base64String || '';
        this.imageError = null;
      };
      reader.onerror = () => {
        this.imageError = 'Hiba a kép betöltése során!';
        this.newCard[0].imageBase64 = '';
      };
      reader.readAsDataURL(file);
    }
  }

  save() {
    if (!this.newCard[0].name || !this.newCard[0].descriptionHU || !this.newCard[0].releaseDate) {
      console.error('Hiányzó kötelező mezők');
      return;
    }

    this.oldModelsService.addOldModels(this.newCard[0]).subscribe({
      next: (addedCard) => {
        this.activeModal.close(addedCard);
      },
      error: (err) => {
        console.error('Hiba a kártya hozzáadása során:', err);
      }
    });
  }
}