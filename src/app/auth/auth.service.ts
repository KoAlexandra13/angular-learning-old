import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../shared/models/user.module';
import { AuthHttpService } from './auth-http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private get isLoggedIn(): boolean {
    return localStorage.getItem('isAuthenticated') === 'true';
  }

  private set isLoggedIn(value: boolean) {
    localStorage.setItem('isAuthenticated', value ? 'true' : 'false');
  }

  constructor(private authHttpService: AuthHttpService) {}

  login(email: string, password: string): Observable<User[]> {
    return this.authHttpService.loginRequest(email, password).pipe(
      tap(users => {
        this.isLoggedIn = users.length > 0;
        if (users.length > 0) {
          localStorage.setItem('user', JSON.stringify(users[0]));
        }
      })
    );
  }

  register(email: string, password: string): Observable<User> {
    return this.authHttpService.registerRequest(email, password);
  }

  logout(): void {
    this.isLoggedIn = false;
    localStorage.removeItem('user');
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}