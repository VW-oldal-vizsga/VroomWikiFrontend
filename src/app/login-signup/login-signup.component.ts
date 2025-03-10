import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { UserService } from '../../services/user.service';
import { Login } from '../../models/login.interface';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login-signup',
  standalone: true,
  imports: [NavbarComponent, CommonModule, HttpClientModule, FormsModule],
  templateUrl: './login-signup.component.html',
  styleUrl: './login-signup.component.css'
})
export class LoginSignupComponent {
  loginData: Login = {
    username: '',
    password: '',
  };

  errorMessage: string | null = null;

  constructor (private userService: UserService, private http: HttpClient) {}
  animation(): void {
    const signUpButton = document.getElementById('signUp') as HTMLButtonElement | null;
    const signInButton = document.getElementById('signIn') as HTMLButtonElement | null;
    const container = document.getElementById('container') as HTMLElement | null;

    if (!signUpButton || !signInButton || !container) {
        console.error("One or more elements not found.");
        return;
    }

    signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
    });
  }

  onSubmit(): void {
    this.userService.login(this.loginData).subscribe(
      (response) => {
        if (response.token) {
          // Ha sikeres a bejelentkezés, tároljuk el a tokent
          this.userService.storeToken(response.token);
          console.log("Sikeres bejelentkezés");
          
        }
      },
      (error) => {
        this.errorMessage = 'Hibás felhasználónév vagy jelszó.';
        console.error(error);
      }
    );

  
  }
  logout() {
    this.userService.logout();
    console.log("Sikeres kijelentkezés!");
  }
}
