import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { GalleryCardComponent } from './gallery-card/gallery-card.component';
import { FilesService } from '../files.service';
import { StorageReference, getDownloadURL } from 'firebase/storage';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent {
  gallery_cards: GalleryCardComponent[] = [];
  macaron_cards: GalleryCardComponent[] = [];
  cupcake_cards: GalleryCardComponent[] = [];
  cake_cards: GalleryCardComponent[] = [];


  constructor(private titleService: Title, private fs: FilesService) {
    this.titleService.setTitle("Gallery");
  }

  ngOnInit() {
    const macaronImages = this.fs.getMacaronImages().then(
      (macaronImages) => {
        this.getImages(macaronImages, 1);
      }
    );
    const cupcakeImages = this.fs.getCupcakeImages().then(
      (cupcakeImages) => {
        this.getImages(cupcakeImages, 3);
      }
    );
    const cakeImages = this.fs.getCakeImages().then(
      (cakeImages) => {
        this.getImages(cakeImages, 2);
      }
    );

    // this.getImages(macaronImages, 1);
    // this.getImages(cakeImages, 2);
    // this.getImages(cupcakeImages, 3);
  }

  async getImages(images: StorageReference[], type: number) {
    var count = 0;

    for (var x of images) {
      const card = new GalleryCardComponent;
      card.image = (await getDownloadURL(images[count])).toString();
      switch (type) {
        case 1:
          this.macaron_cards.push(card);
          break;

        case 2:
          this.cake_cards.push(card);
          break;

        case 3:
          this.cupcake_cards.push(card);
          break;
      }
      count++;
    }
  }
}
