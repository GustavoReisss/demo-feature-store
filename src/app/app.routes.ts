import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './shared/layouts/default-layout/default-layout.component';

export const routes: Routes = [
    {
        path: 'consulta',
        component: DefaultLayoutComponent,
        loadChildren: () => import('./modules/consulta/consulta.routes').then(r => r.routes)
    },
    {
        path: 'feature',
        component: DefaultLayoutComponent,
        children: [
            {
                path: '',
                loadComponent: () => import('./modules/feature/feature.component').then(c => c.FeatureComponent)
            }
        ]
    },
    {
        path: 'tabela',
        component: DefaultLayoutComponent,
        children: [
            {
                path: '',
                loadComponent: () => import('./modules/tabela/tabela.component').then(c => c.TabelaComponent)
            }
        ]
    },
    {
        path: '',
        redirectTo: 'consulta',
        pathMatch: 'full'
    }
];
