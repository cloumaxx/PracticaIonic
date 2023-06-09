import { Component, Input, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { Productos } from '../../interfaces/index';
import { DatosService } from 'src/app/services/prueba/datos.service';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { ToastController } from "@ionic/angular";

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss'],
})
export class ProductoComponent implements OnInit {

  @Input() producto: any;
  @Input() index!: number;
  colorSeleccionado: string | null = null;
  tallaSeleccionada:string="";
  color:boolean=false;
  productoGuardarStorage:any;
  tallas:boolean=false;
  tallaSeleccion:string = "";
  indiceTalla:number=0;
  guardar: boolean=false;
  coloresDisponibles: any = [];
  atributosObjeto: any = [];
  tallasDisponibles: any = [];
  precio:any;
  cantidadDeseada: number = 0;
  cantidaLimite:number =0;
  cantidadBoolean:boolean=false;
  qtkTallas:any
  constructor(private toastController: ToastController,private storageService: StorageService, private datosService:DatosService) { }

  ngOnInit() {}

  guardarStorage(producto:any,color:any,talla:any,cantidad:number,precio:number){
    if(this.cantidadDeseada==0){
      console.log(this.cantidadDeseada)
      this.mostrarMensaje("Recuerda agregar la cantidad","danger");
    }else{
      let atributosUsar:any = [color,talla,cantidad,precio];
      this.storageService.setDetallado('miProducto',producto,atributosUsar);
      this.mostrarMensaje("Producto agregado con exito","success");
    }
    
         
  }
  async mostrarMensaje(mensaje: string, color: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      color: color
    });
  
    await toast.present(); // Agrega esta línea para mostrar el mensaje
  }

  getStorage(){
    let unProducto = this.storageService.get('miProducto');
    //console.log(unProducto);

  }
  traerSorage(){
    let unProducto =this.storageService.get('miProducto')
    //console.log(unProducto)
  }
  ActivareleccionColor(id:number){
    this.color=true;
    let Aux:any=[];
    this.datosService.getDetalleProductos(id).subscribe((res) => {
      // Recorre los datos aquí y almacena el resultado en una propiedad del componente
      Aux = res;
      this.coloresDisponibles = Aux.map((obj: { color: any; }) => obj.color);
    });  

  }
  mostrarTallas(id:number,color:string){
    
    this.colorSeleccionado= color;
    color=color.replace("#","");

    this.atributosObjeto.push(color)
    this.tallas=true;
    let Aux:any=[];
    console.log("ID: ",id,"Color: ",color)
    this.datosService.getUnidadesProducto(id,color).subscribe((res) => {
      Aux = res;
      this.tallasDisponibles = Aux.map((obj: { size: any; }) => obj.size);
      this.qtkTallas = Aux.map((obj: { qty: any; }) => obj.qty);
      console.log("T:::: ",this.tallasDisponibles)
      console.log("TALLAS:::: ",this.qtkTallas)
      this.precio = Aux.map((obj: { price: any; }) => obj.price);
      this.precio = this.precio[0];
    });
  }

  mostrarGuardar(){
    this.guardar=true
  
  }
  mostrarCantidad(){
    this.cantidadBoolean=true;
  }
  handleChange(ev:any){
    this.tallaSeleccion=ev.target.value
    this.tallaSeleccionada= ev.target.value;
    this.atributosObjeto.push(this.tallaSeleccion)
    this.mostrarGuardar()
  }

  
  aumentarCantidad(id:number) {

    for(let i=0;i<this.tallasDisponibles.length;i++){
      if(this.tallaSeleccionada==this.tallasDisponibles[i]){
        if(this.cantidadDeseada < this.qtkTallas[i]){
          this.cantidadDeseada += 1;
        }
      }
    }
   
  }

  disminuirCantidad() {
    if (this.cantidadDeseada > 0) {
      this.cantidadDeseada -= 1;
    }
  }
  

}
