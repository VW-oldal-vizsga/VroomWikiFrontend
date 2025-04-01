import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-modal',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './language-modal.component.html',
  styleUrl: './language-modal.component.css',
  providers: [ NgbModal]
})
export class LanguageModalComponent {
  constructor(private modalService: NgbModal ,private translate: TranslateService) {}

  open() {
    const modalRef = this.modalService.open(LanguageModalComponent);
    modalRef.componentInstance.name = 'World';
  }
  close() {
    this.modalService.dismissAll();
  }

  translateToEn() {
    this.translate.use('en')
  }
  translateToHu() {
    this.translate.use('hu')
  }
  translateToDe() {
    this.translate.use('de')
  }
}
