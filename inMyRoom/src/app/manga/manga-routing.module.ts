import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MangaComponent } from './manga.component';
import { MangaCreateComponent } from './manga-create/manga-create.component';
import { MangaViewComponent } from './manga-view/manga-view.component';


const routes: Routes = [
  {
    path: '',
    component: MangaComponent
  },
  {
    path: '',
    component: MangaCreateComponent
  },
  {
    path: 'view',
    component: MangaViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MangaRoutingModule { }
