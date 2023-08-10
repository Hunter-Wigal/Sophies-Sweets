import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ReviewCardComponent } from './review-card/review-card.component';
import { reviewlist } from './reviews_list';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  firstReview: ReviewCardComponent;
  reviews: ReviewCardComponent[];

  constructor(private titleService: Title) {
    this.titleService.setTitle("Home");

    
    this.reviews = reviewlist;
    this.firstReview = this.reviews[0];
    this.reviews.shift();
  }
}
