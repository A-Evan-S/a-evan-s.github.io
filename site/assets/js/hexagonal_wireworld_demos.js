const golDemo = document.getElementById("gol-demo");
const golDemoCtx = golDemo.getContext('2d');

const wwDemo = document.getElementById("ww-demo");
const wwDemoCtx = wwDemo.getContext('2d');

const hexDemo = document.getElementById("hex-demo");
const hexDemoCtx = hexDemo.getContext('2d');

const demos = {
    'GOL': {
        'canvas': golDemo,
        'ctx': golDemoCtx,
        'initFunc': initGOL,
        'drawFunc': drawGOL,
        'tickFunc': tickGOL,
        'lastTick': 0,
        'tickRate': 100, // ms per frame
        'state': {}
    },
    'WW': {
        'canvas': wwDemo,
        'ctx': wwDemoCtx,
        'initFunc': initWW,
        'drawFunc': drawWW,
        'tickFunc': tickWW,
        'lastTick': 0,
        'tickRate': 100, // ms per frame
        'state': {}
    },
    'HexWW': {
        'canvas': hexDemo,
        'ctx': hexDemoCtx,
        'initFunc': initHexWW,
        'drawFunc': drawHexWW,
        'tickFunc': tickHexWW,
        'lastTick': 0,
        'tickRate': 100, // ms per frame
        'state': {}
    }
};

const golButton1 = document.getElementById("gol-random");
const golButton2 = document.getElementById("gol-glider");
golButton1.addEventListener('click', fillRandomGOL);
golButton2.addEventListener('click', fillGliderGOL);

function fillRandomGOL() {
    let state = demos['GOL'].state;
    state.grid = Array.from({ length: state.numRows }, () => new Array(state.numCols).fill('dead'));
    for (let r = 0; r < state.numRows; r++) {
        for (let c = 0; c < state.numCols; c++) {
            if (Math.random() < 0.4) {
                state.grid[r][c] = 'alive';
            }
        }
    }
    demos['GOL'].drawFunc(state, demos['GOL'].ctx);
}

function fillGliderGOL() {
    let state = demos['GOL'].state;
    state.grid = Array.from({ length: state.numRows }, () => new Array(state.numCols).fill('dead'));
    [[10, 10], [10, 11], [10, 12], [9, 12], [8, 11]].forEach((pos) => state.grid[pos[0]][pos[1]] = 'alive');
    demos['GOL'].drawFunc(state, demos['GOL'].ctx);
}

function initGOL(state) {
    state.numRows = 30;
    state.numCols = 40;
    state.paused = true;
    fillGliderGOL();
}

function drawGOL(state, ctx) {
    ctx.clearRect(0, 0, golDemo.width, golDemo.height);
    let cellSize = Math.floor(Math.min(golDemo.width / state.numCols, golDemo.height / state.numRows));
    let hBuffer = Math.floor((golDemo.width - cellSize * state.numCols + 2) / 2);
    let vBuffer = Math.floor((golDemo.height - cellSize * state.numRows + 2) / 2);
    for (let r = 0; r < state.numRows; r++) {
        for (let c = 0; c < state.numCols; c++) {
            ctx.beginPath()
            if (state.grid[r][c] == 'alive') {
                ctx.fillStyle = '#333333';
            } else {
                ctx.fillStyle = '#F0F0F0';
            }
            ctx.strokeStyle = "#CCCCCC";

            ctx.rect(hBuffer + c * cellSize + 1, vBuffer + r * cellSize + 1, cellSize-2, cellSize-2);
            ctx.fill();
            ctx.rect(hBuffer + c * cellSize + 1, vBuffer + r * cellSize + 1, cellSize-2, cellSize-2);
            ctx.stroke();
        }
    }
}

function tickGOL(state) {
    let nextGrid = Array.from({ length: state.numRows }, () => new Array(state.numCols).fill('dead'));
    for (let r = 0; r < state.numRows; r++) {
        for (let c = 0; c < state.numCols; c++) {
            let aliveNeighbors = 0;
            let neighbors = [[r-1, c-1], [r-1, c], [r-1, c+1], [r, c-1], [r, c+1], [r+1, c-1], [r+1, c], [r+1, c+1]];
            neighbors.forEach((neighbor) => {
                aliveNeighbors += state.grid[neighbor[0]]?.[neighbor[1]] == 'alive' ? 1 : 0;
            });
            if (aliveNeighbors == 3 || (aliveNeighbors == 2 && state.grid[r][c] == 'alive')) {
                nextGrid[r][c] = 'alive';
            }

        }
    }
    state.grid = nextGrid;

    demos['GOL'].drawFunc(state, demos['GOL'].ctx);
}


const wwButton1 = document.getElementById("ww-diodes");
const wwButton2 = document.getElementById("ww-or");
const wwButton3 = document.getElementById("ww-xor");
const wwButton4 = document.getElementById("ww-flip-flop");
wwButton1.addEventListener('click', fillDiodeWW);
wwButton2.addEventListener('click', fillORWW);
wwButton3.addEventListener('click', fillXORWW);
wwButton4.addEventListener('click', fillFlipFlopWW);

function fillDiodeWW() {
    let state = demos['WW'].state;
    state.grid = Array.from({ length: state.numRows }, () => new Array(state.numCols).fill('empty'));

    [
        [9, 9], [10, 8], [11, 8], [12, 8], [13, 8], [13, 10], [14, 9], [10, 10],
        [8, 9], [7, 10], [7, 11], [7, 12], [7, 13], [7, 14],
        [15, 9], [16, 10], [16, 11], [16, 12], [16, 13], [16, 14],
        [6, 15], [7, 15], [8, 15], [6, 16], [8, 16], [7, 17], [7, 18],
        [15, 15], [17, 15], [15, 16], [16, 16], [17, 16], [16, 17], [16, 18],
        [7, 19], [7, 20], [7, 21],
        [16, 19], [16, 20], [16, 21]
    ].forEach((pos) => state.grid[pos[0]][pos[1]] = 'conductor');
    state.grid[11][10] = 'e-head';
    state.grid[12][10] = 'e-tail';
    demos['WW'].drawFunc(state, demos['WW'].ctx);
}

function fillORWW() {
    let state = demos['WW'].state;
    state.grid = Array.from({ length: state.numRows }, () => new Array(state.numCols).fill('empty'));

    [
        [7, 2], [6, 3], [6, 4], [6, 5], [8, 3], [8, 4], [8, 5],
        [16, 2]
    ].forEach((pos) => state.grid[pos[0]][pos[1]] = 'conductor');
    // state.grid[11][10] = 'e-head';
    // state.grid[12][10] = 'e-tail';
    demos['WW'].drawFunc(state, demos['WW'].ctx);
}

function fillXORWW() {
    let state = demos['WW'].state;
    state.grid = Array.from({ length: state.numRows }, () => new Array(state.numCols).fill('empty'));
    demos['WW'].drawFunc(state, demos['WW'].ctx);
}

function fillFlipFlopWW() {
    let state = demos['WW'].state;
    state.grid = Array.from({ length: state.numRows }, () => new Array(state.numCols).fill('empty'));
    demos['WW'].drawFunc(state, demos['WW'].ctx);
}

function initWW(state) {
    state.numRows = 24;
    state.numCols = 32;
    state.paused = true;
    fillDiodeWW();
}

function drawWW(state, ctx) {
    ctx.clearRect(0, 0, wwDemo.width, wwDemo.height);
    let cellSize = Math.floor(Math.min(wwDemo.width / state.numCols, wwDemo.height / state.numRows));
    let hBuffer = Math.floor((wwDemo.width - cellSize * state.numCols + 2) / 2);
    let vBuffer = Math.floor((wwDemo.height - cellSize * state.numRows + 2) / 2);
    for (let r = 0; r < state.numRows; r++) {
        for (let c = 0; c < state.numCols; c++) {
            ctx.beginPath();

            switch (state.grid[r][c]) {
                case 'empty':
                    ctx.fillStyle = '#F0F0F0';
                    break;
                case 'e-head':
                    ctx.fillStyle = '#29b1ff';
                    break;
                case 'e-tail':
                    ctx.fillStyle = '#a1cae6';
                    break;
                case 'conductor':
                    ctx.fillStyle = '#aaaaaa';
                    break;
            }

            ctx.strokeStyle = "#CCCCCC";

            ctx.rect(hBuffer + c * cellSize + 1, vBuffer + r * cellSize + 1, cellSize-2, cellSize-2);
            ctx.fill();
            ctx.stroke();
        }
    }
}

function tickWW(state) {
    let nextGrid = Array.from({ length: state.numRows }, () => new Array(state.numCols).fill('empty'));
    for (let r = 0; r < state.numRows; r++) {
        for (let c = 0; c < state.numCols; c++) {
            switch (state.grid[r][c]) {
                case 'e-head':
                    nextGrid[r][c] = 'e-tail';
                    break;
                case 'e-tail':
                    nextGrid[r][c] = 'conductor';
                    break;
                case 'conductor':
                    let eNeighbors = 0;
                    let neighbors = [[r-1, c-1], [r-1, c], [r-1, c+1], [r, c-1], [r, c+1], [r+1, c-1], [r+1, c], [r+1, c+1]];
                    neighbors.forEach((neighbor) => {
                        eNeighbors += state.grid[neighbor[0]]?.[neighbor[1]] == 'e-head' ? 1 : 0;
                    });
                    nextGrid[r][c] = eNeighbors == 1 || eNeighbors == 2 ? 'e-head' : 'conductor';
                    break;
            }
        }
    }
    state.grid = nextGrid;

    demos['WW'].drawFunc(state, demos['WW'].ctx);
}


function fillRepeaters() {
    let state = demos['HexWW'].state;
    state.grid = Array.from({ length: state.numRows }, () => new Array(state.numCols).fill('empty'));

    [
        [4, 4], [5, 3], [5, 4], [4, 5], [4, 6], [4, 7], [4, 8], [4, 9], [4, 10]
    ].forEach((pos) => state.grid[pos[0]][pos[1]] = 'conductor');
    state.grid[3][4] = 'e-tail';
    state.grid[4][2] = 'e-head';
    state.grid[3][3] = 'e-mid';

    [
        [9, 5], [11, 5], [11, 3], [11, 4], [10, 5], [10, 6], [10, 7], [10, 8], [10, 9], [10, 10]
    ].forEach((pos) => state.grid[pos[0]][pos[1]] = 'conductor');
    state.grid[9][4] = 'e-tail';
    state.grid[10][2] = 'e-head';
    state.grid[9][3] = 'e-mid';

    [
        [15, 5], [17, 5], [17, 3], [17, 4], [15, 6], [17, 6], [16, 6], [16, 7], [16, 8], [16, 9], [16, 10]
    ].forEach((pos) => state.grid[pos[0]][pos[1]] = 'conductor');
    state.grid[15][4] = 'e-tail';
    state.grid[16][2] = 'e-head';
    state.grid[15][3] = 'e-mid';
    
    [
        [24, 2], [22, 2], [21, 3], [23, 3], [25, 3], [21, 4], [25, 4], [22, 4], [24, 4], [23, 6], [23, 7], [23, 8], [23, 9], [23, 10], [23, 11]
    ].forEach((pos) => state.grid[pos[0]][pos[1]] = 'conductor');
    state.grid[23][3] = 'e-head';
    
    [
        [2, 20], [2, 21], [2, 22], [2, 23], [3, 22], [4, 21], [4, 22], [6, 21], [6, 22], [8, 21], [8, 22], [10, 21], [10, 22]
    ].forEach((pos) => state.grid[pos[0]][pos[1]] = 'conductor');
    state.grid[4][21] = 'e-head';
    state.grid[4][22] = 'e-head';
    
    [
        [22, 27], [23, 27], [23, 28], [24, 25], [24, 26], [24, 28], [24, 29], [23, 25], [23, 30], [22, 25], [22, 29], [21, 26], [21, 29], [20, 26], [20, 28],
        [18, 27], [17, 28], [16, 27], [15, 28], [14, 27], [13, 28], [12, 27], [11, 28]
    ].forEach((pos) => state.grid[pos[0]][pos[1]] = 'conductor');
    state.grid[22][27] = 'e-head';
    
    [
        [22, 16], [23, 16], [23, 17], [24, 14], [24, 15], [24, 17], [24, 18], [23, 14], [23, 19], [22, 14], [22, 18], [21, 15], [21, 18], [20, 15], [20, 17],
        [19, 16], [19, 17], [17, 16], [17, 17], [15, 16], [15, 17], [13, 16], [13, 17]
    ].forEach((pos) => state.grid[pos[0]][pos[1]] = 'conductor');
    state.grid[22][16] = 'e-head';

    demos['HexWW'].drawFunc(state, demos['HexWW'].ctx);

}

function fillReflectors() {
    let state = demos['HexWW'].state;
    state.grid = Array.from({ length: state.numRows }, () => new Array(state.numCols).fill('empty'));

    
    [
        [1, 20], [1, 21], [1, 22], [2, 19], [2, 22], [2, 18], [3, 20], [3, 23], [4, 18], [4, 22], [5, 18], [5, 20], [5, 21], [5, 22], [6,18],
        [5, 17], [5, 16], [5, 15], [5, 14], [5, 13], [5, 12], [5, 11],
        [4, 9], [5, 10], [5, 8], [5, 7], [5, 6], [6, 5], [6, 9], [7, 5], [7, 8], [8, 5], [8, 8], [8, 9], [9, 6], [9, 7], [9, 8]
    ].forEach((pos) => state.grid[pos[0]][pos[1]] = 'conductor');
    state.grid[5][8] = 'e-head';
    
    [
        [2, 25], [2, 26], [2, 27], [2, 28], [2, 29], [2, 30],
        [3, 28],
        [4, 25], [4, 26], [4, 27], [4, 28], [4, 29], [4, 30], 
        [6, 27], [6, 28], 
        [8, 27], [8, 28], 
        [10, 27], [10, 28], 
        [12, 27], [12, 28], 
        [14, 27], [14, 28], 
        [16, 27], [16, 28], 
        [18, 27], [18, 28], 
        [20, 25], [20, 26], [20, 27], [20, 28], [20, 29], [20, 30], 
        [21, 28],
        [22, 25], [22, 26], [22, 27], [22, 28], [22, 29], [22, 30]
    ].forEach((pos) => state.grid[pos[0]][pos[1]] = 'conductor');
    state.grid[3][28] = 'e-head';

    demos['HexWW'].drawFunc(state, demos['HexWW'].ctx);
}

function fillDiodeHex() {
    let state = demos['HexWW'].state;
    state.grid = Array.from({ length: state.numRows }, () => new Array(state.numCols).fill('empty'));

    [
        [8, 3], [10, 3], [10, 1], [10, 2], [8, 4], [10, 4], [8, 5], [10, 5], [9, 6], [9, 7], [9, 8], [9, 9], [9, 10], [8, 12], [10, 12], [9, 14], [9, 11], [9, 15], [9, 16], [9, 17], [9, 18], [9, 12], [9, 1], [8, 1], [8, 2]
    ].forEach((pos) => state.grid[pos[0]][pos[1]] = 'conductor');
    state.grid[8][5] = 'e-head';
    state.grid[8][4] = 'e-mid';
    state.grid[8][3] = 'e-tail';
    
    [
        [14, 3], [16, 3], [16, 1], [16, 2], [14, 4], [16, 4], [14, 5], [16, 5], [15, 6], [15, 7], [15, 8], [15, 9], [15, 10], [14, 13], [16, 13], [15, 14], [15, 11], [15, 15], [15, 16], [15, 17], [15, 18], [15, 12], [15, 1], [14, 1], [14, 2]
    ].forEach((pos) => state.grid[pos[0]][pos[1]] = 'conductor');
    state.grid[14][5] = 'e-head';
    state.grid[14][4] = 'e-mid';
    state.grid[14][3] = 'e-tail';
    
    [
        [2, 27], [2, 28], [2, 29], [2, 30], [3, 29], [4, 28], [4, 29],
        [6, 28], [6, 29],
        [8, 28], [8, 29],
        [10, 28], [10, 29],
        [11, 29],
        [13, 28], [13, 30],
        [14, 28], [14, 29],
        [16, 28], [16, 29],
        [18, 28], [18, 29],
        [20, 28], [20, 29],
        [22, 28], [22, 29]
    ].forEach((pos) => state.grid[pos[0]][pos[1]] = 'conductor');
    state.grid[4][28] = 'e-head';
    state.grid[4][29] = 'e-head';
    [
        [2, 21], [2, 22], [2, 23], [2, 24], [3, 23], [4, 22], [4, 23], [6, 22], [6, 23], [8, 22], [8, 23], [10, 22], [10, 23],
        [13, 23], [11, 22], [11, 24], [14, 22], [14, 23], [16, 22], [16, 23], [18, 22], [18, 23], [20, 22], [20, 23], [22, 22], [22, 23]
    ].forEach((pos) => state.grid[pos[0]][pos[1]] = 'conductor');
    state.grid[4][22] = 'e-head';
    state.grid[4][23] = 'e-head';

    demos['HexWW'].drawFunc(state, demos['HexWW'].ctx);
}


function fillAndGateHex() {
    let state = demos['HexWW'].state;
    state.grid = Array.from({ length: state.numRows }, () => new Array(state.numCols).fill('empty'));

    [
        [9, 11], [11, 11], [11, 9], [11, 10], [9, 12], [11, 12], [9, 13], [11, 13], [10, 13], [9, 10], [10, 8], [9, 9], [11, 14], [11, 15], [11, 16], [11, 17], [11, 18], [11, 19], [11, 20]
    ].forEach((pos) => state.grid[pos[0]][pos[1]] = 'conductor');
    state.grid[11][11] = 'e-head';
    state.grid[11][10] = 'e-mid';
    state.grid[11][9] = 'e-tail';
    
    [
        [15, 5], [17, 5], [17, 3], [17, 4], [15, 6], [17, 6], [15, 7], [17, 7], [15, 8], [15, 9], [15, 10], [17, 8], [15, 4], [16, 2], [15, 3], [15, 11], [17, 11], [17, 9], [17, 10], [15, 12], [17, 12], [15, 13], [17, 13], [16, 13], [15, 14], [15, 15], [15, 16], [15, 17], [15, 18], [15, 19], [15, 20]
    ].forEach((pos) => state.grid[pos[0]][pos[1]] = 'conductor');
    state.grid[17][12] = 'e-head';
    state.grid[17][11] = 'e-mid';
    state.grid[17][10] = 'e-tail';

    [
        [12, 20], [14, 20], [13, 22], [13, 23], [13, 24], [13, 25], [13, 26], [13, 27], [13, 28]
    ].forEach((pos) => state.grid[pos[0]][pos[1]] = 'conductor');

    demos['HexWW'].drawFunc(state, demos['HexWW'].ctx);
}

function fillXorGateHex() {
    let state = demos['HexWW'].state;
    state.grid = Array.from({ length: state.numRows }, () => new Array(state.numCols).fill('empty'));

    [
        [9, 11], [11, 11], [11, 9], [11, 10], [9, 12], [11, 12], [9, 13], [11, 13], [10, 13], [9, 10], [10, 8], [9, 9], [11, 14], [11, 15], [11, 16], [11, 17], [11, 18], [11, 19]
    ].forEach((pos) => state.grid[pos[0]][pos[1]] = 'conductor');
    state.grid[11][11] = 'e-head';
    state.grid[11][10] = 'e-mid';
    state.grid[11][9] = 'e-tail';
    
    [
        [15, 5], [17, 5], [17, 3], [17, 4], [15, 6], [17, 6], [15, 7], [17, 7], [15, 8], [15, 9], [15, 10], [17, 8], [15, 4], [16, 2], [15, 3], [15, 11], [17, 11], [17, 9], [17, 10], [15, 12], [17, 12], [15, 13], [17, 13], [16, 13], [15, 14], [15, 15], [15, 16], [15, 17], [15, 18], [15, 19]
    ].forEach((pos) => state.grid[pos[0]][pos[1]] = 'conductor');
    state.grid[17][12] = 'e-head';
    state.grid[17][11] = 'e-mid';
    state.grid[17][10] = 'e-tail';

    [
        [12, 19], [14, 19], [10, 19], [16, 19], [11, 21], [15, 21], [12, 21], [14, 21], [13, 22], [13, 23], [13, 24], [13, 25], [13, 26], [13, 27], [13, 28]
    ].forEach((pos) => state.grid[pos[0]][pos[1]] = 'conductor');

    demos['HexWW'].drawFunc(state, demos['HexWW'].ctx);
}

function fillOrGateHex() {
    let state = demos['HexWW'].state;
    state.grid = Array.from({ length: state.numRows }, () => new Array(state.numCols).fill('empty'));

    [
        [9, 11], [11, 11], [11, 9], [11, 10], [9, 12], [11, 12], [9, 13], [11, 13], [10, 13], [9, 10], [10, 8], [9, 9], [11, 14], [11, 15], [11, 16], [11, 17], [11, 18], [11, 19]
    ].forEach((pos) => state.grid[pos[0]][pos[1]] = 'conductor');
    state.grid[11][11] = 'e-head';
    state.grid[11][10] = 'e-mid';
    state.grid[11][9] = 'e-tail';
    
    [
        [15, 5], [17, 5], [17, 3], [17, 4], [15, 6], [17, 6], [15, 7], [17, 7], [15, 8], [15, 9], [15, 10], [17, 8], [15, 4], [16, 2], [15, 3], [15, 11], [17, 11], [17, 9], [17, 10], [15, 12], [17, 12], [15, 13], [17, 13], [16, 13], [15, 14], [15, 15], [15, 16], [15, 17], [15, 18], [15, 19]
    ].forEach((pos) => state.grid[pos[0]][pos[1]] = 'conductor');
    state.grid[17][12] = 'e-head';
    state.grid[17][11] = 'e-mid';
    state.grid[17][10] = 'e-tail';

    [
        [12, 19], [14, 19], [10, 19], [16, 19], [11, 21], [15, 21], [13, 21], [11, 22], [15, 22], [12, 22], [14, 22], [13, 23], [13, 24], [13, 25], [13, 26], [13, 27], [13, 28]
    ].forEach((pos) => state.grid[pos[0]][pos[1]] = 'conductor');

    demos['HexWW'].drawFunc(state, demos['HexWW'].ctx);
}

function fillFlipFlopHex() {
    let state = demos['HexWW'].state;
    state.grid = Array.from({ length: state.numRows }, () => new Array(state.numCols).fill('empty'));

    [
        [4, 7], [4, 8], [4, 9], [4, 10], [4, 11], [4, 12], [4, 13], [4, 14], [4, 15], [4, 16], [4, 17],
        [3, 18], [2, 17], [5, 18], [6, 17], [5, 15], [6, 14],
        [8, 13], [8, 14], [8, 17], [8, 18], [9, 14], [9, 18], [10, 13], [10, 17], [11, 13], [11, 17],

        [12, 5], [12, 6], [12, 7], [12, 8], [12, 9], [12, 10], [12, 11], [12, 12], [12, 13], [12, 14],
        [12, 15], [12, 16], [12, 17], [12, 18], [12, 19], [12, 20], [12, 21], [12, 22], [12, 23], [12, 24],
        [13, 5], [13, 25],

        [14, 4], [14, 7], [14, 8], [14, 9], [14, 10], [14, 11], [14, 12], [14, 13], [14, 14], [14, 15], [14, 16],
        [14, 17], [14, 18], [14, 19], [14, 20], [14, 21], [14, 22], [14, 23], [14, 24],

        [15, 5], [15, 7],

        [16, 4], [16, 7], [16, 8], [16, 9], [16, 10], [16, 11], [16, 12], [16, 13], [16, 14], [16, 15], [16, 16],
        [16, 17], [16, 18], [16, 19], [16, 20], [16, 21], [16, 22], [16, 23], [16, 24],

        [17, 5], [17, 25],

        [18, 4], [18, 7], [18, 8], [18, 9], [18, 10], [18, 11], [18, 12], [18, 13], [18, 14], [18, 15], [18, 16],
        [18, 17], [18, 18], [18, 19], [18, 20], [18, 21], [18, 22], [18, 23], [18, 24],

        [19, 5], [19, 7],

        [20, 4], [20, 7], [20, 8], [20, 9], [20, 10], [20, 11], [20, 12], [20, 13], [20, 14], [20, 15], [20, 16],
        [20, 17], [20, 18], [20, 19], [20, 20], [20, 21], [20, 22], [20, 23], [20, 24],

        [21, 5], [21, 25],

        [22, 5], [22, 6], [22, 7], [22, 8], [22, 9], [22, 10], [22, 11], [22, 12], [22, 13], [22, 14], [22, 15], [22, 16], [22, 17], [22, 18], [22, 19], [22, 20], [22, 21], [22, 22], [22, 23], [22, 24]

    ].forEach((pos) => state.grid[pos[0]][pos[1]] = 'conductor');
    state.grid[12][7] = 'e-head';
    state.grid[12][6] = 'e-mid';
    state.grid[12][5] = 'e-tail';

    demos['HexWW'].drawFunc(state, demos['HexWW'].ctx);
}

function fillFlashersHex() {
    let state = demos['HexWW'].state;
    state.grid = Array.from({ length: state.numRows }, () => new Array(state.numCols).fill('empty'));

    [
        [8, 12], [8, 14], [9, 13], [9, 14],
        [9, 11], [9, 16], [10, 11], [10, 15],
        [11, 10], [11, 11], [11, 16], [11, 17],
        [13, 10], [13, 11], [13, 16], [13, 17],
        [14, 11], [14, 15], [15, 11], [15, 16],
        [15, 13], [15, 14], [16, 12], [16, 14],
    ].forEach((pos) => state.grid[pos[0]][pos[1]] = 'conductor');
    state.grid[8][12] = 'e-head';
    state.grid[9][13] = 'e-head';
    state.grid[8][14] = 'e-mid';
    state.grid[9][14] = 'e-mid';

    state.grid[13][16] = 'e-head';
    state.grid[13][17] = 'e-head';
    state.grid[14][15] = 'e-mid';
    state.grid[15][16] = 'e-mid';

    state.grid[14][11] = 'e-head';
    state.grid[15][11] = 'e-head';
    state.grid[13][10] = 'e-mid';
    state.grid[13][11] = 'e-mid';
    
    [
        [5, 20], [6, 20], [4, 21], [5, 22], [6, 22], [4, 23], [5, 24]
    ].forEach((pos) => state.grid[pos[0]][pos[1]] = 'conductor');
    state.grid[5][22] = 'e-head';
    
    [
        [13, 22], [13, 23], [15, 22], [15, 23], [17, 22], [17, 23], [17, 24], [18, 20], [18, 22], [18, 24],
        [19, 21], [19, 22], [19, 23], [21, 22], [21, 23], [23, 22], [23, 23]
    ].forEach((pos) => state.grid[pos[0]][pos[1]] = 'conductor');
    state.grid[18][22] = 'e-head';

    demos['HexWW'].drawFunc(state, demos['HexWW'].ctx);
}

function clearHex() {
    let state = demos['HexWW'].state;
    state.grid = Array.from({ length: state.numRows }, () => new Array(state.numCols).fill('empty'));

    demos['HexWW'].drawFunc(state, demos['HexWW'].ctx);
}

const hexButton1 = document.getElementById("hex-repeaters");
const hexButton2 = document.getElementById("hex-reflectors");
const hexButton3 = document.getElementById("hex-diode");
const hexButton4 = document.getElementById("hex-and-gate");
const hexButton5 = document.getElementById("hex-xor-gate");
const hexButton6 = document.getElementById("hex-or-gate");
const hexButton7 = document.getElementById("hex-flip-flop");
const hexButton8 = document.getElementById("hex-flashers");
const hexButton9 = document.getElementById("hex-clear");

hexButton1.addEventListener('click', fillRepeaters);
hexButton2.addEventListener('click', fillReflectors);
hexButton3.addEventListener('click', fillDiodeHex);
hexButton4.addEventListener('click', fillAndGateHex);
hexButton5.addEventListener('click', fillXorGateHex);
hexButton6.addEventListener('click', fillOrGateHex);
hexButton7.addEventListener('click', fillFlipFlopHex);
hexButton8.addEventListener('click', fillFlashersHex);
hexButton9.addEventListener('click', clearHex);


const hexColorButtons = document.querySelectorAll('.hex-color-selector');
let hexSelected = 'conductor';

hexColorButtons.forEach(button => {
    button.addEventListener('click', () => {
        hexColorButtons.forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
        hexSelected = button.id.substring(9);
    });
});


const golColorButtons = document.querySelectorAll('.gol-color-selector');
let golSelected = 'alive';

golColorButtons.forEach(button => {
    button.addEventListener('click', () => {
        golColorButtons.forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
        golSelected = button.id.substring(13);
    });
});


const wwColorButtons = document.querySelectorAll('.ww-color-selector');
let wwSelected = 'conductor';

wwColorButtons.forEach(button => {
    button.addEventListener('click', () => {
        wwColorButtons.forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
        wwSelected = button.id.substring(12);
    });
});

const hexPlayPause = document.getElementById("hex-play-pause");
hexPlayPause.addEventListener('click', () => demos['HexWW'].state.paused = !demos['HexWW'].state.paused);
const hexStep = document.getElementById("hex-step");
hexStep.addEventListener('click', () => tickHexWW(demos['HexWW'].state));

const wwPlayPause = document.getElementById("ww-play-pause");
wwPlayPause.addEventListener('click', () => demos['WW'].state.paused = !demos['WW'].state.paused);
const wwStep = document.getElementById("ww-step");
wwStep.addEventListener('click', () => tickWW(demos['WW'].state));

const golPlayPause = document.getElementById("gol-play-pause");
golPlayPause.addEventListener('click', () => demos['GOL'].state.paused = !demos['GOL'].state.paused);
const golStep = document.getElementById("gol-step");
golStep.addEventListener('click', () => tickGOL(demos['GOL'].state));

hexDemo.addEventListener('click', function(event) {
    let state = demos['HexWW'].state;
    let pos = getHexRowCol(event.offsetX, event.offsetY);
    if (0 <= pos[0] && pos[0] < state.grid.length && 0 <= pos[1] && pos[1] < state.grid[0].length) {
        state.grid[pos[0]][pos[1]] = hexSelected;
    }
    demos['HexWW'].drawFunc(state, demos['HexWW'].ctx);
});

wwDemo.addEventListener('click', function(event) {
    let state = demos['WW'].state;
    let pos = getWWRowCol(event.offsetX, event.offsetY);
    if (0 <= pos[0] && pos[0] < state.grid.length && 0 <= pos[1] && pos[1] < state.grid[0].length) {
        state.grid[pos[0]][pos[1]] = wwSelected;
    }
    demos['WW'].drawFunc(state, demos['WW'].ctx);
});

golDemo.addEventListener('click', function(event) {
    let state = demos['GOL'].state;
    let pos = getGOLRowCol(event.offsetX, event.offsetY);
    if (0 <= pos[0] && pos[0] < state.grid.length && 0 <= pos[1] && pos[1] < state.grid[0].length) {
        state.grid[pos[0]][pos[1]] = golSelected;
    }
    demos['GOL'].drawFunc(state, demos['GOL'].ctx);
});

function getGOLRowCol(x, y) {
    let state = demos['GOL'].state;
    let cellSize = Math.floor(Math.min(golDemo.width / state.numCols, golDemo.height / state.numRows));
    let hBuffer = Math.floor((golDemo.width - cellSize * state.numCols + 2) / 2);
    let vBuffer = Math.floor((golDemo.height - cellSize * state.numRows + 2) / 2);
    let r = Math.floor((y - vBuffer) / (cellSize));
    let c = Math.floor((x - hBuffer) / (cellSize));
    return [r, c];
}

function getWWRowCol(x, y) {
    let state = demos['WW'].state;
    let cellSize = Math.floor(Math.min(wwDemo.width / state.numCols, wwDemo.height / state.numRows));
    let hBuffer = Math.floor((wwDemo.width - cellSize * state.numCols + 2) / 2);
    let vBuffer = Math.floor((wwDemo.height - cellSize * state.numRows + 2) / 2);
    let r = Math.floor((y - vBuffer) / (cellSize));
    let c = Math.floor((x - hBuffer) / (cellSize));
    return [r, c];
}

function getHexRowCol(x, y) {
    let state = demos['HexWW'].state;

    let a = (hexDemo.width - 5) / (2*state.numCols + 1) * 2 / Math.sqrt(3);
    let b = (hexDemo.height - 5) / (state.numRows + 1/4) * 2 / 3;

    let cornerRadius = Math.min(a, b); // center-to-corner
    let edgeRadius = cornerRadius * Math.sqrt(3) / 2; // center-to-edge

    let r = Math.floor(y / (3 * cornerRadius / 2));
    let r_over = y - r * (3 * cornerRadius / 2);

    if (r_over > cornerRadius / 2) {
        let c = x / (2 * edgeRadius);
        if (r % 2 == 0) {
            c = (x - edgeRadius) / (2 * edgeRadius);
        }
        c = Math.floor(c);
        return [r, c];
    } else {
        let c = Math.floor(x / (2 * edgeRadius));
        let c_over = x - c * (2 * edgeRadius);
        if (r % 2 == 1) {
            if (r_over < (cornerRadius / 2) - c_over / Math.sqrt(3)) {
                return [r-1, c-1];
            } else if (r_over < -1 * (cornerRadius / 2) + c_over / Math.sqrt(3)) {
                return [r-1, c];
            } else {
                return [r, c];
            }
        } else {
            if (r_over > c_over / Math.sqrt(3)) {
                return [r, c-1];
            } else if (r_over > 2 * (cornerRadius / 2) - c_over / Math.sqrt(3)) {
                return [r, c];
            } else {
                return [r-1, c];
            }
        }
    }
}



function initHexWW(state) {
    state.numRows = 28;
    state.numCols = 32;
    state.paused = true;
    fillXorGateHex();
}

function drawHexWW(state, ctx) {
    ctx.clearRect(0, 0, hexDemo.width, hexDemo.height);

    let a = (hexDemo.width - 5) / (2*state.numCols + 1) * 2 / Math.sqrt(3);
    let b = (hexDemo.height - 5) / (state.numRows + 1/4) * 2 / 3;

    let cornerRadius = Math.min(a, b); // center-to-corner
    let edgeRadius = cornerRadius * Math.sqrt(3) / 2; // center-to-edge
    for (let r = 0; r < state.numRows; r++) {
        for (let c = 0; c < state.numCols; c++) {
            let x = c * (2 * edgeRadius);
            let y = r * ((3 * cornerRadius) / 2) + cornerRadius / 2;
            if (r % 2 == 0) {
                x += edgeRadius;
            }
            ctx.beginPath();

            switch (state.grid[r][c]) {
                case 'empty':
                    ctx.fillStyle = '#F0F0F0';
                    break;
                case 'e-head':
                    ctx.fillStyle = '#29b1ff';
                    break;
                case 'e-mid':
                    ctx.fillStyle = '#67c6f1';
                    break;
                case 'e-tail':
                    ctx.fillStyle = '#a1cae6';
                    break;
                case 'conductor':
                    ctx.fillStyle = '#aaaaaa';
                    break;
            }
            
            ctx.strokeStyle = "#CCCCCC";
            drawHexagon(ctx, x, y, edgeRadius, cornerRadius / 2);            
            ctx.fill();
            ctx.stroke();
        }
    }
}

function drawHexagon(ctx, x, y, w, h) {
    x += 1;
    y += 1;
    w -= 1;
    h -= 0.5;
    ctx.lineTo(x+w, y-h);
    ctx.lineTo(x+2*w, y);
    ctx.lineTo(x+2*w, y+2*h);
    ctx.lineTo(x+w, y+3*h);
    ctx.lineTo(x, y+2*h);
    ctx.lineTo(x, y);
    ctx.lineTo(x+w, y-h);
}

function tickHexWW(state) {
    let nextGrid = Array.from({ length: state.numRows }, () => new Array(state.numCols).fill('empty'));
    for (let r = 0; r < state.numRows; r++) {
        for (let c = 0; c < state.numCols; c++) {
            switch (state.grid[r][c]) {
                case 'e-head':
                    nextGrid[r][c] = 'e-mid';
                    break;
                case 'e-mid':
                    nextGrid[r][c] = 'e-tail';
                    break;
                case 'e-tail':
                    nextGrid[r][c] = 'conductor';
                    break;
                case 'conductor':
                    if (r % 2 == 0) {
                        var innerNeighbors = [[r-1, c], [r-1, c+1], [r+1, c], [r+1, c+1], [r, c-1], [r, c+1]];
                        var outerNeighbors = [[r-2, c-1], [r-2, c], [r-2, c+1], [r-1, c-1], [r-1, c+2], [r, c-2], [r, c+2], [r+1, c-1], [r+1, c+2], [r+2, c-1], [r+2, c], [r+2, c+1]];
                    } else {
                        var innerNeighbors = [[r-1, c], [r-1, c-1], [r+1, c], [r+1, c-1], [r, c-1], [r, c+1]];
                        var outerNeighbors = [[r-2, c-1], [r-2, c], [r-2, c+1], [r-1, c-2], [r-1, c+1], [r, c-2], [r, c+2], [r+1, c-2], [r+1, c+1], [r+2, c-1], [r+2, c], [r+2, c+1]];
                    }

                    let innerCount = 0;
                    let outerCount = 0;
                    innerNeighbors.forEach((neighbor) => {
                        innerCount += state.grid[neighbor[0]]?.[neighbor[1]] == 'e-head' ? 1 : 0;
                    });
                    outerNeighbors.forEach((neighbor) => {
                        outerCount += state.grid[neighbor[0]]?.[neighbor[1]] == 'e-head' ? 1 : 0;
                    });
                    nextGrid[r][c] = (innerCount == 1 && outerCount < 2) || (innerCount == 0 && outerCount == 2) ? 'e-head' : 'conductor';
                    break;
            }
        }
    }
    state.grid = nextGrid;

    demos['HexWW'].drawFunc(state, demos['HexWW'].ctx);
}

function resizeCanvas() {
    Object.values(demos).forEach((demo) => {
        demo.canvas.width = demo.canvas.offsetWidth;
        demo.canvas.height = demo.canvas.offsetHeight;
        demo.drawFunc(demo.state, demo.ctx);
    });
}

function animationLoop(t) {
    Object.values(demos).forEach((demo) => {
        let delta = t - demo.lastTick;
        if (delta >= demo.tickRate && !demo.state.paused) {
            demo.lastTick = t;
            demo.tickFunc(demo.state);
        }
    });
    requestAnimationFrame(animationLoop);
}

Object.values(demos).forEach((demo) => demo.initFunc(demo.state));
window.addEventListener('DOMContentLoaded', () => {
  resizeCanvas();
});
requestAnimationFrame(animationLoop);
window.addEventListener('resize', resizeCanvas);