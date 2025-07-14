import React from 'react';

function ProgressBar({ current, target }) {
    const percentage = target > 0 ? (current / target) * 100 : 0;
    const isCompleted = current >= target;

    return (
        <div className="progress-bar-container">
            <div
                className={`progress-bar-fill ${isCompleted ? 'progress-bar-fill-completed' : ''}`}
                style={{ width: `${percentage}%` }}
            >
                {Math.round(percentage)}%
            </div>
        </div>
    );
}

export default ProgressBar;
