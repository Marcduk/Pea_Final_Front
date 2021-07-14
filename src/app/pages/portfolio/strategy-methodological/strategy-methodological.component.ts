import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-component-strategy-methodological',
  templateUrl: './strategy-methodological.component.html',
  styleUrls: ['./strategy-methodological.component.css']
})
export class StrategyMethodologicalComponent implements OnInit {

  @Input() envio3: any;

  constructor() { }

  ngOnInit() {
    console.log(this.envio3)

  }

}
