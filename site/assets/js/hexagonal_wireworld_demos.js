const golDemo = document.getElementById("GOL-demo");
const golDemoCtx = golDemo.getContext('2d');

const wireworldDemo = document.getElementById("Wireworld-demo");
const wireworldDemoCtx = wireworldDemo.getContext('2d');

const hexWireworldDemo = document.getElementById("Hex-wireworld-demo");
const hexWireworldDemoCtx = hexWireworldDemo.getContext('2d');

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
        'canvas': wireworldDemo,
        'ctx': wireworldDemoCtx,
        'initFunc': initWW,
        'drawFunc': drawWW,
        'tickFunc': tickWW,
        'lastTick': 0,
        'tickRate': 100, // ms per frame
        'state': {}
    },
    'HexWW': {
        'canvas': hexWireworldDemo,
        'ctx': hexWireworldDemoCtx,
        'initFunc': initHexWW,
        'drawFunc': drawHexWW,
        'tickFunc': tickHexWW,
        'lastTick': 0,
        'tickRate': 100, // ms per frame
        'state': {}
    }
};

const golButton1 = document.getElementById("GOL-random");
const golButton2 = document.getElementById("GOL-glider");
golButton1.addEventListener('click', fillRandomGOL);
golButton2.addEventListener('click', fillGliderGOL);

function fillRandomGOL() {
    demos['GOL'].state.liveCells = new Set();
    for (let r = 0; r < demos['GOL'].state.numRows; r++) {
        for (let c = 0; c < demos['GOL'].state.numCols; c++) {
            if (Math.random() < 0.4) {
                demos['GOL'].state.liveCells.add(`${r},${c}`);
            }
        }
    }
}

function fillGliderGOL() {
    demos['GOL'].state.liveCells = new Set(["10,10", "10,11", "10,12", "9,12", "8,11"]);
}

function initGOL(state) {
    state.numRows = 30;
    state.numCols = 40;
    fillRandomGOL();
}

function drawGOL(state, ctx) {
    ctx.clearRect(0, 0, golDemo.width, golDemo.height);
    let cellSize = Math.floor(Math.min(golDemo.width / state.numCols, golDemo.height / state.numRows));
    let hBuffer = Math.floor((golDemo.width - cellSize * state.numCols + 2) / 2);
    let vBuffer = Math.floor((golDemo.height - cellSize * state.numRows + 2) / 2);
    for (let r = 0; r < state.numRows; r++) {
        for (let c = 0; c < state.numCols; c++) {
            ctx.beginPath()
            if (state.liveCells.has(`${r},${c}`)) {
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
    let nextLiveCells = new Set();
    for (let r = 0; r < state.numRows; r++) {
        for (let c = 0; c < state.numCols; c++) {
            let aliveNeighbors = 0;
            let neighbors = [[r-1, c-1], [r-1, c], [r-1, c+1], [r, c-1], [r, c+1], [r+1, c-1], [r+1, c], [r+1, c+1]];
            neighbors.forEach((neighbor) => {
                aliveNeighbors += state.liveCells.has(`${neighbor[0]},${neighbor[1]}`) ? 1 : 0;
            });
            if (aliveNeighbors == 3 || (aliveNeighbors == 2 && state.liveCells.has(`${r},${c}`))) {
                nextLiveCells.add(`${r},${c}`);
            }

        }
    }
    state.liveCells = nextLiveCells;
}


const wwButton1 = document.getElementById("WW-diodes");
const wwButton2 = document.getElementById("WW-or");
const wwButton3 = document.getElementById("WW-xor");
const wwButton4 = document.getElementById("WW-flip-flop");
wwButton1.addEventListener('click', fillDiodeWW);
wwButton2.addEventListener('click', fillORWW);
wwButton3.addEventListener('click', fillXORWW);
wwButton4.addEventListener('click', fillFlipFlopWW);

function fillDiodeWW() {
    let state = demos['WW'].state;
    state.grid = Array.from({ length: state.numRows }, () => new Array(state.numCols).fill('empty'));

    let wires = [
        [9, 9], [10, 8], [11, 8], [12, 8], [13, 8], [13, 10], [14, 9], [10, 10],
        [8, 9], [7, 10], [7, 11], [7, 12], [7, 13], [7, 14],
        [15, 9], [16, 10], [16, 11], [16, 12], [16, 13], [16, 14],
        [6, 15], [7, 15], [8, 15], [6, 16], [8, 16], [7, 17], [7, 18],
        [15, 15], [17, 15], [15, 16], [16, 16], [17, 16], [16, 17], [16, 18],
        [7, 19], [7, 20], [7, 21],
        [16, 19], [16, 20], [16, 21]
    ];

    wires.forEach((pos) => state.grid[pos[0]][pos[1]] = 'conductor');
    state.grid[11][10] = 'e-head';
    state.grid[12][10] = 'e-tail';
}

function fillORWW() {
    let state = demos['WW'].state;
    state.grid = Array.from({ length: state.numRows }, () => new Array(state.numCols).fill('empty'));
}

function fillXORWW() {
    let state = demos['WW'].state;
    state.grid = Array.from({ length: state.numRows }, () => new Array(state.numCols).fill('empty'));
}

function fillFlipFlopWW() {
    let state = demos['WW'].state;
    state.grid = Array.from({ length: state.numRows }, () => new Array(state.numCols).fill('empty'));
}

function initWW(state) {
    state.numRows = 24;
    state.numCols = 32;
    fillDiodeWW();
}

function drawWW(state, ctx) {
    ctx.clearRect(0, 0, wireworldDemo.width, wireworldDemo.height);
    let cellSize = Math.floor(Math.min(wireworldDemo.width / state.numCols, wireworldDemo.height / state.numRows));
    let hBuffer = Math.floor((wireworldDemo.width - cellSize * state.numCols + 2) / 2);
    let vBuffer = Math.floor((wireworldDemo.height - cellSize * state.numRows + 2) / 2);
    for (let r = 0; r < state.numRows; r++) {
        for (let c = 0; c < state.numCols; c++) {
            ctx.beginPath();

            switch (state.grid[r][c]) {
                case 'empty':
                    ctx.fillStyle = '#F0F0F0';
                    break;
                case 'e-head':
                    ctx.fillStyle = '#5f98daff';
                    break;
                case 'e-tail':
                    ctx.fillStyle = '#b14646ff';
                    break;
                case 'conductor':
                    ctx.fillStyle = '#fac518ff';
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
                        eNeighbors += state.grid[neighbor[0]][neighbor[1]] == 'e-head' ? 1 : 0;
                    });
                    nextGrid[r][c] = eNeighbors == 1 || eNeighbors == 2 ? 'e-head' : 'conductor';
                    break;
            }
        }
    }
    state.grid = nextGrid;
}


function repeater1() {
    let state = demos['HexWW'].state;
    state.grid = Array.from({ length: state.numRows }, () => new Array(state.numCols).fill('empty'));
    state.grid[3][3] = 'e-head';
    state.grid[3][4] = 'e-mid';
    state.grid[4][2] = 'conductor';
    state.grid[4][4] = 'e-tail';
    state.grid[5][3] = 'conductor';
    state.grid[5][4] = 'conductor';
    state.grid[4][5] = 'conductor';
    state.grid[4][6] = 'conductor';
    state.grid[4][7] = 'conductor';
    state.grid[4][8] = 'conductor';
    state.grid[4][9] = 'conductor';
}

function repeater2() {
    let state = demos['HexWW'].state;
    state.grid = Array.from({ length: state.numRows }, () => new Array(state.numCols).fill('empty'));
}

const hexButton1 = document.getElementById("Hex-repeater-1");
const hexButton2 = document.getElementById("Hex-repeater-2");
hexButton1.addEventListener('click', repeater1);
hexButton2.addEventListener('click', repeater2);

function initHexWW(state) {
    state.numRows = 27;
    state.numCols = 32;
    repeater1();
}

function drawHexWW(state, ctx) {
    ctx.clearRect(0, 0, hexWireworldDemo.width, hexWireworldDemo.height);
    // let cellSize = Math.floor(Math.min(wireworldDemo.width / state.numCols, wireworldDemo.height / state.numRows));
    // let hBuffer = Math.floor((wireworldDemo.width - cellSize * state.numCols + 2) / 2);
    // let vBuffer = Math.floor((wireworldDemo.height - cellSize * state.numRows + 2) / 2);

    let a = (wireworldDemo.width - 5) / (2*state.numCols + 1) * 2 / Math.sqrt(3);
    let b = (wireworldDemo.height - 5) / (state.numRows + 1/4) * 2 / 3;

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
                    ctx.fillStyle = '#327ffcff';
                    break;
                case 'e-mid':
                    ctx.fillStyle = '#749ee2ff';
                    break;
                case 'e-tail':
                    ctx.fillStyle = '#a2bae0ff';
                    break;
                case 'conductor':
                    ctx.fillStyle = '#fac518ff';
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
                        var outerNeighbors = [];
                    } else {
                        var innerNeighbors = [[r-1, c], [r-1, c-1], [r+1, c], [r+1, c-1], [r, c-1], [r, c+1]];
                        var outerNeighbors = [];
                    }

                    let innerCount = 0;
                    let outerCount = 0;
                    innerNeighbors.forEach((neighbor) => {
                        innerCount += state.grid[neighbor[0]][neighbor[1]] == 'e-head' ? 1 : 0;
                    });
                    outerNeighbors.forEach((neighbor) => {
                        outerCount += state.grid[neighbor[0]][neighbor[1]] == 'e-head' ? 1 : 0;
                    });
                    nextGrid[r][c] = (innerCount == 1 && outerCount < 2) || (innerCount == 0 && outerCount == 2) ? 'e-head' : 'conductor';
                    break;
            }
        }
    }
    state.grid = nextGrid;
}

function animationLoop(t) {
    Object.values(demos).forEach((demo) => {
        demo.canvas.width = demo.canvas.offsetWidth;
        demo.canvas.height = demo.canvas.offsetHeight;
        let delta = t - demo.lastTick;
        if (delta >= demo.tickRate) {
            demo.lastTick = t;
            demo.tickFunc(demo.state);
        }
        demo.drawFunc(demo.state, demo.ctx);
    });
    requestAnimationFrame(animationLoop);
}
Object.values(demos).forEach((demo) => demo.initFunc(demo.state));
requestAnimationFrame(animationLoop);