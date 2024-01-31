import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Manga } from 'src/app/model/manga.model';
import { MangaService } from 'src/app/sevices/manga.service';
import { MangaComponent } from '../manga.component';

@Component({
  selector: 'app-manga-update',
  templateUrl: './manga-update.component.html',
  styleUrls: ['./manga-update.component.css']
})
export class MangaUpdateComponent {

  @Output() stateChanged = new EventEmitter<string>();
  @Output() updateManga = new EventEmitter<Manga>();
  mangaForm!: FormGroup;
  @Input() manga: Manga | undefined;

  constructor(private fb: FormBuilder, private service: MangaService) { }

  ngOnInit() {
    this.mangaForm = this.fb.group({
      title: ['', Validators.required],
      resume: [''],
      author: [''],
      collection: [''],
      //tomes: [0, Validators.min(0)],
      imageUrl: ['../../assets/images/Mon Stockage logo.png']
    });

    if (this.manga) {
      this.mangaForm.patchValue({
        id: this.manga.id,
        title: this.manga.title,
        resume: this.manga.resume,
        author: this.manga.author,
        collection: this.manga.collection,
        //tomes: this.manga.tomes,
        imageUrl: this.manga.imageUrl
      });
    }

  }

  update() {
    const form = this.mangaForm.value;
    if(this.manga){
      this.manga.title = form.title;
      this.manga.resume = form.resume;
      this.manga.author = form.author;
      if (typeof form.collection === 'string') {
        this.manga.collection = form.collection
          .split(',')
          .map(Number)
          .sort((a: number, b: number) => a - b);
      } else {
        // Handle the case when form.collection is not a string
        // For example, set a default value or show an error message.
        this.manga.collection = [] // Set a default value as an empty array
      }
      //this.manga.tomes = form.tomes;
      this.manga.imageUrl = form.imageUrl;
    }

    if (this.manga) {
      this.service.updateManga(this.manga).then(() => {
        // Update the manga list after the update operation is complete
        this.updateManga.emit(this.manga);
        this.stateChanged.emit('');
      });
    }

    //TODO remove when finish
    console.log("update manga: ");
    console.log(this.manga);

  }
  
}
