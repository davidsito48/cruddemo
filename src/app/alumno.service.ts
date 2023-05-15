import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  constructor(private httpClient: HttpClient) { }

  getAlumnos() {
    return this.httpClient.get('http://localhost:3000/alumno');
  }

  agregar(alumno:any){
    return this.httpClient.post('http://localhost:3000/alumno',alumno);
  }

  editar(alumno:any){
    return this.httpClient.put('http://localhost:3000/alumno',alumno);
  }
}
