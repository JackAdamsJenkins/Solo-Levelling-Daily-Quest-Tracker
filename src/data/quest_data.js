export const DIFFICULTY = {
  BEGINNER: 'Beginner',
  INTERMEDIATE: 'Intermediate',
  ADVANCED: 'Advanced',
};

export const QUEST_CONFIG = {
  [DIFFICULTY.BEGINNER]: {
    pushups: { target: 25 },
    situps: { target: 25 },
    squats: { target: 25 },
    running: { target: 10 },
  },
  [DIFFICULTY.INTERMEDIATE]: {
    pushups: { target: 100 },
    situps: { target: 100 },
    squats: { target: 100 },
    running: { target: 10 },
  },
  [DIFFICULTY.ADVANCED]: {
    pushups: { target: 150 },
    situps: { target: 150 },
    squats: { target: 150 },
    running: { target: 10 },
  },
};

export const getQuestsForDifficulty = (difficulty) => {
    const config = QUEST_CONFIG[difficulty] || QUEST_CONFIG[DIFFICULTY.INTERMEDIATE];
    return [
        { id: 'pushups', name: 'Push-ups', current: 0, target: config.pushups.target, completed: false },
        { id: 'situps', name: 'Sit-ups', current: 0, target: config.situps.target, completed: false },
        { id: 'squats', name: 'Squats', current: 0, target: config.squats.target, completed: false },
        { id: 'running', name: 'Running', current: 0, target: config.running.target, completed: false, time: 0 },
    ];
};
