import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

//Carpeta de Referencia para el servicio HTTP
import { HttpClientModule } from '@angular/common/http';

import { AlertController, IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FormsModule } from '@angular/forms'; // Importa FormsModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicStorageModule } from '@ionic/storage-angular';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, 
            FormsModule,
            HttpClientModule,
            IonicModule.forRoot(), 
            IonicStorageModule.forRoot(),
            AppRoutingModule],
            
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, AlertController],
  bootstrap: [AppComponent],
})
export class AppModule {}
