import { Component } from '@angular/core';
import { AutorizacionService } from './services/autorizacion.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Admisiones App';
  loggedIn=false;
  loggedUser:any=null;
  constructor(private autorizacionService: AutorizacionService, private router:Router){
    this.autorizacionService.isLogged()
    .subscribe((result)=>{
      if (result && result.uid) {
        this.loggedIn=true;
        setTimeout(()=>{
          this.loggedUser = this.autorizacionService.getUser().currentUser.email;
          console.log(this.loggedUser);
        }, 500)
        
      }else{
        this.loggedIn=false;
        this.router.navigate(['login']);
      }
    }, (error)=>{
      this.loggedIn=false;
      this.router.navigate(['login']);
    })
  }
  logout(){
    this.autorizacionService.logout();
    this.router.navigate(['login']);
  }
}
