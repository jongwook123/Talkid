package com.talkids.backend.member.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name="BookMark")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class BookMark {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="bookMarkId")
    private int bookMarkId;

    @Column(name="bookMarkOriContent", columnDefinition = "LONGTEXT")
    private String bookMarkOriContent;

    @Column(name="bookMarkTransContent", columnDefinition = "LONGTEXT")
    private String bookMarkTransContent;

    @Column(name="createdAt")
    @CreatedDate
    private LocalDateTime createdAt;

    /* ---------------------------------- */

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="memberId")
    @JsonBackReference
    private Member member;

}
