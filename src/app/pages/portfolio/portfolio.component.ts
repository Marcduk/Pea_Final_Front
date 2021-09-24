import { Signature } from './../../models/portfolio/signature';
import { Content } from './../../models/portfolio/content';
import { Catalogue } from './../../models/app/catalogue';
import { AcademicPeriod } from './../../models/app/academic-period';
import { AppCodeComponent } from './../../shared/components/code/app.code.component';
import { User } from './../../models/auth/user';
import { ApiService } from './../../services/api/api.service';
import { Career } from './../../models/app/career';
import { SchoolPeriod } from './../../models/app/school-period';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { jsPDF } from "jspdf";
import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';



import { Paginator } from 'src/app/models/setting/paginator';

import { PortfolioHttpService } from 'src/app/services/portfolio/portfolio-http.service';

import { NgxSpinnerService } from 'ngx-spinner';

import { MessageService as MessagePnService } from 'primeng/api';
import { HttpParams } from '@angular/common/http';
import { SelectItem } from 'primeng/api';
import { AppHttpService } from 'src/app/services/app/app-http.service';
import { debounceTime } from 'rxjs/operators';
import { Subject } from '../../models/app/subject';
import { AuthHttpService } from 'src/app/services/auth/auth-http.service';

import { MessageService } from '../shared/services/message.service';



@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
  
})

export class PortfolioComponent implements OnInit {

  activeIndex: number = 0;
  

  constructor( ) {


  }

  ngOnInit() {
    
        
  }




}






