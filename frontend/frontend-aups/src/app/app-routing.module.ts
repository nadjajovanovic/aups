import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MestaComponent } from './components/mesta/mesta.component';
import { PogonComponent } from './components/pogon/pogon.component';
import { RadnoMestoComponent } from './components/radno-mesto/radno-mesto.component';
import { SastojciComponent } from './components/sastojci/sastojci.component';
import { TransportComponent } from './components/transport/transport.component';
import { VrstaTransportaComponent } from './components/vrsta-transporta/vrsta-transporta.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'mesto', component: MestaComponent },
  { path: 'pogon', component: PogonComponent },
  { path: 'radno-mesto', component: RadnoMestoComponent },
  { path: 'sastojci', component: SastojciComponent },
  { path: 'vrsta-transporta', component: VrstaTransportaComponent },
  { path: 'transport', component: TransportComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
