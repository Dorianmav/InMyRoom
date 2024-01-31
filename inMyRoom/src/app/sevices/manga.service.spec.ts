/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MangaService } from './manga.service';

describe('Service: MangaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MangaService]
    });
  });

  it('should ...', inject([MangaService], (service: MangaService) => {
    expect(service).toBeTruthy();
  }));
});
