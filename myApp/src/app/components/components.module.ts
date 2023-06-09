import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoComponent } from './producto/producto.component';
import { ProductosComponent } from './productos/productos.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ProductoCarritoComponent } from './elemsCarrito/productoCarrito/productoCarrito.component';
import { CarritoComponent } from './elemsCarrito/carrito/carrito.component';

@NgModule({
  declarations: [
    ProductoComponent,
    ProductosComponent,
    CarritoComponent,
    ProductoCarritoComponent
  ],
  exports: [
    ProductoComponent,
    ProductosComponent,
    CarritoComponent,
    ProductoCarritoComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ]
})
export class ComponentsModule { }
