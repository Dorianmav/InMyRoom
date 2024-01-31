import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Manga } from '../model/manga.model';
import { lastValueFrom, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MangaService {

  private apiUrl = '/api/manga';

  constructor(private http: HttpClient) { }

  getMangas(): Promise<Manga[]> {
    return lastValueFrom(this.http.get<Manga[]>(this.apiUrl));
  }

  getMangaById(id: string): Promise<Manga> {
    return lastValueFrom(this.http.get<Manga>(`${this.apiUrl}/${id}`));
  }

  addManga(manga: Manga): Promise<Manga> {
    return lastValueFrom(this.http.post<Manga>(this.apiUrl, manga));
  }

  deleteManga(id: number): Promise<any> {
    return lastValueFrom(this.http.delete<any>(`${this.apiUrl}/${id}`));
  }

  updateManga(manga: Manga): Promise<Manga> {
    return lastValueFrom(this.http.put<Manga>(`${this.apiUrl}/${manga.id}`, manga));
  }

  getLatestManga(): Promise<Manga> {
    return lastValueFrom(this.http.get<Manga[]>(this.apiUrl)
      .pipe(
        map(mangas => {
          // Filtrer les mangas pour vérifier qu'il y a au moins un manga dans la liste
          let manga;
          if (mangas.length > 0) {
            // Récupérer le dernier manga de la liste (le plus récent)
            manga = mangas[mangas.length - 1];
            return manga;
          } else {
            // S'il n'y a pas de mangas dans la liste, renvoyer null
            return new Manga(0,'', '', '', [],"https://img.over-blog-kiwi.com/1/98/60/46/20171026/ob_c3acd2_22730286-449426198787996-3953393340843.jpg");
          }
        })
      )
    );
  }

}
