package com.talkids.backend.meeting.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.talkids.backend.dm.entity.Message;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.List;

@Entity
@Table(name="SmallGroup")
@Getter @Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
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

    @OneToMany(mappedBy = "smallGroup", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @JsonManagedReference
    private List<SmallGroupMember> smallGroupMembers;

}
