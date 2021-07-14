import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-component-profile-career-learning',
  templateUrl: './profile-career-learning.component.html',
  styleUrls: ['./profile-career-learning.component.css']
})
export class ProfileCareerLearningComponent implements OnInit {

  @Input() envio4: any;

  constructor() { }

  ngOnInit() {

    console.log(this.envio4)
  }

}
