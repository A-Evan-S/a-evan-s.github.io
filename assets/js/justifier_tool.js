const userText = document.getElementById("text-to-justify");
const justifiedText = document.getElementById("justified-text");
const fontSelect = document.getElementById("justifier-font-select");
const justifyButton = document.getElementById('justify-button');
const columnInput = document.getElementById('justifier-num-cols');
const modeInput = document.getElementById('justifier-mode-select');

justifyButton.addEventListener('click', function() {
    const font = fontSelect.value
    const inputText = userText.value;
    const numColumns = Number(columnInput.value);
    const mode = modeInput.value;

    let resultText = '';

    switch (mode) {
        case 'Non-uniform Gaps':
            resultText = nonUniformSolve(inputText, numColumns, font)
            break;
        case 'Word Shifting':
            resultText = wordShiftSolve(inputText, numColumns, font)
            break;
        case 'Spaces Only':
            resultText = spacesOnlySolve(inputText, numColumns)
            break;
    }

    justifiedText.value = resultText;
});

fontSelect.addEventListener('change', function(event) {
    event.target.style.fontFamily = event.target.value;
    userText.style.fontFamily = event.target.value;
    justifiedText.style.fontFamily = event.target.value;
});

function feasibleSpaces(maxGap, whitespaces) { // TODO: touch up AI code
    const reachable = [true, ...Array(maxGap).fill(false)];
    const reachable_dict = {0: ''};
    for (let i = 0; i <= maxGap; i++) {
        if (reachable[i]) {
            for (const gap of Object.keys(whitespaces)) {
                const gapNum = whitespaces[gap];
                if (i + gapNum < maxGap + 1) {
                    reachable[i + gapNum] = true;
                    reachable_dict[i + gapNum] = reachable_dict[i] + gap;
                }
            }
        }
    }
    return reachable_dict;
}

const whitespaceChars = ['\u0009','\u0020','\u00A0','\u2000','\u2001','\u2002','\u2003','\u2004','\u2005','\u2006','\u2007','\u2008','\u2009','\u200A','\u202F','\u205F','\u3000']

function findSpaceWidths(font) {
    let regularSpaceWidth = measureCharacterWidth('\u0020', font);
    let whitespacesRational = {};
    let denominators = [];
    whitespaceChars.forEach((char) => {
        let width = measureCharacterWidth(char, font);
        let ratio = width / regularSpaceWidth;
        let simplifiedRatio = findRatio(ratio);
        if (simplifiedRatio.num != 0) {
            whitespacesRational[char] = simplifiedRatio;
            denominators.push(simplifiedRatio.den);
        }
    });
    let unitSize = denominators.reduce((acc, x) => { return (acc * x) / gcd(acc, x) });
    let whitespacesIntegral = {}
    Object.entries(whitespacesRational).forEach(([k, v]) => whitespacesIntegral[k] = v.num * unitSize / v.den);
    return [unitSize, whitespacesIntegral];
}

const gcd = (a, b) => b === 0 ? a : gcd(b, a % b); 

function findRatio(decimal, maxDenominator = 100, tolerance = 0.001) { // TODO: touch up AI code
    if (Math.abs(decimal) < tolerance) {
        return { num: 0, den: 1, error: 0 };
    }
    
    let bestRatio = { num: Math.round(decimal), den: 1, error: Math.abs(decimal - Math.round(decimal)) };
    
    for (let den = 2; den <= maxDenominator; den++) {
        const num = Math.round(decimal * den);
        const approxValue = num / den;
        const error = Math.abs(decimal - approxValue);
        const relativeError = error / Math.abs(decimal);
        
        if (relativeError < tolerance && error < bestRatio.error) {
            bestRatio = { num, den, error };
            if (error < 0.00001) {
                break;
            }
        }
    }
    
    return bestRatio;
}

function measureCharacterWidth(char, font, repetitions = 100) {
    const repeatedString = char.repeat(repetitions);
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = `16px ${font}`;
    const totalWidth = context.measureText(repeatedString).width;
    return totalWidth / repetitions;
}

function nonUniformSolve(text, lineLength, font) {
    let [unitSize, whitespaces] = findSpaceWidths(font);
    let words = text.match(/\S+/g) || [];
    words = words.reverse();
    let lines = []
    while (words.length > 0) {
        let line = [];
        while (words.length > 0 && line.reduce((total, str) => total + str.length, 0) + line.length + words[words.length - 1].length <= lineLength) {
            line.push(words.pop());
        }
        if (words.length == 0) {
            lines.push(line.join(" "));
        } else {
            [variance, result] = solveLineNonUniform(line, lineLength, unitSize, whitespaces)
            lines.push(result);
        }
    }
    return lines.join("\n");
    return "test";
};

function solveLineNonUniform(words, line_length, unit_size, whitespaces) { // TODO: touch up AI code
    const whitespace_needed = (line_length - words.reduce((sum, word) => sum + word.length, 0)) * unit_size;
    const num_gaps = words.length - 1;
    const feasible_gaps = feasibleSpaces(whitespace_needed, whitespaces);
    const ideal_gap_size = whitespace_needed / num_gaps;
    const feasible_sorted = Object.keys(feasible_gaps)
        .map(k => parseInt(k))
        .sort((a, b) => Math.abs(a - ideal_gap_size) - Math.abs(b - ideal_gap_size))
        .slice(0, 500);

    let best_variance = Infinity;

    function find_gaps(length, num_gaps, idx, acc_variance) {
        if (acc_variance >= best_variance) {
            return null;
        }
        if (length === 0) {
            best_variance = Math.min(best_variance, acc_variance);
            return [];
        }
        if (num_gaps === 0 || idx >= feasible_sorted.length) {
            return null;
        }

        const gap_size = feasible_sorted[idx];
        if (gap_size > length) {
            return find_gaps(length, num_gaps, idx + 1, acc_variance);
        }

        const new_variance = acc_variance + (ideal_gap_size - gap_size) ** 2;
        const use_gap = find_gaps(length - gap_size, num_gaps - 1, idx, new_variance);
        const skip_gap = find_gaps(length, num_gaps, idx + 1, acc_variance);

        if (use_gap === null) {
            return skip_gap;
        }
        if (skip_gap === null) {
            return [gap_size, ...use_gap];
        }
        return skip_gap;  // min due to pruning
    }

    const gap_widths = find_gaps(whitespace_needed, num_gaps, 0, 0);
    const gaps = gap_widths.map(w => feasible_gaps[w]);
    const result = words.map((word, i) => word + (gaps[i] || '')).join('');

    return [best_variance, result];
}

function wordShiftSolve(text, lineLength, font) {
    let [unitSize, whitespaces] = findSpaceWidths(font);
    console.log([text, lineLength, font, "word shift mode"]);
    // TODO: all this
    return "test";
};

function spacesOnlySolve(text, lineLength) {
    let words = text.match(/\S+/g) || [];
    words = words.reverse();
    let lines = []
    while (words.length > 0) {
        let line = [];
        while (words.length > 0 && line.reduce((total, str) => total + str.length, 0) + line.length + words[words.length - 1].length <= lineLength) {
            line.push(words.pop());
        }
        if (words.length == 0) {
            lines.push(line.join(" "));
        } else {
            let wordLengthSum = line.reduce((total, str) => total + str.length, 0);
            let totalSpaces = lineLength - wordLengthSum;
            let defaultSpaces = Math.floor(totalSpaces / (line.length - 1));
            let extraSpaces = totalSpaces - defaultSpaces * (line.length - 1);
            let lineText = "";
            for (let i = 0; i < line.length - 1; i++) {
                lineText += line[i];
                lineText += " ".repeat(defaultSpaces);
                if (i < extraSpaces) {
                    lineText += " ";
                }
            }
            lineText += line[line.length - 1];
            lines.push(lineText);
        }
    }
    return lines.join("\n");
};