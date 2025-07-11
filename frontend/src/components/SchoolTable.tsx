import { useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import type { School } from '../types/School';

type Props = {
    schools: School[];
    onDeactivate: (id: number) => void;
};

export function SchoolTable({ schools, onDeactivate }: Props) {
    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const handleConfirm = () => {
        if (selectedId !== null) {
            onDeactivate(selectedId);
            setShowModal(false);
        }
    };

    const openModal = (id: number) => {
        setSelectedId(id);
        setShowModal(true);
    };

    if (schools.length === 0) {
        return <p className="text-muted">Немає шкіл за обраними фільтрами.</p>;
    }

    return (
        <>
            <Table striped bordered hover responsive>
                <thead>
                <tr>
                    <th>Назва</th>
                    <th>ЄДРПОУ</th>
                    <th>Регіон</th>
                    <th>Тип</th>
                    <th>Активна</th>
                    <th>Дія</th>
                </tr>
                </thead>
                <tbody>
                {schools.map((school) => (
                    <tr key={school.id}>
                        <td>{school.name}</td>
                        <td>{school.edrpou}</td>
                        <td>{school.region}</td>
                        <td>{school.type}</td>
                        <td>{school.active ? 'Так' : 'Ні'}</td>
                        <td>
                            {school.active ? (
                                <Button variant="danger" size="sm" onClick={() => openModal(school.id)}>
                                    Деактивувати
                                </Button>
                            ) : (
                                <span className="text-secondary">Неактивна</span>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Підтвердження</Modal.Title>
                </Modal.Header>
                <Modal.Body>Ви впевнені, що хочете деактивувати школу?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Скасувати
                    </Button>
                    <Button variant="danger" onClick={handleConfirm}>
                        Деактивувати
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
