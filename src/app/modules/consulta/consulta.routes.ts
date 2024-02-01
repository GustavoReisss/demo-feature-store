import { Routes } from '@angular/router';
import { ConsultaComponent } from './consulta.component';

export const routes: Routes = [
  {
    path: '',
    component: ConsultaComponent,
    children: [
      {
        path: 'feature',
        loadComponent: () => import("./features/feature/feature.component").then(c => c.FeatureComponent)
      },
      {
        path: 'tabela',
        loadComponent: () => import("./features/tabela/tabela.component").then(c => c.TabelaComponent)
      },
      {
        path: '',
        redirectTo: 'feature',
        pathMatch: 'full'
      }
    ]
  }
];
