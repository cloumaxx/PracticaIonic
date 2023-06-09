import { Component } from '@angular/core';
import { carritoCompraService } from "../services/carrito_compra/carrito_compra.service";
import { usuarioService } from '../services/usuario/usuarioService.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  nombreUsuario: string = "";
  contrasena: string = "";
  contrasenaConfirm: string = "";
  nombre: string = "";
  apellido: string = "";
  email: string = "";
  formularioCompleto: boolean = false;
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  passwordType1: string = 'password';
  passwordIcon1: string = 'eye-off';
 

  constructor( private usuarioService: usuarioService,private toastController: ToastController,private router: Router) {
  }
  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }
  hideShowPassword1() {
    this.passwordType1 = this.passwordType1 === 'text' ? 'password' : 'text';
    this.passwordIcon1 = this.passwordIcon1 === 'eye-off' ? 'eye' : 'eye-off';
  }   
  guardarDatos(){
   
    const fechaHoy = new Date();
    if (this.formularioCompleto) {
      if(this.contrasena===this.contrasenaConfirm){
        let params = { 
          "password": this.contrasena,
          "is_superuser":true,
          "username": this.nombreUsuario,
          "first_name": this.nombre,
          "last_name": this.apellido,
          "email": this.email,
          "is_staff": true,
          "is_active": true,
          "date_joined": fechaHoy
        };
        this.usuarioService.createUser(params);
        
        this.mostrarMensaje("¡Datos guardados exitosamente!","success");
        this.router.navigateByUrl('tabs/tab1');
        
      }else{
        console.log('No listo')
      }
    }else{
      this.mostrarMensaje("Revisa los datos guardados","danger");

    }
    
  }
  async mostrarMensaje(mensaje:string,color:string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000, // Duración en milisegundos que se mostrará el mensaje
      color: color // Color del mensaje
    });
  
    toast.present();
  }
  addLeadingZero(arg0: number) {
    throw new Error('Method not implemented.');
  }
  botonCancelar(){
    this.router.navigateByUrl('tabs/tab1'); 
  }
  verificarCamposVacios() {
    this.formularioCompleto = !!(
      this.nombreUsuario &&
      this.contrasena &&
      this.contrasenaConfirm &&
      this.nombre &&
      this.apellido &&
      this.email
    );
  }
  
}
