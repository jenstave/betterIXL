/**
 * MathQuest - Main Application
 *
 * Handles UI, scoring (no penalty!), story progression, and interactions.
 * Supports multiple stories (one per topic) and a story toggle.
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
        storiesEnabled: true,
        pendingStoryPage: null,
        pendingStoryId: null,
        // Per-topic story progress
        storyProgress: {
            fraction_blade: { pagesUnlocked: 0, completed: false },
            shadow_mirror: { pagesUnlocked: 0, completed: false },
            crystal_garden: { pagesUnlocked: 0, completed: false }
        },
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
        correctNoStory: [
            "Amazing! You nailed it!",
            "That's right! Keep it up!",
            "Perfect! You're on fire!",
            "Sugoi! (That means awesome!)",
            "Brilliant answer!",
            "You're a fraction wizard!",
            "Exactly right!",
            "+XP! You're getting stronger!"
        ],
        streak: [
            "You're on a streak! Keep going!",
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

    // --- Helpers ---

    function getCurrentStoryId() {
        return Stories.getStoryIdForTopic(state.currentTopic);
    }

    function getCurrentStoryProgress() {
        const storyId = getCurrentStoryId();
        if (!storyId || !state.storyProgress[storyId]) return null;
        return state.storyProgress[storyId];
    }

    function getTotalPagesForCurrentTopic() {
        const storyId = getCurrentStoryId();
        return storyId ? Stories.getTotalPages(storyId) : 0;
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
        updateTitleDisplay();
    }

    function showTopicSelect() {
        switchScreen('topics');
        updateTopicStats();
        updateStatsDisplay();
        updateToggleButton();
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

    // --- Story Toggle ---

    function toggleStories() {
        state.storiesEnabled = !state.storiesEnabled;
        updateToggleButton();
        updateStoryBarVisibility();
        saveState();
    }

    function updateToggleButton() {
        const btn = document.getElementById('btn-toggle-stories');
        if (!btn) return;
        if (state.storiesEnabled) {
            btn.innerHTML = '&#128214; Stories: ON';
            btn.classList.add('toggle-on');
            btn.classList.remove('toggle-off');
        } else {
            btn.innerHTML = '&#128214; Stories: OFF';
            btn.classList.remove('toggle-on');
            btn.classList.add('toggle-off');
        }

        // Update subtitle text
        const subtitle = document.querySelector('#screen-topics .screen-subtitle');
        if (subtitle) {
            subtitle.textContent = state.storiesEnabled
                ? 'Each correct answer unlocks the next page of the story!'
                : 'Practice mode -- earn XP without story pages!';
        }

        // Show/hide storybook access
        const bookAccess = document.querySelector('.storybook-access');
        if (bookAccess) {
            bookAccess.style.display = state.storiesEnabled ? '' : 'none';
        }

        // Show/hide story progress on topic cards
        document.querySelectorAll('.topic-story-info').forEach(el => {
            el.style.display = state.storiesEnabled ? '' : 'none';
        });
    }

    function updateStoryBarVisibility() {
        const bar = document.querySelector('.story-bar-container');
        if (bar) {
            bar.style.display = state.storiesEnabled ? '' : 'none';
        }
        const pagesStatPractice = document.getElementById('pages-stat-practice');
        if (pagesStatPractice) {
            pagesStatPractice.style.display = state.storiesEnabled ? '' : 'none';
        }
    }

    // --- Question Flow ---

    function nextQuestion() {
        state.questionNumber++;
        state.answered = false;
        state.lastAnswerCorrect = false;
        state.pendingStoryPage = null;
        state.pendingStoryId = null;
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

        state.sessionAttempted++;
        if (state.topicStats[state.currentTopic]) {
            state.topicStats[state.currentTopic].attempted++;
        }
        state.answered = true;

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
        if (state.topicStats[state.currentTopic]) {
            state.topicStats[state.currentTopic].correct++;
        }
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

        // Story unlock (only if stories enabled)
        const storyId = getCurrentStoryId();
        const progress = getCurrentStoryProgress();
        const totalPages = getTotalPagesForCurrentTopic();

        if (state.storiesEnabled && storyId && progress && progress.pagesUnlocked < totalPages) {
            state.pendingStoryPage = progress.pagesUnlocked;
            state.pendingStoryId = storyId;
            progress.pagesUnlocked++;
            updateStoryBar();

            // Show toast
            const page = Stories.getPage(storyId, state.pendingStoryPage);
            if (page) {
                const story = Stories.getStory(storyId);
                showStoryToast(state.pendingStoryPage + 1, page.title, story.title);
            }

            // Update button
            const nextBtn = document.getElementById('btn-next');
            nextBtn.innerHTML = '&#128214; Read Next Story Page! \u2192';

            // Check story complete
            if (progress.pagesUnlocked >= totalPages && !progress.completed) {
                progress.completed = true;
            }
        }

        // Also unlock bonus story pages if both main stories are done
        checkBonusStoryUnlock();

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
            setMascotMessage(pickMsg(state.storiesEnabled ? 'correct' : 'correctNoStory'));
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

    function checkBonusStoryUnlock() {
        // Bonus story "crystal_garden" unlocks pages when BOTH main stories are complete
        const fb = state.storyProgress.fraction_blade;
        const sm = state.storyProgress.shadow_mirror;
        if (!fb.completed || !sm.completed) return;

        const bonus = state.storyProgress.crystal_garden;
        const totalBonus = Stories.getTotalPages('crystal_garden');
        if (bonus.pagesUnlocked < totalBonus) {
            bonus.pagesUnlocked++;
            if (bonus.pagesUnlocked >= totalBonus) {
                bonus.completed = true;
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
        if (state.pendingStoryPage !== null && state.pendingStoryId) {
            showStoryPage(state.pendingStoryId, state.pendingStoryPage);
        } else {
            nextQuestion();
        }
    }

    // --- Story System ---

    function showStoryPage(storyId, pageIndex) {
        const page = Stories.getPage(storyId, pageIndex);
        const story = Stories.getStory(storyId);
        if (!page || !story) { nextQuestion(); return; }

        const totalPages = story.totalPages;

        document.getElementById('story-chapter').textContent = `Chapter ${page.chapter}`;
        document.getElementById('story-page-count').textContent = `Page ${pageIndex + 1} / ${totalPages}`;
        document.getElementById('story-page-title').textContent = page.title;
        document.getElementById('story-art').innerHTML = page.art;
        document.getElementById('story-text').textContent = page.text;
        document.getElementById('story-name-display').textContent = story.title;

        const container = document.querySelector('.story-page-container');
        container.className = 'story-page-container mood-' + page.mood;

        const actionBtn = document.querySelector('.story-page-actions .btn-next-story');
        const progress = state.storyProgress[storyId];

        if (progress && progress.completed && pageIndex === totalPages - 1) {
            actionBtn.textContent = 'Story Complete! \u2192';
            actionBtn.onclick = () => { showStoryComplete(storyId); };
        } else {
            actionBtn.innerHTML = 'Keep Practicing! &#8594;';
            actionBtn.onclick = () => { App.closeStoryPage(); };
        }

        switchScreen('story-page');
    }

    function closeStoryPage() {
        const storyId = state.pendingStoryId;
        const progress = storyId ? state.storyProgress[storyId] : null;
        state.pendingStoryPage = null;
        state.pendingStoryId = null;

        if (progress && progress.completed) {
            showStoryComplete(storyId);
        } else {
            switchScreen('practice');
            nextQuestion();
        }
    }

    function showStoryComplete(storyId) {
        const story = Stories.getStory(storyId);
        if (!story) { showTopicSelect(); return; }

        document.getElementById('complete-xp').textContent = state.xp;
        document.getElementById('complete-level').textContent = state.level;
        document.getElementById('complete-story-name').textContent = story.title;
        document.getElementById('complete-pages-display').textContent =
            `${story.totalPages}/${story.totalPages}`;

        // Check if bonus unlocked
        const fb = state.storyProgress.fraction_blade;
        const sm = state.storyProgress.shadow_mirror;
        const bonusNotice = document.getElementById('bonus-notice');
        if (bonusNotice) {
            if (fb.completed && sm.completed) {
                bonusNotice.classList.remove('hidden');
            } else {
                bonusNotice.classList.add('hidden');
            }
        }

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
        if (from === 'title') updateTitleDisplay();
    }

    function renderStorybook() {
        const container = document.getElementById('storybook-stories');
        container.innerHTML = '';

        // Show main stories
        const mainStories = Stories.getMainStories();
        mainStories.forEach(story => {
            container.appendChild(renderStorySection(story));
        });

        // Show bonus stories if unlocked
        const bonusStories = Stories.getBonusStories();
        bonusStories.forEach(story => {
            const progress = state.storyProgress[story.id];
            if (progress && progress.pagesUnlocked > 0) {
                container.appendChild(renderStorySection(story));
            }
        });
    }

    function renderStorySection(story) {
        const progress = state.storyProgress[story.id] || { pagesUnlocked: 0 };
        const section = document.createElement('div');
        section.className = 'storybook-section';

        const header = document.createElement('div');
        header.className = 'storybook-section-header';
        header.innerHTML = `
            <h3 class="storybook-section-title">${story.title}</h3>
            <span class="storybook-section-progress">${progress.pagesUnlocked} / ${story.totalPages} pages</span>
        `;
        section.appendChild(header);

        const grid = document.createElement('div');
        grid.className = 'storybook-grid';

        for (let i = 0; i < story.totalPages; i++) {
            const page = story.pages[i];
            const unlocked = i < progress.pagesUnlocked;
            const card = document.createElement('div');
            card.className = 'storybook-card' + (unlocked ? ' unlocked' : ' locked');

            if (unlocked) {
                card.innerHTML = `
                    <div class="storybook-page-number">Page ${i + 1}</div>
                    <div class="storybook-art-mini">${page.art}</div>
                    <h3 class="storybook-card-title">${page.title}</h3>
                    <p class="storybook-card-preview">${page.text.substring(0, 80)}...</p>
                `;
                card.onclick = () => showStoryPageFromBook(story.id, i);
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

        section.appendChild(grid);
        return section;
    }

    function showStoryPageFromBook(storyId, pageIndex) {
        const page = Stories.getPage(storyId, pageIndex);
        const story = Stories.getStory(storyId);
        if (!page || !story) return;

        document.getElementById('story-chapter').textContent = `Chapter ${page.chapter}`;
        document.getElementById('story-page-count').textContent = `Page ${pageIndex + 1} / ${story.totalPages}`;
        document.getElementById('story-page-title').textContent = page.title;
        document.getElementById('story-art').innerHTML = page.art;
        document.getElementById('story-text').textContent = page.text;
        document.getElementById('story-name-display').textContent = story.title;

        const container = document.querySelector('.story-page-container');
        container.className = 'story-page-container mood-' + page.mood;

        const actionBtn = document.querySelector('.story-page-actions .btn-next-story');
        actionBtn.innerHTML = '&#8592; Back to Storybook';
        actionBtn.onclick = () => { showStorybook(); };

        switchScreen('story-page');
    }

    function showStoryToast(pageNum, title, storyTitle) {
        const toast = document.getElementById('story-unlock-toast');
        document.getElementById('toast-page-name').textContent = `${storyTitle} - Page ${pageNum}: ${title}`;
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
        if (xpTopics) xpTopics.textContent = state.xp;
        if (lvlTopics) lvlTopics.textContent = state.level;

        // Practice screen
        const xpEl = document.getElementById('stats-xp');
        const lvlEl = document.getElementById('stats-level');
        const streakEl = document.getElementById('stats-streak');
        if (xpEl) xpEl.textContent = state.xp;
        if (lvlEl) lvlEl.textContent = state.level;
        if (streakEl) streakEl.textContent = state.streak;

        // Story pages in practice (for current topic)
        const pagesEl = document.getElementById('stats-pages');
        const progress = getCurrentStoryProgress();
        const totalPages = getTotalPagesForCurrentTopic();
        if (pagesEl && progress) {
            pagesEl.textContent = progress.pagesUnlocked;
        }
        const pagesLabel = document.getElementById('stats-pages-label');
        if (pagesLabel) {
            pagesLabel.textContent = `/ ${totalPages}`;
        }

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
            if (!stats) continue;
            const fill = document.getElementById(`progress-${topic}`);
            const text = document.getElementById(`progress-text-${topic}`);
            if (fill) {
                const pct = Math.min(stats.correct / 20 * 100, 100);
                fill.style.width = `${pct}%`;
            }
            if (text) text.textContent = `${stats.correct} correct`;

            // Update per-topic story progress display
            const storyId = Stories.getStoryIdForTopic(topic);
            if (storyId) {
                const progress = state.storyProgress[storyId];
                const total = Stories.getTotalPages(storyId);
                const storyText = document.getElementById(`story-progress-${topic}`);
                if (storyText && progress) {
                    storyText.textContent = `${progress.pagesUnlocked} / ${total} pages`;
                }
                const storyFill = document.getElementById(`story-fill-${topic}`);
                if (storyFill && progress) {
                    storyFill.style.width = `${(progress.pagesUnlocked / total) * 100}%`;
                }
            }
        }
    }

    function updateStoryBar() {
        const fill = document.getElementById('story-bar-fill');
        const text = document.getElementById('story-bar-text');
        const progress = getCurrentStoryProgress();
        const totalPages = getTotalPagesForCurrentTopic();
        const storyId = getCurrentStoryId();
        const story = storyId ? Stories.getStory(storyId) : null;

        if (fill && progress) {
            fill.style.width = `${(progress.pagesUnlocked / totalPages) * 100}%`;
        }
        if (text && progress && story) {
            text.textContent = `${story.title}: ${progress.pagesUnlocked} / ${totalPages} pages`;
        }
    }

    function updateTitleDisplay() {
        // Show total story progress across all stories
        let totalUnlocked = 0;
        let totalPages = 0;
        Stories.getAllStories().forEach(story => {
            const progress = state.storyProgress[story.id];
            if (progress) {
                totalUnlocked += progress.pagesUnlocked;
            }
            totalPages += story.totalPages;
        });

        const fill = document.getElementById('title-story-fill');
        const text = document.getElementById('title-story-text');
        if (fill) fill.style.width = `${(totalUnlocked / totalPages) * 100}%`;
        if (text) text.textContent = `Stories: ${totalUnlocked} / ${totalPages} pages unlocked`;
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
            storiesEnabled: state.storiesEnabled,
            storyProgress: state.storyProgress,
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

                if (typeof data.storiesEnabled === 'boolean') {
                    state.storiesEnabled = data.storiesEnabled;
                }

                // Load story progress (new format)
                if (data.storyProgress) {
                    for (const key of Object.keys(state.storyProgress)) {
                        if (data.storyProgress[key]) {
                            state.storyProgress[key] = data.storyProgress[key];
                        }
                    }
                }

                // Migrate old single-story format
                if (!data.storyProgress && typeof data.storyPagesUnlocked === 'number') {
                    state.storyProgress.fraction_blade.pagesUnlocked = data.storyPagesUnlocked;
                    state.storyProgress.fraction_blade.completed = data.storyCompleted || false;
                }

                // Load topicStats (validate keys)
                if (data.topicStats &&
                    data.topicStats.multiply_fractions &&
                    data.topicStats.divide_fractions) {
                    state.topicStats = data.topicStats;
                }
            }
        } catch (e) {}
    }

    // --- Init ---

    function init() {
        loadState();
        initParticles();
        updateStatsDisplay();
        updateTitleDisplay();
        updateToggleButton();

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
        closeStoryPage,
        toggleStories
    };
})();
