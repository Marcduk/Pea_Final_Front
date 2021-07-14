import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-component-bibliography',
  templateUrl: './bibliography.component.html',
  styleUrls: ['./bibliography.component.css']
})
export class BibliographyComponent implements OnInit {

  @Input() envio5: any;

  constructor() { }

  ngOnInit() {

    console.log(this.envio5)
  }

}
