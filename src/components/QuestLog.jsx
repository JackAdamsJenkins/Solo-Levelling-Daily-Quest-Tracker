import React from 'react';
import ExerciseItem from './ExerciseItem';
import RunTracker from './RunTracker';

function QuestLog({ quests }) {
    return (
        <div className="space-y-4">
            {quests.map(quest => {
                if (quest.id === 'running') {
                    return <RunTracker key={quest.id} quest={quest} />;
                }
                return <ExerciseItem key={quest.id} quest={quest} />;
            })}
        </div>
    );
}

export default QuestLog;
