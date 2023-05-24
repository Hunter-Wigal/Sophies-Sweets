import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-gallery-card',
  templateUrl: './gallery-card.component.html',
  styleUrls: ['./gallery-card.component.css']
})
export class GalleryCardComponent {
  @Input() header: string;
  @Input() image: string;
  @Input() caption: string

  constructor(){
    this.header = "";
    this.image= "missing image";
    this.caption = "";
  }
}
