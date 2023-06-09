import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VentanaEmergentePage } from './ventana-emergente.page';

const routes: Routes = [
  {
    path: '',
    component: VentanaEmergentePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VentanaEmergentePageRoutingModule {}
