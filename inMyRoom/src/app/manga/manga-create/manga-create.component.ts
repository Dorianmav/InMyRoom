import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Manga } from 'src/app/model/manga.model';
import { MangaService } from 'src/app/sevices/manga.service';

@Component({
  selector: 'app-manga-create',
  templateUrl: './manga-create.component.html',
  styleUrls: ['./manga-create.component.css']
})
export class MangaCreateComponent {

  @Output() stateChanged = new EventEmitter<string>();
  @Output() newMangaEmitter = new EventEmitter<Manga>();
  formGroup!: FormGroup;
  manga!: Manga;
  mangaId: number = 1;

  constructor(private fb: FormBuilder, private service: MangaService) { }

  async ngOnInit() {
    this.mangaId = await this.service.getMangas().then(mangas => mangas.length + 1);
    this.formGroup = this.fb.group({
      title: ['', Validators.required],
      resume: [''],
      author: [''],
      collection: [''],
      imageUrl: ['../../assets/images/Mon Stockage logo.png']
    });


  }

  create() {
    
    const collectionValue = this.formGroup.get('collection')?.value;
    const collection = collectionValue ? collectionValue
      .split(',')
      .map(Number)
      .sort((a: number, b: number) => a - b) : [];

    this.manga = new Manga(
      this.mangaId,
      this.formGroup.get('title')?.value,
      this.formGroup.get('resume')?.value,
      this.formGroup.get('author')?.value,
      collection,
      this.formGroup.get('imageUrl')?.value
    );

    this.newMangaEmitter.emit(this.manga);
    //TODO remove when finish
    console.log("create manga: ");
    console.log(this.manga);

    this.stateChanged.emit('');
    this.formGroup.reset();

  }

  changeStateToEmpty() {
    this.stateChanged.emit('');
  }

}
