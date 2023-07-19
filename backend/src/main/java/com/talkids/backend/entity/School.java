package com.talkids.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="School")
@Getter
@Setter
public class School {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="schoolId")
    private int schoolId;

    @Column(name="schoolName", nullable=false, length=100)
    private String schoolName;

    @Column(name="schoolAddress", nullable=false, length=100)
    private String schoolAddress;

    @Column(name="schoolLat", nullable=false)
    private Double schoolLat;

    @Column(name="schoolLng", nullable=false)
    private Double schoolLng;

    @OneToOne
    @JoinColumn(name="countryId")
    private Country country;

}
