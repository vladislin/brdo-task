import { useEffect, useState } from 'react';
import type { School, SchoolType } from './types/School';
import type { SchoolFilter } from './types/SchoolFilter';
import schoolService from "./service/SchoolService.ts";
import { FilterBar } from './components/FilterBar';
import { SchoolTable } from './components/SchoolTable';
import { SchoolForm } from './components/SchoolForm';
import { Container } from "react-bootstrap";

function App() {
    const [schools, setSchools] = useState<School[]>([]);
    const [filters, setFilters] = useState<SchoolFilter>({});

    const loadSchools = async (filterValues: SchoolFilter = filters) => {
        const data = await schoolService.fetchSchools(filterValues);
        setSchools(data);
    };

    useEffect(() => { loadSchools() }, []);

    const handleFilterChange = (newFilters: SchoolFilter) => {
        setFilters(newFilters);
        loadSchools(newFilters);
    };

    const handleCreate = async (school: {
        name: string;
        edrpou: string;
        region: string;
        type: SchoolType;
    }) => {
        await schoolService.createSchool({ ...school, active: true, id: 0 });
        loadSchools();
    };

    const handleDeactivate = async (id: number) => {
        await schoolService.deactivateSchool(id);
        loadSchools();
    };

    return (
        <Container className="py-4">
            <h1 className="mb-4">Реєстр шкільних закладів</h1>
            <SchoolForm onCreate={handleCreate} />
            <FilterBar onFilterChange={handleFilterChange} />
            <SchoolTable schools={schools} onDeactivate={handleDeactivate} />
        </Container>
    );
}

export default App;
