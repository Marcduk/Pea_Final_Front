import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-component-portfolio-form',
  templateUrl: './portfolio-form.component.html',
  styleUrls: ['./portfolio-form.component.css']
})
export class PortfolioFormComponent implements OnInit {

  @Input() envio6: any;

  constructor() { }

  ngOnInit() {

    console.log(this.envio6)
  }

}
