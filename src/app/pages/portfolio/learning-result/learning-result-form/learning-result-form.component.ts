import { Catalogue } from './../../../../models/app/catalogue';

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'src/app/pages/shared/services/message.service';

import { Paginator } from 'src/app/models/setting/paginator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService as MessagePnService, SelectItem } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { SharedService } from 'src/app/pages/shared/services/shared.service';
import { PortfolioHttpService } from 'src/app/services/portfolio/portfolio-http.service';
import { LearningResult } from 'src/app/models/portfolio/learningResult';
import { HttpParams } from '@angular/common/http';
import { AppHttpService } from 'src/app/services/app/app-http.service';


@Component({
    selector: 'app-learning-result-form',
    templateUrl: './learning-result-form.component.html',
    styleUrls: ['./learning-result-form.component.scss']
})
export class LearningResultFormComponent implements OnInit {


    @Input() formLearningResultIn: FormGroup;
    @Input() learningResultsIn: LearningResult[];
    @Output() learningResultsOut = new EventEmitter<LearningResult[]>();
    @Output() displayOut = new EventEmitter<boolean>();
    @Output() paginatorAdd = new EventEmitter<number>();
    filteredTypes: any[];
    parentLearningResults: LearningResult[] = [];
    flagSkeletonListlearningResults: boolean;
    paginator: Paginator;

    formLearning: FormGroup;

    

    items: SelectItem[];


    headers: Catalogue[];
    selectedHeader: Catalogue;

    constructor(private formBuilder: FormBuilder,
        public messageService: MessageService,
        private messagePnService: MessagePnService,
        private spinnerService: NgxSpinnerService,
        private sharedService: SharedService,
        private appHttpService: AppHttpService,
        private portfolioHttpService: PortfolioHttpService) {

        
        this.paginator = { current_page: 1, per_page: 2 };

    }

    ngOnInit(): void {

        
        this.getHeaders();

    }

    // Fields of Form
    get idField() {
        return this.formLearningResultIn.get('id');
    }
    /* get parentField() {
        return this.formLearningResultIn.get('parent_id');
    } */
    get typeField() {
        return this.formLearningResultIn.get('type');
    }

    get codeField() {
        return this.formLearningResultIn.get('code');
    }
    get descriptionField() {
        return this.formLearningResultIn.get('description');
    }
    
    


    // Submit Form
    onSubmit(flag = false) {
        console.log("onsubmit");
        if (this.formLearningResultIn.valid) {
            if (this.idField.value) {
                this.updateLearningResult(this.formLearningResultIn.value);

                console.log("onsubmit2" + this.formLearningResultIn);
            } else {
                this.storeLearningResult(this.formLearningResultIn.value, flag);
            }
        } else {
            this.markAllAsTouchedFormLearningResult();
        }
    }

    

    // Save in backend
    storeLearningResult(learningResult: LearningResult, flag = false) {
        this.spinnerService.show();
        console.log('hola' + learningResult);
        this.portfolioHttpService.store('learning-results', { learningResult }).subscribe(
            response => {
                this.spinnerService.hide();
                this.messageService.success(response);
                this.saveLearningResult(response['data']);
                if (!flag) {
                    this.displayOut.emit(false);
                }
                this.resetFormLearningResult();
            }, error => {
                this.spinnerService.hide();
                this.messageService.error(error);
            });
    }

    // Save in backend
    updateLearningResult(learningResult: LearningResult) {
        console.log("estamos en update");
        this.spinnerService.show();
        this.portfolioHttpService.update('learning-results/' + learningResult.id, { learningResult })
            .subscribe(response => {
                this.spinnerService.hide();
                this.messageService.success(response);
                this.saveLearningResult(response['data']);
                this.displayOut.emit(false);
            }, error => {
                this.spinnerService.hide();
                this.messageService.error(error);
            });
    }

    // Save in frontend
    saveLearningResult(learningResult: LearningResult) {
        console.log(learningResult + 'asjdfasdjfnsadfnsaiodfnsdaf');
        const index = this.learningResultsIn.findIndex(element => element.id === learningResult.id);
        if (index === -1) {
            this.learningResultsIn.push(learningResult);
            this.paginatorAdd.emit(2);
        } else {
            this.learningResultsIn[index] = learningResult;
        }
        this.learningResultsOut.emit(this.learningResultsIn);
    }


    // Reset Forms
    resetFormLearningResult() {
        this.formLearningResultIn.reset();
    }

    // Mark as touched
    markAllAsTouchedFormLearningResult() {
        this.formLearningResultIn.markAllAsTouched();
    }


    getHeaders() {
        
        this.appHttpService.get('learning-results/headers').subscribe(
          response => {
            
            this.headers = response['data'];
            console.log(this.headers);
            console.log("obteniendo la data de los Headers");
    
          }, error => {
            this.messageService.error(error);
          });
      }

}
