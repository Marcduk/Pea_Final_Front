import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-component-content-subject',
  templateUrl: './content-subject.component.html',
  styleUrls: ['./content-subject.component.css']
})
export class ContentSubjectComponent implements OnInit {

  @Input() envio2: any;

  constructor() { }

  ngOnInit() {

    console.log(this.envio2)
  }

}
