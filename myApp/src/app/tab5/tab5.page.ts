import { Component, OnInit } from "@angular/core";
import { StorageService } from "../services/storage.service";
import { carritoCompraService } from "../services/carrito_compra/carrito_compra.service";
import { Router } from '@angular/router';
import { ToastController } from "@ionic/angular";

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {
  
  carritoUsar: any =[];
  precioTotal:number = 0;

  nombreTab:string = 'Favoritos'
  constructor(private toastController: ToastController,private router:Router,private storageService: StorageService, private carritoCompraService: carritoCompraService) {
  }
  ngOnInit(): void {
    this.cargarDatos();

  }
  async cargarDatos() {
    this.carritoUsar = await this.storageService.getDetallado('miProducto');
    for(let  i=0;i<this.carritoUsar.length;i++){
      this.precioTotal += this.carritoUsar[i].precio;
    }

  }
  async pagarProductos(){
    this.carritoUsar = await this.storageService.getDetallado('miProducto');
    if(this.carritoUsar.length == 0){
      this.mostrarMensaje("No hay productos en el carrito","danger");
      return;
    }else{
      let id = await this.storageService.getId();
      let auxiliar  =  this.carritoCompraService.createEncFactura(id,this.carritoUsar);
      console.log("Entro: ",auxiliar)
      console.log("Carrito a usar:", this.carritoUsar);
      this.storageService.deleteDetallado('miProducto');
      this.mostrarMensaje("Compra realizada con exito","success");
      window.location.reload();

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
  cerrarSesion() {
    this.storageService.eliminarToken();
    this.storageService.eliminarId();

    this.router.navigate(['/tabs/tab1']);
  }
  
}
