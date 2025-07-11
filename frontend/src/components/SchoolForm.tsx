import { useState } from 'react';
import type { SchoolType } from '../types/School';

type Props = {
    onCreate: (school: {
        name: string;
        edrpou: string;
        region: string;
        type: SchoolType;
    }) => void;
};

export function SchoolForm({ onCreate }: Props) {
    const [name, setName] = useState('');
    const [edrpou, setEdrpou] = useState('');
    const [region, setRegion] = useState('');
    const [type, setType] = useState<SchoolType>('ГІМНАЗІЯ');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !edrpou || !region || !type) return;

        onCreate({ name, edrpou, region, type });

        setName('');
        setEdrpou('');
        setRegion('');
        setType('ГІМНАЗІЯ');
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
            <h3>Додати нову школу</h3>
            <input
                type="text"
                placeholder="Назва"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="ЄДРПОУ"
                value={edrpou}
                onChange={(e) => setEdrpou(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Регіон"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                required
            />
            <select value={type} onChange={(e) => setType(e.target.value as SchoolType)}>
                <option value="ГІМНАЗІЯ">ГІМНАЗІЯ</option>
                <option value="ЛІЦЕЙ">ЛІЦЕЙ</option>
                <option value="ЗЗСО">ЗЗСО</option>
            </select>
            <button type="submit">Додати школу</button>
        </form>
    );
}
