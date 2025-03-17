import { EXTRACT } from './modules/transfer/page/visualize-tansfer/extract.routing';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'transfer',
    pathMatch: 'full'
  },
  /* APLICANDO O LAZY LOADING MODULE */
  {
    path: 'transfer',
    loadChildren: () => import('./modules/transfer/page/transfer-schedule/transfer.module').then(
      (m) => m.TransferModule
    ),
  },
  {
    path: 'extract',
    loadChildren: () => import('./modules/transfer/page/visualize-tansfer/extract.module').then(
      (m) => m.ExtractModule
    ),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
