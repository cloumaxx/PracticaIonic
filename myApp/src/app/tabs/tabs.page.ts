import { Component } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  token: string="";
  mostrar: boolean=false;
  constructor(private storageService: StorageService, private router: Router) {
    this.verificarToken();

   }

  cerrarSesion() {
    this.storageService.eliminarToken();
    window.location.reload();

    this.router.navigate(['/tabs/tab1']);
  }
  verificarToken() {
    this.storageService.get('token').then((token) => {
      this.token = token;
      if (this.token == "" || this.token == null) {
        this.mostrar=true
        
      }
    });
  }

  
}
