package com.talkids.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name="Country")
@Data
public class Country {

    @Id
    @Column(name="countryId")
    private int countryId;

    @Column(name="countryCode")
    private int countryCode;

    @Column(name="countryName", nullable=false, length=100)
    private String countryName;

    @Column(name="countryImage", nullable = false, columnDefinition = "LONGTEXT")
    private String countryImage;

}
