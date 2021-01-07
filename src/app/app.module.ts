import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import firbaseConfig from './firebase.config';
import { AngularFireModule } from '@angular/fire';
@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firbaseConfig),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
