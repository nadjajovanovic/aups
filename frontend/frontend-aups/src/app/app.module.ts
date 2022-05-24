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
    DialogTransportComponent
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
    //MatMomentDateModule,
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
  entryComponents: [DialogTransportComponent],
  providers: [MestoService, NotificationService, PogonService, 
    RadnoMestoService, SastojciService, VrstaTransportaService, TransportService,
    /*{provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}}*/],
  bootstrap: [AppComponent]
})
export class AppModule { }
