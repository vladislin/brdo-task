package org.vladislin.schools.service;

import org.vladislin.schools.dto.SchoolDto;
import org.vladislin.schools.models.SchoolType;

import java.util.List;

public interface SchoolService {
    SchoolDto create(SchoolDto school);
    List<SchoolDto> getAllFiltered(String region, SchoolType type, Boolean isActive);
    SchoolDto deactivate(Long id);
}
