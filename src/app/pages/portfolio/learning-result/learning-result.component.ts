import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-component-learning-result',
  templateUrl: './learning-result.component.html',
  styleUrls: ['./learning-result.component.css']
})
export class LearningResultComponent implements OnInit {

  @Input() envio: any;


  constructor() { }

  ngOnInit() {

    console.log(this.envio)
  }

}
