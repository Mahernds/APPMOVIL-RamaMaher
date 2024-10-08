import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InformacionCuentaPage } from './informacion-cuenta.page';

const routes: Routes = [
  {
    path: '',
    component: InformacionCuentaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformacionCuentaPageRoutingModule {}
