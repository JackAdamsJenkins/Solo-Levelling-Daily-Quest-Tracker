import { RotateCcw } from 'lucide-react';
import { useContext } from 'react';
import { QuestDispatchContext } from '../context/QuestContext';
import ProgressBar from './ProgressBar';

function ExerciseItem({ quest }) {
    const dispatch = useContext(QuestDispatchContext);
    const { id, name, current, target, completed } = quest;

    const handleUpdate = (amount) => {
        dispatch({ type: 'UPDATE_REPS', payload: { id, amount } });
    };

    return (
        <div className={`p-4 border-l-4 transition-colors duration-300 ${completed ? 'quest-item-completed' : 'border-[var(--color-primary)]'}`}>
            <div className="flex justify-between items-center">
                <h3 className={`text-xl ${completed ? 'glow-text-complete' : 'text-[var(--color-text)]'}`}>{name}</h3>
                <p className={`text-lg ${completed ? 'glow-text-complete' : 'text-[var(--color-primary)]'}`}>{current} / {target}</p>
            </div>
            <ProgressBar current={current} target={target} />
            <div className="flex flex-wrap items-center gap-2 mt-2 justify-center">
                <button onClick={() => handleUpdate(1)} className="btn-action min-w-[48px]" disabled={completed}>+1</button>
                <button onClick={() => handleUpdate(5)} className="btn-action min-w-[48px]" disabled={completed}>+5</button>
                <button onClick={() => handleUpdate(10)} className="btn-action min-w-[48px]" disabled={completed}>+10</button>
                <button onClick={() => handleUpdate(-current)} className="btn-action p-2 min-w-[48px]" aria-label="Reset progress">
                    <RotateCcw size={16} />
                </button>
            </div>
        </div>
    );
}

export default ExerciseItem;
