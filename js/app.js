/**
 * MathQuest - Main Application
 *
 * Handles UI, scoring (no penalty!), story progression, and interactions.
 */

const App = (() => {
    // --- State ---
    const state = {
        currentScreen: 'title',
        previousScreen: null,
        currentTopic: null,
        currentQuestion: null,
        questionNumber: 0,
        xp: 0,
        level: 1,
        streak: 0,
        bestStreak: 0,
        sessionCorrect: 0,
        sessionAttempted: 0,
        answered: false,
        lastAnswerCorrect: false,
        storyPagesUnlocked: 0,
        storyCompleted: false,
        pendingStoryPage: null, // page index to show after answer
        topicStats: {
            multiply_fractions: { correct: 0, attempted: 0 },
            divide_fractions: { correct: 0, attempted: 0 }
        }
    };

    // --- Config ---
    const XP_CORRECT = 10;
    const XP_STREAK_BONUS = 5;
    const STREAK_MILESTONE = 3;
    const XP_PER_LEVEL = 100;
    const TOTAL_STORY_PAGES = Story.getTotalPages();

    // --- Mascot Messages ---
    const messages = {
        greeting: [
            "You got this! Let's unlock the next page!",
            "Ready for some fractions?",
            "I believe in you!",
            "Let's continue the story!",
            "Math time! What happens next?"
        ],
        correct: [
            "Amazing! You nailed it!",
            "Correct! New story page incoming!",
            "That's right! Keep it up!",
            "Perfect! You're on fire!",
            "Sugoi! (That means awesome!)",
            "Brilliant answer!",
            "You're a fraction wizard!",
            "Exactly right!"
        ],
        streak: [
            "You're on a streak! The story keeps going!",
            "Unstoppable! What a combo!",
            "Incredible streak! Don't stop!",
            "You're blazing through these!",
            "Combo streak! So cool!"
        ],
        incorrect: [
            "Not quite, but don't give up!",
            "Almost! Try the next one!",
            "That's okay! Every mistake helps you learn!",
            "Keep going! You'll get the next one!",
            "No worries! Practice makes perfect!",
            "Nice try! Let's keep going!"
        ],
        storyUnlock: [
            "New page unlocked! Let's read it!",
            "The story continues! Check it out!",
            "You unlocked the next chapter!",
            "What happens next? Let's find out!"
        ],
        levelUp: [
            "Level up! You're getting stronger!",
            "New level! Amazing!",
            "Wow, level up! Keep going!",
            "You leveled up! So proud!",
            "Level up! You're a math hero!"
        ]
    };

    function pickMsg(category) {
        const arr = messages[category];
        return arr[Math.floor(Math.random() * arr.length)];
    }

    // --- Screen Management ---

    function switchScreen(screenId) {
        state.previousScreen = state.currentScreen;
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        const screen = document.getElementById(`screen-${screenId}`);
        if (screen) {
            screen.classList.add('active');
            state.currentScreen = screenId;
        }
    }

    function showTitle() {
        switchScreen('title');
        updateTitleStoryProgress();
    }

    function showTopicSelect() {
        switchScreen('topics');
        updateTopicStats();
        updateStatsDisplay();
    }

    function selectTopic(topic) {
        state.currentTopic = topic;
        state.questionNumber = 0;
        state.sessionCorrect = 0;
        state.sessionAttempted = 0;
        state.streak = 0;
        state.bestStreak = 0;
        switchScreen('practice');
        updateStatsDisplay();
        updateStoryBar();
        setMascotMessage(pickMsg('greeting'));
        setMascotMood('happy');
        nextQuestion();
    }

    // --- Question Flow ---

    function nextQuestion() {
        state.questionNumber++;
        state.answered = false;
        state.lastAnswerCorrect = false;
        state.pendingStoryPage = null;
        state.currentQuestion = Questions.generate(state.currentTopic);

        const q = state.currentQuestion;
        const topicLabel = state.currentTopic === 'multiply_fractions' ? 'Multiply Fractions' : 'Divide Fractions';

        document.getElementById('question-topic').textContent = topicLabel;
        document.getElementById('question-number').textContent = `Q${state.questionNumber}`;
        document.getElementById('question-text').innerHTML = q.questionHTML;
        document.getElementById('feedback').textContent = '';
        document.getElementById('feedback').className = 'feedback';
        document.getElementById('explanation').textContent = '';
        document.getElementById('btn-submit').classList.remove('hidden');
        document.getElementById('btn-submit').disabled = false;
        document.getElementById('btn-next').classList.add('hidden');

        // Update next button text based on whether a story page is pending
        document.getElementById('btn-next').textContent = 'Next Question \u2192';

        buildAnswerInput(q);

        setTimeout(() => {
            const firstInput = document.querySelector('#answer-input-area input');
            if (firstInput) firstInput.focus();
        }, 100);

        const card = document.getElementById('question-card');
        card.classList.remove('pop');
        void card.offsetWidth;
        card.classList.add('pop');
    }

    function buildAnswerInput(question) {
        const area = document.getElementById('answer-input-area');
        // All questions are fraction type now - provide whole + numerator/denominator
        area.innerHTML = `
            <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap; justify-content:center;">
                <div style="text-align:center;">
                    <span class="frac-label">Whole (optional)</span>
                    <input type="number" class="answer-input" id="answer-whole"
                           placeholder="0" style="width:80px" autocomplete="off"
                           onkeydown="if(event.key==='Enter') App.submitAnswer()">
                </div>
                <div class="fraction-input-group">
                    <span class="frac-label">Numerator</span>
                    <input type="number" class="answer-input" id="answer-num"
                           placeholder="?" autocomplete="off"
                           onkeydown="if(event.key==='Enter') App.submitAnswer()">
                    <div class="frac-line"></div>
                    <input type="number" class="answer-input" id="answer-den"
                           placeholder="?" autocomplete="off"
                           onkeydown="if(event.key==='Enter') App.submitAnswer()">
                    <span class="frac-label">Denominator</span>
                </div>
            </div>
        `;
    }

    function getUserAnswer() {
        return {
            whole: document.getElementById('answer-whole').value,
            num: document.getElementById('answer-num').value,
            den: document.getElementById('answer-den').value
        };
    }

    function submitAnswer() {
        if (state.answered) return;

        const q = state.currentQuestion;
        const userAnswer = getUserAnswer();

        // Need at least whole OR (numerator AND denominator)
        const hasWhole = userAnswer.whole !== '' && userAnswer.whole !== undefined;
        const hasFraction = userAnswer.num !== '' && userAnswer.den !== '';
        if (!hasWhole && !hasFraction) return;

        state.answered = true;
        state.sessionAttempted++;
        state.topicStats[state.currentTopic].attempted++;

        const isCorrect = Questions.checkAnswer(q, userAnswer);
        state.lastAnswerCorrect = isCorrect;

        const card = document.getElementById('question-card');
        const feedback = document.getElementById('feedback');
        const explanation = document.getElementById('explanation');
        const submitBtn = document.getElementById('btn-submit');
        const nextBtn = document.getElementById('btn-next');

        submitBtn.classList.add('hidden');
        nextBtn.classList.remove('hidden');

        if (isCorrect) {
            handleCorrect(card, feedback, explanation, q);
        } else {
            handleIncorrect(card, feedback, explanation, q);
        }

        updateSessionStats();
        updateStatsDisplay();
        saveState();

        setTimeout(() => nextBtn.focus(), 100);
    }

    function handleCorrect(card, feedback, explanation, question) {
        state.sessionCorrect++;
        state.streak++;
        state.topicStats[state.currentTopic].correct++;
        if (state.streak > state.bestStreak) state.bestStreak = state.streak;

        // XP
        let xpGain = XP_CORRECT;
        let bonusMsg = '';
        if (state.streak > 0 && state.streak % STREAK_MILESTONE === 0) {
            const streakBonus = XP_STREAK_BONUS * (state.streak / STREAK_MILESTONE);
            xpGain += streakBonus;
            bonusMsg = ` (+${streakBonus} streak bonus!)`;
        }
        addXP(xpGain);

        // Unlock story page
        if (state.storyPagesUnlocked < TOTAL_STORY_PAGES) {
            state.pendingStoryPage = state.storyPagesUnlocked;
            state.storyPagesUnlocked++;
            updateStoryBar();

            // Show toast
            const page = Story.getPage(state.pendingStoryPage);
            showStoryToast(state.pendingStoryPage + 1, page.title);

            // Update button
            const nextBtn = document.getElementById('btn-next');
            nextBtn.innerHTML = '&#128214; Read Next Story Page! \u2192';
        }

        // Check story complete
        if (state.storyPagesUnlocked >= TOTAL_STORY_PAGES && !state.storyCompleted) {
            state.storyCompleted = true;
        }

        // UI
        card.classList.remove('pop', 'shake');
        void card.offsetWidth;
        card.classList.add('pop');

        feedback.textContent = `Correct! +${xpGain} XP${bonusMsg}`;
        feedback.className = 'feedback correct';
        explanation.textContent = question.explanation;

        document.querySelectorAll('.answer-input').forEach(input => input.classList.add('correct'));

        if (state.streak >= STREAK_MILESTONE && state.streak % STREAK_MILESTONE === 0) {
            setMascotMessage(pickMsg('streak'));
            setMascotMood('excited');
        } else if (state.pendingStoryPage !== null) {
            setMascotMessage(pickMsg('storyUnlock'));
            setMascotMood('excited');
        } else {
            setMascotMessage(pickMsg('correct'));
            setMascotMood('happy');
        }

        showXPPopup(`+${xpGain} XP`);

        if (state.streak >= 2) {
            const streakEl = document.querySelector('.streak-stat');
            if (streakEl) {
                streakEl.classList.remove('streak-fire');
                void streakEl.offsetWidth;
                streakEl.classList.add('streak-fire');
            }
        }
    }

    function handleIncorrect(card, feedback, explanation, question) {
        state.streak = 0;

        card.classList.remove('pop', 'shake');
        void card.offsetWidth;
        card.classList.add('shake');

        const correctAnswer = Questions.getAnswerDisplay(question);
        feedback.textContent = `Not quite! The answer was ${correctAnswer}`;
        feedback.className = 'feedback incorrect';
        explanation.textContent = question.explanation;

        document.querySelectorAll('.answer-input').forEach(input => input.classList.add('incorrect'));

        setMascotMessage(pickMsg('incorrect'));
        setMascotMood('sad');
    }

    // --- After answering, decide what to show ---

    function afterAnswer() {
        if (state.pendingStoryPage !== null) {
            showStoryPage(state.pendingStoryPage);
        } else {
            nextQuestion();
        }
    }

    // --- Story System ---

    function showStoryPage(pageIndex) {
        const page = Story.getPage(pageIndex);
        if (!page) { nextQuestion(); return; }

        document.getElementById('story-chapter').textContent = `Chapter ${page.chapter}`;
        document.getElementById('story-page-count').textContent = `Page ${pageIndex + 1} / ${TOTAL_STORY_PAGES}`;
        document.getElementById('story-page-title').textContent = page.title;
        document.getElementById('story-art').innerHTML = page.art;
        document.getElementById('story-text').textContent = page.text;

        // Set mood-based styling
        const container = document.querySelector('.story-page-container');
        container.className = 'story-page-container mood-' + page.mood;

        // Update button text
        const actionBtn = document.querySelector('.story-page-actions .btn-next-story');
        if (state.storyCompleted && pageIndex === TOTAL_STORY_PAGES - 1) {
            actionBtn.textContent = 'Story Complete! \u2192';
            actionBtn.onclick = () => {
                showStoryComplete();
            };
        } else {
            actionBtn.innerHTML = 'Keep Practicing! &#8594;';
            actionBtn.onclick = () => { App.closeStoryPage(); };
        }

        switchScreen('story-page');
    }

    function closeStoryPage() {
        state.pendingStoryPage = null;
        if (state.storyCompleted && state.storyPagesUnlocked >= TOTAL_STORY_PAGES) {
            showStoryComplete();
        } else {
            switchScreen('practice');
            nextQuestion();
        }
    }

    function showStoryComplete() {
        document.getElementById('complete-xp').textContent = state.xp;
        document.getElementById('complete-level').textContent = state.level;
        switchScreen('story-complete');
    }

    function showStorybook() {
        renderStorybook();
        state._storybookFrom = state.currentScreen;
        switchScreen('storybook');
    }

    function closeStorybook() {
        const from = state._storybookFrom || 'title';
        switchScreen(from);
        if (from === 'title') updateTitleStoryProgress();
    }

    function renderStorybook() {
        const grid = document.getElementById('storybook-grid');
        grid.innerHTML = '';

        for (let i = 0; i < TOTAL_STORY_PAGES; i++) {
            const page = Story.getPage(i);
            const unlocked = i < state.storyPagesUnlocked;
            const card = document.createElement('div');
            card.className = 'storybook-card' + (unlocked ? ' unlocked' : ' locked');

            if (unlocked) {
                card.innerHTML = `
                    <div class="storybook-page-number">Page ${i + 1}</div>
                    <div class="storybook-art-mini">${page.art}</div>
                    <h3 class="storybook-card-title">${page.title}</h3>
                    <p class="storybook-card-preview">${page.text.substring(0, 80)}...</p>
                `;
                card.onclick = () => showStoryPageFromBook(i);
            } else {
                card.innerHTML = `
                    <div class="storybook-page-number">Page ${i + 1}</div>
                    <div class="storybook-locked-icon">&#128274;</div>
                    <h3 class="storybook-card-title">???</h3>
                    <p class="storybook-card-preview">Answer a question correctly to unlock!</p>
                `;
            }

            grid.appendChild(card);
        }
    }

    function showStoryPageFromBook(pageIndex) {
        const page = Story.getPage(pageIndex);
        if (!page) return;

        document.getElementById('story-chapter').textContent = `Chapter ${page.chapter}`;
        document.getElementById('story-page-count').textContent = `Page ${pageIndex + 1} / ${TOTAL_STORY_PAGES}`;
        document.getElementById('story-page-title').textContent = page.title;
        document.getElementById('story-art').innerHTML = page.art;
        document.getElementById('story-text').textContent = page.text;

        const container = document.querySelector('.story-page-container');
        container.className = 'story-page-container mood-' + page.mood;

        const actionBtn = document.querySelector('.story-page-actions .btn-next-story');
        actionBtn.innerHTML = '&#8592; Back to Storybook';
        actionBtn.onclick = () => { showStorybook(); };

        switchScreen('story-page');
    }

    function showStoryToast(pageNum, title) {
        const toast = document.getElementById('story-unlock-toast');
        document.getElementById('toast-page-name').textContent = `Page ${pageNum}: ${title}`;
        toast.classList.remove('hidden');
        toast.classList.remove('toast-animate');
        void toast.offsetWidth;
        toast.classList.add('toast-animate');
        setTimeout(() => toast.classList.add('hidden'), 3000);
    }

    // --- XP & Leveling ---

    function addXP(amount) {
        state.xp += amount;
        const newLevel = Math.floor(state.xp / XP_PER_LEVEL) + 1;
        if (newLevel > state.level) {
            state.level = newLevel;
            showLevelUp(newLevel);
        }
    }

    function showLevelUp(level) {
        const modal = document.getElementById('modal-levelup');
        document.getElementById('levelup-number').textContent = level;
        document.getElementById('levelup-message').textContent = pickMsg('levelUp');
        modal.classList.remove('hidden');
    }

    function closeLevelUp() {
        document.getElementById('modal-levelup').classList.add('hidden');
    }

    // --- Mascot ---

    function setMascotMessage(msg) {
        const el = document.getElementById('mascot-message');
        if (el) el.textContent = msg;
    }

    function setMascotMood(mood) {
        const mouth = document.querySelector('#screen-practice .mascot-mouth');
        if (!mouth) return;
        mouth.className = 'mascot-mouth ' + mood;
    }

    // --- UI Updates ---

    function updateStatsDisplay() {
        // Topic screen
        const xpTopics = document.getElementById('stats-xp-topics');
        const lvlTopics = document.getElementById('stats-level-topics');
        const pagesTopics = document.getElementById('stats-pages-topics');
        if (xpTopics) xpTopics.textContent = state.xp;
        if (lvlTopics) lvlTopics.textContent = state.level;
        if (pagesTopics) pagesTopics.textContent = state.storyPagesUnlocked;

        const bookCount = document.getElementById('storybook-count-topics');
        if (bookCount) bookCount.textContent = `${state.storyPagesUnlocked} / ${TOTAL_STORY_PAGES} pages`;

        // Practice screen
        const xpEl = document.getElementById('stats-xp');
        const lvlEl = document.getElementById('stats-level');
        const streakEl = document.getElementById('stats-streak');
        const pagesEl = document.getElementById('stats-pages');
        if (xpEl) xpEl.textContent = state.xp;
        if (lvlEl) lvlEl.textContent = state.level;
        if (streakEl) streakEl.textContent = state.streak;
        if (pagesEl) pagesEl.textContent = state.storyPagesUnlocked;

        // XP bar
        const xpInLevel = state.xp % XP_PER_LEVEL;
        const xpFill = document.getElementById('xp-fill');
        const xpText = document.getElementById('xp-text');
        if (xpFill) xpFill.style.width = `${(xpInLevel / XP_PER_LEVEL) * 100}%`;
        if (xpText) xpText.textContent = `${xpInLevel} / ${XP_PER_LEVEL} XP to Level ${state.level + 1}`;
    }

    function updateSessionStats() {
        document.getElementById('session-correct').textContent = state.sessionCorrect;
        document.getElementById('session-attempted').textContent = state.sessionAttempted;
        const accuracy = state.sessionAttempted > 0
            ? Math.round((state.sessionCorrect / state.sessionAttempted) * 100) : 0;
        document.getElementById('session-accuracy').textContent = `${accuracy}%`;
        document.getElementById('session-best-streak').textContent = state.bestStreak;
    }

    function updateTopicStats() {
        for (const topic of ['multiply_fractions', 'divide_fractions']) {
            const stats = state.topicStats[topic];
            const fill = document.getElementById(`progress-${topic}`);
            const text = document.getElementById(`progress-text-${topic}`);
            if (fill) {
                const pct = Math.min(stats.correct / 20 * 100, 100);
                fill.style.width = `${pct}%`;
            }
            if (text) text.textContent = `${stats.correct} correct`;
        }
    }

    function updateStoryBar() {
        const fill = document.getElementById('story-bar-fill');
        const text = document.getElementById('story-bar-text');
        if (fill) fill.style.width = `${(state.storyPagesUnlocked / TOTAL_STORY_PAGES) * 100}%`;
        if (text) text.textContent = `${state.storyPagesUnlocked} / ${TOTAL_STORY_PAGES} pages`;
    }

    function updateTitleStoryProgress() {
        const fill = document.getElementById('title-story-fill');
        const text = document.getElementById('title-story-text');
        if (fill) fill.style.width = `${(state.storyPagesUnlocked / TOTAL_STORY_PAGES) * 100}%`;
        if (text) text.textContent = `Story: ${state.storyPagesUnlocked} / ${TOTAL_STORY_PAGES} pages unlocked`;
    }

    function showXPPopup(text) {
        const popup = document.createElement('div');
        popup.className = 'xp-popup';
        popup.textContent = text;
        popup.style.left = `${Math.random() * 40 + 30}%`;
        popup.style.top = '40%';
        document.body.appendChild(popup);
        setTimeout(() => popup.remove(), 1200);
    }

    // --- Particles ---

    function initParticles() {
        const container = document.getElementById('particles');
        const colors = ['#ff6b9d', '#c084fc', '#60a5fa', '#67e8f9', '#fbbf24'];
        for (let i = 0; i < 25; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            const size = Math.random() * 6 + 2;
            p.style.width = `${size}px`;
            p.style.height = `${size}px`;
            p.style.left = `${Math.random() * 100}%`;
            p.style.background = colors[Math.floor(Math.random() * colors.length)];
            p.style.animationDuration = `${Math.random() * 15 + 10}s`;
            p.style.animationDelay = `${Math.random() * 10}s`;
            container.appendChild(p);
        }
    }

    // --- Persistence ---

    function saveState() {
        const data = {
            xp: state.xp,
            level: state.level,
            storyPagesUnlocked: state.storyPagesUnlocked,
            storyCompleted: state.storyCompleted,
            topicStats: state.topicStats
        };
        try {
            localStorage.setItem('mathquest-save', JSON.stringify(data));
        } catch (e) {}
    }

    function loadState() {
        try {
            const saved = localStorage.getItem('mathquest-save');
            if (saved) {
                const data = JSON.parse(saved);
                state.xp = data.xp || 0;
                state.level = data.level || 1;
                state.storyPagesUnlocked = data.storyPagesUnlocked || 0;
                state.storyCompleted = data.storyCompleted || false;
                if (data.topicStats) state.topicStats = data.topicStats;
            }
        } catch (e) {}
    }

    // --- Init ---

    function init() {
        loadState();
        initParticles();
        updateStatsDisplay();
        updateTitleStoryProgress();

        // Build story bar markers
        const markers = document.getElementById('story-bar-markers');
        if (markers) {
            for (let i = 0; i < TOTAL_STORY_PAGES; i++) {
                const m = document.createElement('div');
                m.className = 'story-bar-marker';
                m.style.left = `${((i + 1) / TOTAL_STORY_PAGES) * 100}%`;
                markers.appendChild(m);
            }
        }

        setInterval(saveState, 5000);
        window.addEventListener('beforeunload', saveState);
    }

    document.addEventListener('DOMContentLoaded', init);

    return {
        showTitle,
        showTopicSelect,
        selectTopic,
        submitAnswer,
        nextQuestion,
        afterAnswer,
        closeLevelUp,
        showStorybook,
        closeStorybook,
        closeStoryPage
    };
})();
