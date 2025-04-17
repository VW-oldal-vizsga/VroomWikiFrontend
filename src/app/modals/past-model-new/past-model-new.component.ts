import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-past-model-new',
  imports: [CommonModule],
  templateUrl: './past-model-new.component.html',
  styleUrl: './past-model-new.component.css',
  providers:[NgbModal]
})
export class PastModelNewComponent {
  constructor(private modalService: NgbModal ) {}

  open() {
    const modalRef = this.modalService.open(PastModelNewComponent);
    modalRef.componentInstance.name = 'New';
  }
  close() {
    this.modalService.dismissAll();
  }

  
}
