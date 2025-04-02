import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { Login } from '../models/login.interface';
import { Register } from '../models/register.interface';
import { ProfileData } from '../models/profiledata.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<any | null>(null);
  user$ = this.userSubject.asObservable();

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.checkLoginStatus());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private apiUrl = 'http://localhost:5269';

  constructor(private http: HttpClient) {}

  private checkLoginStatus(): boolean {
    return !!this.getToken();
  }

  login(loginData: Login): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/Auth/login`, loginData).pipe(
      tap(response => {
          const token = response.token
          localStorage.setItem('token', token); 
          this.isLoggedInSubject.next(true);
          this.userSubject.next({ email: response.email, roles: response.roles });
      }),
      catchError(error => {
        console.error('Login failed:', error);
        return throwError(() => error);
      })
    );
  }

  register(registerData: Register): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/Auth/registration`, registerData).pipe(
      catchError(error => {
        console.error('Registration failed:', error);
        return throwError(() => error);
      })
    );
  }

  getProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      return throwError(() => new Error('Token nem található!'));
    }
    return this.http.get<any>(`${this.apiUrl}/Auth`);
  }

  loadUserProfile(): void {
    this.getProfile().subscribe({
      next: (response) => {
        const user: ProfileData = {
          validTo: response.user.validTo,
          email: response.user.email,
          roles: response.user.roles,
          token: response.user.token
        };
        this.userSubject.next(user);
      },
      error: (err) => {
        console.error('Profil betöltési hiba:', err);
        // this.logout();
      }
    });
  }

  isAuthenticated(): boolean {
    return !!this.checkLoginStatus();
  }


  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isLoggedInSubject.next(false);
    this.userSubject.next(null);
  }

  loginSuccess(token: string) {
    localStorage.setItem('token', token);
    this.isLoggedInSubject.next(true);
    this.loadUserProfile();
  }
}