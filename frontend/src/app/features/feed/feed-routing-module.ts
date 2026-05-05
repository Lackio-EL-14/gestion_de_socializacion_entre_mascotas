import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedHome } from './feed-home/feed-home';
import { Filtros } from './feed-filtros/filtros';
import { ChoosePetComponent } from './choose-pet/choose-pet';

const routes: Routes = [
  { path: '', component: ChoosePetComponent },
  { path: 'home/:idMascota', component: FeedHome },
  { path: 'filtros', component: Filtros }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedRoutingModule {}
