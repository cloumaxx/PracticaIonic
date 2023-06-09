import { Component, Input, OnInit } from '@angular/core';
import { DatosService } from 'src/app/services/prueba/datos.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss'],
})
export class CarritoComponent implements OnInit {
 
  @Input() productos: any[] = [];

  constructor(private bd: DatosService, private storageService: StorageService) { 

  }

  ngOnInit() {
    console.log()
    //console.log("MISPRODUCTOS",this.productos);
  }

  

}
