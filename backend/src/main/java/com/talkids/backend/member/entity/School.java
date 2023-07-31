package com.talkids.backend.member.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name="School")
@Data
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

    /* ---------------------------------- */

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="countryId")
    private Country country;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="timeZoneId")
    private TimeZone timeZone;

}
