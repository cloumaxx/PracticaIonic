import { URL_SERVICIOS } from 'src/app/config/url.servicios';
import { Productos } from 'src/app/interfaces';
import config from '../../../../capacitor.config';
import { DatosService } from '../prueba/datos.service';
import { StorageService } from '../storage.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class carritoCompraService {
  constructor(private http: HttpClient , private datosService:DatosService) { }

 
  createEncFactura(idUser:number, productos: any){
    const url = `${URL_SERVICIOS}/productos/enc_factura/create`;
    const params = { id_user: idUser };
    this.http.post(url, params).subscribe(
      (response: any) => {
        const encFactura = response.body.enc_factura[0];
        const idEncabezado = encFactura.id;
        
        for(let i = 0; i < productos.length; i++){
          const paramas2 = {
            "id_enc_factura":idEncabezado,
            "id_product_reference":productos[i].id,
            "price": productos[i].precio,
            "qty": productos[i].cantidad,
            "iva": 0.19,
            "dcto": 0
            }
          let color=productos[i].color.replace("#","");
          let cantidadDatos = 0;

          this.datosService.getUnidadesProducto(productos[i].id,color)
            .subscribe((res: any) => {
              res.map((obj: { qty: any; }) => {
                cantidadDatos += obj.qty;
              });

              let final = cantidadDatos - productos[i].cantidad
              this.updateStock(productos[i].id,final);
            }); 
          this.createDetFactura(paramas2);
        }
      },
      (error: any) => {
        console.error('Error al crear factura', error);
      }
    );
  }
  createDetFactura(params:any ){
    const url = `${URL_SERVICIOS}/productos/det_factura/create`;
    let contador = 0 
    this.http.post(url, params).subscribe(
      (response: any) => {
        

          console.log(contador, "Producto agregado a la factura",response)
          
          contador+=1
      },
      (error: any) => {
        console.error('Error al agregar el producto a la factura', error);
      }
    );
  }
  updateStock( id:number,cantidad:number){
    const url2 = `http://18.219.169.226:8000/productos/detReference/update_inv/${id}`;
    const params= {
      "qty": cantidad
    } 
    this.http.put(url2, params).subscribe(
      (response: any) => {
          console.log( "Producto actualizado en el update_inv",response)

      },
      (error: any) => {
        console.error('Error al actualizar en el update_inv', error);
      }
    );
  }
  createUser(params: any) {
    const url = `${URL_SERVICIOS}/user/create`;

    this.http.post(url, params).subscribe(
      (response: any) => {
        
       
          console.log("Usuario agregado a la factura",response)
        
      },
      (error: any) => {
        console.error('Error al agregar el producto a la factura', error);
      }
    );
  }
  /*
              
  */ 



}
