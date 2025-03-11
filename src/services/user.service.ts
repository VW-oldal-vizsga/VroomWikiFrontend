import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { User } from '../models/user.interface';
import { Login } from '../models/login.interface';
import { Register } from '../models/register.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.checkLoginStatus());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private apiUrl = 'http://localhost:5269';

  constructor(private http: HttpClient) { }

  private checkLoginStatus(): boolean {
    return !!localStorage.getItem('token');
  }

  login(loginData: Login): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/Auth/login`, loginData).pipe(
      catchError((error) => {
        console.error('Login failed', error);
        throw error;
      })
    );
  }

  register(registerData: Register): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/Auth/registration`, registerData).pipe(
      catchError((error) => {
        console.error('Login failed', error);
        throw error;
      })
    )
  }

  storeToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  // Token lekérése
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  logout(): void {
    localStorage.removeItem('authToken');
  }

}
