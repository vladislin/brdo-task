package org.vladislin.schools.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.vladislin.schools.dto.SchoolDto;
import org.vladislin.schools.models.School;
import org.vladislin.schools.models.SchoolType;
import org.vladislin.schools.repository.SchoolRepository;
import org.vladislin.schools.service.SchoolService;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SchoolServiceImpl implements SchoolService {

    private final SchoolRepository schoolRepository;

    @Override
    public SchoolDto create(SchoolDto school) {
        School schoolEntity = new School();
        schoolEntity.setName(school.getName());
        schoolEntity.setEdrpou(school.getEdrpou());
        schoolEntity.setRegion(school.getRegion());
        schoolEntity.setType(school.getType());
        schoolRepository.save(schoolEntity);
        return school;
    }

    @Override
    public List<SchoolDto> getAllFiltered(String region, SchoolType type, Boolean isActive) {
        Specification<School> spec = (root, query, cb) -> cb.conjunction();

        if (region != null) {
            spec = spec.and((root, query, cb) -> cb.equal(root.get("region"), region));
        }
        if (type != null) {
            spec = spec.and((root, query, cb) -> cb.equal(root.get("type"), type));
        }
        if (isActive != null) {
            spec = spec.and((root, query, cb) -> cb.equal(root.get("isActive"), isActive));
        }

        return schoolRepository.findAll(spec).stream().map(SchoolDto::new).collect(Collectors.toList());
    }

    @Override
    public SchoolDto deactivate(Long id) {
        School school = schoolRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("School with id: " + id + " not found"));
        school.setActive(false);
        schoolRepository.save(school);
        return new SchoolDto(school);
    }
}
