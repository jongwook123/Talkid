package com.talkids.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="Language")
@Data
public class Language {

    @Id
    @Column(name="languageId")
    private int languageId;

    @Column(name="languageCode", nullable=false, length=10)
    private String languageCode;

    @Column(name="languageEng", nullable=false, length=50)
    private String languageEng;

    @Column(name="languageOri", nullable=false, length=50)
    private String languageOri;
}
