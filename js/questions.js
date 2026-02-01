/**
 * MathQuest - Question Generator
 *
 * Focused on Massachusetts 6th Grade Standard 6.NS.1:
 *   - Multiplying fractions & mixed numbers
 *   - Dividing fractions & mixed numbers
 */

const Questions = (() => {
    // --- Utility helpers ---

    function randInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function pick(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    function gcd(a, b) {
        a = Math.abs(a);
        b = Math.abs(b);
        while (b) { [a, b] = [b, a % b]; }
        return a;
    }

    function simplify(num, den) {
        if (den === 0) return { num: 0, den: 1 };
        const g = gcd(Math.abs(num), Math.abs(den));
        let sNum = num / g;
        let sDen = den / g;
        if (sDen < 0) { sNum = -sNum; sDen = -sDen; }
        return { num: sNum, den: sDen };
    }

    function toMixed(num, den) {
        const s = simplify(num, den);
        const whole = Math.floor(Math.abs(s.num) / s.den);
        const remainder = Math.abs(s.num) % s.den;
        const sign = s.num < 0 ? -1 : 1;
        return { whole: whole * sign, num: remainder, den: s.den };
    }

    function fracToString(num, den) {
        const s = simplify(num, den);
        if (s.den === 1) return `${s.num}`;
        return `${s.num}/${s.den}`;
    }

    function mixedToString(whole, num, den) {
        if (num === 0) return `${whole}`;
        if (whole === 0) return fracToString(num, den);
        return `${whole} ${fracToString(num, den)}`;
    }

    function fracHTML(num, den) {
        const s = simplify(num, den);
        if (s.den === 1) return `<span class="frac-whole">${s.num}</span>`;
        return `<span class="frac"><span class="frac-num">${s.num}</span><span class="frac-line"></span><span class="frac-den">${s.den}</span></span>`;
    }

    function mixedFracHTML(whole, num, den) {
        if (num === 0) return `<span class="frac-whole">${whole}</span>`;
        if (whole === 0) return fracHTML(num, den);
        return `<span class="frac-whole">${whole}</span>${fracHTML(num, den)}`;
    }

    // --- MULTIPLY FRACTIONS ---

    function multiplySimple() {
        const den1 = pick([2, 3, 4, 5, 6, 7, 8]);
        const den2 = pick([2, 3, 4, 5, 6, 7, 8]);
        const num1 = randInt(1, den1 - 1);
        const num2 = randInt(1, den2 - 1);

        const ansNum = num1 * num2;
        const ansDen = den1 * den2;
        const simplified = simplify(ansNum, ansDen);
        const mixed = toMixed(ansNum, ansDen);

        return {
            type: 'multiply_fractions',
            questionHTML: `${fracHTML(num1, den1)} <span class="operator">&times;</span> ${fracHTML(num2, den2)} <span class="equals">=</span> <span class="operator">?</span>`,
            questionText: `${fracToString(num1, den1)} x ${fracToString(num2, den2)}`,
            answerType: 'fraction',
            answer: simplified,
            answerMixed: mixed,
            explanation: `Multiply the numerators: ${num1} x ${num2} = ${ansNum}. Multiply the denominators: ${den1} x ${den2} = ${ansDen}. That gives ${ansNum}/${ansDen}. Simplified: ${fracToString(simplified.num, simplified.den)}.`,
            standard: '6.NS.1'
        };
    }

    function multiplyWholeByFraction() {
        const whole = randInt(2, 10);
        const den = pick([2, 3, 4, 5, 6, 8]);
        const num = randInt(1, den - 1);

        const ansNum = whole * num;
        const ansDen = den;
        const simplified = simplify(ansNum, ansDen);
        const mixed = toMixed(ansNum, ansDen);

        return {
            type: 'multiply_fractions',
            questionHTML: `<span class="frac-whole">${whole}</span> <span class="operator">&times;</span> ${fracHTML(num, den)} <span class="equals">=</span> <span class="operator">?</span>`,
            questionText: `${whole} x ${fracToString(num, den)}`,
            answerType: 'fraction',
            answer: simplified,
            answerMixed: mixed,
            explanation: `Write ${whole} as ${whole}/1. Multiply numerators: ${whole} x ${num} = ${ansNum}. Denominators: 1 x ${den} = ${den}. Result: ${ansNum}/${ansDen}. Simplified: ${fracToString(simplified.num, simplified.den)}${mixed.whole !== 0 && mixed.num !== 0 ? ' = ' + mixedToString(mixed.whole, mixed.num, mixed.den) : ''}.`,
            standard: '6.NS.1'
        };
    }

    function multiplyMixed() {
        const w1 = randInt(1, 4);
        const d1 = pick([2, 3, 4, 5, 6]);
        const n1 = randInt(1, d1 - 1);

        const d2 = pick([2, 3, 4, 5, 6]);
        const n2 = randInt(1, d2 - 1);

        const imp1 = w1 * d1 + n1;
        const ansNum = imp1 * n2;
        const ansDen = d1 * d2;
        const simplified = simplify(ansNum, ansDen);
        const mixed = toMixed(ansNum, ansDen);

        return {
            type: 'multiply_fractions',
            questionHTML: `${mixedFracHTML(w1, n1, d1)} <span class="operator">&times;</span> ${fracHTML(n2, d2)} <span class="equals">=</span> <span class="operator">?</span>`,
            questionText: `${mixedToString(w1, n1, d1)} x ${fracToString(n2, d2)}`,
            answerType: 'fraction',
            answer: simplified,
            answerMixed: mixed,
            explanation: `Convert the mixed number: ${w1} ${n1}/${d1} = ${imp1}/${d1}. Multiply: ${imp1}/${d1} x ${n2}/${d2} = ${ansNum}/${ansDen}. Simplified: ${fracToString(simplified.num, simplified.den)}${mixed.whole !== 0 && mixed.num !== 0 ? ' = ' + mixedToString(mixed.whole, mixed.num, mixed.den) : ''}.`,
            standard: '6.NS.1'
        };
    }

    function multiplyTwoMixed() {
        const w1 = randInt(1, 3);
        const d1 = pick([2, 3, 4]);
        const n1 = randInt(1, d1 - 1);

        const w2 = randInt(1, 3);
        const d2 = pick([2, 3, 4]);
        const n2 = randInt(1, d2 - 1);

        const imp1 = w1 * d1 + n1;
        const imp2 = w2 * d2 + n2;
        const ansNum = imp1 * imp2;
        const ansDen = d1 * d2;
        const simplified = simplify(ansNum, ansDen);
        const mixed = toMixed(ansNum, ansDen);

        return {
            type: 'multiply_fractions',
            questionHTML: `${mixedFracHTML(w1, n1, d1)} <span class="operator">&times;</span> ${mixedFracHTML(w2, n2, d2)} <span class="equals">=</span> <span class="operator">?</span>`,
            questionText: `${mixedToString(w1, n1, d1)} x ${mixedToString(w2, n2, d2)}`,
            answerType: 'fraction',
            answer: simplified,
            answerMixed: mixed,
            explanation: `Convert to improper fractions: ${imp1}/${d1} x ${imp2}/${d2}. Multiply: ${ansNum}/${ansDen}. Simplified: ${fracToString(simplified.num, simplified.den)}${mixed.whole !== 0 && mixed.num !== 0 ? ' = ' + mixedToString(mixed.whole, mixed.num, mixed.den) : ''}.`,
            standard: '6.NS.1'
        };
    }

    // --- DIVIDE FRACTIONS ---

    function divideSimple() {
        const den1 = pick([2, 3, 4, 5, 6, 8]);
        const den2 = pick([2, 3, 4, 5, 6, 8]);
        const num1 = randInt(1, den1 - 1);
        const num2 = randInt(1, den2 - 1);

        const ansNum = num1 * den2;
        const ansDen = den1 * num2;
        const simplified = simplify(ansNum, ansDen);
        const mixed = toMixed(ansNum, ansDen);

        return {
            type: 'divide_fractions',
            questionHTML: `${fracHTML(num1, den1)} <span class="operator">&div;</span> ${fracHTML(num2, den2)} <span class="equals">=</span> <span class="operator">?</span>`,
            questionText: `${fracToString(num1, den1)} / ${fracToString(num2, den2)}`,
            answerType: 'fraction',
            answer: simplified,
            answerMixed: mixed,
            explanation: `To divide fractions, flip the second fraction and multiply! ${fracToString(num1, den1)} x ${fracToString(den2, num2)} = ${ansNum}/${ansDen}. Simplified: ${fracToString(simplified.num, simplified.den)}${mixed.whole !== 0 && mixed.num !== 0 ? ' = ' + mixedToString(mixed.whole, mixed.num, mixed.den) : ''}.`,
            standard: '6.NS.1'
        };
    }

    function divideWholeByFraction() {
        const whole = randInt(2, 8);
        const den = pick([2, 3, 4, 5, 6]);
        const num = randInt(1, den - 1);

        const ansNum = whole * den;
        const ansDen = num;
        const simplified = simplify(ansNum, ansDen);
        const mixed = toMixed(ansNum, ansDen);

        return {
            type: 'divide_fractions',
            questionHTML: `<span class="frac-whole">${whole}</span> <span class="operator">&div;</span> ${fracHTML(num, den)} <span class="equals">=</span> <span class="operator">?</span>`,
            questionText: `${whole} / ${fracToString(num, den)}`,
            answerType: 'fraction',
            answer: simplified,
            answerMixed: mixed,
            explanation: `Write ${whole} as ${whole}/1. Flip the second fraction and multiply: ${whole}/1 x ${den}/${num} = ${ansNum}/${ansDen}. Simplified: ${fracToString(simplified.num, simplified.den)}${mixed.whole !== 0 && mixed.num !== 0 ? ' = ' + mixedToString(mixed.whole, mixed.num, mixed.den) : ''}.`,
            standard: '6.NS.1'
        };
    }

    function divideFractionByWhole() {
        const whole = randInt(2, 8);
        const den = pick([2, 3, 4, 5, 6, 8]);
        const num = randInt(1, den - 1);

        const ansNum = num;
        const ansDen = den * whole;
        const simplified = simplify(ansNum, ansDen);

        return {
            type: 'divide_fractions',
            questionHTML: `${fracHTML(num, den)} <span class="operator">&div;</span> <span class="frac-whole">${whole}</span> <span class="equals">=</span> <span class="operator">?</span>`,
            questionText: `${fracToString(num, den)} / ${whole}`,
            answerType: 'fraction',
            answer: simplified,
            answerMixed: toMixed(ansNum, ansDen),
            explanation: `Write ${whole} as ${whole}/1. Flip it to get 1/${whole}. Multiply: ${num}/${den} x 1/${whole} = ${ansNum}/${ansDen}. Simplified: ${fracToString(simplified.num, simplified.den)}.`,
            standard: '6.NS.1'
        };
    }

    function divideMixed() {
        const w1 = randInt(1, 4);
        const d1 = pick([2, 3, 4, 5, 6]);
        const n1 = randInt(1, d1 - 1);

        const d2 = pick([2, 3, 4, 5, 6]);
        const n2 = randInt(1, d2 - 1);

        const imp1 = w1 * d1 + n1;
        // a/b / c/d = a*d / b*c
        const ansNum = imp1 * d2;
        const ansDen = d1 * n2;
        const simplified = simplify(ansNum, ansDen);
        const mixed = toMixed(ansNum, ansDen);

        return {
            type: 'divide_fractions',
            questionHTML: `${mixedFracHTML(w1, n1, d1)} <span class="operator">&div;</span> ${fracHTML(n2, d2)} <span class="equals">=</span> <span class="operator">?</span>`,
            questionText: `${mixedToString(w1, n1, d1)} / ${fracToString(n2, d2)}`,
            answerType: 'fraction',
            answer: simplified,
            answerMixed: mixed,
            explanation: `Convert the mixed number: ${w1} ${n1}/${d1} = ${imp1}/${d1}. Flip and multiply: ${imp1}/${d1} x ${d2}/${n2} = ${ansNum}/${ansDen}. Simplified: ${fracToString(simplified.num, simplified.den)}${mixed.whole !== 0 && mixed.num !== 0 ? ' = ' + mixedToString(mixed.whole, mixed.num, mixed.den) : ''}.`,
            standard: '6.NS.1'
        };
    }

    // --- Public API ---

    const topicGenerators = {
        multiply_fractions: [
            multiplySimple,
            multiplySimple,
            multiplyWholeByFraction,
            multiplyMixed,
            multiplyTwoMixed
        ],
        divide_fractions: [
            divideSimple,
            divideSimple,
            divideWholeByFraction,
            divideFractionByWhole,
            divideMixed
        ]
    };

    function generate(topic) {
        const generators = topicGenerators[topic];
        if (!generators) throw new Error(`Unknown topic: ${topic}`);
        const gen = pick(generators);
        const question = gen();
        question.topic = topic;
        return question;
    }

    function checkAnswer(question, userAnswer) {
        const type = question.answerType;
        const s = question.answer;

        if (type === 'fraction') {
            // Accept improper fraction
            let userNum = parseInt(userAnswer.num);
            let userDen = parseInt(userAnswer.den);
            const userWhole = parseInt(userAnswer.whole);

            if (isNaN(userDen) || userDen === 0) return false;

            // If they entered a whole part, convert to improper
            if (!isNaN(userWhole) && userWhole !== 0) {
                if (isNaN(userNum)) userNum = 0;
                userNum = Math.abs(userWhole) * userDen + Math.abs(userNum);
                if (userWhole < 0) userNum = -userNum;
            }

            if (isNaN(userNum)) return false;
            const userSimp = simplify(userNum, userDen);
            return userSimp.num === s.num && userSimp.den === s.den;
        }

        return false;
    }

    function getAnswerDisplay(question) {
        const s = question.answer;
        const m = question.answerMixed;
        if (s.den === 1) return `${s.num}`;
        if (m && m.whole !== 0 && m.num !== 0) {
            return `${mixedToString(m.whole, m.num, m.den)}  (or ${fracToString(s.num, s.den)})`;
        }
        return fracToString(s.num, s.den);
    }

    return { generate, checkAnswer, getAnswerDisplay, simplify, fracToString };
})();
