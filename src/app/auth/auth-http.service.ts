import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../shared/models/user.module';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  loginRequest(email: string, password: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}?email=${email}&password=${password}`);
  }

  registerRequest(email: string, password: string): Observable<User> {
    return this.http.post<User>(this.apiUrl, { email, password });
  }
}