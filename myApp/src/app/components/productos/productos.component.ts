import { Component, Input, OnInit } from '@angular/core';
import { DatosService } from 'src/app/services/prueba/datos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
})
export class ProductosComponent implements OnInit {

  @Input() productos: any[] = [];

  constructor(private bd: DatosService) { 

  }

  ngOnInit() {
    console.log()
    //console.log("MISPRODUCTOS",this.productos);
  }


}
