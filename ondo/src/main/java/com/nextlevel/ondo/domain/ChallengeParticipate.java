package com.nextlevel.ondo.domain;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
public class ChallengeParticipate {
    @Id
    @Column(name="challengeparticipate_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long challengeparticipateId;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne
    @JoinColumn(name = "challenge_id")
    private Challenge challenge;


}
