import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms'
import { AutorizacionService } from '../services/autorizacion.service';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
 
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html'
})
export class RegistroComponent implements OnInit{
  title = 'Registro';
  registro:any={};
  //Stream de datos Results coleccion de Observables del tipo ANY
  results$: Observable<any>;

  lat: number;
  lng: number;
  userLocationManual:any=null;
  zoom:number=5;

  private searchFiel: FormControl;
  constructor( private autorizacionService: AutorizacionService, private http:Http){
  	const URL = 'https://maps.googleapis.com/maps/api/geocode/json';
  	this.searchFiel = new FormControl();
  	this.results$ = this.searchFiel.valueChanges
  	.debounceTime(500)
  	.switchMap(query=> this.http.get(URL+'?address='+query))
  	.map(response => response.json())
  	.map(response => response.results);
  }
  seleccionarDireccion(direccion){
  	//console.log(direccion);
    this.lat=direccion.geometry.location.lat;
    this.lng=direccion.geometry.location.lng;
    this.userLocationManual=direccion.formatted_address;
    this.zoom=15;
  	this.registro.local=direccion.address_components[1].long_name+' '+direccion.address_components[0].long_name;
  	this.registro.ciudad=direccion.address_components[2].long_name;
  	this.registro.pais=direccion.address_components[3].long_name;


  }
  registrar(){
        this.autorizacionService.registro(this.registro.email, this.registro.password);
  }

  ngOnInit(){
  	this.getUserLocation();
  }
  
    private selectedByUser(evento){
      //console.log(evento);
      this.lat=evento.coords.lat;
      this.lng=evento.coords.lng;
      this.locationByCoords(this.lat,this.lng)
      .subscribe((result)=>{
         this.userLocationManual=result.json().results[0].formatted_address;
         console.log(this.userLocationManual);
      });
      
  }

  private locationByCoords(lat,lng){
        const URL = 'https://maps.googleapis.com/maps/api/geocode/json';
  	return this.http.get(URL+'?&latlng='+lat+','+lng);
  }
  private getUserLocation(){
  	if(navigator.geolocation)	
  	navigator.geolocation.getCurrentPosition(position=>{
  		this.lat=position.coords.latitude;
  		this.lng=position.coords.longitude;
  		// console.log(this.lat+' '+this.lng);
  	});
  }
}
