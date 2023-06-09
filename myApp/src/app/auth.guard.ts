import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { StorageService } from './services/storage.service';
import { ToastController } from '@ionic/angular';

interface TokenPayload {
  exp: number;
  is_superuser: boolean;
  is_staff: boolean;
  is_active: boolean;
}


@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private router: Router, private storage: StorageService,private toastController: ToastController,) {}

  async canActivate(): Promise<boolean> {
    const token = await this.storage.get('token');

    if (token == "" || token == null) {
      this.router.navigate(['tabs/tab1']);
      this.mostrarMensaje("No puedes entrar, recuerda que debes estar registrado", "danger");

      return false; // El usuario ha iniciado sesión
    } else {
      return true// El usuario no ha iniciado sesión
    }
  }
  
  verificarToken(token: string): boolean {
    try {
      // Decodificar el token y convertirlo al tipo TokenPayload
      const payload: TokenPayload = jwt_decode(token) as TokenPayload;

      // Verificar si el token ha expirado
      const tokenExpirado = Date.now() >= payload.exp * 1000;

      if (tokenExpirado) {
        return false; // El token ha expirado
      }

      // Verificar los permisos necesarios
      const { is_superuser, is_staff, is_active } = payload;

      if (!is_superuser && !is_staff && !is_active) {
        return false; // El usuario no tiene los permisos necesarios
      }

      return true; // El token y los permisos son válidos
    } catch (error) {
      return false; // Error al decodificar el token
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
