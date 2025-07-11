import { useState } from 'react';
import type { SchoolType } from '../types/School';
import type { SchoolFilter } from "../types/SchoolFilter.ts";

type Props = {
    onFilterChange: (filters: {
        region?: string;
        type?: SchoolType;
        isActive?: boolean;
    }) => void;
};

export function FilterBar({ onFilterChange }: Props) {
    const [region, setRegion] = useState('');
    const [type, setType] = useState<SchoolType | ''>('');
    const [isActive, setIsActive] = useState<string>('true');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const filters: SchoolFilter = {};
        if (region) filters.region = region;
        if (type) filters.type = type;
        if (isActive) filters.isActive = isActive === 'true';

        onFilterChange(filters);
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <input
                type="text"
                placeholder="Регіон"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
            />

            <select value={type} onChange={(e) => setType(e.target.value as SchoolType)}>
                <option value="">Тип</option>
                <option value="ГІМНАЗІЯ">ГІМНАЗІЯ</option>
                <option value="ЛІЦЕЙ">ЛІЦЕЙ</option>
                <option value="ЗЗСО">ЗЗСО</option>
            </select>

            <select value={isActive} onChange={(e) => setIsActive(e.target.value)}>
                <option value="">Активність</option>
                <option value="true">Активні</option>
                <option value="false">Неактивні</option>
            </select>

            <button type="submit">Фільтрувати</button>
        </form>
    );
}
