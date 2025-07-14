import { Flame } from 'lucide-react';

function StreakCounter({ streak }) {
    return (
        <div className="flex flex-row items-center gap-1 text-lg whitespace-nowrap">
            <Flame className="text-[var(--color-complete)]" />
            <span className="font-bold glow-text-complete">{streak}</span>
            <span className="text-[var(--color-text)]">Day Streak</span>
        </div>
    );
}

export default StreakCounter;
