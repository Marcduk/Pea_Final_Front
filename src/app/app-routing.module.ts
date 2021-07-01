import { Module } from './models/auth/module';
import { AsignatureModule } from './pages/portfolio/asignature/asignature.module';

import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// Application Components
import { AppMainComponent } from './shared/components/main/app.main.component';
import { AppBlankComponent } from './shared/components/blank/app.blank.component';

// Application Guards
import { AuthGuard } from './shared/guards/auth.guard';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppMainComponent,
                children: [
                    {path: '', redirectTo: 'crear-silabo', pathMatch: 'full'},
                    
                    {
                        path: 'crear-silabo',
                        loadChildren: () => import('./pages/portfolio/portfolio.module').then(m => m.PortfolioModule),
                        canActivate: [AuthGuard]
                    },
                     /*   {
                        path: 'contenido-asignatura',
                        loadChildren: () => import('./pages/portfolio/asignature/asignature.module').then(m => m.AsignatureModule)
                    },    */
                    {
                        path: 'dashboard',
                        loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
                        canActivate: [AuthGuard]
                    }
                ]
            },
            {
                path: 'auth',
                component: AppBlankComponent,
                loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
            },
            { path: '**', redirectTo: '/auth/not-found' },
        ], { scrollPositionRestoration: 'enabled' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
