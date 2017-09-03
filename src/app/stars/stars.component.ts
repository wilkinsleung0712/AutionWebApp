import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit, OnChanges {

  private stars: boolean[];
  @Input()
  private rating: number = 0;

  @Input()
  private disableSelectStar: boolean = true;

  @Output()
  private ratingChange: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('onchanges');
    this.populateStar();
  }


  populateStar() {
    // we define a list of rating star
    this.stars = [];
    // we calculate our start by comparing the our max number
    for (let i = 1; i <= 5; i++) {
      this.stars.push(i > this.rating);
    }
    // console.log('populateStar');
    // console.log(this.stars);
  }

  onStarRating(index: number) {
    if (!this.disableSelectStar) {
      // here we will repopulate stars in the view
      this.rating = index + 1;
      console.log(index);
      this.ratingChange.emit(this.rating);
    }
    // do need to call ngOnInit, as when value change ngOnChange will be called
    // console.log('onStarRating');
  }
}
