import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VentanaEmergentePageRoutingModule } from './ventana-emergente-routing.module';

import { VentanaEmergentePage } from './ventana-emergente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VentanaEmergentePageRoutingModule
  ],
  declarations: [VentanaEmergentePage]
})
export class VentanaEmergentePageModule {}
