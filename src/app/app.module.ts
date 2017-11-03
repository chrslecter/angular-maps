import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
//FireBase Imports
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
//Rutas 
import { Routes, RouterModule } from '@angular/router';

//Servicios
import { AutorizacionService } from './services/autorizacion.service';
import { GuardService } from './services/guard.service';

//Import Component
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { PerfilComponent } from './perfil/perfil.component';


//Angular Maps
import { AgmCoreModule } from '@agm/core';


//Rutas 

const appRoutes : Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'registrarse', component: RegistroComponent},
  {path: 'perfil', component: PerfilComponent, canActivate:[GuardService]}

];

//FireBase Const
export const firebaseConfig = {
	apiKey: "AIzaSyB5aEGMO9LLHGedKHlVVq591zJE5Aj_w48",
    authDomain: "admisiones-zamorano.firebaseapp.com",
    databaseURL: "https://admisiones-zamorano.firebaseio.com",
    storageBucket: "",
    messagingSenderId: "409925613651"
};



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    PerfilComponent
  ],
  imports: [
    BrowserModule, 
    AngularFireModule.initializeApp(firebaseConfig), //firebase imports
    AngularFireDatabaseModule, //firebase imports
    AngularFireAuthModule, //firebase imports
    RouterModule.forRoot(appRoutes), //Router con const appRoutes
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD24pggYGi75mruMjsqAcLFlvz1m_Ofazg'
    })
  ],
  providers: [
    AutorizacionService,
    GuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }





