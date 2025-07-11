package org.vladislin.schools.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.vladislin.schools.dto.SchoolDto;
import org.vladislin.schools.models.SchoolType;
import org.vladislin.schools.service.SchoolService;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("api/")
@RequiredArgsConstructor
public class SchoolController {

    private final SchoolService schoolService;

    @GetMapping("/schools")
    public List<SchoolDto> getSchools(String region, SchoolType type, Boolean isActive) {
        return schoolService.getAllFiltered(region, type, isActive);
    }

    @PostMapping("/schools")
    public ResponseEntity<SchoolDto> createSchool(@RequestBody SchoolDto school) throws URISyntaxException {
        SchoolDto result = schoolService.create(school);
        return ResponseEntity.created(new URI("/api/schools/" + result.getId()))
                .body(result);
    }

    @PatchMapping("/schools/{id}/deactivate")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<SchoolDto> deactivateSchool(@PathVariable Long id) {
        return ResponseEntity.ok().body(schoolService.deactivate(id));
    }

}
