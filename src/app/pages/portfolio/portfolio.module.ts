import { BibliographyComponent } from './bibliography/bibliography.component';
import { ProfileCareerLearningComponent } from './profile-career-learning/profile-career-learning.component';
import { StrategyMethodologicalComponent } from './strategy-methodological/strategy-methodological.component';
import { ContentSubjectComponent } from './content-subject/content-subject.component';
import { LearningResultComponent } from './learning-result/learning-result.component';

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
import {MenuItem} from 'primeng/api';
import {StepsModule} from 'primeng/steps';
import {InputTextModule} from 'primeng/inputtext';
import { PortfolioRoutes } from './portfolio.routing';
import { CardModule } from 'primeng/card';
import { PortfolioFormComponent } from './portfolio-form/portfolio-form.component';





@NgModule({
  declarations: [
    PortfolioComponent,
    LearningResultComponent,
    ContentSubjectComponent,
    StrategyMethodologicalComponent,
    ProfileCareerLearningComponent,
    BibliographyComponent,
    PortfolioFormComponent

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
    ButtonModule
    
    
  ],

  exports:[
    PortfolioComponent,
    LearningResultComponent,
    ContentSubjectComponent,
    StrategyMethodologicalComponent,
    ProfileCareerLearningComponent,
    BibliographyComponent,
    PortfolioFormComponent,
  ], 

  
  providers: [MessageService]

})
export class PortfolioModule { }
