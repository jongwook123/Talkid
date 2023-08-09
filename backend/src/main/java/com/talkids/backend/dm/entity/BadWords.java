package com.talkids.backend.dm.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="BadWords")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BadWords {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="badwordsId")
    private int badwordsId;

    @Column(name="words", nullable = false, length = 100)
    private String words;

}
