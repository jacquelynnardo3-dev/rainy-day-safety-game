const LeaderboardSystem = (() => {
    const STORAGE_KEY = "flood_survival_leaderboard";
    const DATE_KEY = "flood_survival_leaderboard_date";

    // Helper: Format current date to local YYYY-MM-DD format safely
    function getTodayString() {
        const d = new Date();
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    }

    // Enforce daily refresh check
    function checkDailyReset() {
        const today = getTodayString();
        const savedDate = localStorage.getItem(DATE_KEY);

        if (savedDate !== today) {
            // New day detected or fresh initialization: Wipe leaderboard
            localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
            localStorage.setItem(DATE_KEY, today);
        }
    }

    // Fetch and validate raw entries from localStorage safely
    function getEntries() {
        checkDailyReset();
        try {
            const data = localStorage.getItem(STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error("Leaderboard data corrupted. Resetting data.", e);
            localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
            return [];
        }
    }

    // Save a new record while applying strict filtering, sorting, and truncation rules
    function submitScore(playerName, score) {
        if (!playerName || typeof score !== 'number') return;
        
        checkDailyReset();
        let entries = getEntries();
        const formattedName = playerName.trim();
        
        const newEntry = {
            name: formattedName,
            score: score,
            date: new Date().toISOString() // Preserves detailed time context for tiebreakers
        };

        // Duplicate Check Routine
        const duplicateIndex = entries.findIndex(
            item => item.name.toLowerCase() === formattedName.toLowerCase()
        );

        if (duplicateIndex !== -1) {
            // Only update if the new performance beats their historical daily run
            if (score > entries[duplicateIndex].score) {
                entries[duplicateIndex] = newEntry;
            }
        } else {
            entries.push(newEntry);
        }

        // Sorting Matrix: Primary (Score Descending), Secondary (Date Ascending)
        entries.sort((a, b) => {
            if (b.score !== a.score) {
                return b.score - a.score;
            }
            return new Date(a.date) - new Date(b.date);
        });

        // Top 20 Truncation Filter
        if (entries.length > 20) {
            entries = entries.slice(0, 20);
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    }

    // Evaluation flag for the final ending scene qualification banner
    function qualifiesForTop20(score) {
        const entries = getEntries();
        if (entries.length < 20) return true;
        // Qualifies if score is higher than the lowest score in the top 20
        return score > entries[entries.length - 1].score;
    }

    return {
        getEntries,
        submitScore,
        qualifiesForTop20
    };
})();