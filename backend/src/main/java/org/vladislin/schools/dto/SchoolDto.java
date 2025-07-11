package org.vladislin.schools.dto;

import lombok.*;
import org.vladislin.schools.models.School;
import org.vladislin.schools.models.SchoolType;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SchoolDto {
    private Long id;
    private String name;
    private String edrpou;
    private String region;
    private SchoolType type;
    private boolean isActive = true;

    public SchoolDto(School school) {
        this.id = school.getId();
        this.name = school.getName();
        this.edrpou = school.getEdrpou();
        this.region = school.getRegion();
        this.type = school.getType();
        this.isActive = school.isActive();
    }
}
