import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Manga } from 'src/app/model/manga.model';
import { MangaService } from 'src/app/sevices/manga.service';

@Component({
  selector: 'app-manga-view',
  templateUrl: './manga-view.component.html',
  styleUrls: ['./manga-view.component.css']
})
export class MangaViewComponent {

  constructor(private service: MangaService) {

  }

  @Input() manga: Manga | undefined;

  @Output() stateChanged = new EventEmitter<string>();
  @Output() correctMangaEmitter = new EventEmitter<Manga>();

  changeStateToEmpty() {
    this.stateChanged.emit('');
  }

  correctManga() {
    if (this.manga) {
      this.service.updateManga(this.manga);
    }
    this.correctMangaEmitter.emit(this.manga);
    this.stateChanged.emit('update');
    
    //TODO remove when finish
    console.log("correct manga ");
    console.log(this.manga);
  }


}
