import { formularioPdfs } from './../../../models/portfolio/formularioPdfs';


import { Career } from './../../../models/app/career';
import { Mesh } from './../../../models/app/mesh';

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppHttpService } from 'src/app/services/app/app-http.service';
import { PortfolioHttpService } from 'src/app/services/portfolio/portfolio-http.service';
import { Subject } from '../../../models/app/subject';
import { MessageService } from '../../shared/services/message.service';
import { SchoolPeriod } from 'src/app/models/app/school-period';
import { SelectItem } from 'primeng/api';
import { Paginator } from 'src/app/models/setting/paginator';
import { HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-subject-information',
  templateUrl: './subject-information.component.html',
  styleUrls: ['./subject-information.component.scss']
})
export class SubjectInformationComponent implements OnInit {


  selectedSubject: Subject;
  subjects: Subject[];
  selectedMesh: Mesh;

  user: FormGroup;
  
  disabled: boolean = true;

  

  activeIndex: number = 0;
  careers: Career [];
  career: Career;

  meshes: Mesh[];
  mesh: any;


//obtener Periodos Lectivos
periods: SelectItem[];
period: SchoolPeriod[];
selectedPeriod: SchoolPeriod = { id: 0, code: '' }; //oro

 //variables portfolio
 paginator: Paginator;


  


  constructor(private portfolioHttpService: PortfolioHttpService,
    private appHttpService: AppHttpService,
    public messageService: MessageService,
  ) {

    this.careers = [];
    this.meshes = [];
   
    this.periods = [];
    this.period = [];


  }

  ngOnInit() {
    this.getSubjects();

    this.getPeriod(this.paginator);
    
    this.user = new FormGroup({
      name: new FormControl('', [Validators.required]),      
      selectedSubject: new FormControl('', Validators.required)
        
     
    });
  }

  getPeriod(paginator: Paginator) {
    
    const params = new HttpParams()      
    this.appHttpService.getPeriod('periods').subscribe(
      response => {        
        this.periods = response['data'];
        console.log(response + "Obtengo periodos lectivos");
        this.paginator = response as Paginator;
      }, error => {
        this.messageService.error(error);
      });
  }

  

  getSubjects() {    
    this.portfolioHttpService.get('pea/teachers/subjects').subscribe(
      response => {
        this.subjects = response['data'];
        console.log(response + "llega obtener asignaturas");

      }, error => {
        this.messageService.error(error);
      });
  }

  getMeshes() {
    this.appHttpService.getMeshes(3).subscribe(
      response => {
        this.careers = response['data'];
        console.log(response + "Obtengo carreras");


      }, error => {
        this.messageService.error(error);
      });
  }

 
  onSubmit({ value, valid }: { value: formularioPdfs, valid: boolean }) {
    console.log(value, valid);
  }


  clear() {
    var datos = this.user.value;
    console.log(datos.name)
    if (datos.name == '' || datos.name == undefined || datos.name == null) {
      alert("Seleccione una carrera");
      return false;
    } else if (datos.selectedSubject == '' || datos.selectedSubject == undefined || datos.selectedSubject == null) {
      alert("Seleccione una asignatura");
      return false;
    } 
    console.log("clear clicked")
    this.user.reset();
  }


  
  }



