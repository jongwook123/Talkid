package com.talkids.backend.meeting.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="SmallGroup")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SmallGroup {

    @Id
    @Column(name="smallGroupId")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int smallGroupId;

    @Column(name="smallGroupName", nullable = false, length = 20)
    private String smallGroupName;

    /* ---------------------------------- */

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "meetingId")
    private Meeting meeting;

}
