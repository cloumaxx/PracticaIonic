import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { URL_SERVICIOS } from 'src/app/config/url.servicios';
import { Productos } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  constructor(private http: HttpClient) { }

  getAllProductos():Observable<Productos[]>{
    return this.http.get(`${URL_SERVICIOS}/productos/`, {}).pipe(
      map((res: any) => {
        console.log('SERVICIOS',res);
        return res;
      })
    );
  }

  getDetalleProductos(unIdProducto:number){
    return this.http.get(`${URL_SERVICIOS}/productos/detProduct/${unIdProducto}`, {}).pipe(
      map((res: any) => {
        console.log('DETPRODUCT',res);
        return res;
      })
    );
  }

  getMultimediaProducto(unIdProducto:number,unColor:string){
    return this.http.get(`${URL_SERVICIOS}/productos/detMultimedia/${unIdProducto}/${unColor}`, {}).pipe(
      map((res: any) => {
        console.log('DETMULTIMEDIA',res);
        return res;
      })
    );
  }
  getUnidadesProducto(unIdProducto:number,unColor:string){
    return this.http.get(`${URL_SERVICIOS}/productos/detReference/${unIdProducto}/${unColor}`, {}).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  getProductoTalla(unIdProducto:number,atributosObjeto:any){
    return this.http.get(`${URL_SERVICIOS}/productos/detReference/${unIdProducto}/${atributosObjeto[0]}`, {}).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  


}
