import { Component } from '@angular/core';
import { AlumnoService } from '../alumno.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent {

  constructor(private alumnoService: AlumnoService, private modalService: NgbModal) { }

  public alumnos: any;

  alumno = {
    id:"",
    nombre: "",
    edad: "",
    fecha: "",
    carrera: ""
  }

  ngOnInit() {
    this.getAlumnos();
  }

  getAlumnos() {
    this.alumnos = this.alumnoService.getAlumnos().subscribe(data => {
      this.alumnos = data;
    });
  }

  agregar() {
    if (this.alumno.id == null) {
      this.alumnoService.agregar(this.alumno).subscribe(data => {
        this.getAlumnos();
        this.modalService.dismissAll();
      })
    }else{
      this.alumnoService.editar(this.alumno).subscribe(data => {
        this.getAlumnos();
        this.modalService.dismissAll();
      })
    }
    this.alumno.id = "";
    this.alumno.nombre = "";
    this.alumno.edad = "";
    this.alumno.fecha = "";
    this.alumno.carrera = "";
  }

  mostrarModalAlumno(content: any) {
    this.modalService.open(content, {
      ariaLabelledBy: 'Datos Alumno'
    });
  }

  editarAlumno(content: any, pos: number) {
    this.alumno = this.alumnos.data[pos];
    this.mostrarModalAlumno(content);
  }

}
