import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-component-portfolio-form',
  templateUrl: './portfolio-form.component.html',
  styleUrls: ['./portfolio-form.component.scss']
})
export class PortfolioFormComponent implements OnInit {

  @ViewChild('htmlData') htmlData:ElementRef;

  USERS = [
    {
      "id": 1,
      "carrera": "TECNOLOGÍA EN DESARROLLO DE SOFTWARE",
      "asignatura": "Base de Datos",
      "codigo": "IS644-BaseD-58562",
      "docente": "Mauricio Tamayo"
    },
    {
      "id": 2,
      "carrera": "TECNICO SUPERIOR EN GUIANZA TURISTICA CON MENCION EN PATRIMONIO CULTURAL O AVITURISMO",
      "asignatura": "Estadística",
      "codigo": "ET859-Esta-58963",
      "docente": "Carlos Yánez"
    },
    {
      "id": 3,
      "carrera": "DISEÑO DE MODAS CON NIVEL EQUIVALENTE A TECNOLOGÍA SUPERIOR",
      "asignatura": "Diseño",
      "codigo": "DM859-DIS-58963",
      "docente": "Javier Zapater",
    },
    {
      "id": 4,
      "carrera": "TECNOLOGIA SUPERIOR EN MARKETING",
      "asignatura": "Probabilidad y Estadística",
      "codigo": "PE859-PRO-ESTA-58963",
      "docente": "Mónica Alvarez"
    },
    {
      
      "id": 5,
      "carrera": "GUIA NACIONAL DE TURISMO CON NIVEL EQUIVALENTE A TECNOLOGIA SUPERIOR",
      "asignatura": "GUIA TURISTICA",
      "codigo": "GT859-TURIS-58963",
      "docente": "Fabian Obando"
    },
    {
      "id": 6,
      "carrera": "TECNOLOGIA SUPERIOR EN CONTROL DE INCENDIOS Y OPERACIONES DE RESCATE",
      "asignatura": "PRIMEROS AUXILIOS",
      "codigo": "PA859-AUX-58963",
      "docente": "Steven Morales"
    }
  ];
  constructor() { }

  ngOnInit() {

   
  }

// tslint:disable-next-line:typedef
public downloadPDF() {
  const DATA = document.getElementById('htmlData');
  const doc = new jsPDF('p', 'pt', 'a4');
  const options = {
    background: 'white',
    scale: 3
  };
  html2canvas(DATA, options).then((canvas) => {

    const img = canvas.toDataURL('image/PNG');

    // Add image Canvas to PDF
    const bufferX = 15;
    const bufferY = 15;
    const imgProps = (doc as any).getImageProperties(img);
    const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
    return doc;
  }).then((docResult) => {
    docResult.save(`${new Date().toTimeString()}_Pea.pdf`);
  });
}

 
}
