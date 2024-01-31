import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MangaRoutingModule } from './manga-routing.module';
import { MangaComponent } from './manga.component';
import { MangaCreateComponent } from './manga-create/manga-create.component';
import { MangaViewComponent } from './manga-view/manga-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MangaUpdateComponent } from './manga-update/manga-update.component';
import { CarouselModule } from 'primeng/carousel';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    MangaComponent,
    MangaCreateComponent,
    MangaViewComponent,
    MangaUpdateComponent,
  ],
  imports: [
    CommonModule,
    MangaRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    CarouselModule,
  ], exports: [
    MangaComponent  
  ],
  providers: [
  ],
})
export class MangaModule { }
