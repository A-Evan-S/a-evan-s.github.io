---
title: Hexagonal Wireworld
date: 2025-12-10
summary: Attempting to make a version of the Wireworld cellular automaton on a hexagonal grid
---

Spoiler: it's just like the original, but... worse

## Cellular Automata

Cellular automata are models comprised of a grid of cells, a finite set of states that each cell can be in, a neighborhood of cells whose states affect a given cell, and a set of rules which define how cells transition from one state to another. 

The most famous cellular automaton is likey John Conway's Game of Life. In this, cells are in one of two states: Alive or Dead, and transition between these states based on the number of neighboring alive cells. Specifically, the Game of Life dictates that:

1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.
2. Any live cell with two or three live neighbours lives on to the next generation.
3. Any live cell with more than three live neighbours dies, as if by overpopulation.
4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

Here "neighbors" are defined by the [Moore neighborhood](link), meaning the 4 adjacent cells and the 4 diagnally adjacent cells.

These simple rules give rise to some marvelously complex behaviors if given the right starting cell states, and a seemingly natural chaos when randomly initialized.

<div class="demo-container">
<div class="demo-buttons">
<button id="GOL-random">Random</button>
<button id="GOL-glider">Glider</button>
</div>
<canvas id="GOL-demo"></canvas>
</div>

## Wireworld

Wireworld, a cellular automaton first proposed by Brian Silverman, is relatively constrained compared to the Game of Life. Rather than allow every cell to transition freely, simulations are constrained to pre-initialized paths (wires) and the rest of the cells are set to an Empty state which can only transition to itself.

More precicely, Wireworld uses four different cell states:

1. Empty
2. Electron Head
3. Electron Tail
4. Conductor

The rules for the transitions between these states are relatively simple. At each step

1. Empty cells always stay Empty
2. Electron Heads transition to Electron Tails
3. Electron Tails transition to Conductors
4. Conductors transition to Electron Heads if one or two neighboring (Moore neighborhood) cells are electron heads

In effect, this means that a long sequence of connected Conductor cells acts as a wire and pairs of Electron Heads and Electron Tails move along these wires. However, the constraint that three or more Electron Heads stop the propagation of the "electron" creates opportunities to design interesting circuits.


<div class="demo-container">
<div class="demo-buttons">
<button id="WW-diodes">Diode</button>
<button id="WW-or">OR gate</button>
<button id="WW-xor">XOR gate</button>
<button id="WW-flip-flop">Flip-flop</button>
</div>
<canvas id="Wireworld-demo"></canvas>
</div>
\[Demo of simple circuit\]

In fact, some absolute madmen created patterns for diodes, gates, flip-flops, and put together a Wireworld computer [https://www.quinapalus.com/wi-index.html](https://www.quinapalus.com/wi-index.html).

## Hexagonal Grids

Wireworld is tremendously cool, and hexagons are tremendously cool, so what if we build wireworld not on a square grid, but on a hexagonally tiled grid?

...

<div class="demo-container">
<canvas id="Hex-wireworld-demo"></canvas>
</div>


<script src="/assets/js/hexagonal_wireworld_demos.js"></script>
<style>
    .demo-container canvas {
        width: 100%;
        display: block;
        margin: auto;
        aspect-ratio: 4 / 3;
    }

    .demo-container {
        padding: 20px 20px 10px 20px;
        border: 1px solid #ccc;
        border-radius: 6px;
        background-color: #fafafa;
        max-width: 100%;
    }

    .demo-buttons {
        display: flex;
        gap: 15px;
        margin-bottom: 15px;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
    }

    .demo-buttons button {
        padding: 8px 12px;
        border: 1px solid #ccc;
        border-radius: 3px;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        font-size: 14px;
        background-color: #f0f0f0;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    .demo-buttons button:hover {
        background-color: #e3e3e3;
    }
</style>