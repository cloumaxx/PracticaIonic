import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-ventana-emergente',
  templateUrl: './ventana-emergente.page.html',
  styleUrls: ['./ventana-emergente.page.scss'],
})
export class VentanaEmergentePage {

  
  @Input() info: any[] | undefined;
  totalPrecio:number | undefined;
  constructor(private modalController: ModalController) {}

  cerrarVentanaEmergente() {
    this.modalController.dismiss();
  }
}
