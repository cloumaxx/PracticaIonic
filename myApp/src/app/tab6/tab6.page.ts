import { Component, OnInit } from '@angular/core';
import { DatosService } from '../services/prueba/datos.service';
import { usuarioService } from '../services/usuario/usuarioService.service';
import { Storage } from '@ionic/storage-angular';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { VentanaEmergentePage } from '../ventana-emergente/ventana-emergente.page';

@Component({
  selector: 'app-tab6',
  templateUrl: './tab6.page.html',
  styleUrls: ['./tab6.page.scss'],
})
export class Tab6Page implements OnInit {
  
  public cabeceras: any[] = [];
  public productos: any[] = [];
  public listaFactura: any[] =  [];

  public listaFacturaPorProducto: any[] = []
  misDatos : any = []
  carrito = this.storageService.getDetallado('miProducto')
  constructor(private bd:DatosService,private modalController: ModalController,private router:Router,private usuarioService: usuarioService,private storageService: StorageService) {
   }
  ngOnInit() {
    this.cabeceras.splice(0, this.cabeceras.length);
    this.productos.splice(0, this.productos.length);
    
  }
  actualizar(){
    
   
    this.mostrarCabeceras();
    //this.detalleCabecera(103);
  }
  async mostrarCabeceras(){
    let id =  await this.storageService.get('id');
    console.log("mostrarCabeceras",id);
    
   for (let i = 0; i < 500; i++) {

    this.usuarioService.getCabeceraById(i).subscribe(
      (response: any) => {
        try{
          if(response[0].id_user == id){
            this.cabeceras.push(response[0]);
          }

        }catch{

        }
      },
      (error: any) => {
        console.log("Error al obtener la cabecera:", error); // Verificar si hay algún error en la consola
      }
    );
  }
  }
  async detalleCabecera(id: number): Promise<string> {
    let listado = "";
    try {
      const response = await this.usuarioService.getProductosByIdCabecera(id).toPromise();
      for (let i = 0; i < response.length; i++) {
        
        this.productos.push(response[i]);
      }
      listado += "\n";
      //  console.log("productos:::", listado);
      return listado;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async cargarProductos() {
    //this.cargando = true;
    await this.bd
      .getAllProductos()
      .toPromise()
      .then((resp: any) => {
        this.misDatos = resp;
        //this.cargando = false;
      });
  }
  
  async mostrarVentanaEmergente(id:string) {
    this.cargarProductos()
    console.log("mostrarVentanaEmergente");
    const productosInternos = [...this.productos];
    let mensaje= '';
    let precioTotal = 0;
    let precioTotalTodosProductos=0
    console.log(productosInternos, productosInternos.length);
    let listado = this.detalleCabecera(parseInt(id));
    console.log("mostrar -->", productosInternos.length);
    for (let i = 0; i < productosInternos.length; i++) {
      
      console.log(this.misDatos[productosInternos[i].id_product_reference])  
      console.log("producto =>", productosInternos[i]);
      //id producto
      this.listaFacturaPorProducto.push(productosInternos[i].id);
      //nombre producto
      this.listaFacturaPorProducto.push(this.misDatos[productosInternos[i].id_product_reference].product);
      //precio
      this.listaFacturaPorProducto.push(productosInternos[i].price);
      //cantidad
      this.listaFacturaPorProducto.push(productosInternos[i].qty);
      //descuento
      if(productosInternos[i].dcto === 1){
        this.listaFacturaPorProducto.push('Si');
      }
      else{
        this.listaFacturaPorProducto.push('No');
      }
      //total
      let totalPrecio=productosInternos[i].price*productosInternos[i].qty
      this.listaFacturaPorProducto.push(totalPrecio);
      
      console.log('entrada',this.listaFacturaPorProducto)
      this.listaFactura.push(this.listaFacturaPorProducto)
      console.log('entrada factura',this.listaFactura[0][0])
      this.listaFacturaPorProducto = []
      console.log('salida',this.listaFacturaPorProducto)
      precioTotalTodosProductos+=totalPrecio
    }
    let lenLista=this.listaFactura.length
    const modal = await this.modalController.create({
      component: VentanaEmergentePage,
      componentProps: {
        info: this.listaFactura,
        totalPrecio: precioTotalTodosProductos,
      }
    });
    this.listaFactura=[]
    this.productos.splice(0, this.productos.length);

    await modal.present();
  }
  
  cerrarSesion() {
    this.storageService.eliminarToken();
    this.storageService.eliminarId();
    this.router.navigate(['/tabs/tab1']);
  }
}
