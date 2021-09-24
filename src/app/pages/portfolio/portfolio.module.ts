
import { BibliographyComponent } from './bibliography/bibliography.component';
import { ProfileCareerLearningComponent } from './profile-career-learning/profile-career-learning.component';
import { StrategyMethodologicalComponent } from './strategy-methodological/strategy-methodological.component';
import { ContentSubjectComponent } from './content-subject/content-subject.component';


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioComponent } from './portfolio.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';


//primeNG

import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { RouterModule } from '@angular/router';
import { TabMenuModule } from 'primeng/tabmenu';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import {MenubarModule} from 'primeng/menubar';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {PaginatorModule} from 'primeng/paginator';
import {TreeModule} from 'primeng/tree';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {KeyFilterModule} from 'primeng/keyfilter';
import {InputNumberModule} from 'primeng/inputnumber';
import {TableModule} from 'primeng/table';


import {SkeletonModule} from 'primeng/skeleton';
import {StepsModule} from 'primeng/steps';
import {InputTextModule} from 'primeng/inputtext';
import { PortfolioRoutes } from './portfolio.routing';
import { CardModule } from 'primeng/card';
import { PortfolioFormComponent } from './portfolio-form/portfolio-form.component';
import {TabViewModule} from 'primeng/tabview';
import { SubjectInformationComponent } from './subject-information/subject-information.component';
import {ToolbarModule} from 'primeng/toolbar';
import { LearningResultFormComponent } from './learning-result/learning-result-form/learning-result-form.component';
import { LearningResultListComponent } from './learning-result/learning-result-list/learning-result-list.component';
import { LearningResultComponent } from './learning-result/learning-result.component';





@NgModule({
  declarations: [
    PortfolioComponent,
    
    ContentSubjectComponent,
    StrategyMethodologicalComponent,
    ProfileCareerLearningComponent,
    BibliographyComponent,
    PortfolioFormComponent,
    SubjectInformationComponent,
    LearningResultComponent,
    LearningResultListComponent,
    LearningResultFormComponent,

    


  ],
  imports: [

    CommonModule,
    RouterModule.forChild(PortfolioRoutes),
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    DropdownModule,
    TooltipModule,
    AutoCompleteModule,
    ToastModule,
    DialogModule,
    TooltipModule,
    RippleModule,
    TabMenuModule,
    StepsModule,
    MenubarModule,
    InputTextareaModule,
    InputTextModule,
    CardModule,
    ButtonModule,
    TabViewModule,
    ToolbarModule,
    SkeletonModule,
    ConfirmDialogModule,
    PaginatorModule,
    TreeModule,
    OverlayPanelModule,
    KeyFilterModule,
    InputNumberModule,
    TableModule,
    
  ],

  

  
  providers: [MessageService]

})
export class PortfolioModule { }
