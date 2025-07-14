import React, { useContext } from 'react';
import { QuestDispatchContext } from '../context/QuestContext';

function DifficultySelector({ currentDifficulty }) {
    const dispatch = useContext(QuestDispatchContext);
    
    const difficultyLevels = ['beginner', 'intermediate', 'advanced'];

    const handleChange = (e) => {
        dispatch({ type: 'SET_DIFFICULTY', payload: e.target.value });
    };

    return (
        <div className="flex items-center space-x-2">
            <label htmlFor="difficulty-select" className="text-gray-400">Difficulty:</label>
            <select 
                id="difficulty-select"
                value={currentDifficulty}
                onChange={handleChange}
                className="system-select bg-[var(--color-bg)] border border-[var(--color-border)] text-white rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                {difficultyLevels.map(level => (
                    <option key={level} value={level}>
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default DifficultySelector;
