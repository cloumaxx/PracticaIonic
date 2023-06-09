import { ProductoComponent } from './../components/producto/producto.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DatosService } from '../services/prueba/datos.service';

import { AlertController, IonInfiniteScroll } from '@ionic/angular';
import { Productos } from '../interfaces';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  nombreTab: string = 'Nombre4'
  
  misDatos: any = [];

  misProductos: any = [];

  detalleProducto: any;

  multimediaProducto: any;

  reg: number = 12;

  @ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll!: IonInfiniteScroll;

  constructor(private bd: DatosService,private storageService: StorageService, private router: Router) {
    this.cargarProductos();
  }

  ngOnInit() {
    this.inicializaNombre();

    console.log(this.nombreTab);
  }

  inicializaNombre() {
    this.nombreTab = 'Lista de Productos';
  }

  async cargarProductos() {
    //this.cargando = true;
    await this.bd
      .getAllProductos()
      .toPromise()
      .then((resp: any) => {
        this.misProductos = resp;

        let j = 0;
        for (let i = 0; i < this.reg; i++) {
          if (this.misDatos.length < this.misProductos.length) {
            this.misDatos.push(this.misProductos[j]);
            this.seleccionarProducto(this.misProductos[j].id,j);
            j++;
          }
          else{
            this.infiniteScroll.disabled = true;
            return;
          }
        }

        this.infiniteScroll.complete();

        console.log('PRODUCTOS', this.misDatos);
        //this.cargando = false;
      });
  }

  async getMultimediaProducto(unIdProducto: number, unColor: string, i: any) {
    //Reemplazo el numeral por nada para el codigo de color que llega en hexadecimal
    unColor = unColor.replace("#", "");
    await this.bd
      .getMultimediaProducto(unIdProducto, unColor)
      .toPromise()
      .then((resp: any) => {
        this.multimediaProducto = resp;
        console.log('NombreProducto', unIdProducto )
        console.log('MULTPRODUCTO', this.multimediaProducto);

        //console.log(this.misDatos[0].linkvideo,this.multimediaProducto[0].url);
        
        //this.misDatos[i].linkvideo = this.multimediaProducto[0];
        this.misDatos[i].linkvideo = this.multimediaProducto;

        console.log(this.misDatos);

      });
  }

  async getDetalleProducto(unIdProducto: number, i: any) {
    await this.bd
      .getDetalleProductos(unIdProducto)
      .toPromise()
      .then((resp: any) => {
        this.detalleProducto = resp[0];
        console.log('DETPRODUCTO', this.detalleProducto);
        this.getMultimediaProducto(unIdProducto, this.detalleProducto.color, i);


      });
  }

  async getDetalleProductoTalla(unIdProducto: number, i: any) {
    await this.bd
      .getDetalleProductos(unIdProducto)
      .toPromise()
      .then((resp: any) => {
        this.detalleProducto = resp[0];
        console.log('DETPRODUCTO', this.detalleProducto);
        this.getMultimediaProducto(unIdProducto, this.detalleProducto.color, i);


      });
  }

  seleccionarProducto(unIdProducto: number, i: any) {
    console.log(unIdProducto, i);
    this.getDetalleProducto(unIdProducto, i);
  }


  loadData() {
    
    let j = this.misDatos.length;
    for (let i = 0; i < this.reg; i++) {
      if (this.misDatos.length < this.misProductos.length) {
        this.misDatos.push(this.misProductos[j]);
        this.seleccionarProducto(this.misProductos[j].id,j);
        j++;
      }
      else{
        this.infiniteScroll.disabled = true;
        return;
      }
    }

    console.log(this.misDatos);
    this.infiniteScroll.complete();
    
  }
  cerrarSesion() {
    this.storageService.eliminarToken();
    this.storageService.eliminarId();
    this.router.navigate(['/tabs/tab1']);
  }

}
