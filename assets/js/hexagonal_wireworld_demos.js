const golDemo = document.getElementById("GOL-demo");
const golDemoCtx = golDemo.getContext('2d');

// const wireworldDemo = document.getElementById("Wireworld-demo");
// const wireworldDemoCtx = wireworldDemo.getContext('2d');

// const hexWireworldDemo = document.getElementById("Hex-wireworld-demo");
// const hexWireworldDemoCtx = hexWireworldDemo.getContext('2d');

const demos = [
    {
        'canvas': golDemo,
        'ctx': golDemoCtx,
        'initFunc': initGOL,
        'drawFunc': drawGOL,
        'tickFunc': tickGOL,
        'lastTick': 0,
        'tickRate': 100, // ms per frame
        'state': {}
    }
];

function initGOL(state) {
    console.log('init');
    state.numRows = 30;
    state.numCols = 40;
    state.liveCells = new Set(['10,5', '10,6', '10,7', '9,7', '8,6']) // row-col
    state.isOn = false;
}

function drawGOL(state, ctx) {
    ctx.clearRect(0, 0, golDemo.width, golDemo.height);
    let cellSize = Math.min(golDemo.width / state.numCols, golDemo.height / state.numRows);
    for (let r = 0; r < state.numRows; r++) {
        for (let c = 0; c < state.numCols; c++) {
            ctx.beginPath()
            if (state.liveCells.has(`${r},${c}`)) {
                ctx.fillStyle = 'yellow';
            } else {
                ctx.fillStyle = 'lightgrey';
            }
            ctx.strokeStyle = "grey";

            ctx.roundRect(c * cellSize+2, r * cellSize+2, cellSize-4, cellSize-4, 3);
            ctx.fill();
            ctx.roundRect(c * cellSize+2, r * cellSize+2, cellSize-4, cellSize-4, 3);
            ctx.stroke();
        }
    }

    // Demo circle
    ctx.beginPath();
    ctx.arc(50, 50, 30, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = state.color;
    ctx.fill();
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

    console.log('tick');
    state.isOn = !state.isOn;
    state.color = state.isOn ? 'red' : 'black';
}


function animationLoop(t) {
    demos.forEach((demo) => {
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
demos.forEach((demo) => demo.initFunc(demo.state));
requestAnimationFrame(animationLoop);