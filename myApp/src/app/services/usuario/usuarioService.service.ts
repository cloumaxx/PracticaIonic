import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { URL_SERVICIOS } from 'src/app/config/url.servicios';
import { Productos } from 'src/app/interfaces';
import config from '../../../../capacitor.config';
import { DatosService } from '../prueba/datos.service';

@Injectable({
  providedIn: 'root'
})
export class usuarioService {
  constructor(private http: HttpClient , private datosService:DatosService ) { }

  // 1. Crear un usuario
  createUser(params: any) {
    const url = `${URL_SERVICIOS}/user/create`;

    this.http.post(url, params).subscribe(
      (response: any) => {
          console.log("Usuario creado correctamente",response)        
      },
      (error) => {
        console.error('Error al crear el usuario', error);
      }
    );
  }
  loginUser(params: any) {
    const url = `${URL_SERVICIOS}/user/login`;

    return this.http.post(url, params)

  }

getCabeceraById(id_user:number){
    return this.http.get(`${URL_SERVICIOS}/productos/enc_factura/${id_user}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  getProductosByIdCabecera(id:number){
    return this.http.get(`${URL_SERVICIOS}/productos/det_factura/${id}`, {}).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

}
