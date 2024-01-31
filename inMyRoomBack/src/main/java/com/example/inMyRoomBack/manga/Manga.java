package com.example.inMyRoomBack.manga;

import org.hibernate.annotations.DialectOverride.SQLDelete;
import org.hibernate.annotations.DialectOverride.Where;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.annotation.Nonnull;
import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "mangas")
@SQLDelete(dialect = org.hibernate.dialect.MySQLDialect.class, override = @org.hibernate.annotations.SQLDelete(sql = "UPDATE mangas SET deleted = true WHERE id = ?"))
@Where(dialect = org.hibernate.dialect.MySQLDialect.class, override = @org.hibernate.annotations.Where(clause = "deleted = false"))
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class Manga {

    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    @Nonnull
    private Long id;
    
    @Column(name = "title")
    private String title;

    @Column(name = "resume")
    private String resume;

    @Column(name = "author")
    private String author;

    @Column(name = "collection")
    private String[] collection;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "status")
    private String status;

    @Column(name = "deleted")
    private boolean deleted = Boolean.FALSE;
}
