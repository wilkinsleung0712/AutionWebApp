import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit {

  stars: boolean[];
  @Input()
  private rating: number = 0;
  
  constructor() { }

  ngOnInit() {
    this.populateStar();
  }

  populateStar() {
    // we define a list of rating star
    this.stars = [];
    // we calculate our start by comparing the our max number
    for (let i = 1; i <= 5; i++) {
      this.stars.push(i > this.rating);
    }
  }
}
