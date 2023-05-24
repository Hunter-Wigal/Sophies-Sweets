import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { GalleryCardComponent } from './gallery-card/gallery-card.component';
import { gallery_cards_list } from './gallery_cards_list';
import { FilesService } from '../files.service';
import { getDownloadURL } from 'firebase/storage';

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

  async ngOnInit(): Promise<void> {
    var count = 0;

    const macaronImages = await this.fs.getMacaronImages();
    const cupcakeImages = await this.fs.getCupcakeImages();
    const cakeImages = await this.fs.getCakeImages();

    for (var x of macaronImages) {
      const card = new GalleryCardComponent;
      card.image = (await getDownloadURL(macaronImages[count])).toString();
      this.macaron_cards.push(card);
      count++;
    }

    count = 0;
    for (var x of cupcakeImages) {
      const card = new GalleryCardComponent;
      card.image = (await getDownloadURL(cupcakeImages[count])).toString();
      this.cupcake_cards.push(card);
      count++;
    }

    count = 0;
    for (var x of cakeImages) {
      const card = new GalleryCardComponent;
      card.image = (await getDownloadURL(cakeImages[count])).toString();
      this.cake_cards.push(card);
      count++;
    }
  }
}
