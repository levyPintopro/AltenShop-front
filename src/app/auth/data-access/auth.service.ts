import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isConnectedSubject = new BehaviorSubject<boolean>(false);
  isConnected$ = this.isConnectedSubject.asObservable();
  constructor(private http: HttpClient) {
  }


  public login(email: string, password: string) {
     return this.http.post('http://localhost:3333/v1/api/token', {email, password}).pipe(
      catchError((error: any) => {
        console.log('error', error);
        return error;
      }),
      tap((response: any) => {
        this.isConnectedSubject.next(true)
        localStorage.setItem('token', response.token)
        localStorage.setItem('email', response.email)})

    )
  }
  public isConnected(): void {
    const token = localStorage.getItem('token');
    console.log(!!token) ;
    this.isConnectedSubject.next(!!token)
  }
  get token(){
    return localStorage.getItem('token');
  }

  get email(){
    return localStorage.getItem('email')
  }
}
