import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { UserService } from '../../services/user.service';
import { Login } from '../../models/login.interface';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Register } from '../../models/register.interface';
import { TranslatePipe } from '@ngx-translate/core';


@Component({
  selector: 'app-login-signup',
  standalone: true,
  imports: [NavbarComponent, CommonModule, HttpClientModule, FormsModule, TranslatePipe],
  templateUrl: './login-signup.component.html',
  styleUrl: './login-signup.component.css'
})
export class LoginSignupComponent {
  loginData: Login = {
    username: '',
    password: '',
  };

  registerData: Register = {
    username: '',
    email: '',
    password: '',
  }

  errorMessage: string | null = null;

  constructor (private userService: UserService, private http: HttpClient, private router: Router) {}
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
          console.log("Sikeres bejelentkezés");
          this.loginData.username = '',
          this.loginData.password = ''
          this.router.navigate(['/profile'])
          
        }
      },
      (error) => {
        this.errorMessage = 'Hibás felhasználónév vagy jelszó.';
        console.error(error);
      }
    );
  }

  signUp(): void {
    this.userService.register(this.registerData).subscribe({
      next: (response) => {
        console.log('Sikeres regisztráció:', response);
        alert("Sikeres regisztráció, most már bejelentkezhetsz!")
        this.registerData.email = '',
        this.registerData.password = '',
        this.registerData.username = ''
        
    },
    error: (error) => {
      console.error('Hiba történt a regisztráció során:', error);
      alert('Hiba lépett fel, ellenőrizd mindent kitöltöttél-e!')
    }

  });
  }

  logout() {
    this.userService.logout();
    console.log("Sikeres kijelentkezés!");
    this.router.navigate(['/login-signup']);
  }
}
