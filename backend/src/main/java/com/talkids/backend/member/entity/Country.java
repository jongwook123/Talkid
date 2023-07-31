package com.talkids.backend.member.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name="Country")
@Data
public class Country {

    @Id
    @Column(name="countryId")
    private int countryId;

    @Column(name="countryCode", nullable=false, length=10)
    private String countryCode;

    @Column(name="countryName", nullable=false, length=100)
    private String countryName;

    @Column(name="countryImage", columnDefinition = "LONGTEXT")
    private String countryImage;

}
