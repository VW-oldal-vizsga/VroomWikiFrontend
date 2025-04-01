import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageModalComponent } from '../language-modal/language-modal.component';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  standalone:true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  imports: [RouterLink, TranslatePipe],
})
export class NavbarComponent {
  constructor(private modalService: NgbModal) {}

  openModal() {
    const modalRef = this.modalService.open(LanguageModalComponent, {size: 'lg'});
    modalRef.componentInstance.name = 'World';
  }
}
