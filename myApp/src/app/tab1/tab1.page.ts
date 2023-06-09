import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { usuarioService } from '../services/usuario/usuarioService.service';
import { ToastController } from '@ionic/angular';
import { AuthGuard } from '../auth.guard';
import { StorageService } from '../services/storage.service';
import { ProductoComponent } from '../components/producto/producto.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  correo: string = "";
  password: string = "";
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  formularioCompleto: boolean = false;

  constructor(
    private usuarioService: usuarioService,
    private toastController: ToastController,
    private router: Router,
    private authGuard:AuthGuard,
    private storageService:StorageService
    ) {
    console.log("Entre al Tabulador 1");
  }
  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }
  verificarCamposVacios() {
    this.formularioCompleto = !!(
      this.correo &&
      this.password 
      
    );
  }
  redirectRegister(){
    this.router.navigateByUrl('tabs/tab2'); 

  }

  async iniciarSesion(){
    try {
      if(this.correo != "" && this.password != ""){
        const response: any = await this.usuarioService.loginUser({ email: this.correo, password: this.password }).toPromise();
        if (response.ok) {
          await this.storageService.guardarToken(response.token);
          
          await this.storageService.guardarId(response.res[0].id);
  
          this.mostrarMensaje("¡Inicio de sesión exitoso!", "success");
          this.router.navigateByUrl('tabs/tab4');
        
        } else {
          this.mostrarMensaje("Contraseña o correo equivocado", "danger");
        } 
      } 

      if(this.correo === "" || this.password === ""){
        this.mostrarMensaje("Los campos son requeridos", "danger");
      }
      if(this.correo === "" && this.password === ""){
        this.mostrarMensaje("Ambos campos son requeridos", "danger");
      }
      
    } catch (error) {
      console.error(error);
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
  

}
