import { CheckCircle2, RotateCcw } from 'lucide-react';
import { useContext, useEffect, useRef } from 'react';
import { QuestDispatchContext } from '../context/QuestContext';

function RunTracker({ quest }) {
    const dispatch = useContext(QuestDispatchContext);
    const { name, target, completed, time, isActive } = quest;
    const timerRef = useRef(null);

    useEffect(() => {
        if (isActive) {
            timerRef.current = setInterval(() => {
                dispatch({ type: 'UPDATE_RUN_TIME', payload: { time: time + 1 } });
            }, 1000);
        } else {
            clearInterval(timerRef.current);
        }
        return () => clearInterval(timerRef.current);
    }, [isActive, time, dispatch]);

    const formatTime = (totalSeconds) => {
        const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
        const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
        const seconds = (totalSeconds % 60).toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    };

    const handleToggle = () => {
        if (!completed) {
            dispatch({ type: 'TOGGLE_RUN_TIMER' });
        }
    };

    const handleReset = () => {
        dispatch({ type: 'RESET_RUN' });
    };

    const handleComplete = () => {
        dispatch({ type: 'COMPLETE_RUN' });
    };

    return (
        <div className={`p-4 border-l-4 transition-colors duration-300 ${completed ? 'quest-item-completed' : 'border-[var(--color-primary)]'}`}>
            <div className="flex justify-between items-center">
                <h3 className={`text-xl ${completed ? 'glow-text-complete' : 'text-[var(--color-text)]'}`}>{name}</h3>
                <p className={`text-lg ${completed ? 'glow-text-complete' : 'text-[var(--color-primary)]'}`}>{target} km</p>
            </div>
            <div className="text-4xl text-center my-4 glow-text">{formatTime(time)}</div>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
                <button onClick={handleToggle} className="btn-primary min-w-[80px]" disabled={completed}>
                    {isActive ? 'Stop' : 'Start'}
                </button>
                {!isActive && !completed && time > 0 && (
                    <button onClick={handleComplete} className="btn-action flex items-center gap-2 min-w-[80px]" aria-label="Complete run quest">
                        <CheckCircle2 size={20} />
                        <span>Complete</span>
                    </button>
                )}
                <button onClick={handleReset} className="btn-action p-2 min-w-[48px]" aria-label="Reset timer">
                    <RotateCcw size={20} />
                </button>
            </div>
        </div>
    );
}

export default RunTracker;
