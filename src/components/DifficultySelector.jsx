import { useContext } from 'react';
import { QuestDispatchContext } from '../context/QuestContext';

function DifficultySelector({ currentDifficulty }) {
    const dispatch = useContext(QuestDispatchContext);

    const difficultyLevels = ['beginner', 'intermediate', 'advanced'];

    const handleChange = (e) => {
        dispatch({ type: 'SET_DIFFICULTY', payload: e.target.value });
    };

    return (
        <div className="flex items-center space-x-2">
            <label htmlFor="difficulty-select" className="text-[var(--color-text)] opacity-80">Difficulty:</label>
            <select
                id="difficulty-select"
                value={currentDifficulty}
                onChange={handleChange}
                className="bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-primary)] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-border-focus)] transition-all duration-200"
            >
                {difficultyLevels.map(level => (
                    <option key={level} value={level} className="bg-[var(--color-bg)] text-[var(--color-text)]">
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default DifficultySelector;
