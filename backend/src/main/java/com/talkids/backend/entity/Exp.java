package com.talkids.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Entity
@Table(name="Exp")
@Data
public class Exp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="expId")
    private int expId;

    @Column(name="expPoint")
    private int expPoint;

    @Column(name="createdAt")
    @CreatedDate
    private LocalDateTime createdAt;

    /* ---------------------------------- */

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="memberId")
    private Member member;
}
