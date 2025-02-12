import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-language-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './language-modal.component.html',
  styleUrl: './language-modal.component.css',
  providers: [ NgbModal]
})
export class LanguageModalComponent {
  constructor(private modalService: NgbModal) {}

  open() {
    const modalRef = this.modalService.open(LanguageModalComponent);
    modalRef.componentInstance.name = 'World';
  }
  close() {
    this.modalService.dismissAll();
    console.log('A modál bezáródott');
  }
}
