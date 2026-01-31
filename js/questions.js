/**
 * MathQuest - Question Generator
 *
 * Generates math questions aligned with Massachusetts 6th Grade Standards:
 *   - 6.NS.1: Interpret and compute quotients of fractions
 *   - 6.NS.2: Fluently divide multi-digit numbers
 *   - 6.NS.3: Fluently add, subtract, multiply, and divide multi-digit decimals
 *   - 6.NS.4: Find GCF, use distributive property
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

    function lcm(a, b) {
        return Math.abs(a * b) / gcd(a, b);
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
        return {
            whole: whole * sign,
            num: remainder,
            den: s.den
        };
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

    function roundTo(val, places) {
        const factor = Math.pow(10, places);
        return Math.round(val * factor) / factor;
    }

    // --- FRACTIONS (6.NS.1) ---

    function generateFractionAdd() {
        const den1 = pick([2, 3, 4, 5, 6, 8, 10, 12]);
        const den2 = pick([2, 3, 4, 5, 6, 8, 10, 12]);
        const num1 = randInt(1, den1 - 1);
        const num2 = randInt(1, den2 - 1);

        const commonDen = lcm(den1, den2);
        const ansNum = num1 * (commonDen / den1) + num2 * (commonDen / den2);
        const ansDen = commonDen;
        const simplified = simplify(ansNum, ansDen);
        const mixed = toMixed(ansNum, ansDen);

        return {
            type: 'fraction',
            questionHTML: `${fracHTML(num1, den1)} <span class="operator">+</span> ${fracHTML(num2, den2)} <span class="equals">=</span> <span class="operator">?</span>`,
            questionText: `${fracToString(num1, den1)} + ${fracToString(num2, den2)}`,
            answerType: 'fraction',
            answer: simplified,
            answerMixed: mixed,
            explanation: `Find a common denominator: ${commonDen}. Convert: ${num1 * (commonDen / den1)}/${commonDen} + ${num2 * (commonDen / den2)}/${commonDen} = ${ansNum}/${commonDen}. Simplified: ${fracToString(simplified.num, simplified.den)}${mixed.whole > 0 && mixed.num > 0 ? ' = ' + mixedToString(mixed.whole, mixed.num, mixed.den) : ''}.`,
            standard: '6.NS.1'
        };
    }

    function generateFractionSubtract() {
        const den1 = pick([2, 3, 4, 5, 6, 8, 10, 12]);
        const den2 = pick([2, 3, 4, 5, 6, 8, 10, 12]);
        let num1 = randInt(1, den1 - 1);
        let num2 = randInt(1, den2 - 1);

        // Ensure positive result
        const commonDen = lcm(den1, den2);
        let resultNum = num1 * (commonDen / den1) - num2 * (commonDen / den2);
        if (resultNum < 0) {
            // Swap
            [num1, num2] = [num2, num1];
            resultNum = -resultNum;
        }
        if (resultNum === 0) {
            num1 = num2 + 1 <= den1 ? num2 + 1 : num2;
            resultNum = num1 * (commonDen / den1) - num2 * (commonDen / den2);
            if (resultNum <= 0) return generateFractionAdd(); // fallback
        }

        const simplified = simplify(resultNum, commonDen);

        const actualDen1 = resultNum < 0 ? den2 : den1;
        const actualDen2 = resultNum < 0 ? den1 : den2;

        return {
            type: 'fraction',
            questionHTML: `${fracHTML(num1, den1)} <span class="operator">&minus;</span> ${fracHTML(num2, den2)} <span class="equals">=</span> <span class="operator">?</span>`,
            questionText: `${fracToString(num1, den1)} - ${fracToString(num2, den2)}`,
            answerType: 'fraction',
            answer: simplified,
            answerMixed: toMixed(resultNum, commonDen),
            explanation: `Common denominator: ${commonDen}. Convert: ${num1 * (commonDen / den1)}/${commonDen} - ${num2 * (commonDen / den2)}/${commonDen} = ${resultNum}/${commonDen}. Simplified: ${fracToString(simplified.num, simplified.den)}.`,
            standard: '6.NS.1'
        };
    }

    function generateFractionMultiply() {
        const den1 = pick([2, 3, 4, 5, 6, 7, 8]);
        const den2 = pick([2, 3, 4, 5, 6, 7, 8]);
        const num1 = randInt(1, den1 - 1);
        const num2 = randInt(1, den2 - 1);

        const ansNum = num1 * num2;
        const ansDen = den1 * den2;
        const simplified = simplify(ansNum, ansDen);
        const mixed = toMixed(ansNum, ansDen);

        return {
            type: 'fraction',
            questionHTML: `${fracHTML(num1, den1)} <span class="operator">&times;</span> ${fracHTML(num2, den2)} <span class="equals">=</span> <span class="operator">?</span>`,
            questionText: `${fracToString(num1, den1)} x ${fracToString(num2, den2)}`,
            answerType: 'fraction',
            answer: simplified,
            answerMixed: mixed,
            explanation: `Multiply numerators: ${num1} x ${num2} = ${ansNum}. Multiply denominators: ${den1} x ${den2} = ${ansDen}. Result: ${ansNum}/${ansDen}. Simplified: ${fracToString(simplified.num, simplified.den)}.`,
            standard: '6.NS.1'
        };
    }

    function generateFractionDivide() {
        const den1 = pick([2, 3, 4, 5, 6, 8]);
        const den2 = pick([2, 3, 4, 5, 6, 8]);
        const num1 = randInt(1, den1 - 1);
        const num2 = randInt(1, den2 - 1);

        // a/b / c/d = a/b * d/c
        const ansNum = num1 * den2;
        const ansDen = den1 * num2;
        const simplified = simplify(ansNum, ansDen);
        const mixed = toMixed(ansNum, ansDen);

        return {
            type: 'fraction',
            questionHTML: `${fracHTML(num1, den1)} <span class="operator">&div;</span> ${fracHTML(num2, den2)} <span class="equals">=</span> <span class="operator">?</span>`,
            questionText: `${fracToString(num1, den1)} / ${fracToString(num2, den2)}`,
            answerType: 'fraction',
            answer: simplified,
            answerMixed: mixed,
            explanation: `To divide fractions, multiply by the reciprocal: ${fracToString(num1, den1)} x ${fracToString(den2, num2)} = ${ansNum}/${ansDen}. Simplified: ${fracToString(simplified.num, simplified.den)}${mixed.whole > 0 && mixed.num > 0 ? ' = ' + mixedToString(mixed.whole, mixed.num, mixed.den) : ''}.`,
            standard: '6.NS.1'
        };
    }

    function generateMixedNumberOp() {
        const whole1 = randInt(1, 5);
        const den1 = pick([2, 3, 4, 5, 6, 8]);
        const frac1 = randInt(1, den1 - 1);

        const whole2 = randInt(1, 3);
        const den2 = pick([2, 3, 4, 5, 6, 8]);
        const frac2 = randInt(1, den2 - 1);

        const op = pick(['+', '-']);

        // Convert to improper fractions
        const impNum1 = whole1 * den1 + frac1;
        const impNum2 = whole2 * den2 + frac2;

        const commonDen = lcm(den1, den2);
        let resultNum;
        if (op === '+') {
            resultNum = impNum1 * (commonDen / den1) + impNum2 * (commonDen / den2);
        } else {
            resultNum = impNum1 * (commonDen / den1) - impNum2 * (commonDen / den2);
            if (resultNum < 0) {
                return generateMixedNumberOp(); // retry to keep positive
            }
        }

        const simplified = simplify(resultNum, commonDen);
        const mixed = toMixed(resultNum, commonDen);
        const opSymbol = op === '+' ? '+' : '&minus;';
        const opText = op === '+' ? '+' : '-';

        return {
            type: 'fraction',
            questionHTML: `${mixedFracHTML(whole1, frac1, den1)} <span class="operator">${opSymbol}</span> ${mixedFracHTML(whole2, frac2, den2)} <span class="equals">=</span> <span class="operator">?</span>`,
            questionText: `${mixedToString(whole1, frac1, den1)} ${opText} ${mixedToString(whole2, frac2, den2)}`,
            answerType: 'mixed',
            answer: simplified,
            answerMixed: mixed,
            explanation: `Convert to improper fractions: ${impNum1}/${den1} ${opText} ${impNum2}/${den2}. Common denominator: ${commonDen}. Result: ${resultNum}/${commonDen}. Simplified: ${mixedToString(mixed.whole, mixed.num, mixed.den)}.`,
            standard: '6.NS.1'
        };
    }

    // --- MULTIPLICATION (6.NS.2, 6.NS.3) ---

    function generateMultiDigitMultiply() {
        const difficulty = pick(['easy', 'medium', 'hard']);
        let a, b;

        if (difficulty === 'easy') {
            a = randInt(12, 99);
            b = randInt(2, 9);
        } else if (difficulty === 'medium') {
            a = randInt(10, 99);
            b = randInt(10, 99);
        } else {
            a = randInt(100, 999);
            b = randInt(10, 99);
        }

        const answer = a * b;

        return {
            type: 'multiplication',
            questionHTML: `<span class="question-math">${a.toLocaleString()} <span class="operator">&times;</span> ${b.toLocaleString()}</span> <span class="equals">=</span> <span class="operator">?</span>`,
            questionText: `${a} x ${b}`,
            answerType: 'number',
            answer: answer,
            explanation: `${a} x ${b} = ${answer.toLocaleString()}.${difficulty === 'medium' || difficulty === 'hard' ? ' Try breaking it down: ' + a + ' x ' + b + ' = ' + a + ' x ' + Math.floor(b / 10) * 10 + ' + ' + a + ' x ' + (b % 10) + ' = ' + (a * Math.floor(b / 10) * 10) + ' + ' + (a * (b % 10)) + ' = ' + answer : ''}`,
            standard: '6.NS.2'
        };
    }

    function generateDecimalMultiply() {
        const decPlaces1 = pick([1, 2]);
        const decPlaces2 = pick([1, 2]);
        const factor = Math.pow(10, decPlaces1);
        const factor2 = Math.pow(10, decPlaces2);

        let a = randInt(1, 99) / factor;
        let b = randInt(2, 99) / factor2;

        // Keep numbers reasonable
        if (a < 0.1) a = 0.1;
        if (b < 0.1) b = 0.1;

        const totalDecPlaces = decPlaces1 + decPlaces2;
        const answer = roundTo(a * b, totalDecPlaces);

        return {
            type: 'multiplication',
            questionHTML: `<span class="question-math">${a} <span class="operator">&times;</span> ${b}</span> <span class="equals">=</span> <span class="operator">?</span>`,
            questionText: `${a} x ${b}`,
            answerType: 'decimal',
            answer: answer,
            explanation: `Multiply ignoring decimals: ${Math.round(a * factor)} x ${Math.round(b * factor2)} = ${Math.round(a * factor) * Math.round(b * factor2)}. Count decimal places: ${decPlaces1} + ${decPlaces2} = ${totalDecPlaces}. Move decimal point ${totalDecPlaces} places left: ${answer}.`,
            standard: '6.NS.3'
        };
    }

    // --- DIVISION (6.NS.2, 6.NS.3) ---

    function generateMultiDigitDivide() {
        const difficulty = pick(['easy', 'medium', 'hard']);
        let divisor, quotient, dividend;

        if (difficulty === 'easy') {
            divisor = randInt(2, 9);
            quotient = randInt(10, 99);
        } else if (difficulty === 'medium') {
            divisor = randInt(2, 12);
            quotient = randInt(10, 150);
        } else {
            divisor = randInt(10, 30);
            quotient = randInt(10, 99);
        }

        dividend = divisor * quotient;

        return {
            type: 'division',
            questionHTML: `<span class="question-math">${dividend.toLocaleString()} <span class="operator">&div;</span> ${divisor}</span> <span class="equals">=</span> <span class="operator">?</span>`,
            questionText: `${dividend} / ${divisor}`,
            answerType: 'number',
            answer: quotient,
            explanation: `${dividend} / ${divisor} = ${quotient}. You can verify: ${divisor} x ${quotient} = ${dividend}.`,
            standard: '6.NS.2'
        };
    }

    function generateDivisionWithRemainder() {
        const divisor = randInt(3, 15);
        const quotient = randInt(5, 50);
        const remainder = randInt(1, divisor - 1);
        const dividend = divisor * quotient + remainder;

        return {
            type: 'division',
            questionHTML: `<span class="question-math">${dividend} <span class="operator">&div;</span> ${divisor}</span><br><span style="font-size: 1rem; color: var(--text-muted);">Give the quotient and remainder</span>`,
            questionText: `${dividend} / ${divisor} (with remainder)`,
            answerType: 'quotient_remainder',
            answer: { quotient, remainder },
            explanation: `${dividend} / ${divisor} = ${quotient} remainder ${remainder}. Check: ${divisor} x ${quotient} + ${remainder} = ${divisor * quotient} + ${remainder} = ${dividend}.`,
            standard: '6.NS.2'
        };
    }

    function generateDecimalDivide() {
        const decPlaces = pick([1, 2]);
        const divisor = randInt(2, 9);
        const factor = Math.pow(10, decPlaces);
        const quotientInt = randInt(1, 50);
        const answer = quotientInt / factor;
        const dividend = roundTo(answer * divisor, decPlaces);

        return {
            type: 'division',
            questionHTML: `<span class="question-math">${dividend} <span class="operator">&div;</span> ${divisor}</span> <span class="equals">=</span> <span class="operator">?</span>`,
            questionText: `${dividend} / ${divisor}`,
            answerType: 'decimal',
            answer: answer,
            explanation: `${dividend} / ${divisor} = ${answer}. Verify: ${divisor} x ${answer} = ${dividend}.`,
            standard: '6.NS.3'
        };
    }

    // --- Public API ---

    const topicGenerators = {
        fractions: [
            generateFractionAdd,
            generateFractionSubtract,
            generateFractionMultiply,
            generateFractionDivide,
            generateMixedNumberOp
        ],
        multiplication: [
            generateMultiDigitMultiply,
            generateMultiDigitMultiply,
            generateDecimalMultiply
        ],
        division: [
            generateMultiDigitDivide,
            generateMultiDigitDivide,
            generateDivisionWithRemainder,
            generateDecimalDivide
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

        if (type === 'number' || type === 'decimal') {
            const expected = question.answer;
            const given = parseFloat(userAnswer);
            if (isNaN(given)) return false;
            return Math.abs(given - expected) < 0.001;
        }

        if (type === 'fraction') {
            // Accept either simplified fraction or mixed number
            const s = question.answer;
            const userNum = parseInt(userAnswer.num);
            const userDen = parseInt(userAnswer.den);
            if (isNaN(userNum) || isNaN(userDen) || userDen === 0) return false;

            const userSimp = simplify(userNum, userDen);
            return userSimp.num === s.num && userSimp.den === s.den;
        }

        if (type === 'mixed') {
            const m = question.answerMixed;
            const s = question.answer;

            // Allow answer as improper fraction
            if (userAnswer.whole === undefined || userAnswer.whole === '' || userAnswer.whole === null) {
                const userNum = parseInt(userAnswer.num);
                const userDen = parseInt(userAnswer.den);
                if (isNaN(userNum) || isNaN(userDen) || userDen === 0) return false;
                const userSimp = simplify(userNum, userDen);
                return userSimp.num === s.num && userSimp.den === s.den;
            }

            // Mixed number answer
            const whole = parseInt(userAnswer.whole) || 0;
            const num = parseInt(userAnswer.num) || 0;
            const den = parseInt(userAnswer.den) || 1;

            if (den === 0) return false;

            // Convert user mixed to improper and simplify
            const userImpNum = whole * den + num;
            const userSimp = simplify(userImpNum, den);
            return userSimp.num === s.num && userSimp.den === s.den;
        }

        if (type === 'quotient_remainder') {
            const expected = question.answer;
            const q = parseInt(userAnswer.quotient);
            const r = parseInt(userAnswer.remainder);
            if (isNaN(q) || isNaN(r)) return false;
            return q === expected.quotient && r === expected.remainder;
        }

        return false;
    }

    function getAnswerDisplay(question) {
        const type = question.answerType;
        if (type === 'number') return question.answer.toLocaleString();
        if (type === 'decimal') return question.answer.toString();
        if (type === 'fraction') return fracToString(question.answer.num, question.answer.den);
        if (type === 'mixed') {
            const m = question.answerMixed;
            return mixedToString(m.whole, m.num, m.den);
        }
        if (type === 'quotient_remainder') {
            return `${question.answer.quotient} R ${question.answer.remainder}`;
        }
        return '';
    }

    return {
        generate,
        checkAnswer,
        getAnswerDisplay,
        simplify,
        fracToString
    };
})();
