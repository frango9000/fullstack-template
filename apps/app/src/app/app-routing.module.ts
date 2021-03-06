import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const loadCoreModule = () => import('@app/ui/core').then((m) => m.CoreModule);

const routes: Routes = [
  {
    path: '',
    loadChildren: loadCoreModule,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
