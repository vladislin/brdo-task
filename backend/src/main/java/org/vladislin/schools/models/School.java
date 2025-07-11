package org.vladislin.schools.models;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
public class School {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String edrpou;

    private String region;

    @Enumerated(EnumType.STRING)
    private SchoolType type;

    private boolean isActive = true;
}
