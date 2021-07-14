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
import { MessageService } from '../shared/services/message.service';
import { MessageService as MessagePnService } from 'primeng/api';
import { HttpParams } from '@angular/common/http';
import { SelectItem } from 'primeng/api';
import { AppHttpService } from 'src/app/services/app/app-http.service';
import { debounceTime } from 'rxjs/operators';
import { Subject } from '../../models/app/subject';
import { AuthHttpService } from 'src/app/services/auth/auth-http.service';
import { FormularioPdfs } from 'src/app/models/portfolio/FormularioPdfs';



@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
  providers: [AppHttpService, PortfolioHttpService]
})

export class PortfolioComponent implements OnInit {

  //variables portfolio
  paginator: Paginator;

  //Obtener Carrera
  careers: SelectItem[];
  career: Career[];
  selectedCareer: Career = { id: 0, name: '' }; //oro

  //obtener periodos Academicos
  academics: SelectItem[];
  academic: AcademicPeriod[];
  selectedAcademic: AcademicPeriod = { id: 0, code: '' }; //oro

  //obtener Periodos Lectivos
  periods: SelectItem[];
  period: SchoolPeriod[];
  selectedPeriod: SchoolPeriod = { id: 0, code: '' }; //oro

  //obtener Modalidad
  modalities: SelectItem[];
  modality: Catalogue[];
  selectedModality: Catalogue = { id: 0, code: '' }; //oro ********************************de donde recupero????

  //obtener asignatura
  subjects: SelectItem[];
  subject: Subject[];
  selectedSubject: Subject = { id: 0, description: '' }; //oro

  //obtener codigo asignatura
  codes: SelectItem[];
  code: Subject[];
  selectedCode: Subject = { id: 0, objective: '' }; //oro

  //obtener usuarios
  users: SelectItem[];
  user: User[];
  selectedUser: User = { id: 0, first_name: '' }; //oro

  displayPageName: string;


  NavegarMenu: MenuItem[];
  activeItem: MenuItem;

  @ViewChild('menuItems') menu: MenuItem[];
  @ViewChild('myname') myInput;

  //variables formulario
  formAsignature: FormGroup;

  //en model llamaba al modelo FormularioPdfs es decir model: FormularioPdfs ={}
  model = {
    name: '',
    code: '',
    school_period: '',
    modality: '',
    selectedSubject: '',
    code_subject: '',
    teaching_hours: '',
    practical_hours: '',
    autonomous_hours: '',
    total_hours: '',
    user: '',
    description: '',
    objective: ''
  }

  menus = {
    informacion: true,
    resultado: false,
    contenido: false,
    estrategia: false,
    relacionAsignatura: false,
    bibliografia: false,
    formulario: false,
  }

  variables = {
    informacion: 1,
    resultado: 2,
    contenido: 3,
    estrategia: 4,
    relacionAsignatura: 5,
    bibliografia: 6,
    formulario: 7,
  }



  constructor(private spinnerService: NgxSpinnerService,
    public messageService: MessageService,
    private appHttpService: AppHttpService,
    private formBuilder: FormBuilder,
    private portfolioHttpService: PortfolioHttpService,
    private authHttpService: AuthHttpService,
    private api: ApiService
  ) {


    this.paginator = { current_page: 1, per_page: 2 };
    this.subjects = [];
    this.subject = [];

    this.careers = [];
    this.career = [];

    this.users = [];
    this.user = [];


    this.academics = [];
    this.academic = [];


    this.periods = [];
    this.period = [];


    this.modalities = [];
    this.modality = [];

    this.codes = [];
    this.code = [];

    this.users = [];
    this.user = [];


    this.NavegarMenu = [
      { label: 'Información General de la asignatura', icon: 'pi pi-fw pi-file', command: () => this.setMenu(1) },
      { label: 'Resultados de Aprendizaje de la Asignatura:', icon: 'pi pi-fw pi-calendar', command: () => this.setMenu(2) },
      { label: 'Contenidos de la Asignatura', icon: 'pi pi-fw pi-pencil', command: () => this.setMenu(3) },
      { label: 'Estratégias Metodológicas', icon: 'pi pi-fw pi-file', command: () => this.setMenu(4) },
      { label: 'Perfil de Egreso de la Carrera', icon: 'pi pi-fw pi-cog', command: () => this.setMenu(5) },
      { label: 'Bibliografía', icon: 'pi pi-fw pi-cog', command: () => this.setMenu(6) },
      { label: 'Formulario', icon: 'pi pi-fw pi-cog', command: () => this.setMenu(7) }
    ];

    this.activeItem = this.NavegarMenu[0];


  }

  ngOnInit() {
    this.getAsignatures(this.paginator);
    this.getCareer(this.paginator);
    //this.buildFormAsignature();
    this.getContent();
    this.getAcademic(this.paginator);
    this.getPeriod(this.paginator);
    this.getCodeSubject(this.paginator);
    this.getUser(this.paginator);
    this.getModality(this.paginator);

    this.initForm();
  }
  getAcademic(paginator: Paginator) {
    //this.spinnerService.show(); //trae el logo del instituto
    const params = new HttpParams()
      .append('page', paginator.current_page.toString())
      .append('per_page', paginator.per_page.toString());
    this.appHttpService.getAcademic('academics').subscribe(
      response => {
        //this.messageService.success(response);
        this.academics = response['data'];
        console.log(response + "Obtengo periodos Académicos");
        this.paginator = response as Paginator;


      }, error => {
        this.messageService.error(error);
      });
  }

  getModality(paginator: Paginator) {
    //this.spinnerService.show(); //trae el logo del instituto
    const params = new HttpParams()
      .append('page', this.paginator.current_page.toString())
      .append('per_page', this.paginator.per_page.toString());
    this.appHttpService.getAcademic('modalities').subscribe(
      response => {
        //this.messageService.success(response);
        this.modalities = response['data'];
        console.log(response + "Obtengo la modalidad");
        this.paginator = response as Paginator;


      }, error => {
        this.messageService.error(error);
      });
  }


  getPeriod(paginator: Paginator) {
    //this.spinnerService.show(); //trae el logo del instituto
    const params = new HttpParams()
      .append('page', this.paginator.current_page.toString())
      .append('per_page', this.paginator.per_page.toString());
    this.appHttpService.getPeriod('periods').subscribe(
      response => {
        //this.messageService.success(response);
        this.periods = response['data'];
        console.log(response + "Obtengo periodos lectivos");
        this.paginator = response as Paginator;


      }, error => {
        this.messageService.error(error);
      });
  }
  getCodeSubject(paginator: Paginator) {
    //this.spinnerService.show(); //trae el logo del instituto
    const params = new HttpParams()
      .append('page', this.paginator.current_page.toString())
      .append('per_page', this.paginator.per_page.toString());
    this.appHttpService.getCodeSubject('subjects').subscribe(
      response => {
        //this.messageService.success(response);
        this.subjects = response['data'];
        console.log(response + "Código de la asignatura");
        this.paginator = response as Paginator;


      }, error => {
        this.messageService.error(error);
      });
  }
  //first_name
  getUser(paginator: Paginator) {
    //this.spinnerService.show(); //trae el logo del instituto
    const params = new HttpParams()
      .append('page', this.paginator.current_page.toString())
      .append('per_page', this.paginator.per_page.toString());
    this.authHttpService.getUser('users').subscribe(
      response => {
        //this.messageService.success(response);
        this.users = response['data'];
        console.log(response + "Obtengo usuariosDocente");
        this.paginator = response as Paginator;


      }, error => {
        this.messageService.error(error);
      });
  }

  activateMenu() {
    this.activeItem = this.menu['activeItem'];
  }

  // subjects of backend

  getAsignatures(paginator: Paginator) {
    //this.spinnerService.show(); //trae el logo del instituto
    const params = new HttpParams()
      .append('page', paginator.current_page.toString())
      .append('per_page', paginator.per_page.toString());
    this.appHttpService.getSubject('subjects').subscribe(
      response => {
        //this.messageService.success(response);
        this.subjects = response['data'];
        console.log(response + "Obtengo asignaturas");
        this.paginator = response as Paginator;


      }, error => {
        this.messageService.error(error);
      });
  }


  getCareer(paginator: Paginator) {
    //this.spinnerService.show(); //trae el logo del instituto
    const params = new HttpParams()
      .append('page', paginator.current_page.toString())
      .append('per_page', paginator.per_page.toString());
    this.appHttpService.getCarrer('careers').subscribe(
      response => {
        //this.messageService.success(response);
        this.careers = response['data'];
        console.log(response + "Obtengo carreras");
        this.paginator = response as Paginator;
      }, error => {
        this.messageService.error(error);
      });
  }

  getContent() {
    this.api.get("contents").subscribe(
      (res: any) => {
        const datos = res.data[0];
        console.log(datos + "obtengo horas teaching autonomus y practical");
        this.formAsignature.controls['teaching_hours'].setValue(datos.teaching_hours);
        this.formAsignature.controls['autonomous_hours'].setValue(datos.autonomous_hours);
        this.formAsignature.controls['practical_hours'].setValue(datos.practical_hours);

        const total = parseFloat(datos.teaching_hours) + parseFloat(datos.autonomous_hours) + parseFloat(datos.practical_hours);
        this.formAsignature.controls['total_hours'].setValue(total);
      },
      err => {
        console.log(err);
      }
    );
  }


  initForm() {

    this.formAsignature = this.formBuilder.group({
      name: [this.model.name, Validators.required],
      code: [this.model.code, [Validators.required]],
      school_period: [this.model.school_period, [Validators.required]],
      modality: [this.model.modality, [Validators.required]],
      selectedSubject: [this.model, [Validators.required]],
      code_subject: [this.model.code_subject, [Validators.required]],
      teaching_hours: [this.model.teaching_hours, [Validators.required]],
      autonomous_hours: [this.model.autonomous_hours, [Validators.required]],
      practical_hours: [this.model.practical_hours, [Validators.required]],
      total_hours: [this.model.total_hours, [Validators.required]],
      user: [this.model.user, [Validators.required]],
      description: [this.model.description, [Validators.required]],
      objective: [this.model.objective, [Validators.required]],
    });
  }

  onReset() {
    this.formAsignature.reset();
    this.initForm();
  }


  //Formulario Asignaturas

 /*  buildFormAsignature() {
    this.formAsignature = this.formBuilder.group({
      //app.careers = carrera no tengo la FK pero si existen asiq ue no puedo crear otro builder
      name: [null, [Validators.required]],

      //app.academic_periods = Período académico: no tengo la FK pero si existen asiq ue no puedo crear otro builder
      code: [null, [Validators.required]],

      //portafolio.peas = Período lectivo:
      school_period: [null, [Validators.required]],

      //app.careers = Modalidad : no tengo la FK pero si existen asiq ue no puedo crear otro builder
      modality: [null, [Validators.required]],

      //portafolio.peas = Nombre asignatura: le tomo como descripcion al traer datos del nombre
      selectedSubject: [null, [Validators.required]],

      //portafolio.peas = codigo asignatura:pregunta qeu pasa si debo traer dos objetos de las misma tabla? subject 2??
      code_subject: [null, [Validators.required]],


      //Unidad de Organización Curricular: PENDIENTE***************
      //Campo de Formación:PENDIENTE***************


      //Distribución de horas en las actividades de aprendizaje: SUMAS de que viene de la malla curricular
      //portfolio contents = Docencia 
      teaching_hours: [null, [Validators.required]],

      //portfolio contents =Trabajo Autónomo:
      autonomous_hours: [null, [Validators.required]],

      //portfolio contents =Prácticas Aprendizaje:
      practical_hours: [null, [Validators.required]],

      //suma de las anteriores = N° total de horas asignatura: no existe campo
      total_hours: [null, [Validators.required]],

      //portafolio.peas = Docente responsable de la asignatura:
      user: [null, [Validators.required]],

      description: [null, [Validators.required]],

      objective: [null, [Validators.required]],

    });

    this.formAsignature.valueChanges
      .pipe(
        debounceTime(500)
      )
      .subscribe(
        value => {
          console.log(value + "tiempo formulario");
        }
      );
  } */


  //getter

  get nameField() {
    return this.formAsignature.get('name');
  }
  get academicField() {
    return this.formAsignature.get('code');
  }
  get schoolPeriodField() {
    return this.formAsignature.get('school_period');
  }
  get modalityField() {
    return this.formAsignature.get('modality');
  }
  get selectedSubjectField() {
    return this.formAsignature.get('selectedSubject');
  }
  get code_subjectField() {
    return this.formAsignature.get('code_subject');
  }
  get teachingHoursField() {
    return this.formAsignature.get('teaching_hours');
  }
  get autonomousHoursField() {
    return this.formAsignature.get('autonomous_hours');
  }
  get practicalHoursField() {
    return this.formAsignature.get('practical_hours');
  }
  get totalHoursField() {
    return this.formAsignature.get('total_hours');
  }
  get userField() {
    return this.formAsignature.get('user');
  }
  get descriptionField() {
    return this.formAsignature.get('description');
  }
  get objectiveField() {
    return this.formAsignature.get('objective');
  }


  markAllAsTouchedFormCompany() {
    this.formAsignature.markAllAsTouched();
  }

  /* onSubmit(flag = false) {

    if (this.formAsignature.valid) {
      this.getCareer(this.formAsignature.value);
    } else {
      this.markAllAsTouchedFormCompany();
    }
  }
 */





  //Navegacion Pestañas
  //Validar 
  setMenu(menu) {
    if (menu === 1) {

      this.menus = {
        informacion: true,
        resultado: false,
        contenido: false,
        estrategia: false,
        relacionAsignatura: false,
        bibliografia: false,
        formulario: false
      }


    } else if (menu === 2) {
      if (this.validationMenuInformation()) {
        this.menus = {
          informacion: false,
          resultado: true,
          contenido: false,
          estrategia: false,
          relacionAsignatura: false,
          bibliografia: false,
          formulario: false
        }
      }

    } else if (menu === 3) {
      this.menus = {
        informacion: false,
        resultado: false,
        contenido: true,
        estrategia: false,
        relacionAsignatura: false,
        bibliografia: false,
        formulario: false
      }
    } else if (menu === 4) {
      this.menus = {
        informacion: false,
        resultado: false,
        contenido: false,
        estrategia: true,
        relacionAsignatura: false,
        bibliografia: false,
        formulario: false
      }
    } else if (menu === 5) {
      this.menus = {
        informacion: false,
        resultado: false,
        contenido: false,
        estrategia: false,
        relacionAsignatura: true,
        bibliografia: false,
        formulario: false
      }
    } else if (menu === 6) {
      this.menus = {
        informacion: false,
        resultado: false,
        contenido: false,
        estrategia: false,
        relacionAsignatura: false,
        bibliografia: true,
        formulario: false
      }
    } else if (menu === 7) {
      this.menus = {
        informacion: false,
        resultado: false,
        contenido: false,
        estrategia: false,
        relacionAsignatura: false,
        bibliografia: false,
        formulario: true
      }
    }
  }


  validationMenuInformation() {
    var datos = this.formAsignature.value;
    console.log(datos.name)
    if (datos.name == '' || datos.name == undefined || datos.name == null) {
      alert("Seleccione una carrera");
      return false;
    } else if (datos.code == '' || datos.code == undefined || datos.code == null) {
      alert("Seleccione un periodo académico");
      return false;
    } else if (datos.school_period == '' || datos.code == undefined || datos.code == null) {
      alert("Seleccione un periodo lectivo");
      return false;



    } else if (datos.selectedSubject == '' || datos.selectedSubject == undefined || datos.selectedSubject == null) {
      alert("Seleccione una asignatura");
      return false;
    } else if (datos.code_subject == '' || datos.code_subject == undefined || datos.code_subject == null) {
      alert("Seleccione una asignatura");
      return false;
    } else if (datos.user == '' || datos.user == undefined || datos.user == null) {
      alert("Seleccione un Docente respondable");
      return false;
    } else if (datos.description == '' || datos.description == undefined || datos.description == null) {
      alert("Ingresar descripción de la asignatura");
      return false;
    } else if (datos.objective == '' || datos.objective == undefined || datos.objective == null) {
      alert("Ingresar objetivo general");
      return false;
    } else {
      return true;
    }
  }
  element: HTMLElement;



  /* } else if (datos.modality == '' || datos.modality == undefined || datos.modality == null) {
     alert("Seleccione una modalidad");
     return false; */

  onSubmit() {
    // Default export is a4 paper, portrait, using millimeters for units
    const doc = new jsPDF();
    this.element = document.getElementById('prueba') as HTMLElement;
    //doc.text("Hola mundo ricks",10, 10);
    doc.save("asignature.pdf");

  }







  saveMenuInformation() {

  }

}






