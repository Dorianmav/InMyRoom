import { Component } from '@angular/core';
import { Manga } from '../model/manga.model';
import { Router } from '@angular/router';
import { MangaService } from '../sevices/manga.service';
import { Jeu } from '../model/game.model';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
  mangas: Manga[] = [];
  jeux: Jeu[] = [];
  //animes: Manga[] = [];
  
  lastThreeMangas: Manga[] = [];
  lastThreeJeux: Jeu[] = [];
  //lastThreeAnimes: Manga[] = [];

  constructor(private router: Router, private mangaService: MangaService) {

    //TODO uncomment when i add the dev mode
    /* const mangaTest1 = new Manga(-3, "dragon ball", "manga qui me sert a tester", "moi", [], "https://www.glenat.com/sites/default/files/images/livres/couv/9782723434621-001-T.jpeg");
    const mangaTest2 = new Manga(-2, "GTO", "manga qui me sert a tester", "moi", [], "https://m.media-amazon.com/images/I/81VDeAyH1GL._AC_UF1000,1000_QL80_.jpg");
    const mangaTest3 = new Manga(-1, "City hunter", "manga qui me sert a tester", "moi", [], "https://m.media-amazon.com/images/I/71p6WEzAMAL._AC_UF894,1000_QL80_.jpg");
    this.mangas.push(mangaTest1);
    this.mangas.push(mangaTest2);
    this.mangas.push(mangaTest3);

    this.lastThreeMangas = this.theLastThreeMangas(); */

  }

  async ngOnInit() {
    try {
      this.mangas = await this.mangaService.getMangas();
      this.lastThreeMangas = this.theLastThreeMangas();
    } catch (error) {
      console.error(error);
    }
  }

  public theLastThreeMangas(): Manga[] {
    if (this.mangas.length >= 3) {
      return this.lastThreeMangas = this.mangas.slice(-3);
    } else {
      return this.mangas;
    }
  }

  public theLastThreeJeux(): Jeu[] {
    if (this.mangas.length >= 3) {
      return this.lastThreeJeux = this.jeux.slice(-3);
    } else {
      return this.jeux;
    }
  }


  goToManga(): void {
    this.router.navigate(['/manga']);
  }

  goToAnime(): void {
    this.router.navigate(['/anime']);
  }

  goToGames(): void {
    this.router.navigate(['/game']);
  }

  goToScans(): void {
    this.router.navigate(['/scans']);
  }
}
