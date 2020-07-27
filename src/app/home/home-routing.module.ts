import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { HomeGuard } from '../guards/home.guard';
import { TokenResolver } from '../resolvers/token.resolver';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    canActivate: [HomeGuard],
    resolve: {
      token: TokenResolver
    },
    children: [
      {
        path: '',
        redirectTo: 'promotions',
        pathMatch: 'full'
      },
      {
        path: 'promotions',
        loadChildren: () => import('../pages/promotions/promotions.module')
          .then(m => m.PromotionsPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
