import {Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {



  //private isConnectedSubject = new BehaviorSubject<boolean>(false);
  //isConnected$ = this.isConnectedSubject.asObservable();

  private _isConnected = signal<boolean>(false)
  userIsConnected = this._isConnected.asReadonly()

  private _isAdmin = signal<boolean>(false)
  userIsAdmin = this._isConnected.asReadonly()
  constructor(private http: HttpClient) {
  }


  public login(email: string, password: string) {
     return this.http.post('http://localhost:3333/v1/api/token', {email, password}).pipe(
      catchError((error: any) => {
        console.log('error', error);
        return error;
      }),
      tap((response: any) => {
        this._isConnected.set(true)
        localStorage.setItem('token', response.token)
        localStorage.setItem('email', response.email)})

    )
  }
  public logout(){
    localStorage.clear()
    this._isConnected.set(false)
  }
  public isConnected(): void {
    const token = localStorage.getItem('token');
    this._isConnected.set(!!token)
  }
  get token(){
    return localStorage.getItem('token');
  }

  get email(){
    return localStorage.getItem('email')
  }
  isAdmin(){
    if(this.email === 'admin@admin.com') this._isAdmin.set(true)
  }
}
