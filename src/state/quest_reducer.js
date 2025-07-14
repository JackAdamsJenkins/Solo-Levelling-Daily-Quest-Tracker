import { getTodayDateString, getIsoDateString } from '../utils/date_helpers';
import { DIFFICULTY, QUEST_CONFIG, getQuestsForDifficulty } from '../data/quest_data';

const addTimerStateToQuests = (quests) => {
    return quests.map(q => {
        if (q.id === 'running') {
            return {
                ...q,
                time: q.time || 0,
                isActive: q.isActive || false,
            };
        }
        return q;
    });
};

export const initialState = {
    streak: 0,
    lastCompletedDate: null,
    history: [],
    difficulty: DIFFICULTY.INTERMEDIATE,
    quests: addTimerStateToQuests(getQuestsForDifficulty(DIFFICULTY.INTERMEDIATE)),
    lastActivityDate: getTodayDateString(),
    dailyQuestCompleted: false,
};

export function questReducer(state, action) {
    switch (action.type) {
        case 'LOAD_STATE': {
            const loadedState = { ...initialState, ...action.payload };
            const difficulty = loadedState.difficulty || DIFFICULTY.INTERMEDIATE;
            const quests = loadedState.quests && loadedState.quests.length > 0
                ? addTimerStateToQuests(loadedState.quests)
                : addTimerStateToQuests(getQuestsForDifficulty(difficulty));
            
            const todayIso = getIsoDateString(new Date());
            const dailyQuestCompleted = loadedState.history.includes(todayIso);

            return {
                ...loadedState,
                difficulty,
                quests,
                dailyQuestCompleted,
            };
        }

        case 'SET_DIFFICULTY': {
            if (state.difficulty === action.payload) return state;
            const newDifficulty = action.payload;
            const newTargets = QUEST_CONFIG[newDifficulty];
            const newQuests = state.quests.map(q => {
                const newTarget = newTargets[q.id]?.target || q.target;
                const isCompleted = q.current >= newTarget;
                return { ...q, target: newTarget, completed: isCompleted };
            });
            return {
                ...state,
                difficulty: newDifficulty,
                quests: newQuests,
                lastActivityDate: getTodayDateString(),
            };
        }
        
        case 'UPDATE_REPS': {
            const { id, amount } = action.payload;
            return {
                ...state,
                quests: state.quests.map(q => {
                    if (q.id === id) {
                        const newCurrent = Math.max(0, Math.min(q.target, q.current + amount));
                        const isCompleted = newCurrent >= q.target;
                        return { ...q, current: newCurrent, completed: isCompleted };
                    }
                    return q;
                }),
                lastActivityDate: getTodayDateString(),
            };
        }

        case 'TOGGLE_RUN_TIMER': {
            return {
                ...state,
                quests: state.quests.map(q =>
                    q.id === 'running' ? { ...q, isActive: !q.isActive } : q
                ),
                lastActivityDate: getTodayDateString(),
            };
        }
        
        case 'UPDATE_RUN_TIME': {
            const { time } = action.payload;
            return {
                ...state,
                quests: state.quests.map(q => 
                    q.id === 'running' ? { ...q, time } : q
                ),
            };
        }

        case 'COMPLETE_RUN': {
             return {
                ...state,
                quests: state.quests.map(q =>
                    q.id === 'running' ? { ...q, completed: true, current: q.target, isActive: false } : q
                ),
                lastActivityDate: getTodayDateString(),
            };
        }
        
        case 'RESET_RUN': {
             return {
                ...state,
                quests: state.quests.map(q => 
                    q.id === 'running' ? { ...q, time: 0, completed: false, current: 0, isActive: false } : q
                ),
                 lastActivityDate: getTodayDateString(),
            };
        }

        case 'RESET_DAILY_QUESTS': {
            const newQuests = addTimerStateToQuests(getQuestsForDifficulty(state.difficulty));
            return {
                ...state,
                quests: newQuests,
                dailyQuestCompleted: false,
                lastActivityDate: getTodayDateString(),
            };
        }

        case 'COMPLETE_DAILY_QUEST': {
            const today = new Date();
            const lastDate = state.lastCompletedDate ? new Date(state.lastCompletedDate) : null;
            let newStreak = state.streak;
            const todayString = getIsoDateString(today);

            if (state.history.includes(todayString)) {
                return state;
            }

            if (lastDate) {
                const yesterday = new Date(today);
                yesterday.setDate(today.getDate() - 1);
                if (getIsoDateString(lastDate) === getIsoDateString(yesterday)) {
                    newStreak++;
                } else if (getIsoDateString(lastDate) !== getIsoDateString(today)) {
                    newStreak = 1;
                }
            } else {
                newStreak = 1;
            }
            
            const newHistory = [...state.history, todayString];

            return {
                ...state,
                streak: newStreak,
                lastCompletedDate: today.toISOString(),
                history: newHistory,
                dailyQuestCompleted: true,
            };
        }
        
        default:
            return state;
    }
}
