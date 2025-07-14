# Solo Leveling Daily Quest Tracker

**Status:** Final 

**Date:** 7/14/2025

---

### **1. Project Overview**

This report marks the final summary of the "Solo Leveling Daily Quest Tracker" project. Inspired by the popular manhwa and anime series *Solo Leveling*, the application was developed to provide users with a gamified, motivating tool to track a daily fitness regimen.

The core objective was to create a responsive React web application that mirrors the series' "System" user interface, encouraging consistency in a simple calisthenics and running routine. The target audience includes fans of the series and individuals seeking a structured, gamified approach to daily fitness.

---

### **2. Key Features**

The application successfully implements all core features defined in the initial design, refined through an iterative development process.

- **Daily Quest System:** Users can track their progress on the four main exercises: Push-ups, Sit-ups, Squats, and a 10km Run. Rep-based exercises use progress bars and simple controls, while the run is tracked with a dedicated timer.
- **Adjustable Difficulty:** To cater to various fitness levels, the application features three difficulty settings: Beginner, Intermediate, and Advanced. These settings adjust the target repetitions for the calisthenics exercises.
- **Workout History & Streaks:** The application logs daily completions and visualizes this data in a comprehensive calendar view. A streak counter increments for each consecutive day the full quest is completed, providing a powerful motivational element.
- **Run Timer:** The running quest includes a stopwatch-style timer. Logic was refined to decouple the timer from completion, requiring an explicit user action to mark the run as finished, ensuring accurate tracking. The timer's state persists across page reloads.
- **Guided Routines:** To promote safe exercise habits, the application presents structured warm-up and cool-down routines in modal windows at the start and end of a session, respectively.

Feature

Description

Status

| Daily Quest Logging | Tracking for reps and run completion. | ✅ Implemented |
| --- | --- | --- |
| Difficulty Levels | Beginner, Intermediate, and Advanced settings for reps. | ✅ Implemented |
| Streak Counter | Tracks consecutive days of full quest completion. | ✅ Implemented |
| History Calendar | A modal view showing all past completed days. | ✅ Implemented |
| Persistent State | All user progress is saved locally in the browser. | ✅ Implemented |
| Guided Routines | Warm-up and cool-down modals. | ✅ Implemented |

---

### **3. Technical Architecture**

The application is built on a modern, robust, and maintainable technical stack, adhering to current best practices in web development.

- **Core Framework:** The application is a single-page application (SPA) built with **React**.
- **Build Tool:** **Vite** is used for its fast development server and optimized build process.
- **State Management:**
- Global application state (quests, streaks, history) is managed using the `useReducer` hook for predictable state transitions.
- To prevent "prop drilling," the **React Context API** (`QuestDispatchContext`) is implemented to provide the `dispatch` function directly to components that need it, resulting in a cleaner and more scalable architecture.
- **Project Structure:** The codebase is organized into modular components (e.g., `QuestLog`, `ExerciseItem`, `RunTracker`, `HistoryCalendar`), promoting reusability and ease of maintenance. Data and utility functions are separated into dedicated directories (`src/data`, `src/utils`).

**Key Architectural Decisions:**

- **Centralized State Logic:** The `quest_reducer.js` file centralizes all business logic for state changes, decoupling it from the UI components.
- **Robust Date Handling:** All date-related operations were standardized to use the ISO 8601 format (`YYYY-MM-DD`) to ensure the reliability of the daily reset and streak logic across different user locales.
- **Persistent Run Timer:** The state for the run timer (`isActive` and `time`) was integrated into the global reducer, ensuring that run progress is saved to `localStorage` and persists across browser sessions.

---

### **4. UI/UX Design**

The user interface is a core part of the experience, designed to be immersive and thematic.

- **Theme:** The UI emulates the "System" status window from *Solo Leveling*, featuring a dark, futuristic aesthetic. The color palette is built on a near-black background (`#0a0a1a`) with glowing blue (`#00aaff`) and gold (`#ffcc00`) accents for key elements and completion indicators.
- **Typography:** The `Share Tech Mono` font is used throughout the application to enhance the digital, game-like feel of a system interface.
- **Layout:** The application uses a single-view dashboard that presents all quest information clearly. Progress bars provide immediate visual feedback, and interactive elements are distinct and responsive. The entire interface is wrapped in a "system window" container with a semi-transparent background and subtle animations to create a holographic effect.
- **Accessibility:** All icon-only interactive elements have been equipped with appropriate `aria-label` attributes to ensure usability with assistive technologies.

---

### **5. Conclusion**

The "Solo Leveling Daily Quest Tracker" project has been successfully completed, resulting in a stable, robust, and feature-rich workout application. It fully realizes the initial vision of a gamified fitness tool that is both functional and highly motivating for its target audience.

Through iterative refinement and a focus on architectural integrity, the application now stands as a high-quality example of a modern React application. It effectively meets the user's goal of turning a daily workout into an engaging "quest."