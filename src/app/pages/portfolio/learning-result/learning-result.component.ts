import { Catalogue } from './../../../models/app/catalogue';

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'src/app/services/app/message.service';
import { PortfolioHttpService } from 'src/app/services/portfolio/portfolio-http.service';
import { Paginator } from 'src/app/models/setting/paginator';
import { HttpParams } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { LearningResult } from 'src/app/models/portfolio/learningResult';
import { SelectItem } from 'primeng/api/selectitem';
import { AppHttpService } from 'src/app/services/app/app-http.service';

@Component({
  selector: 'app-component-learning-result',
  templateUrl: './learning-result.component.html',
  styleUrls: ['./learning-result.component.scss']
})
export class LearningResultComponent implements OnInit {

  //variables Learning Result
  paginator: Paginator;
  learningResults: LearningResult[];
  formLearning: FormGroup;
  learningResultDialog: boolean;
  flagSkeletonListlearningResults: boolean;
  flagLearningResults: boolean;
  


  constructor(private formBuilder: FormBuilder,
    private spinnerService: NgxSpinnerService,
    private appHttpService: AppHttpService,
    private portfolioHttpService: PortfolioHttpService,
    public messageService: MessageService,) {

    this.paginator = { current_page: 1, per_page: 5 };
    this.learningResults = [];
    
  }

  ngOnInit(): void {
    this.getLearningResults(this.paginator);
    this.buildFormLearningResult();
   
  }


  // Build form LearningResult

  buildFormLearningResult() {
    this.formLearning = this.formBuilder.group({
      id: [null],
      //parent_id: [null],
      code: [null, [Validators.required]],
      description: [null, [Validators.required]],
      type: [null, [Validators.required]],
      
    });
  }

  getLearningResults(paginator: Paginator) {
    const params = new HttpParams()
      .append('page', paginator.current_page.toString())
      .append('per_page', paginator.per_page.toString());

    this.flagSkeletonListlearningResults = true;
    this.portfolioHttpService.get('learning-results', params).subscribe(
      response => {
        this.flagSkeletonListlearningResults = false;
        this.learningResults = response['data'];

        console.log(this.learningResults);
        console.log("prueba que llega aqui obteniendo la data en la tabla getlearnigresults");
        this.paginator = response as Paginator;
      }, error => {
        this.flagSkeletonListlearningResults = false;
        this.messageService.error(error);
      });
  }

  

}

