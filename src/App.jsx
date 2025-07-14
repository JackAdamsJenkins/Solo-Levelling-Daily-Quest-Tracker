import { CalendarDays, CheckCircle2 } from 'lucide-react';
import { useEffect, useReducer, useState } from 'react';
import DifficultySelector from './components/DifficultySelector';
import HistoryModal from './components/HistoryModal';
import Modal from './components/Modal';
import QuestLog from './components/QuestLog';
import StreakCounter from './components/StreakCounter';
import { QuestDispatchContext } from './context/QuestContext';
import { COOLDOWN_ROUTINE, WARMUP_ROUTINE } from './data/routines';
import { initialState, questReducer } from './state/quest_reducer';
import { getTodayDateString } from './utils/date_helpers';

function App() {
    const [state, dispatch] = useReducer(questReducer, initialState);
    const [isWarmupOpen, setWarmupOpen] = useState(false);
    const [isCooldownOpen, setCooldownOpen] = useState(false);
    const [isHistoryOpen, setHistoryOpen] = useState(false);

    useEffect(() => {
        try {
            const savedState = localStorage.getItem('soloQuestState');
            if (savedState) {
                const parsedState = JSON.parse(savedState);
                if (parsedState.lastActivityDate !== getTodayDateString()) {
                    dispatch({ type: 'RESET_DAILY_QUESTS' });
                } else {
                    dispatch({ type: 'LOAD_STATE', payload: parsedState });
                }
            } else {
                setWarmupOpen(true);
            }
        } catch (error) {
            console.error("Failed to load state from localStorage", error);
            dispatch({ type: 'RESET_DAILY_QUESTS' });
        }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem('soloQuestState', JSON.stringify(state));
        } catch (error) {
            console.error("Failed to save state to localStorage", error);
        }
    }, [state]);

    const handleCompleteQuest = () => {
        dispatch({ type: 'COMPLETE_DAILY_QUEST' });
        setCooldownOpen(true);
    };

    const allQuestsDone = state.quests.every(q => q.completed);
    const canComplete = allQuestsDone && !state.dailyQuestCompleted;

    return (
        <QuestDispatchContext.Provider value={dispatch}>
            <div className="system-window w-full max-w-2xl p-6 space-y-4">
                <header className="flex justify-between items-center pb-4 border-b border-[var(--color-border)]">
                    <h1 className="text-2xl sm:text-3xl glow-text">[Daily Quest]</h1>
                    <div className="flex flex-row items-center gap-2 sm:gap-4 w-full max-w-xs">
                        <div className="flex flex-row items-center gap-2 flex-shrink-0">
                            <StreakCounter streak={state.streak} />
                        </div>
                        <button onClick={() => setHistoryOpen(true)} className="btn-action p-2 rounded-full flex items-center justify-center flex-shrink-0" aria-label="View completion history">
                            <CalendarDays size={20} />
                        </button>
                    </div>
                </header>

                <main className="space-y-4">
                    <DifficultySelector currentDifficulty={state.difficulty} />
                    <div className="quest-log-container">
                        <QuestLog quests={state.quests} />
                    </div>

                    {canComplete && (
                        <div className="flex justify-center pt-4">
                            <div className="flex flex-row items-center gap-4 w-full max-w-xs">
                                <button onClick={handleCompleteQuest} className="btn-primary btn-complete-pulse flex items-center space-x-2 text-lg px-6 py-3 w-full">
                                    <CheckCircle2 size={24} />
                                    <span>Complete Quest</span>
                                </button>
                            </div>
                        </div>
                    )}
                </main>

                <footer className="text-center text-sm pt-4 border-t border-[var(--color-border)]">
                    <p>※ Warning: Failure to complete the Daily Quest will result in a penalty.</p>
                </footer>

                <Modal isOpen={isWarmupOpen} onClose={() => setWarmupOpen(false)} title="Warm-up Routine">
                    <table>
                        <thead><tr><th>Exercise (Dynamic)</th><th>Duration/Reps</th></tr></thead>
                        <tbody>
                            {WARMUP_ROUTINE.map(item => (
                                <tr key={item.exercise}>
                                    <td>{item.exercise}</td>
                                    <td>{item.duration}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Modal>

                <Modal isOpen={isCooldownOpen} onClose={() => setCooldownOpen(false)} title="Quest Complete! Cool-down">
                    <table>
                        <thead><tr><th>Exercise (Static)</th><th>Hold Duration</th></tr></thead>
                        <tbody>
                            {COOLDOWN_ROUTINE.map(item => (
                                <tr key={item.exercise}>
                                    <td>{item.exercise}</td>
                                    <td>{item.duration}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p className="mt-4 text-lg text-center glow-text-complete">Well done, Hunter. Your reward has been delivered.</p>
                </Modal>

                <HistoryModal isOpen={isHistoryOpen} onClose={() => setHistoryOpen(false)} history={state.history || []} />
            </div>
        </QuestDispatchContext.Provider>
    );
}

export default App;
