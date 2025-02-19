import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { Resultado, Data, Datos } from './user.interface';
import * as jQuery from 'jquery';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  users: Datos[] = [];
  userIdToDelete: string | null = null;
  newUser: any = { nombre: '', email: '', password: '' };
  editUser: any = { id:'', nombre: '', email: '', password: '' };
  addResponseMessage: string | null = null;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe({
      next: (data: Data) => {
        this.users = data.datos;
      },
      error: (err) => {
        this.users = [];
      },
    });
  }

  close(){
    $('#confirmDeleteModal').modal('hide');
    $('#insertModal').modal('hide');
    $('#updateModal').modal('hide');
  }
  

  showConfirmDeleteModal(id: string) {
    this.userIdToDelete = id;
    ($('#confirmDeleteModal') as any).modal('show');
  }

  hideConfirmDeleteModal() {
    this.userIdToDelete = null;
    $('#confirmDeleteModal').modal('hide');
  }

  showInsertModal() {
    this.newUser = { nombre: '', email: '', password: '' };
    this.addResponseMessage = null;
    ($('#insertModal') as any).modal('show');
  }

  hideInsertModal() {
    $('#insertModal').modal('hide');
  }

  hideUpdateModal() {
    $('#updateModal').modal('hide');
  }

  showUpdateModal(id: string, nombre: string, email: string, password: string) {
    this.editUser = { id: id, nombre: nombre, email: email, password: password };
    this.addResponseMessage = null;
    ($('#updateModal') as any).modal('show');
  }

  insertUser() {
    this.userService.insertUser(this.newUser).subscribe({
      next: (data) => {
        if(data.codigoRespuesta == '1'){
          this.loadUsers();
          this.hideInsertModal();
        }else{
          this.addResponseMessage = data.descripcionRespuesta;
        }
      },
      error: (err) => {
        this.addResponseMessage = 'Error al conectar con el servidor.';
      },
    });
  }

  updateUser() {
    this.userService.updateUser(this.editUser).subscribe({
      next: (data) => {
        if(data.codigoRespuesta == '1'){
          this.loadUsers();
          this.hideUpdateModal();
        }else{
          this.addResponseMessage = data.descripcionRespuesta;
        }
      },
      error: (err) => {
        this.addResponseMessage = 'Error al conectar con el servidor.';
      },
    });
  }

  deleteUser() {
    if( this.userIdToDelete !== null ){
      this.userService.deleteUser(this.userIdToDelete).subscribe(() => {
        // Recargar los usuarios después de eliminar
        this.loadUsers();
        this.hideConfirmDeleteModal();
      });
    }
    
  }

}
