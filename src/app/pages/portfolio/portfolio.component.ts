

import { Component, OnInit } from '@angular/core';
import { City } from 'src/app/models/portfolio/city';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuItem } from 'primeng/api';


//portfolio
import { Paginator } from 'src/app/models/setting/paginator';
import { Subject } from 'src/app/models/app/subject';
import { PortfolioHttpService } from 'src/app/services/portfolio/portfolio-http.service';

import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from '../shared/services/message.service';
import { MessageService as MessagePnService } from 'primeng/api';
import { HttpParams } from '@angular/common/http';
import { SelectItem } from 'primeng/api';
import { AppHttpService } from 'src/app/services/app/app-http.service';



@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
  providers: [AppHttpService]
})

export class PortfolioComponent implements OnInit {

  //variables portfolio
  paginator: Paginator;
  subjects: SelectItem[];
  subject: Subject[];
  displayPageName: string;
  selectedSubject: Subject = { id: 0, description: '' }; //oro

  NavegarMenu: MenuItem[];
  activeItem: MenuItem;


  constructor(private spinnerService: NgxSpinnerService,
    public messageService: MessageService,
    private appHttpService: AppHttpService,
  ) {


    this.paginator = { current_page: 1, per_page: 2 };
    this.subjects = [];
    this.subject = [];

    this.NavegarMenu = [
      {
        label: 'Sílabo',
        escape: false,
        command: (onclick) => this.displayPageName = 'studentPage',
        icon: 'pi pi-fw pi-file',
        items: [
          {
            label: 'Crear nuevo Sílabo',
            icon: 'pi pi-fw pi-plus',
            items: [
            ]
          },
        ]
      },

      { label: 'Pre-Requisitos', icon: 'pi pi-fw pi-calendar' },
      { label: 'Descripción de la Asignatura', icon: 'pi pi-fw pi-pencil' },
      { label: 'Objetivo general', icon: 'pi pi-fw pi-file' },
      { label: 'Resultados de Aprendizaje', icon: 'pi pi-fw pi-cog' }


    ];

    this.activeItem = this.NavegarMenu[0];

    

  }

  ngOnInit() {
    this.getAsignatures(this.paginator);
}


  // subjects of backend

  getAsignatures(paginator: Paginator) {
    const params = new HttpParams()
      .append('page', paginator.current_page.toString())
      .append('per_page', paginator.per_page.toString());

    //this.spinnerService.show(); //trae el logo del instituto
    this.appHttpService.getSubject('subjects').subscribe(
      response => {

        //this.messageService.success(response);
        this.subjects = response['data'];
        console.log(response);
        this.paginator = response as Paginator;
      }, error => {
        this.messageService.error(error);
      });
  }


}
