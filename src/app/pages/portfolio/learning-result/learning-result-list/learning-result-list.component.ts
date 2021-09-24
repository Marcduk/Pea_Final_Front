

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LearningResult } from 'src/app/models/portfolio/learningResult';
import { MessageService } from 'src/app/pages/shared/services/message.service';
import { Paginator } from 'src/app/models/setting/paginator';
import { Col } from 'src/app/models/setting/col';
import { NgxSpinnerService } from 'ngx-spinner';
import { PortfolioHttpService } from 'src/app/services/portfolio/portfolio-http.service';
import { HttpParams } from '@angular/common/http';

@Component({
    selector: 'app-learning-result-list',
    templateUrl: './learning-result-list.component.html',
    styleUrls: ['./learning-result-list.component.scss']
})
export class LearningResultListComponent implements OnInit {

    @Input() flagLearningResults: boolean;
    @Input() learningResultsIn: LearningResult[];
    @Input() paginatorIn: Paginator;
    @Input() formLearningResultIn: FormGroup;
    @Input() displayIn: boolean;
    @Output() learningResultsOut = new EventEmitter<LearningResult[]>();
    @Output() formLearningResulOut = new EventEmitter<FormGroup>();
    @Output() displayOut = new EventEmitter<boolean>();
    @Output() paginatorOut = new EventEmitter<Paginator>();
    

    selectedLearningResults: any[];
    selectedLearningResult: LearningResult;
    paginator: Paginator;
    colsLearningResult: Col[];


    constructor(public messageService: MessageService,
        private spinnerService: NgxSpinnerService,
        private portfolioHttpService: PortfolioHttpService) {
        this.resetPaginator();
    }

    resetPaginator() {
        this.paginator = { current_page: 1, per_page: 5 };
    }

    ngOnInit(): void {
        this.loadColsLearningResult();
    }

    // Columns table revisar**************************************************************
    loadColsLearningResult() {
        this.colsLearningResult = [
            { field: 'type', header: 'Tipo' },
            { field: 'code', header: 'Código' },
            { field: 'description', header: 'Descripción' },
        ];
    }

    // Buscar Resultados de aprendizaje

    searchLearningResults(event, search) {
        if (event.type === 'click' || event.keyCode === 13 || search.length === 0) {
            const params = search.length > 0 ? new HttpParams().append('search', search) : null;
            this.spinnerService.show();
            this.portfolioHttpService.get('learning-results', params).subscribe(response => {
                this.learningResultsIn = response['data'],
                    this.spinnerService.hide();
            }, error => {
                this.spinnerService.hide();
                this.messageService.error(error);
            });
        }
    }

    openNewFormLearningResult() {
        this.formLearningResultIn.reset();
        //this.formLearningResultIn.patchValue({ type: this.formLearningResultIn.value });
        this.formLearningResulOut.emit(this.formLearningResultIn);
        this.displayOut.emit(true);
    }

    

    openEditFormLearningResult(learningResult: LearningResult) {
        this.formLearningResultIn.patchValue(learningResult);
        this.formLearningResulOut.emit(this.formLearningResultIn);
        this.displayOut.emit(true);
    }


    selectLearningResult(learningResult: LearningResult) {
        this.selectedLearningResult = learningResult;
    }



    pageChange(event) {
        this.paginatorIn.current_page = event.page + 1;
        this.paginatorOut.emit(this.paginatorIn);
    }

    deleteLearningResults(learningResult = null) {
        this.messageService.questionDelete({})
            .then((result) => {
                if (result.isConfirmed) {
                    if (learningResult) {
                        this.selectedLearningResults = [];
                        this.selectedLearningResults.push(learningResult);
                    }                    
                    const ids = this.selectedLearningResults.map(element => element.id);
                    this.spinnerService.show();
                    //this.portfolioHttpService.delete('learning-results/delete/id') //,ids  pregunta
                    this.portfolioHttpService.delete('learning-results/delete/id')
                        .subscribe(response => {
                            this.spinnerService.hide();
                            this.messageService.success(response);
                            this.removeLearningResults(ids);
                            this.selectedLearningResults = [];
                        }, error => {
                            this.spinnerService.hide();
                            this.messageService.error(error);
                        });
                }
            });
    }

    removeLearningResults(ids) {
        for (const id of ids) {
            this.learningResultsIn = this.learningResultsIn.filter(element => element.id !== id);
        }
        this.learningResultsOut.emit(this.learningResultsIn);
    }

}
