import { Component } from '@angular/core';
import { AutorizacionService } from '../services/autorizacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  title = 'Login';
  sesion:any={};
 constructor( private autorizacionService: AutorizacionService){}  

 login(){
 	    this.autorizacionService.login(this.sesion.email, this.sesion.password);
 }
}
