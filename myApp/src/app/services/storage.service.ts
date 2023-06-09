import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';
import { Productos } from '../interfaces/index';
import { URL_SERVICIOS } from '../config/url.servicios';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null = null;
  datos :any=[];

  private _localProductos: Productos[] = [];

  constructor(private storage: Storage,private http: HttpClient) {
    this.init();
  }
  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;

    await this.loadFavorites();
  }
 
  get getLocalProductos() {
    
    return [...this._localProductos]
  }

  async loadFavorites() {
    try {
      //const articles = await this._storage.get('articles');
      const productos = await this.get('productos');
      this._localProductos = productos || [];
    } catch (error) {
    }
  }

  productoInFavorites(producto: Productos) {
    return !!this._localProductos.find(localProducto => localProducto.product === producto.product);

  }

  async saveRemoveProducto( producto: Productos ) {
    const exists = this._localProductos.find( localProducto => localProducto.product === producto.product );
    if ( exists ) {
      this._localProductos = this._localProductos.filter( localProducto => localProducto.product !== producto.product);
    } else {
      this._localProductos = [ producto, ...this._localProductos];
    }

    this.set('productos', this._localProductos );
  }



  // Create and expose methods that users of this service can
  // call, for example:
  public set(key: string, value: any) {
//    this._storage?.set(key, value);
    let estaEnArreglo=false
    for (let i = 0; i < this.datos.length; i++) {
      if (value.id == this.datos[i].id){
        estaEnArreglo=true
      }
    }
    if (estaEnArreglo==false){
      console.log('PRODUCTO AGREGADO EXITOSAMENTE')
      this.datos.push(value)
    }else{
      console.log('PRODUCTO YA EXISTE')
    }
    this._storage?.set(key, this.datos);

  }
  public setDetallado(key: string, producto: any,valores:any) {
    //    this._storage?.set(key, value);
          console.log('PRODUCTO AGREGADO EXITOSAMENTE')
          producto.color = valores[0];
          producto.talla = valores[1];
          producto.cantidad = valores[2];
          producto.precio = valores[3];
          this.datos.push(producto)
          this._storage?.set(key, this.datos);
    }
  public async getDetallado(key: string): Promise<any> {
      const datos = await this._storage?.get(key);
      return datos || [];
  }
  public async deleteDetallado(key: string) : Promise<void> {
    this._storage?.remove(key);    
  }
  async deleteItem(key: string, index: number) {
    const datos = await this.storage.get(key) || [];
    datos.splice(index, 1);
    await this.storage.set(key, datos);
    console.log('PRODUCTO BORRADO EXITOSAMENTE');
  }
  public async get(key: string) {
    const name = await this._storage?.get(key);
    return name;
  }
  public async guardarToken(token: string): Promise<void> {
    await this.init();
    await this._storage?.set('token', token);
  }
  public eliminarToken() {
    this._storage?.remove('token');
  }
  public async guardarId(id: string): Promise<void> {
    await this.init();
    await this._storage?.set('id', id);
  }
  public async getId() {
    await this.init();
    return await this._storage?.get('id');
  }
  public eliminarId() {
    this._storage?.remove('id');
  }
  //////////////////
  
}
