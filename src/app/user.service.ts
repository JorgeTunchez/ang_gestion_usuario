import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Resultado, Data } from './user.interface';
import { Observable, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost/wsusuarios/index.php';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<Data> {
    return this.http.get<Data>(this.apiUrl);
  }

  insertUser(user: any): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: { nombre: user.name, email: user.email, password: user.password } // Objeto JSON que contiene el ID del recurso
    };
    return this.http.post(this.apiUrl, user, httpOptions);
  }

  updateUser(user: any): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: { id: user.id, nombre: user.name, email: user.email, password: user.password } // Objeto JSON que contiene el ID del recurso
    };
    return this.http.put(this.apiUrl, user, httpOptions);
  }

  deleteUser(id: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: { id: id } // Objeto JSON que contiene el ID del recurso
    };
    return this.http.delete(this.apiUrl, httpOptions);
  }

}
