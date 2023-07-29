package com.talkids.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name="DmRoom")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE DmRoom SET deleted_at = true WHERE dmRoomId = ?")
@Where(clause = "deleted_at = false")
@EntityListeners(AuditingEntityListener.class)
public class DmRoom {

    @Id
    @Column(name="dmRoomId")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int dmRoomId;

    /* ---------------------------------- */

    @Column(name="createdAt", updatable = false)
    @CreatedDate
    private LocalDateTime createdAt;

    @Column(name="updatedAt")
    @LastModifiedDate
    private LocalDateTime updatedAt;

    @Column(name="deletedAt")
    @ColumnDefault("false")
    private Boolean deletedAt;
}
