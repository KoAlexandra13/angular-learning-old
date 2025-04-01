import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../../shared/models/user.module';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';
  private isLoggedIn = false;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}?email=${email}&password=${password}`).pipe(
      tap(users => this.isLoggedIn = users.length > 0),
      tap(() => of(this.isLoggedIn))
    );
  }

  register(email: string, password: string): Observable<User> {
    return this.http.post<User>(this.apiUrl, { email, password });
  }

  logout(): void {
    this.isLoggedIn = false;
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}