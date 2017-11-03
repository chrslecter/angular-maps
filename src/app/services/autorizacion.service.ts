import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth/auth';
import { Router } from '@angular/router';

@Injectable()
export class AutorizacionService{
  constructor(private angularFireAuth: AngularFireAuth, private router:Router){
    this.isLogged();
  }

	public login = (email, password) => {
  	this.angularFireAuth.auth.signInWithEmailAndPassword(email, password)
  	.then((response)=>{
  		console.log(response);
      this.router.navigate(['perfil']);
  	})
  	.catch((error)=>{
  		alert('error en Login');
  		console.log(error); 
  	})
  }
  public registro = (email, password) => {
  	this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
  	.then((response)=>{
  		console.log(response);
      this.router.navigate(['perfil']);

  	})
  	.catch((error)=>{
  		alert('error en register');
  		console.log(error); 

  	})
  }

  public isLogged(){
  	return this.angularFireAuth.authState;
  }

  public logout(){
    this.angularFireAuth.auth.signOut();
    this.router.navigate(['login']);
  }

  public getUser(){
    return this.angularFireAuth.auth;
  }

}