/**
 * MathQuest - Main Application
 *
 * Handles UI, scoring (no penalty!), state, and interactions.
 */

const App = (() => {
    // --- State ---
    const state = {
        currentScreen: 'title',
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
        topicStats: {
            fractions: { correct: 0, attempted: 0 },
            multiplication: { correct: 0, attempted: 0 },
            division: { correct: 0, attempted: 0 }
        }
    };

    // --- XP Config ---
    const XP_CORRECT = 10;
    const XP_STREAK_BONUS = 5;      // extra per streak milestone
    const STREAK_MILESTONE = 3;      // every N correct in a row
    const XP_PER_LEVEL = 100;

    // --- Mascot Messages ---
    const messages = {
        greeting: [
            "You got this!",
            "Let's do some math!",
            "Ready when you are!",
            "I believe in you!",
            "Math time! Let's go!"
        ],
        correct: [
            "Amazing! You nailed it!",
            "Correct! Great work!",
            "That's right! Keep it up!",
            "Perfect! You're on fire!",
            "Sugoi! (That's awesome!)",
            "Brilliant answer!",
            "You're a math wizard!",
            "Exactly right!"
        ],
        streak: [
            "You're on a streak! Keep going!",
            "Unstoppable! What a streak!",
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
        levelUp: [
            "Level up! You're getting stronger!",
            "New level! You're amazing!",
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
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        const screen = document.getElementById(`screen-${screenId}`);
        if (screen) {
            screen.classList.add('active');
            state.currentScreen = screenId;
        }
    }

    function showTitle() {
        switchScreen('title');
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
        setMascotMessage(pickMsg('greeting'));
        setMascotMood('happy');
        nextQuestion();
    }

    // --- Question Flow ---

    function nextQuestion() {
        state.questionNumber++;
        state.answered = false;
        state.currentQuestion = Questions.generate(state.currentTopic);

        const q = state.currentQuestion;

        // Update UI
        document.getElementById('question-topic').textContent = capitalize(state.currentTopic);
        document.getElementById('question-number').textContent = `Q${state.questionNumber}`;
        document.getElementById('question-text').innerHTML = q.questionHTML;
        document.getElementById('question-visual').innerHTML = '';
        document.getElementById('feedback').textContent = '';
        document.getElementById('feedback').className = 'feedback';
        document.getElementById('explanation').textContent = '';
        document.getElementById('btn-submit').classList.remove('hidden');
        document.getElementById('btn-submit').disabled = false;
        document.getElementById('btn-next').classList.add('hidden');

        // Build answer input
        buildAnswerInput(q);

        // Focus first input
        setTimeout(() => {
            const firstInput = document.querySelector('#answer-input-area input');
            if (firstInput) firstInput.focus();
        }, 100);

        // Animate card
        const card = document.getElementById('question-card');
        card.classList.remove('pop');
        void card.offsetWidth;
        card.classList.add('pop');
    }

    function buildAnswerInput(question) {
        const area = document.getElementById('answer-input-area');
        area.innerHTML = '';

        if (question.answerType === 'number') {
            area.innerHTML = `
                <input type="number" class="answer-input" id="answer-main"
                       placeholder="Answer" autocomplete="off"
                       onkeydown="if(event.key==='Enter') App.submitAnswer()">
            `;
        } else if (question.answerType === 'decimal') {
            area.innerHTML = `
                <input type="number" step="any" class="answer-input" id="answer-main"
                       placeholder="Answer" autocomplete="off"
                       onkeydown="if(event.key==='Enter') App.submitAnswer()">
            `;
        } else if (question.answerType === 'fraction') {
            area.innerHTML = `
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
            `;
        } else if (question.answerType === 'mixed') {
            area.innerHTML = `
                <input type="number" class="answer-input" id="answer-whole"
                       placeholder="Whole" style="width:80px" autocomplete="off"
                       onkeydown="if(event.key==='Enter') App.submitAnswer()">
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
            `;
        } else if (question.answerType === 'quotient_remainder') {
            area.innerHTML = `
                <div style="display:flex; align-items:center; gap:10px;">
                    <div style="text-align:center;">
                        <span class="frac-label">Quotient</span>
                        <input type="number" class="answer-input" id="answer-quotient"
                               placeholder="?" autocomplete="off"
                               onkeydown="if(event.key==='Enter') App.submitAnswer()">
                    </div>
                    <span class="operator">R</span>
                    <div style="text-align:center;">
                        <span class="frac-label">Remainder</span>
                        <input type="number" class="answer-input" id="answer-remainder"
                               placeholder="?" autocomplete="off"
                               onkeydown="if(event.key==='Enter') App.submitAnswer()">
                    </div>
                </div>
            `;
        }
    }

    function getUserAnswer() {
        const q = state.currentQuestion;

        if (q.answerType === 'number' || q.answerType === 'decimal') {
            return document.getElementById('answer-main').value;
        }

        if (q.answerType === 'fraction') {
            return {
                num: document.getElementById('answer-num').value,
                den: document.getElementById('answer-den').value
            };
        }

        if (q.answerType === 'mixed') {
            return {
                whole: document.getElementById('answer-whole').value,
                num: document.getElementById('answer-num').value,
                den: document.getElementById('answer-den').value
            };
        }

        if (q.answerType === 'quotient_remainder') {
            return {
                quotient: document.getElementById('answer-quotient').value,
                remainder: document.getElementById('answer-remainder').value
            };
        }
    }

    function submitAnswer() {
        if (state.answered) return;

        const q = state.currentQuestion;
        const userAnswer = getUserAnswer();

        // Basic validation - check if inputs are filled
        if (!isAnswerFilled(userAnswer, q.answerType)) return;

        state.answered = true;
        state.sessionAttempted++;
        state.topicStats[state.currentTopic].attempted++;

        const isCorrect = Questions.checkAnswer(q, userAnswer);
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

        // Focus next button
        setTimeout(() => nextBtn.focus(), 100);
    }

    function isAnswerFilled(answer, type) {
        if (type === 'number' || type === 'decimal') {
            return answer !== '' && answer !== undefined;
        }
        if (type === 'fraction') {
            return answer.num !== '' && answer.den !== '';
        }
        if (type === 'mixed') {
            return answer.den !== '' && answer.num !== '';
        }
        if (type === 'quotient_remainder') {
            return answer.quotient !== '' && answer.remainder !== '';
        }
        return false;
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

        // UI feedback
        card.classList.remove('pop', 'shake');
        void card.offsetWidth;
        card.classList.add('pop');

        feedback.textContent = `Correct! +${xpGain} XP${bonusMsg}`;
        feedback.className = 'feedback correct';
        explanation.textContent = question.explanation;

        // Mark inputs as correct
        document.querySelectorAll('.answer-input').forEach(input => {
            input.classList.add('correct');
        });

        // Mascot
        if (state.streak >= STREAK_MILESTONE && state.streak % STREAK_MILESTONE === 0) {
            setMascotMessage(pickMsg('streak'));
            setMascotMood('excited');
        } else {
            setMascotMessage(pickMsg('correct'));
            setMascotMood('happy');
        }

        // XP popup animation
        showXPPopup(`+${xpGain} XP`);

        // Streak fire animation
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
        // NO XP PENALTY! This is the key difference from IXL.
        state.streak = 0;

        card.classList.remove('pop', 'shake');
        void card.offsetWidth;
        card.classList.add('shake');

        const correctAnswer = Questions.getAnswerDisplay(question);
        feedback.textContent = `Not quite! The answer was ${correctAnswer}`;
        feedback.className = 'feedback incorrect';
        explanation.textContent = question.explanation;

        // Mark inputs
        document.querySelectorAll('.answer-input').forEach(input => {
            input.classList.add('incorrect');
        });

        // Mascot
        setMascotMessage(pickMsg('incorrect'));
        setMascotMood('sad');
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
        // Topic screen stats
        const xpTopics = document.getElementById('stats-xp-topics');
        const lvlTopics = document.getElementById('stats-level-topics');
        if (xpTopics) xpTopics.textContent = state.xp;
        if (lvlTopics) lvlTopics.textContent = state.level;

        // Practice screen stats
        const xpEl = document.getElementById('stats-xp');
        const lvlEl = document.getElementById('stats-level');
        const streakEl = document.getElementById('stats-streak');
        if (xpEl) xpEl.textContent = state.xp;
        if (lvlEl) lvlEl.textContent = state.level;
        if (streakEl) streakEl.textContent = state.streak;

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
            ? Math.round((state.sessionCorrect / state.sessionAttempted) * 100)
            : 0;
        document.getElementById('session-accuracy').textContent = `${accuracy}%`;
        document.getElementById('session-best-streak').textContent = state.bestStreak;
    }

    function updateTopicStats() {
        for (const topic of ['fractions', 'multiplication', 'division']) {
            const stats = state.topicStats[topic];
            const fill = document.getElementById(`progress-${topic}`);
            const text = document.getElementById(`progress-text-${topic}`);
            if (fill) {
                const pct = Math.min(stats.correct / 30 * 100, 100); // 30 questions = full bar
                fill.style.width = `${pct}%`;
            }
            if (text) text.textContent = `${stats.correct} completed`;
        }
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

    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // --- Particles Background ---

    function initParticles() {
        const container = document.getElementById('particles');
        const colors = ['#ff6b9d', '#c084fc', '#60a5fa', '#67e8f9', '#fbbf24'];
        const count = 25;

        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            const size = Math.random() * 6 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            particle.style.animationDuration = `${Math.random() * 15 + 10}s`;
            particle.style.animationDelay = `${Math.random() * 10}s`;
            container.appendChild(particle);
        }
    }

    // --- Persistence (localStorage) ---

    function saveState() {
        const data = {
            xp: state.xp,
            level: state.level,
            topicStats: state.topicStats
        };
        try {
            localStorage.setItem('mathquest-save', JSON.stringify(data));
        } catch (e) {
            // localStorage may not be available
        }
    }

    function loadState() {
        try {
            const saved = localStorage.getItem('mathquest-save');
            if (saved) {
                const data = JSON.parse(saved);
                state.xp = data.xp || 0;
                state.level = data.level || 1;
                if (data.topicStats) {
                    state.topicStats = data.topicStats;
                }
            }
        } catch (e) {
            // Ignore
        }
    }

    // Save on changes
    function saveAfterChange() {
        saveState();
    }

    // Wrap addXP to also save
    const originalAddXP = addXP;

    // --- Init ---

    function init() {
        loadState();
        initParticles();
        updateStatsDisplay();

        // Auto-save periodically
        setInterval(saveState, 5000);

        // Save on page unload
        window.addEventListener('beforeunload', saveState);
    }

    // Boot
    document.addEventListener('DOMContentLoaded', init);

    // --- Public API ---
    return {
        showTitle,
        showTopicSelect,
        selectTopic,
        submitAnswer,
        nextQuestion,
        closeLevelUp
    };
})();
