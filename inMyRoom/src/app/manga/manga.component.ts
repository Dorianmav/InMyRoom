import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { Manga } from '../model/manga.model';
import { MangaService } from '../sevices/manga.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manga',
  templateUrl: './manga.component.html',
  styleUrls: ['./manga.component.css']
})
export class MangaComponent {

  currentState: string = '';
  mangas: Manga[] = [];
  selectedManga: Manga | undefined;
  filterText: string = '';
  filteredList: Manga[] = this.mangas;


  constructor(private service: MangaService) {
    
    this.currentState = '';
    /* const mangaTest1 = new Manga(-3, "dragon ball", "manga qui me sert a tester", "moi",["1", "2", "5", "4", "3"], "https://www.glenat.com/sites/default/files/images/livres/couv/9782723434621-001-T.jpeg");
    const mangaTest2 = new Manga(-2, "GTO", "manga qui me sert a tester", "moi",[], "https://m.media-amazon.com/images/I/81VDeAyH1GL._AC_UF1000,1000_QL80_.jpg");
    const mangaTest3 = new Manga(-1, "City hunter", "manga qui me sert a tester", "moi",[], "https://m.media-amazon.com/images/I/71p6WEzAMAL._AC_UF894,1000_QL80_.jpg");
    this.mangas.push(mangaTest1);
    this.mangas.push(mangaTest2);
    this.mangas.push(mangaTest3); */

  }

  async ngOnInit() {
    try {
      this.mangas = await this.service.getMangas();
      this.applyFilter();
    } catch (error) {
      console.error(error);
    }
  }

  ngOnChanges() {
    this.applyFilter();
  }

  stateCreate() {
    this.currentState = 'create';
  }

  stateOneView() {
    this.currentState = 'solo_view'
  }

  async showDetails(mangaId: number): Promise<void> {
    this.selectedManga = await this.service.getMangaById(mangaId.toString());
    this.currentState = 'solo_view';

    //TODO remove when finish
    console.log("View manga ");
    console.log(this.selectedManga);

  }

  async addManga(manga: Manga): Promise<void> {
    this.mangas.push(await this.service.addManga(manga));
    this.applyFilter();
  }

  async deleteManga(mangaId: number): Promise<void> {
    await this.service.deleteManga(mangaId);
    this.mangas = this.mangas.filter((m: { id: number; }) => m.id !== mangaId);
    this.applyFilter();
  }

  applyFilter(): void {
    this.filteredList = this.mangas.filter((manga: Manga) => {
      return manga.title.toLowerCase().includes(this.filterText.toLowerCase());
    });
  }

}
