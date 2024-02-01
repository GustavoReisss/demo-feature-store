import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './shared/layouts/default-layout/default-layout.component';

export const routes: Routes = [
    {
        path: 'consulta',
        component: DefaultLayoutComponent,
        loadChildren: () => import('./modules/consulta/consulta.routes').then(r => r.routes)
    }
];
