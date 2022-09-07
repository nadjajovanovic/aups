import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MestaComponent } from './components/mesta/mesta.component';
import { HomeComponent } from './components/home/home.component';
import { MestoService } from './services/mesto.service';
import {MatToolbarModule} from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { NotificationService } from './services/notification.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PogonComponent } from './components/pogon/pogon.component';
import { PogonService } from './services/pogon.service';
import { RadnoMestoComponent } from './components/radno-mesto/radno-mesto.component';
import { RadnoMestoService } from './services/radnomesto.service';
import { SastojciComponent } from './components/sastojci/sastojci.component';
import { SastojciService } from './services/sastojci.service';
import { VrstaTransportaComponent } from './components/vrsta-transporta/vrsta-transporta.component';
import { VrstaTransportaService } from './services/vrstatransporta.service';
import { TransportComponent } from './components/transport/transport.component';
import { TransportService } from './services/transport.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
//import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MatInputModule} from '@angular/material/input';
import { MatDialogModule} from '@angular/material/dialog';
import { DialogTransportComponent } from './components/dialog/dialog-transport/dialog-transport.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { DialogMestaComponent } from './components/dialog/dialog-mesta/dialog-mesta.component';
import { DialogPogonComponent } from './components/dialog/dialog-pogon/dialog-pogon.component';
import { DialogRadnaMestaComponent } from './components/dialog/dialog-radna-mesta/dialog-radna-mesta.component';
import { DialogSastojciComponent } from './components/dialog/dialog-sastojci/dialog-sastojci.component';
import { DialogVrstaTransportaComponent } from './components/dialog/dialog-vrsta-transporta/dialog-vrsta-transporta.component';
import { MatConfirmDialogComponent } from './components/mat-confirm-dialog/mat-confirm-dialog.component';
import { DialogService } from './services/dialog.service';
import { RadnikComponent } from './components/radnik/radnik.component';
import { DialogRadnikComponent } from './components/dialog/dialog-radnik/dialog-radnik.component';
import { SkladisteComponent } from './components/skladiste/skladiste.component';
import { DialogSkladisteComponent } from './components/dialog/dialog-skladiste/dialog-skladiste.component';
import { RadnikService } from './services/radnik.service';
import { SkladisteService } from './services/skladiste.service';
import { PlanProizvodnjeComponent } from './components/plan-proizvodnje/plan-proizvodnje.component';
import { DialogPlanProizvodnjeComponent } from './components/dialog/dialog-plan-proizvodnje/dialog-plan-proizvodnje.component';
import { PlanProizvodnjeService } from './services/planproizvodnje.service';
import { ProizvodComponent } from './components/proizvod/proizvod.component';
import { DialogProizvodComponent } from './components/dialog/dialog-proizvod/dialog-proizvod.component';
import { ProizvodService } from './services/proizvod.service';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    MestaComponent,
    HomeComponent,
    PogonComponent,
    RadnoMestoComponent,
    SastojciComponent,
    VrstaTransportaComponent,
    TransportComponent,
    DialogTransportComponent,
    DialogMestaComponent,
    DialogPogonComponent,
    DialogRadnaMestaComponent,
    DialogSastojciComponent,
    DialogVrstaTransportaComponent,
    MatConfirmDialogComponent,
    RadnikComponent,
    DialogRadnikComponent,
    SkladisteComponent,
    DialogSkladisteComponent,
    PlanProizvodnjeComponent,
    DialogPlanProizvodnjeComponent,
    ProizvodComponent,
    DialogProizvodComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxPaginationModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  entryComponents: [DialogTransportComponent, MatConfirmDialogComponent, 
    DialogMestaComponent, DialogPogonComponent, DialogRadnaMestaComponent,
    DialogSastojciComponent, DialogVrstaTransportaComponent, DialogRadnikComponent, 
    DialogSkladisteComponent, DialogPlanProizvodnjeComponent, DialogProizvodComponent],
  providers: [MestoService, NotificationService, PogonService, 
    RadnoMestoService, SastojciService, VrstaTransportaService, TransportService,
     DialogService, RadnikService, SkladisteService, PlanProizvodnjeService, ProizvodService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
