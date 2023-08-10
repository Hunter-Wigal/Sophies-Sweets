import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.css']
})
export class ReviewCardComponent {
  @Input() review: string;
  @Input() name:string;
  @Input() number:number;

  constructor(){
    this.review = "Missing review";
    this.name = "Missing name";
    this.number = 0;
  }
}
