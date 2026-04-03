/**
 * MathQuest - Question Generator
 *
 * Massachusetts 6th Grade Math Standards:
 *   6.NS.1 - Multiply & Divide fractions
 *   6.RP.1-3 - Ratios, Unit Rates, Percents
 *   6.NS.2 - Multi-digit division
 *   6.NS.3 - Decimal operations
 *   6.NS.4 - GCF & LCM
 *   6.NS.5-7 - Integers & Absolute Value
 *   6.EE.1-7 - Expressions & Equations
 *   6.G.1-2 - Area & Volume
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

    function roundNum(n, decimals) {
        const f = Math.pow(10, decimals);
        return Math.round(n * f) / f;
    }

    // =============================================
    //  MULTIPLY FRACTIONS (6.NS.1)
    // =============================================

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
            type: 'multiply_fractions', answerType: 'fraction', standard: '6.NS.1',
            questionHTML: `${fracHTML(num1, den1)} <span class="operator">&times;</span> ${fracHTML(num2, den2)} <span class="equals">=</span> <span class="operator">?</span>`,
            questionText: `${fracToString(num1, den1)} x ${fracToString(num2, den2)}`,
            answer: simplified, answerMixed: mixed,
            explanation: `Multiply numerators: ${num1} × ${num2} = ${ansNum}. Multiply denominators: ${den1} × ${den2} = ${ansDen}. Simplified: ${fracToString(simplified.num, simplified.den)}.`
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
            type: 'multiply_fractions', answerType: 'fraction', standard: '6.NS.1',
            questionHTML: `<span class="frac-whole">${whole}</span> <span class="operator">&times;</span> ${fracHTML(num, den)} <span class="equals">=</span> <span class="operator">?</span>`,
            questionText: `${whole} x ${fracToString(num, den)}`,
            answer: simplified, answerMixed: mixed,
            explanation: `Write ${whole} as ${whole}/1. Multiply: ${whole} × ${num} = ${ansNum}, 1 × ${den} = ${den}. Result: ${fracToString(simplified.num, simplified.den)}.`
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
            type: 'multiply_fractions', answerType: 'fraction', standard: '6.NS.1',
            questionHTML: `${mixedFracHTML(w1, n1, d1)} <span class="operator">&times;</span> ${fracHTML(n2, d2)} <span class="equals">=</span> <span class="operator">?</span>`,
            questionText: `${mixedToString(w1, n1, d1)} x ${fracToString(n2, d2)}`,
            answer: simplified, answerMixed: mixed,
            explanation: `Convert: ${w1} ${n1}/${d1} = ${imp1}/${d1}. Multiply: ${imp1}/${d1} × ${n2}/${d2} = ${ansNum}/${ansDen}. Simplified: ${fracToString(simplified.num, simplified.den)}.`
        };
    }

    function multiplyTwoMixed() {
        const w1 = randInt(1, 3), d1 = pick([2, 3, 4]), n1 = randInt(1, d1 - 1);
        const w2 = randInt(1, 3), d2 = pick([2, 3, 4]), n2 = randInt(1, d2 - 1);
        const imp1 = w1 * d1 + n1, imp2 = w2 * d2 + n2;
        const ansNum = imp1 * imp2, ansDen = d1 * d2;
        const simplified = simplify(ansNum, ansDen);
        const mixed = toMixed(ansNum, ansDen);
        return {
            type: 'multiply_fractions', answerType: 'fraction', standard: '6.NS.1',
            questionHTML: `${mixedFracHTML(w1, n1, d1)} <span class="operator">&times;</span> ${mixedFracHTML(w2, n2, d2)} <span class="equals">=</span> <span class="operator">?</span>`,
            questionText: `${mixedToString(w1, n1, d1)} x ${mixedToString(w2, n2, d2)}`,
            answer: simplified, answerMixed: mixed,
            explanation: `Convert: ${imp1}/${d1} × ${imp2}/${d2} = ${ansNum}/${ansDen}. Simplified: ${fracToString(simplified.num, simplified.den)}.`
        };
    }

    // =============================================
    //  DIVIDE FRACTIONS (6.NS.1)
    // =============================================

    function divideSimple() {
        const den1 = pick([2, 3, 4, 5, 6, 8]), den2 = pick([2, 3, 4, 5, 6, 8]);
        const num1 = randInt(1, den1 - 1), num2 = randInt(1, den2 - 1);
        const ansNum = num1 * den2, ansDen = den1 * num2;
        const simplified = simplify(ansNum, ansDen);
        const mixed = toMixed(ansNum, ansDen);
        return {
            type: 'divide_fractions', answerType: 'fraction', standard: '6.NS.1',
            questionHTML: `${fracHTML(num1, den1)} <span class="operator">&div;</span> ${fracHTML(num2, den2)} <span class="equals">=</span> <span class="operator">?</span>`,
            questionText: `${fracToString(num1, den1)} ÷ ${fracToString(num2, den2)}`,
            answer: simplified, answerMixed: mixed,
            explanation: `Flip the second fraction and multiply! ${fracToString(num1, den1)} × ${fracToString(den2, num2)} = ${ansNum}/${ansDen}. Simplified: ${fracToString(simplified.num, simplified.den)}.`
        };
    }

    function divideWholeByFraction() {
        const whole = randInt(2, 8), den = pick([2, 3, 4, 5, 6]), num = randInt(1, den - 1);
        const ansNum = whole * den, ansDen = num;
        const simplified = simplify(ansNum, ansDen);
        const mixed = toMixed(ansNum, ansDen);
        return {
            type: 'divide_fractions', answerType: 'fraction', standard: '6.NS.1',
            questionHTML: `<span class="frac-whole">${whole}</span> <span class="operator">&div;</span> ${fracHTML(num, den)} <span class="equals">=</span> <span class="operator">?</span>`,
            questionText: `${whole} ÷ ${fracToString(num, den)}`,
            answer: simplified, answerMixed: mixed,
            explanation: `Write ${whole} as ${whole}/1. Flip and multiply: ${whole}/1 × ${den}/${num} = ${ansNum}/${ansDen}. Simplified: ${fracToString(simplified.num, simplified.den)}.`
        };
    }

    function divideFractionByWhole() {
        const whole = randInt(2, 8), den = pick([2, 3, 4, 5, 6, 8]), num = randInt(1, den - 1);
        const ansNum = num, ansDen = den * whole;
        const simplified = simplify(ansNum, ansDen);
        return {
            type: 'divide_fractions', answerType: 'fraction', standard: '6.NS.1',
            questionHTML: `${fracHTML(num, den)} <span class="operator">&div;</span> <span class="frac-whole">${whole}</span> <span class="equals">=</span> <span class="operator">?</span>`,
            questionText: `${fracToString(num, den)} ÷ ${whole}`,
            answer: simplified, answerMixed: toMixed(ansNum, ansDen),
            explanation: `Flip ${whole} to get 1/${whole}. Multiply: ${num}/${den} × 1/${whole} = ${ansNum}/${ansDen}. Simplified: ${fracToString(simplified.num, simplified.den)}.`
        };
    }

    function divideMixed() {
        const w1 = randInt(1, 4), d1 = pick([2, 3, 4, 5, 6]), n1 = randInt(1, d1 - 1);
        const d2 = pick([2, 3, 4, 5, 6]), n2 = randInt(1, d2 - 1);
        const imp1 = w1 * d1 + n1;
        const ansNum = imp1 * d2, ansDen = d1 * n2;
        const simplified = simplify(ansNum, ansDen);
        const mixed = toMixed(ansNum, ansDen);
        return {
            type: 'divide_fractions', answerType: 'fraction', standard: '6.NS.1',
            questionHTML: `${mixedFracHTML(w1, n1, d1)} <span class="operator">&div;</span> ${fracHTML(n2, d2)} <span class="equals">=</span> <span class="operator">?</span>`,
            questionText: `${mixedToString(w1, n1, d1)} ÷ ${fracToString(n2, d2)}`,
            answer: simplified, answerMixed: mixed,
            explanation: `Convert: ${w1} ${n1}/${d1} = ${imp1}/${d1}. Flip and multiply: ${imp1}/${d1} × ${d2}/${n2} = ${ansNum}/${ansDen}. Simplified: ${fracToString(simplified.num, simplified.den)}.`
        };
    }

    // =============================================
    //  RATIOS & UNIT RATES (6.RP.1-3)
    // =============================================

    function ratioFindMissing() {
        const a = randInt(2, 8), b = randInt(2, 8);
        const multiplier = randInt(2, 6);
        const bigB = b * multiplier;
        const answer = a * multiplier;
        return {
            type: 'ratios', answerType: 'number', standard: '6.RP.1',
            questionHTML: `The ratio of cats to dogs is <strong>${a} : ${b}</strong>. If there are <strong>${bigB}</strong> dogs, how many cats are there?`,
            questionText: `Ratio ${a}:${b}, ${bigB} dogs, how many cats?`,
            answer: answer,
            explanation: `${bigB} ÷ ${b} = ${multiplier}. So multiply cats by ${multiplier} too: ${a} × ${multiplier} = ${answer}.`
        };
    }

    function ratioUnitRate() {
        const items = randInt(2, 8);
        const pricePerItem = pick([1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]);
        const totalPrice = roundNum(items * pricePerItem, 2);
        return {
            type: 'ratios', answerType: 'number', standard: '6.RP.2',
            questionHTML: `If <strong>${items} items</strong> cost <strong>$${totalPrice}</strong>, how much does <strong>1 item</strong> cost? (in dollars)`,
            questionText: `${items} items cost $${totalPrice}, price of 1?`,
            answer: pricePerItem,
            explanation: `$${totalPrice} ÷ ${items} = $${pricePerItem} per item.`
        };
    }

    function ratioEquivalent() {
        const a = randInt(1, 6), b = randInt(1, 6);
        const mult = randInt(2, 5);
        const bigA = a * mult;
        const answer = b * mult;
        return {
            type: 'ratios', answerType: 'number', standard: '6.RP.3',
            questionHTML: `Find the missing value: <strong>${a} : ${b}</strong> = <strong>${bigA} : ?</strong>`,
            questionText: `${a}:${b} = ${bigA}:?`,
            answer: answer,
            explanation: `${bigA} ÷ ${a} = ${mult}. So ? = ${b} × ${mult} = ${answer}.`
        };
    }

    function ratioSpeedDistance() {
        const speed = pick([30, 40, 45, 50, 55, 60]);
        const hours = randInt(2, 6);
        const distance = speed * hours;
        return {
            type: 'ratios', answerType: 'number', standard: '6.RP.3',
            questionHTML: `A car travels at <strong>${speed} miles per hour</strong>. How far does it go in <strong>${hours} hours</strong>? (in miles)`,
            questionText: `${speed} mph for ${hours} hours = ? miles`,
            answer: distance,
            explanation: `Distance = speed × time = ${speed} × ${hours} = ${distance} miles.`
        };
    }

    // =============================================
    //  PERCENTS (6.RP.3c)
    // =============================================

    function percentOfNumber() {
        const pct = pick([10, 15, 20, 25, 30, 40, 50, 60, 75]);
        const whole = pick([20, 40, 50, 60, 80, 100, 120, 200]);
        const answer = roundNum(pct / 100 * whole, 2);
        return {
            type: 'percents', answerType: 'number', standard: '6.RP.3',
            questionHTML: `What is <strong>${pct}%</strong> of <strong>${whole}</strong>?`,
            questionText: `${pct}% of ${whole}`,
            answer: answer,
            explanation: `${pct}% = ${pct}/100 = ${pct/100}. Multiply: ${pct/100} × ${whole} = ${answer}.`
        };
    }

    function percentFindPercent() {
        const part = randInt(2, 20);
        const whole = part * pick([2, 4, 5]);
        const answer = roundNum((part / whole) * 100, 2);
        return {
            type: 'percents', answerType: 'number', standard: '6.RP.3',
            questionHTML: `<strong>${part}</strong> is what percent of <strong>${whole}</strong>?`,
            questionText: `${part} is ?% of ${whole}`,
            answer: answer,
            explanation: `${part} ÷ ${whole} = ${part/whole}. Multiply by 100: ${answer}%.`
        };
    }

    function percentFractionToPercent() {
        const den = pick([2, 4, 5, 8, 10, 20, 25]);
        const num = randInt(1, den - 1);
        const answer = roundNum((num / den) * 100, 2);
        return {
            type: 'percents', answerType: 'number', standard: '6.RP.3',
            questionHTML: `Convert ${fracHTML(num, den)} to a <strong>percent</strong>.`,
            questionText: `${num}/${den} as percent`,
            answer: answer,
            explanation: `${num} ÷ ${den} = ${num/den}. Multiply by 100: ${answer}%.`
        };
    }

    function percentDecimalToPercent() {
        const decimal = pick([0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.6, 0.7, 0.75, 0.8, 0.9, 0.95]);
        const answer = decimal * 100;
        return {
            type: 'percents', answerType: 'number', standard: '6.RP.3',
            questionHTML: `Convert <strong>${decimal}</strong> to a <strong>percent</strong>.`,
            questionText: `${decimal} as percent`,
            answer: answer,
            explanation: `Move the decimal point 2 places right: ${decimal} × 100 = ${answer}%.`
        };
    }

    // =============================================
    //  LONG DIVISION (6.NS.2)
    // =============================================

    function divisionByOneDigit() {
        const divisor = randInt(3, 9);
        const quotient = randInt(20, 200);
        const dividend = divisor * quotient;
        return {
            type: 'long_division', answerType: 'number', standard: '6.NS.2',
            questionHTML: `<strong>${dividend}</strong> <span class="operator">&div;</span> <strong>${divisor}</strong> <span class="equals">=</span> <span class="operator">?</span>`,
            questionText: `${dividend} ÷ ${divisor}`,
            answer: quotient,
            explanation: `${dividend} ÷ ${divisor} = ${quotient}.`
        };
    }

    function divisionByTwoDigit() {
        const divisor = randInt(11, 30);
        const quotient = randInt(10, 80);
        const dividend = divisor * quotient;
        return {
            type: 'long_division', answerType: 'number', standard: '6.NS.2',
            questionHTML: `<strong>${dividend}</strong> <span class="operator">&div;</span> <strong>${divisor}</strong> <span class="equals">=</span> <span class="operator">?</span>`,
            questionText: `${dividend} ÷ ${divisor}`,
            answer: quotient,
            explanation: `${dividend} ÷ ${divisor} = ${quotient}. Try estimating: ${divisor} × ${Math.floor(quotient/10)*10} = ${divisor * Math.floor(quotient/10)*10}, then adjust.`
        };
    }

    function divisionWithRemainder() {
        const divisor = randInt(3, 9);
        const quotient = randInt(15, 100);
        const remainder = randInt(1, divisor - 1);
        const dividend = divisor * quotient + remainder;
        return {
            type: 'long_division', answerType: 'number', standard: '6.NS.2',
            questionHTML: `<strong>${dividend}</strong> <span class="operator">&div;</span> <strong>${divisor}</strong> <span class="equals">=</span> ? remainder ?<br><small>Enter just the whole number part (ignore the remainder)</small>`,
            questionText: `${dividend} ÷ ${divisor} (whole part)`,
            answer: quotient,
            explanation: `${dividend} ÷ ${divisor} = ${quotient} remainder ${remainder}. The whole number part is ${quotient}.`
        };
    }

    // =============================================
    //  DECIMAL OPERATIONS (6.NS.3)
    // =============================================

    function decimalAdd() {
        const a = roundNum(randInt(10, 99) / 10, 1);
        const b = roundNum(randInt(10, 99) / 10, 1);
        const answer = roundNum(a + b, 2);
        return {
            type: 'decimals', answerType: 'number', standard: '6.NS.3',
            questionHTML: `<strong>${a}</strong> <span class="operator">+</span> <strong>${b}</strong> <span class="equals">=</span> <span class="operator">?</span>`,
            questionText: `${a} + ${b}`,
            answer: answer,
            explanation: `Line up the decimal points: ${a} + ${b} = ${answer}.`
        };
    }

    function decimalSubtract() {
        let a = roundNum(randInt(30, 99) / 10, 1);
        let b = roundNum(randInt(10, 50) / 10, 1);
        if (b > a) [a, b] = [b, a];
        const answer = roundNum(a - b, 2);
        return {
            type: 'decimals', answerType: 'number', standard: '6.NS.3',
            questionHTML: `<strong>${a}</strong> <span class="operator">-</span> <strong>${b}</strong> <span class="equals">=</span> <span class="operator">?</span>`,
            questionText: `${a} - ${b}`,
            answer: answer,
            explanation: `Line up the decimal points: ${a} - ${b} = ${answer}.`
        };
    }

    function decimalMultiply() {
        const a = roundNum(randInt(1, 9) / 10, 1);
        const b = roundNum(randInt(2, 15) / 10, 1);
        const answer = roundNum(a * b, 2);
        return {
            type: 'decimals', answerType: 'number', standard: '6.NS.3',
            questionHTML: `<strong>${a}</strong> <span class="operator">&times;</span> <strong>${b}</strong> <span class="equals">=</span> <span class="operator">?</span>`,
            questionText: `${a} × ${b}`,
            answer: answer,
            explanation: `Multiply ignoring decimals, then place the decimal point. ${a} × ${b} = ${answer}.`
        };
    }

    function decimalDivide() {
        const divisor = pick([0.2, 0.25, 0.4, 0.5, 2, 4, 5]);
        const answer = randInt(2, 20);
        const dividend = roundNum(answer * divisor, 2);
        return {
            type: 'decimals', answerType: 'number', standard: '6.NS.3',
            questionHTML: `<strong>${dividend}</strong> <span class="operator">&div;</span> <strong>${divisor}</strong> <span class="equals">=</span> <span class="operator">?</span>`,
            questionText: `${dividend} ÷ ${divisor}`,
            answer: answer,
            explanation: `${dividend} ÷ ${divisor} = ${answer}.`
        };
    }

    // =============================================
    //  GCF & LCM (6.NS.4)
    // =============================================

    function findGCF() {
        const base = randInt(2, 12);
        const mult1 = randInt(1, 6);
        const mult2 = randInt(1, 6);
        const a = base * mult1;
        const b = base * mult2;
        const answer = gcd(a, b);
        return {
            type: 'gcf_lcm', answerType: 'number', standard: '6.NS.4',
            questionHTML: `What is the <strong>Greatest Common Factor (GCF)</strong> of <strong>${a}</strong> and <strong>${b}</strong>?`,
            questionText: `GCF of ${a} and ${b}`,
            answer: answer,
            explanation: `Factors of ${a}: ${getFactors(a).join(', ')}. Factors of ${b}: ${getFactors(b).join(', ')}. GCF = ${answer}.`
        };
    }

    function findLCM() {
        const a = randInt(2, 12);
        const b = randInt(2, 12);
        const answer = lcm(a, b);
        return {
            type: 'gcf_lcm', answerType: 'number', standard: '6.NS.4',
            questionHTML: `What is the <strong>Least Common Multiple (LCM)</strong> of <strong>${a}</strong> and <strong>${b}</strong>?`,
            questionText: `LCM of ${a} and ${b}`,
            answer: answer,
            explanation: `Multiples of ${a}: ${getMultiples(a, answer).join(', ')}... Multiples of ${b}: ${getMultiples(b, answer).join(', ')}... LCM = ${answer}.`
        };
    }

    function gcfWordProblem() {
        const gcfVal = pick([3, 4, 5, 6]);
        const mult1 = randInt(2, 5);
        const mult2 = randInt(2, 5);
        const a = gcfVal * mult1;
        const b = gcfVal * mult2;
        const answer = gcd(a, b);
        return {
            type: 'gcf_lcm', answerType: 'number', standard: '6.NS.4',
            questionHTML: `You have <strong>${a} red marbles</strong> and <strong>${b} blue marbles</strong>. You want to divide them into groups with the same number of each color. What is the <strong>greatest number of groups</strong> you can make?`,
            questionText: `GCF of ${a} and ${b} (word problem)`,
            answer: answer,
            explanation: `This is a GCF problem! GCF of ${a} and ${b} = ${answer}. You can make ${answer} groups with ${a/answer} red and ${b/answer} blue marbles each.`
        };
    }

    function getFactors(n) {
        const factors = [];
        for (let i = 1; i <= n; i++) { if (n % i === 0) factors.push(i); }
        return factors;
    }

    function getMultiples(n, upTo) {
        const multiples = [];
        for (let i = n; i <= upTo; i += n) multiples.push(i);
        return multiples;
    }

    // =============================================
    //  INTEGERS & ABSOLUTE VALUE (6.NS.5-7)
    // =============================================

    function integerAdd() {
        const a = randInt(-15, 15);
        const b = randInt(-15, 15);
        const answer = a + b;
        const aStr = a < 0 ? `(${a})` : `${a}`;
        const bStr = b < 0 ? `(${b})` : `${b}`;
        return {
            type: 'integers', answerType: 'number', standard: '6.NS.5',
            questionHTML: `<strong>${aStr}</strong> <span class="operator">+</span> <strong>${bStr}</strong> <span class="equals">=</span> <span class="operator">?</span>`,
            questionText: `${a} + ${b}`,
            answer: answer,
            explanation: `${aStr} + ${bStr} = ${answer}.${a > 0 && b < 0 ? ' Adding a negative is like subtracting!' : ''}${a < 0 && b < 0 ? ' Two negatives: add the absolute values and keep the negative sign.' : ''}`
        };
    }

    function integerSubtract() {
        const a = randInt(-12, 12);
        const b = randInt(-12, 12);
        const answer = a - b;
        const aStr = a < 0 ? `(${a})` : `${a}`;
        const bStr = b < 0 ? `(${b})` : `${b}`;
        return {
            type: 'integers', answerType: 'number', standard: '6.NS.5',
            questionHTML: `<strong>${aStr}</strong> <span class="operator">-</span> <strong>${bStr}</strong> <span class="equals">=</span> <span class="operator">?</span>`,
            questionText: `${a} - ${b}`,
            answer: answer,
            explanation: `${aStr} - ${bStr} = ${answer}.${b < 0 ? ' Subtracting a negative is the same as adding!' : ''}`
        };
    }

    function absoluteValue() {
        const a = randInt(-20, -1);
        const answer = Math.abs(a);
        return {
            type: 'integers', answerType: 'number', standard: '6.NS.7',
            questionHTML: `What is <strong>|${a}|</strong> (absolute value of ${a})?`,
            questionText: `|${a}|`,
            answer: answer,
            explanation: `The absolute value of ${a} is its distance from 0, which is ${answer}.`
        };
    }

    function integerCompare() {
        let a = randInt(-15, 5);
        let b = randInt(-15, 5);
        while (a === b) b = randInt(-15, 5);
        const answer = Math.abs(a - b);
        const bigger = Math.max(a, b);
        const smaller = Math.min(a, b);
        return {
            type: 'integers', answerType: 'number', standard: '6.NS.7',
            questionHTML: `What is the <strong>distance</strong> between <strong>${a}</strong> and <strong>${b}</strong> on the number line?`,
            questionText: `Distance between ${a} and ${b}`,
            answer: answer,
            explanation: `Distance = |${a} - ${b}| = |${a - b}| = ${answer}. On the number line, count from ${smaller} to ${bigger}.`
        };
    }

    // =============================================
    //  EXPRESSIONS & EQUATIONS (6.EE.1-7)
    // =============================================

    function evaluateExponent() {
        const base = randInt(2, 10);
        const exp = pick([2, 3]);
        const answer = Math.pow(base, exp);
        const expLabel = exp === 2 ? '²' : '³';
        return {
            type: 'expressions', answerType: 'number', standard: '6.EE.1',
            questionHTML: `Evaluate: <strong>${base}${expLabel}</strong>`,
            questionText: `${base}^${exp}`,
            answer: answer,
            explanation: `${base}${expLabel} = ${Array(exp).fill(base).join(' × ')} = ${answer}.`
        };
    }

    function evaluateExpression() {
        const a = randInt(2, 6);
        const b = randInt(1, 10);
        const x = randInt(1, 8);
        const answer = a * x + b;
        return {
            type: 'expressions', answerType: 'number', standard: '6.EE.2',
            questionHTML: `Evaluate <strong>${a}x + ${b}</strong> when <strong>x = ${x}</strong>`,
            questionText: `${a}x + ${b} when x = ${x}`,
            answer: answer,
            explanation: `Substitute x = ${x}: ${a}(${x}) + ${b} = ${a*x} + ${b} = ${answer}.`
        };
    }

    function solveAddEquation() {
        const answer = randInt(1, 20);
        const b = randInt(1, 15);
        const c = answer + b;
        return {
            type: 'expressions', answerType: 'number', standard: '6.EE.7',
            questionHTML: `Solve for <strong>x</strong>: <strong>x + ${b} = ${c}</strong>`,
            questionText: `x + ${b} = ${c}`,
            answer: answer,
            explanation: `x + ${b} = ${c}. Subtract ${b} from both sides: x = ${c} - ${b} = ${answer}.`
        };
    }

    function solveMultiplyEquation() {
        const answer = randInt(1, 12);
        const a = randInt(2, 8);
        const c = a * answer;
        return {
            type: 'expressions', answerType: 'number', standard: '6.EE.7',
            questionHTML: `Solve for <strong>x</strong>: <strong>${a}x = ${c}</strong>`,
            questionText: `${a}x = ${c}`,
            answer: answer,
            explanation: `${a}x = ${c}. Divide both sides by ${a}: x = ${c} ÷ ${a} = ${answer}.`
        };
    }

    function orderOfOperations() {
        const a = randInt(2, 6);
        const b = randInt(1, 5);
        const c = randInt(1, 10);
        const answer = a * b + c;
        return {
            type: 'expressions', answerType: 'number', standard: '6.EE.1',
            questionHTML: `Evaluate: <strong>${a} &times; ${b} + ${c}</strong>`,
            questionText: `${a} × ${b} + ${c}`,
            answer: answer,
            explanation: `First multiply: ${a} × ${b} = ${a*b}. Then add: ${a*b} + ${c} = ${answer}. (Remember: multiply before adding!)`
        };
    }

    // =============================================
    //  AREA & VOLUME (6.G.1-2)
    // =============================================

    function areaTriangle() {
        const base = randInt(3, 15);
        const height = randInt(3, 12);
        const answer = roundNum(base * height / 2, 1);
        return {
            type: 'area_volume', answerType: 'number', standard: '6.G.1',
            questionHTML: `Find the <strong>area</strong> of a triangle with base = <strong>${base}</strong> and height = <strong>${height}</strong>.`,
            questionText: `Triangle: base ${base}, height ${height}`,
            answer: answer,
            explanation: `Area = ½ × base × height = ½ × ${base} × ${height} = ${answer}.`
        };
    }

    function areaParallelogram() {
        const base = randInt(3, 15);
        const height = randInt(3, 12);
        const answer = base * height;
        return {
            type: 'area_volume', answerType: 'number', standard: '6.G.1',
            questionHTML: `Find the <strong>area</strong> of a parallelogram with base = <strong>${base}</strong> and height = <strong>${height}</strong>.`,
            questionText: `Parallelogram: base ${base}, height ${height}`,
            answer: answer,
            explanation: `Area = base × height = ${base} × ${height} = ${answer}.`
        };
    }

    function volumeRectPrism() {
        const l = randInt(2, 8);
        const w = randInt(2, 8);
        const h = randInt(2, 8);
        const answer = l * w * h;
        return {
            type: 'area_volume', answerType: 'number', standard: '6.G.2',
            questionHTML: `Find the <strong>volume</strong> of a rectangular prism: length = <strong>${l}</strong>, width = <strong>${w}</strong>, height = <strong>${h}</strong>.`,
            questionText: `Prism: ${l} × ${w} × ${h}`,
            answer: answer,
            explanation: `Volume = length × width × height = ${l} × ${w} × ${h} = ${answer}.`
        };
    }

    function surfaceAreaRectPrism() {
        const l = randInt(2, 6);
        const w = randInt(2, 6);
        const h = randInt(2, 6);
        const answer = 2 * (l*w + l*h + w*h);
        return {
            type: 'area_volume', answerType: 'number', standard: '6.G.4',
            questionHTML: `Find the <strong>surface area</strong> of a rectangular prism: length = <strong>${l}</strong>, width = <strong>${w}</strong>, height = <strong>${h}</strong>.`,
            questionText: `Surface area: ${l} × ${w} × ${h}`,
            answer: answer,
            explanation: `SA = 2(lw + lh + wh) = 2(${l*w} + ${l*h} + ${w*h}) = 2(${l*w + l*h + w*h}) = ${answer}.`
        };
    }

    // =============================================
    //  Topic Generators Map
    // =============================================

    const topicGenerators = {
        multiply_fractions: [multiplySimple, multiplySimple, multiplyWholeByFraction, multiplyMixed, multiplyTwoMixed],
        divide_fractions: [divideSimple, divideSimple, divideWholeByFraction, divideFractionByWhole, divideMixed],
        ratios: [ratioFindMissing, ratioUnitRate, ratioEquivalent, ratioSpeedDistance],
        percents: [percentOfNumber, percentOfNumber, percentFindPercent, percentFractionToPercent, percentDecimalToPercent],
        long_division: [divisionByOneDigit, divisionByOneDigit, divisionByTwoDigit, divisionWithRemainder],
        decimals: [decimalAdd, decimalSubtract, decimalMultiply, decimalDivide],
        gcf_lcm: [findGCF, findGCF, findLCM, findLCM, gcfWordProblem],
        integers: [integerAdd, integerAdd, integerSubtract, absoluteValue, integerCompare],
        expressions: [evaluateExponent, evaluateExpression, solveAddEquation, solveMultiplyEquation, orderOfOperations],
        area_volume: [areaTriangle, areaParallelogram, volumeRectPrism, surfaceAreaRectPrism]
    };

    // =============================================
    //  Public API
    // =============================================

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

        if (type === 'number') {
            const userVal = parseFloat(userAnswer.number);
            if (isNaN(userVal)) return false;
            return Math.abs(userVal - question.answer) < 0.01;
        }

        if (type === 'fraction') {
            const s = question.answer;
            let userNum = parseInt(userAnswer.num);
            let userDen = parseInt(userAnswer.den);
            const userWhole = parseInt(userAnswer.whole);

            // If only whole number entered
            if ((isNaN(userNum) || userAnswer.num === '') &&
                (isNaN(userDen) || userAnswer.den === '')) {
                if (isNaN(userWhole)) return false;
                const userSimp = simplify(userWhole, 1);
                return userSimp.num === s.num && userSimp.den === s.den;
            }

            // Has fraction part
            if (isNaN(userDen) || userDen === 0) return false;
            if (isNaN(userNum)) userNum = 0;

            if (!isNaN(userWhole) && userWhole !== 0) {
                userNum = Math.abs(userWhole) * userDen + Math.abs(userNum);
                if (userWhole < 0) userNum = -userNum;
            }

            const userSimp = simplify(userNum, userDen);
            return userSimp.num === s.num && userSimp.den === s.den;
        }

        return false;
    }

    function getAnswerDisplay(question) {
        if (question.answerType === 'number') {
            return `${question.answer}`;
        }
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
