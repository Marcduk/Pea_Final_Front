

// Angular Router
import {Routes} from '@angular/router';
import {AuthGuard} from '../../shared/guards/auth.guard';
import { PortfolioComponent } from './portfolio.component';



// My Components

export const PortfolioRoutes: Routes  = [
    {
        path: '',
        children: [
            {
                path: '',
                component: PortfolioComponent
            },

           
            
              /* {
                path: 'contenido-asignatura',
                
                loadChildren: () => import('./asignature/asignature.module').then(m => m.AsignatureModule),
                canActivate: [AuthGuard]
            },   */
            /* {
                path: 'web',
                loadChildren: () => import('./landing-page/landing-page.module').then(m => m.LandingPageModule),
            }, */
        ]
    }
];
