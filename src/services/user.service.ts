import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { Login } from '../models/login.interface';
import { Register } from '../models/register.interface';

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
        if (response.token) {
          this.storeToken(response.token);
          this.isLoggedInSubject.next(true);
          this.userSubject.next({ email: response.email, roles: response.roles });
        }
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

  getAuth(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/Auth`).pipe(
      tap(data => this.userSubject.next(data)),
      catchError(error => {
        console.error('Get auth failed:', error);
        return throwError(() => error);
      })
    );
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  storeToken(token: string): void {
    localStorage.setItem('token', token); // Egységes kulcs: 'token'
  }

  getToken(): string | null {
    return localStorage.getItem('token'); // Egységes kulcs: 'token'
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isLoggedInSubject.next(false);
    this.userSubject.next(null);
  }
}