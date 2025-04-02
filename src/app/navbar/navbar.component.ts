import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageModalComponent } from '../language-modal/language-modal.component';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { TranslatePipe } from '@ngx-translate/core';
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

  isLoggedIn = true

  constructor(private modalService: NgbModal,private userService: UserService) {
    this.userService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });
  }

  openModal() {
    const modalRef = this.modalService.open(LanguageModalComponent, {size: 'lg'});
    modalRef.componentInstance.name = 'World';
  }
}
