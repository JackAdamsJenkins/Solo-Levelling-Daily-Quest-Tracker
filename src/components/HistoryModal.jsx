import React from 'react';
import Modal from './Modal';
import HistoryCalendar from './HistoryCalendar';

function HistoryModal({ isOpen, onClose, history }) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Completion History">
            <HistoryCalendar history={history} />
        </Modal>
    );
}

export default HistoryModal;
