import { Component, Input, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { DatosService } from 'src/app/services/prueba/datos.service';
import { FormsModule } from '@angular/forms'; // Importa FormsModule

@Component({
  selector: 'app-productoCarrito',
  templateUrl: './productoCarrito.component.html',
  styleUrls: ['./productoCarrito.component.scss'],
})
export class ProductoCarritoComponent implements OnInit {

  @Input() producto: any;
  @Input() index!: number;
  valorPrenda:number = 0;
  constructor(private storageService: StorageService, private datosService:DatosService) { }

  ngOnInit() {
    
    this.valorPrenda = this.producto.precio*this.producto.cantidad;
  }


  getStorage(){
    let unProducto = this.storageService.get('miProducto');
    //console.log(unProducto);

  }
  traerSorage(){
    let unProducto =this.storageService.get('miProducto')
    //console.log(unProducto)
  }
  borrarProducto(lugar:number){
    this.storageService.deleteItem('miProducto',lugar);
    window.location.reload();

  }



  

}
