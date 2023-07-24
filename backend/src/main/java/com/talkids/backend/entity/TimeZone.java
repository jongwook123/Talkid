package com.talkids.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name="TimeZone")
@Data
public class TimeZone {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="timeZoneId")
    private int timeZoneId;

    @Column(name="timeZoneName", nullable=false, length=50)
    private String timeZoneName;

    @Column(name="hour")
    private int hour;

    @Column(name="minute")
    private int minute;

}
