package com.example.inMyRoomBack.manga;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/manga")
public class MangaController {

    @Autowired
    private MangaRepository repository;

    @GetMapping()
    public List<Manga> getAllManga() {
        return (List<Manga>) repository.findAll();
    }

    @PostMapping()
    public Manga createManga(@RequestBody Manga manga) {
        return repository.save(manga);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Manga> getMangaById(@PathVariable(value = "id") Long mangaId) {
        Optional<Manga> manga = repository.findById(mangaId);
        if (manga.isPresent()) {
            return ResponseEntity.ok().body(manga.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Manga> updateManga(@PathVariable(value = "id") Long mangaId,
            @RequestBody Manga mangaDetails) {
        Optional<Manga> optionalManga = repository.findById(mangaId);
        if (optionalManga.isPresent()) {
            Manga manga = optionalManga.get();
            manga.setTitle(mangaDetails.getTitle());
            manga.setResume(mangaDetails.getResume());
            manga.setAuthor(mangaDetails.getAuthor());
            manga.setCollection(mangaDetails.getCollection());
            manga.setImageUrl(mangaDetails.getImageUrl());
            manga.setStatus(mangaDetails.getStatus());
            Manga updatedManga = repository.save(manga);
            return ResponseEntity.ok(updatedManga);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping()
    public ResponseEntity<Void> deleteAllManga() {
        repository.deleteAll();
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteManga(@PathVariable(value = "id") Long mangaId) {
        repository.deleteById(mangaId);
        return ResponseEntity.noContent().build();
    }


}
