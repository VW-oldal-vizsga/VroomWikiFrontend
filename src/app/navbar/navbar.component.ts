import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageModalComponent } from '../modals/language-modal/language-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone:true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  imports: [RouterLink, TranslatePipe, CommonModule],
})
export class NavbarComponent {

  isLoggedIn = true;
  currentLanguage = 'hu'; 

  constructor(
    private modalService: NgbModal,
    private userService: UserService,
    private translate: TranslateService
  ) {
    this.userService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });

    this.translate.onLangChange.subscribe((event) => {
      this.currentLanguage = event.lang;
    });

    this.currentLanguage = this.translate.currentLang || 'hu';
  }

  openModal() {
    const modalRef = this.modalService.open(LanguageModalComponent, {size: 'lg'});
    modalRef.componentInstance.name = 'World';
  }

  getFlagImageUrl(): string {
    switch (this.currentLanguage) {
      case 'en':
        return "url('../../assets/English_language.svg.png')";
      case 'de':
        return "url('../../assets/Flag_of_Germany.svg.webp')";
      case 'hu':
      default:
        return "url('../../assets/magyarzaszlo-min.png')";
    }
  }
}
