import React from 'react';
import { Flame } from 'lucide-react';

function StreakCounter({ streak }) {
    return (
        <div className="flex items-center space-x-2 text-lg">
            <Flame className="text-yellow-400" />
            <span className="font-bold glow-text-complete">{streak}</span>
            <span>Day Streak</span>
        </div>
    );
}

export default StreakCounter;
