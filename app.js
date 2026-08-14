/* ==========================================
   SnowPro Core Study Hub — Application
   ========================================== */
(function () {
    'use strict';

    /* ---- Week Metadata ---- */
    const WEEKS = [
        { id: 1, title: 'Architecture & Core Concepts', domain: 'Domain 1', subtitle: 'The Three-Layer Foundation', color: '#29b5f6', startDay: 1, endDay: 7 },
        { id: 2, title: 'Architecture Deep Dive', domain: 'Domain 1', subtitle: 'Objects, AI Features & Ecosystem', color: '#29b5f6', startDay: 8, endDay: 14 },
        { id: 3, title: 'Security & Governance', domain: 'Domain 2', subtitle: 'Access Control & Data Governance', color: '#7c4dff', startDay: 15, endDay: 21 },
        { id: 4, title: 'Data Loading & Performance', domain: 'Domains 3 + 4', subtitle: 'Loading, Unloading & Optimization', color: '#00e5ff', startDay: 22, endDay: 28 },
        { id: 5, title: 'Transformations & Collaboration', domain: 'Domains 4 + 5', subtitle: 'Querying, Streams & Data Sharing', color: '#ffa726', startDay: 29, endDay: 35 },
        { id: 6, title: 'Review & Mock Exams', domain: 'All Domains', subtitle: 'Final Prep & Practice Tests', color: '#66bb6a', startDay: 36, endDay: 42 }
    ];

    /* ---- Data Store ---- */
    const Data = {
        days: {},
        load() {
            const W = window.SNOWPRO || {};
            for (let i = 1; i <= 6; i++) {
                const week = W['week' + i];
                if (Array.isArray(week)) week.forEach(d => { this.days[d.day] = d; });
            }
            // Load practice exam as Day 43
            if (Array.isArray(W.practiceExam)) {
                W.practiceExam.forEach(d => { this.days[d.day] = d; });
            }
            // Load catch-up module as Day 44
            if (Array.isArray(W.day44_catchup)) {
                W.day44_catchup.forEach(d => { this.days[d.day] = d; });
            }
        },
        getDay(n) { return this.days[n] || null; },
        getWeekDays(weekId) {
            const w = WEEKS[weekId - 1];
            const days = [];
            for (let d = w.startDay; d <= w.endDay; d++) days.push(this.days[d] || { day: d, title: 'Coming Soon', sections: [], quiz: [], objectives: [] });
            return days;
        }
    };

    /* ---- Progress Manager ---- */
    const Progress = {
        KEY: 'snowpro_progress',
        data: null,
        load() {
            try { this.data = JSON.parse(localStorage.getItem(this.KEY)) || {}; } catch { this.data = {}; }
            if (!this.data.completed) this.data.completed = {};
            if (!this.data.scores) this.data.scores = {};
            if (!this.data.streak) this.data.streak = 0;
            if (!this.data.lastDate) this.data.lastDate = null;
            if (!this.data.objectives) this.data.objectives = {};
            if (!this.data.theme) this.data.theme = 'dark';
        },
        save() { try { localStorage.setItem(this.KEY, JSON.stringify(this.data)); } catch {} },
        complete(day, score) {
            this.data.completed[day] = true;
            this.data.scores[day] = Math.max(score, this.data.scores[day] || 0);
            const today = new Date().toDateString();
            if (this.data.lastDate !== today) {
                if (this.data.lastDate) {
                    const last = new Date(this.data.lastDate);
                    const diff = Math.floor((new Date(today) - last) / 86400000);
                    this.data.streak = diff === 1 ? this.data.streak + 1 : 1;
                } else { this.data.streak = 1; }
                this.data.lastDate = today;
            }
            this.save();
        },
        isComplete(day) { return !!this.data.completed[day]; },
        getScore(day) { return this.data.scores[day] ?? null; },
        getCompletedCount() { return Object.keys(this.data.completed).length; },
        getAvgScore() {
            const scores = Object.values(this.data.scores);
            if (!scores.length) return 0;
            return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
        },
        toggleObjective(day, idx) {
            const key = day + '_' + idx;
            this.data.objectives[key] = !this.data.objectives[key];
            this.save();
        },
        isObjectiveChecked(day, idx) { return !!this.data.objectives[day + '_' + idx]; },
        getNextIncompleteDay() {
            for (let d = 1; d <= 42; d++) { if (!this.isComplete(d) && Data.getDay(d)) return d; }
            return 1;
        }
    };

    /* ---- Router ---- */
    const Router = {
        init() {
            window.addEventListener('hashchange', () => this.route());
            this.route();
        },
        route() {
            const hash = location.hash || '#/';
            const main = document.getElementById('main-content');
            main.scrollTop = 0;
            window.scrollTo(0, 0);

            if (hash.startsWith('#/day/')) {
                const dayNum = parseInt(hash.split('/')[2]);
                if (dayNum >= 1 && dayNum <= 44) {
                    renderDayView(dayNum);
                    Sidebar.setActive(dayNum);
                    return;
                }
            }
            renderDashboard();
            Sidebar.setActive(null);
        },
        go(path) { location.hash = path; }
    };

    /* ---- Sidebar ---- */
    const Sidebar = {
        build() {
            const nav = document.getElementById('sidebar-nav');
            // Add SVG gradient definition for progress ring
            const ring = document.getElementById('progress-ring-fill');
            if (ring) {
                const svg = ring.closest('svg');
                const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
                defs.innerHTML = '<linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#29b5f6"/><stop offset="100%" stop-color="#7c4dff"/></linearGradient>';
                svg.insertBefore(defs, svg.firstChild);
            }
            let html = '';
            WEEKS.forEach(w => {
                html += '<div class="nav-week" data-week="' + w.id + '">';
                html += '<button class="nav-week-btn" onclick="window.__toggleWeek(' + w.id + ')">';
                html += '<span><span class="week-indicator" style="background:' + w.color + '22;color:' + w.color + '">W' + w.id + '</span> ' + w.title + '</span>';
                html += '<span class="chevron">▶</span></button>';
                html += '<div class="nav-week-days" id="nav-week-' + w.id + '">';
                for (let d = w.startDay; d <= w.endDay; d++) {
                    const day = Data.getDay(d);
                    const title = day ? day.title : 'Coming Soon';
                    const done = Progress.isComplete(d);
                    html += '<a class="nav-day-link' + (done ? ' completed' : '') + '" data-day="' + d + '" onclick="location.hash=\'#/day/' + d + '\'">';
                    html += '<span class="nav-day-status">' + (done ? '✓' : d) + '</span>';
                    html += '<span>' + title + '</span></a>';
                }
                html += '</div></div>';
            });
            nav.innerHTML = html;
        },
        update() {
            this.build();
            this.updateProgress();
        },
        updateProgress() {
            const count = Progress.getCompletedCount();
            const pct = Math.round((count / 42) * 100);
            const el = document.getElementById('progress-percent');
            if (el) el.textContent = pct + '%';
            const ring = document.getElementById('progress-ring-fill');
            if (ring) {
                const circ = 2 * Math.PI * 52;
                ring.style.strokeDashoffset = circ - (circ * pct / 100);
            }
            const streak = document.getElementById('streak-count');
            if (streak) streak.textContent = Progress.data.streak;
        },
        setActive(dayNum) {
            document.querySelectorAll('.nav-day-link').forEach(el => el.classList.remove('active'));
            if (dayNum) {
                const link = document.querySelector('.nav-day-link[data-day="' + dayNum + '"]');
                if (link) {
                    link.classList.add('active');
                    // Expand parent week
                    const weekEl = link.closest('.nav-week');
                    if (weekEl) {
                        const days = weekEl.querySelector('.nav-week-days');
                        const btn = weekEl.querySelector('.nav-week-btn');
                        if (days) days.classList.add('open');
                        if (btn) btn.classList.add('expanded');
                    }
                }
            }
            // Update breadcrumb
            const bc = document.getElementById('breadcrumb');
            if (!dayNum) {
                bc.innerHTML = '<span class="breadcrumb-item active">Dashboard</span>';
            } else {
                const day = Data.getDay(dayNum) || { title: 'Day ' + dayNum };
                const weekIdx = Math.ceil(dayNum / 7);
                bc.innerHTML = '<span class="breadcrumb-item" onclick="location.hash=\'#/\'">Dashboard</span>' +
                    '<span class="breadcrumb-sep">›</span>' +
                    '<span class="breadcrumb-item" onclick="location.hash=\'#/\'">Week ' + weekIdx + '</span>' +
                    '<span class="breadcrumb-sep">›</span>' +
                    '<span class="breadcrumb-item active">Day ' + dayNum + '</span>';
            }
        }
    };

    window.__toggleWeek = function (id) {
        const days = document.getElementById('nav-week-' + id);
        const btn = days.previousElementSibling;
        const isOpen = days.classList.contains('open');
        // Close all
        document.querySelectorAll('.nav-week-days').forEach(el => el.classList.remove('open'));
        document.querySelectorAll('.nav-week-btn').forEach(el => el.classList.remove('expanded'));
        if (!isOpen) {
            days.classList.add('open');
            btn.classList.add('expanded');
        }
    };

    /* ---- Dashboard Renderer ---- */
    function renderDashboard() {
        const main = document.getElementById('main-content');
        const completed = Progress.getCompletedCount();
        const avgScore = Progress.getAvgScore();
        const streak = Progress.data.streak;
        const nextDay = Progress.getNextIncompleteDay();

        let html = '<div class="dashboard">';
        // Hero
        html += '<section class="hero animate-in">';
        html += '<div class="hero-badge">❄️ 42-Day Certification Path</div>';
        html += '<h1>SnowPro Core <span class="gradient-text">COF-C03</span></h1>';
        html += '<p class="hero-subtitle">Master Snowflake certification with interactive lessons, diagrams & quizzes</p>';
        html += '<div class="hero-stats">';
        html += '<div class="stat-card"><span class="stat-value">' + completed + '/42</span><span class="stat-label">Days Complete</span></div>';
        html += '<div class="stat-card"><span class="stat-value">' + avgScore + '%</span><span class="stat-label">Avg Quiz Score</span></div>';
        html += '<div class="stat-card"><span class="stat-value">🔥 ' + streak + '</span><span class="stat-label">Day Streak</span></div>';
        html += '</div>';
        html += '<button class="btn btn-primary" onclick="location.hash=\'#/day/' + nextDay + '\'">Continue Learning →</button>';
        html += '</section>';

        // Weeks grid
        html += '<section class="weeks-section animate-in animate-in-delay-1">';
        html += '<h2>📅 Your 6-Week Journey</h2>';
        html += '<div class="weeks-grid">';
        WEEKS.forEach(w => {
            const days = Data.getWeekDays(w.id);
            const weekCompleted = days.filter(d => Progress.isComplete(d.day)).length;
            const pct = Math.round((weekCompleted / 7) * 100);
            html += '<div class="week-card">';
            html += '<div class="week-card-header">';
            html += '<span class="week-label" style="background:' + w.color + '18;color:' + w.color + '">' + w.domain + ' • Week ' + w.id + '</span>';
            html += '<h3>' + w.title + '</h3>';
            html += '<p class="week-desc">' + w.subtitle + '</p>';
            html += '<div class="week-progress"><div class="week-progress-fill" style="width:' + pct + '%;background:' + w.color + '"></div></div>';
            html += '</div>';
            html += '<div class="week-card-days">';
            days.forEach(d => {
                const done = Progress.isComplete(d.day);
                const score = Progress.getScore(d.day);
                html += '<div class="day-row' + (done ? ' completed' : '') + '" onclick="location.hash=\'#/day/' + d.day + '\'">';
                html += '<span class="day-dot" style="' + (done ? 'border-color:' + w.color + ';background:' + w.color + '22;color:' + w.color : '') + '">' + (done ? '✓' : d.day) + '</span>';
                html += '<div class="day-row-info"><span class="day-row-title">' + d.title + '</span></div>';
                if (score !== null) html += '<span class="day-row-score">' + score + '%</span>';
                html += '</div>';
            });
            html += '</div></div>';
        });
        html += '</div></section>';

        // Practice Exam Card
        const pe = Data.getDay(43);
        if (pe) {
            const peScore = Progress.getScore(43);
            const peDone = Progress.isComplete(43);
            html += '<section class="practice-exam-section animate-in animate-in-delay-2">';
            html += '<div class="practice-exam-card" onclick="location.hash=\'#/day/43\'">';
            html += '<div class="pe-card-glow"></div>';
            html += '<div class="pe-card-content">';
            html += '<div class="pe-badge">🏆 FULL PRACTICE EXAM</div>';
            html += '<h2>100-Question Practice Test</h2>';
            html += '<p>Simulated COF-C03 exam at real difficulty level • 115-minute timer • All 5 domains</p>';
            html += '<div class="pe-stats">';
            html += '<span class="pe-stat"><strong>100</strong> Questions</span>';
            html += '<span class="pe-stat"><strong>115</strong> Minutes</span>';
            html += '<span class="pe-stat"><strong>5</strong> Domains</span>';
            html += '</div>';
            if (peDone && peScore !== null) {
                html += '<div class="pe-result">Last Score: <strong>' + peScore + '%</strong>' + (peScore >= 75 ? ' ✅ Exam Ready!' : ' — Keep studying!') + '</div>';
            }
            html += '<button class="btn btn-primary">' + (peDone ? 'Retake Exam →' : 'Start Exam →') + '</button>';
            html += '</div></div></section>';
        }

        // Exam Cram / Catch-Up Card
        const catchup = Data.getDay(44);
        if (catchup) {
            const catchupScore = Progress.getScore(44);
            const catchupDone = Progress.isComplete(44);
            html += '<section class="practice-exam-section animate-in animate-in-delay-3" style="margin-top: 24px;">';
            html += '<div class="practice-exam-card catchup-card" onclick="location.hash=\'#/day/44\'">';
            html += '<div class="pe-card-glow" style="background: linear-gradient(135deg, rgba(16,185,129,0.15), rgba(14,165,233,0.15));"></div>';
            html += '<div class="pe-card-content">';
            html += '<div class="pe-badge" style="background: linear-gradient(135deg, #10b981, #0ea5e9);">⚡ BONUS MODULE</div>';
            html += '<h2 style="background: linear-gradient(135deg, #10b981, #0ea5e9); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">COF-C03 Final Catch-Up</h2>';
            html += '<p>Master the latest advanced features: SPCS, Dynamic Tables, Iceberg, Governance & more.</p>';
            html += '<div class="pe-stats">';
            html += '<span class="pe-stat"><strong>7</strong> Key Topics</span>';
            html += '<span class="pe-stat"><strong>14</strong> Quiz Qs</span>';
            html += '</div>';
            if (catchupDone && catchupScore !== null) {
                html += '<div class="pe-result">Score: <strong>' + catchupScore + '%</strong></div>';
            }
            html += '<button class="btn btn-primary">' + (catchupDone ? 'Review Content →' : 'Start Module →') + '</button>';
            html += '</div></div></section>';
        }

        html += '</div>';
        main.innerHTML = html;
    }

    /* ---- Day View Renderer ---- */
    function renderDayView(dayNum) {
        const main = document.getElementById('main-content');
        const day = Data.getDay(dayNum);

        if (!day || !day.sections || day.sections.length === 0) {
            main.innerHTML = '<div class="day-view"><div class="empty-state"><div class="empty-icon">🔒</div><h3>Content Coming Soon</h3><p>Day ' + dayNum + ' content is being prepared. Check back shortly!</p><br><button class="btn btn-secondary" onclick="location.hash=\'#/\'">← Back to Dashboard</button></div></div>';
            return;
        }

        const weekIdx = Math.ceil(dayNum / 7);
        const week = WEEKS[weekIdx - 1];

        let html = '<div class="day-view">';
        // Header
        html += '<div class="day-header animate-in">';
        html += '<div class="day-meta">';
        html += '<span class="domain-badge" style="background:' + (day.domain ? day.domain.color : week.color) + '18;color:' + (day.domain ? day.domain.color : week.color) + '">' + (day.domain ? day.domain.name : week.domain) + '</span>';
        html += '<span class="time-badge">⏱ ' + (day.estimatedTime || '60 min') + '</span>';
        html += '</div>';
        if (dayNum <= 42) {
            html += '<p class="day-label">Day ' + dayNum + ' of 42 • Week ' + weekIdx + '</p>';
        } else if (dayNum === 43) {
            html += '<p class="day-label">Practice Exam • Bonus Content</p>';
        } else {
            html += '<p class="day-label">Final Catch-Up • Bonus Content</p>';
        }
        html += '<h1>' + day.title + '</h1>';
        html += '</div>';

        // Objectives
        if (day.objectives && day.objectives.length) {
            html += '<div class="objectives-card animate-in animate-in-delay-1">';
            html += '<h3>🎯 Learning Objectives</h3>';
            day.objectives.forEach((obj, i) => {
                const checked = Progress.isObjectiveChecked(dayNum, i);
                html += '<div class="objective-item">';
                html += '<span class="objective-check' + (checked ? ' checked' : '') + '" onclick="window.__toggleObj(' + dayNum + ',' + i + ',this)" data-day="' + dayNum + '" data-idx="' + i + '">' + (checked ? '✓' : '') + '</span>';
                html += '<span>' + obj + '</span></div>';
            });
            html += '</div>';
        }

        // Content sections
        day.sections.forEach((sec, i) => {
            html += '<div class="content-section animate-in animate-in-delay-' + Math.min(i + 2, 3) + '">';
            html += '<div class="section-header" onclick="window.__toggleSection(this)">';
            html += '<h3>📖 ' + sec.title + '</h3>';
            html += '<span class="section-toggle">▼</span></div>';
            html += '<div class="section-body open"><div class="section-content">' + sec.content + '</div></div>';
            html += '</div>';
        });

        // Quiz section
        if (day.quiz && day.quiz.length) {
            html += '<div class="quiz-section animate-in">';
            // Add exam timer for practice exam (Day 43)
            if (dayNum === 43) {
                html += '<div class="exam-timer-bar" id="exam-timer-bar">';
                html += '<span class="timer-icon">⏱</span>';
                html += '<span class="timer-display" id="exam-timer">115:00</span>';
                html += '<button class="btn btn-sm btn-secondary" id="timer-toggle-btn" onclick="window.__toggleTimer()">Start Timer</button>';
                html += '</div>';
            }
            }
            let quizTitle = 'Quiz';
            if (dayNum === 43) quizTitle = 'Practice Exam';
            if (dayNum === 44) quizTitle = 'Module Quiz';
            html += '<div class="quiz-header"><h2>🧠 ' + quizTitle + '</h2>';
            html += '<span class="quiz-counter" id="quiz-counter">Question 1 of ' + day.quiz.length + '</span></div>';
            html += '<div class="quiz-progress-bar"><div class="quiz-progress-fill" id="quiz-progress" style="width:' + (100 / day.quiz.length) + '%"></div></div>';
            html += '<div id="quiz-container"></div>';
            html += '</div>';
        }

        // Day navigation
        html += '<div class="day-nav">';
        if (dayNum > 1 && dayNum <= 42) {
            html += '<button class="day-nav-btn prev" onclick="location.hash=\'#/day/' + (dayNum - 1) + '\'">← Day ' + (dayNum - 1) + '</button>';
        } else if (dayNum === 43 || dayNum === 44) {
            html += '<button class="day-nav-btn prev" onclick="location.hash=\'#/\'">← Dashboard</button>';
        } else {
            html += '<span></span>';
        }
        if (dayNum < 42) {
            html += '<button class="day-nav-btn next" onclick="location.hash=\'#/day/' + (dayNum + 1) + '\'">Day ' + (dayNum + 1) + ' →</button>';
        } else if (dayNum === 42) {
            html += '<button class="day-nav-btn next" onclick="location.hash=\'#/day/43\'">Practice Exam →</button>';
        } else {
            html += '<span></span>';
        }
        html += '</div></div>';

        main.innerHTML = html;

        // Initialize quiz if present
        if (day.quiz && day.quiz.length) {
            Quiz.init(dayNum, day.quiz);
        }
    }

    window.__toggleSection = function (header) {
        const body = header.nextElementSibling;
        const isOpen = body.classList.contains('open');
        body.classList.toggle('open');
        header.classList.toggle('expanded', !isOpen);
    };

    window.__toggleObj = function (day, idx, el) {
        Progress.toggleObjective(day, idx);
        const checked = Progress.isObjectiveChecked(day, idx);
        el.classList.toggle('checked', checked);
        el.textContent = checked ? '✓' : '';
    };

    /* ---- Quiz Engine ---- */
    const Quiz = {
        dayNum: null,
        questions: [],
        currentIdx: 0,
        answers: {},
        answered: {},

        init(dayNum, questions) {
            this.dayNum = dayNum;
            this.questions = questions;
            this.currentIdx = 0;
            this.answers = {};
            this.answered = {};
            this.renderQuestion();
        },

        renderQuestion() {
            const container = document.getElementById('quiz-container');
            if (!container) return;

            if (this.currentIdx >= this.questions.length) {
                this.renderSummary();
                return;
            }

            const q = this.questions[this.currentIdx];
            const isMulti = q.type === 'multi';

            let html = '<div class="quiz-card">';
            html += '<span class="quiz-type-badge">' + (isMulti ? 'Select All That Apply' : 'Single Choice') + '</span>';
            html += '<p class="quiz-question">' + q.question + '</p>';
            html += '<div class="quiz-options">';
            q.options.forEach((opt, i) => {
                html += '<div class="quiz-option' + (isMulti ? ' multi' : '') + '" data-idx="' + i + '" onclick="window.__selectOption(' + i + ',' + isMulti + ')">';
                html += '<span class="quiz-option-marker">' + (isMulti ? '' : '') + '</span>';
                html += '<span class="quiz-option-text">' + opt + '</span></div>';
            });
            html += '</div>';
            html += '<div class="quiz-actions">';
            html += '<button class="btn btn-primary btn-sm" id="quiz-check-btn" onclick="window.__checkAnswer()">Check Answer</button>';
            html += '</div>';
            html += '<div id="quiz-feedback"></div>';
            html += '</div>';

            container.innerHTML = html;

            // Update progress
            const counter = document.getElementById('quiz-counter');
            if (counter) counter.textContent = 'Question ' + (this.currentIdx + 1) + ' of ' + this.questions.length;
            const bar = document.getElementById('quiz-progress');
            if (bar) bar.style.width = ((this.currentIdx + 1) / this.questions.length * 100) + '%';
        },

        renderSummary() {
            const container = document.getElementById('quiz-container');
            const total = this.questions.length;
            let correct = 0;
            this.questions.forEach((q, i) => {
                if (this.isCorrect(q, this.answers[i])) correct++;
            });
            const pct = Math.round((correct / total) * 100);

            // Save progress
            Progress.complete(this.dayNum, pct);
            Sidebar.update();

            const strokeColor = pct >= 80 ? 'var(--success)' : pct >= 50 ? 'var(--warning)' : 'var(--error)';
            const circ = 2 * Math.PI * 52;
            const offset = circ - (circ * pct / 100);
            const msg = pct >= 80 ? '🎉 Excellent! You\'ve mastered this topic!' : pct >= 50 ? '👍 Good effort! Review the sections you missed.' : '📚 Keep studying! Re-read the content and try again.';

            let html = '<div class="quiz-summary">';
            html += '<div class="quiz-score-ring"><svg viewBox="0 0 120 120"><circle class="ring-bg" cx="60" cy="60" r="52"/>';
            html += '<circle class="ring-fill" cx="60" cy="60" r="52" style="stroke:' + strokeColor + ';stroke-dashoffset:' + offset + '"/>';
            html += '</svg><div class="quiz-score-text"><span class="quiz-score-value">' + pct + '%</span><span class="quiz-score-label">' + correct + '/' + total + ' correct</span></div></div>';
            html += '<h3>Quiz Complete!</h3>';
            html += '<p class="result-msg">' + msg + '</p>';
            html += '<div class="quiz-summary-actions">';
            html += '<button class="btn btn-secondary btn-sm" onclick="window.__retryQuiz()">🔄 Retry Quiz</button>';
            if (this.dayNum < 42) html += '<button class="btn btn-primary btn-sm" onclick="location.hash=\'#/day/' + (this.dayNum + 1) + '\'">Next Day →</button>';
            html += '</div></div>';

            container.innerHTML = html;

            // Update counter
            const counter = document.getElementById('quiz-counter');
            if (counter) counter.textContent = 'Complete!';
            const bar = document.getElementById('quiz-progress');
            if (bar) bar.style.width = '100%';
        },

        isCorrect(q, answer) {
            if (!answer && answer !== 0) return false;
            if (q.type === 'multi') {
                if (!Array.isArray(answer)) return false;
                const correct = Array.isArray(q.correct) ? [...q.correct].sort() : [q.correct];
                return JSON.stringify([...answer].sort()) === JSON.stringify(correct);
            }
            return answer === q.correct;
        }
    };

    window.__selectOption = function (idx, isMulti) {
        const qi = Quiz.currentIdx;
        if (Quiz.answered[qi]) return; // Already answered

        if (isMulti) {
            if (!Array.isArray(Quiz.answers[qi])) Quiz.answers[qi] = [];
            const arr = Quiz.answers[qi];
            const pos = arr.indexOf(idx);
            if (pos >= 0) arr.splice(pos, 1); else arr.push(idx);
        } else {
            Quiz.answers[qi] = idx;
        }

        // Update UI
        document.querySelectorAll('.quiz-option').forEach(el => {
            const eidx = parseInt(el.dataset.idx);
            if (isMulti) {
                el.classList.toggle('selected', (Quiz.answers[qi] || []).includes(eidx));
            } else {
                el.classList.toggle('selected', eidx === idx);
            }
            // Update marker
            const marker = el.querySelector('.quiz-option-marker');
            if (el.classList.contains('selected')) marker.textContent = isMulti ? '✓' : '●';
            else marker.textContent = '';
        });
    };

    window.__checkAnswer = function () {
        const qi = Quiz.currentIdx;
        if (Quiz.answered[qi]) return;
        const q = Quiz.questions[qi];
        const answer = Quiz.answers[qi];
        if (answer === undefined || (Array.isArray(answer) && answer.length === 0)) return;

        Quiz.answered[qi] = true;
        const isCorrect = Quiz.isCorrect(q, answer);
        const correctArr = Array.isArray(q.correct) ? q.correct : [q.correct];

        // Highlight options
        document.querySelectorAll('.quiz-option').forEach(el => {
            const eidx = parseInt(el.dataset.idx);
            el.style.cursor = 'default';
            if (correctArr.includes(eidx)) {
                el.classList.add(el.classList.contains('selected') ? 'correct' : 'was-correct');
                el.querySelector('.quiz-option-marker').textContent = '✓';
            } else if (el.classList.contains('selected')) {
                el.classList.add('incorrect');
                el.querySelector('.quiz-option-marker').textContent = '✗';
            }
            el.classList.remove('selected');
        });

        // Show feedback
        const feedback = document.getElementById('quiz-feedback');
        feedback.innerHTML = '<div class="quiz-explanation ' + (isCorrect ? 'correct' : 'incorrect') + '"><strong>' + (isCorrect ? '✅ Correct!' : '❌ Incorrect') + '</strong><br>' + q.explanation + '</div>';

        // Change button to Next
        const btn = document.getElementById('quiz-check-btn');
        if (qi < Quiz.questions.length - 1) {
            btn.textContent = 'Next Question →';
            btn.onclick = function () { Quiz.currentIdx++; Quiz.renderQuestion(); };
        } else {
            btn.textContent = 'See Results';
            btn.onclick = function () { Quiz.currentIdx++; Quiz.renderQuestion(); };
        }
    };

    window.__retryQuiz = function () {
        const day = Data.getDay(Quiz.dayNum);
        if (day && day.quiz) Quiz.init(Quiz.dayNum, day.quiz);
    };

    /* ---- Exam Timer (Practice Exam) ---- */
    const ExamTimer = {
        seconds: 115 * 60,
        interval: null,
        running: false,
        start() {
            if (this.interval) return;
            this.running = true;
            const btn = document.getElementById('timer-toggle-btn');
            if (btn) btn.textContent = 'Pause Timer';
            this.interval = setInterval(() => {
                this.seconds--;
                this.updateDisplay();
                if (this.seconds <= 0) {
                    this.stop();
                    const bar = document.getElementById('exam-timer-bar');
                    if (bar) bar.classList.add('expired');
                    const display = document.getElementById('exam-timer');
                    if (display) display.textContent = 'TIME UP!';
                }
            }, 1000);
        },
        pause() {
            clearInterval(this.interval);
            this.interval = null;
            this.running = false;
            const btn = document.getElementById('timer-toggle-btn');
            if (btn) btn.textContent = 'Resume Timer';
        },
        stop() {
            clearInterval(this.interval);
            this.interval = null;
            this.running = false;
        },
        updateDisplay() {
            const display = document.getElementById('exam-timer');
            if (!display) return;
            const min = Math.floor(this.seconds / 60);
            const sec = this.seconds % 60;
            display.textContent = min + ':' + (sec < 10 ? '0' : '') + sec;
            // Color warning at 10 min
            if (this.seconds <= 600) {
                display.style.color = '#ff6b6b';
                const bar = document.getElementById('exam-timer-bar');
                if (bar) bar.classList.add('warning');
            }
        },
        reset() {
            this.stop();
            this.seconds = 115 * 60;
            this.updateDisplay();
        }
    };

    window.__toggleTimer = function () {
        if (ExamTimer.running) {
            ExamTimer.pause();
        } else {
            ExamTimer.start();
        }
    };

    /* ---- Theme Manager ---- */
    const Theme = {
        init() {
            const saved = Progress.data.theme || 'dark';
            document.documentElement.setAttribute('data-theme', saved);
            this.updateIcon(saved);
            document.getElementById('theme-toggle').addEventListener('click', () => this.toggle());
        },
        toggle() {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            Progress.data.theme = next;
            Progress.save();
            this.updateIcon(next);
        },
        updateIcon(theme) {
            const icon = document.getElementById('theme-icon');
            if (icon) icon.textContent = theme === 'dark' ? '🌙' : '☀️';
        }
    };

    /* ---- Mobile Sidebar ---- */
    function initMobileSidebar() {
        const toggle = document.getElementById('menu-toggle');
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebar-overlay');
        const close = document.getElementById('sidebar-close');

        function open() { sidebar.classList.add('open'); overlay.classList.add('active'); }
        function shut() { sidebar.classList.remove('open'); overlay.classList.remove('active'); }

        toggle.addEventListener('click', open);
        overlay.addEventListener('click', shut);
        close.addEventListener('click', shut);
        window.addEventListener('hashchange', shut);
    }

    /* ---- Init ---- */
    function init() {
        Data.load();
        Progress.load();
        Theme.init();
        Sidebar.build();
        Sidebar.updateProgress();
        initMobileSidebar();
        Router.init();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
