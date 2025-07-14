import React, { useContext } from 'react';
import ProgressBar from './ProgressBar';
import { RotateCcw } from 'lucide-react';
import { QuestDispatchContext } from '../context/QuestContext';

function ExerciseItem({ quest }) {
    const dispatch = useContext(QuestDispatchContext);
    const { id, name, current, target, completed } = quest;

    const handleUpdate = (amount) => {
        dispatch({ type: 'UPDATE_REPS', payload: { id, amount } });
    };

    return (
        <div className={`p-4 border-l-4 transition-colors duration-300 ${completed ? 'quest-item-completed' : 'border-blue-500'}`}>
            <div className="flex justify-between items-center">
                <h3 className={`text-xl ${completed ? 'glow-text-complete' : 'text-gray-100'}`}>{name}</h3>
                <p className={`text-lg ${completed ? 'glow-text-complete' : 'text-blue-400'}`}>{current} / {target}</p>
            </div>
            <ProgressBar current={current} target={target} />
            <div className="flex items-center space-x-2 mt-2">
                <button onClick={() => handleUpdate(1)} className="btn-action" disabled={completed}>+1</button>
                <button onClick={() => handleUpdate(5)} className="btn-action" disabled={completed}>+5</button>
                <button onClick={() => handleUpdate(10)} className="btn-action" disabled={completed}>+10</button>
                <button onClick={() => handleUpdate(-current)} className="btn-action p-2" aria-label="Reset progress">
                    <RotateCcw size={16} />
                </button>
            </div>
        </div>
    );
}

export default ExerciseItem;
