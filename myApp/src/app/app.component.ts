import { Component } from '@angular/core';
import { StorageService } from './services/storage.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private storageService: StorageService, private router: Router) {
    
    
   }

  cerrarSesion() {
    this.storageService.eliminarToken();
    this.router.navigate(['/tabs/tab1']);
  }
}
