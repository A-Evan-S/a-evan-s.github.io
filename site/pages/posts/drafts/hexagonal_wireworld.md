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

1. *Empty* cells always stay Empty
2. *Electron Heads* transition to Electron Tails
3. *Electron Tails* transition to Conductors
4. *Conductors* transition to Electron Heads if one or two neighboring (Moore neighborhood) cells are electron heads

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

[Super Cool Reference](https://www.redblobgames.com/grids/hexagons/)

My hope at the outset that the unique neighboring and the 6-fold symmetry (as opposed to the 4-fold of a square grid) would provide a unique opportunity for interesting rulesets and designs. I did wind up with what I think is an interesting result, but I quickly became disillusioned that the hexagonal grid by itself provides much value.

For example, hexagonal grids have six immediate neighbors, so a simple ruleset should allow for six angles of straight wires, as opposed to a square grid's four.

\[Image of 4 vs 6 neighbors\]

This is true, but mislideading. A square grid does have 4 immediate neighbors, but by the rules for Wireworld, each of its eight neighbors present a valid direction for a wire. We haven't gone up from 4 neighbors, but down from 8.

\[Image of 8 vs 6 directions\]

With this in mind, I tried a few different versions of rulesets:
    * Just use the 6 neighbors (more limited than Wireworld with little benefit)
    * Use the 6 neighbors but split into two groups of 3 with different rules (didn't find anything here, but I still think the idea of removing one level of rotational symmetry interesting)
    * Expand to use additonal neighbors (either 12 or 18)
    * Expand to use additional neighbors and split into two groups

\[Image of various neighbor versions\]

## Hexagonal Wireworld

I ended up going with 18 neighbors, split into two tiers: the 6 immediate neighbors, and the 12 outer neighbors. I also added an intermediate cell state between Electron Head and Electron Tail, as we need two spaces away to prevent an electron from interacting with itself[^quantum].

Here are the rules I ended up with:

1. *Empty* cells always stay Empty
2. *Electron Heads* transition to Electron Middles
2. *Electron Middles* transition to Electron Tails
3. *Electron Tails* transition to Conductors
4. *Conductors* transition to Electron Heads if either
    * 1 inner-neighbor cell is an electron head and 0 or 1 outer-neighbor cells are electron heads
    * 0 inner-neighbor cells are electron heads and exactly 2 outer-neighbor cells are electron heads

This rule is a bit more convoluted than the original Wireworld, but provides what we need for interesting circuits:

* Electrons can move down directly connected wires
* Two electrons colliding on a simple wire cancel out (as in the original Wireworld)
* Two electrons can either join or cancel out based on gate structure

It also has a cool visual effective reminiscent of inductance, where currents can affect each other and jump between conductors.

## Examples

Here are a bunch of different interesting structures I found playing with this ruleset

<div class="demo-container">
<div class="demo-buttons">
<button id="Hex-xor-gate">XOR Gate</button>
<button id="Hex-and-gate">AND Gate</button>
<button id="Hex-or-gate">OR Gate</button>
<button id="Hex-diode">Diodes</button>
<button id="Hex-repeaters">Repeaters</button>
<button id="Hex-reflectors">Reflectors</button>
<button id="Hex-flip-flop">Flip-Flop</button>
<button id="Hex-flashers">Flashers</button>
<button id="Hex-clear">Clear</button>
</div>
<canvas id="Hex-wireworld-demo"></canvas>

<div class="demo-buttons demo-buttons-split">
<div class="demo-buttons-left">
<button id="Hex-play-pause">Play/Pause</button>
<button id="Hex-step">Step</button>
</div>
<div class="demo-buttons-right">
<button id="selector-conductor" class="color-selector">
    <div class="color-swatch" style="background-color: #aaaaaa;"></div>
</button>
<button id="selector-e-head" class="color-selector">
    <div class="color-swatch" style="background-color: #29b1ff;"></div>
</button>
<button id="selector-e-mid" class="color-selector">
    <div class="color-swatch" style="background-color: #67c6f1;"></div>
</button>
<button id="selector-e-tail" class="color-selector">
    <div class="color-swatch" style="background-color: #a1cae6;"></div>
</button>
<button id="selector-empty" class="color-selector selected">
    <div class="color-swatch" style="background-color: #F0F0F0;"></div>
</button>
</div>
</div>
</div>

## Reflection

Overall, the hexagonal grid didn't add much for flexibility for Wireworld, and has relatively fragile structures with regard to signals needing to be in phase. That combined with the larger structures due to the necessity of the Electron Middle state, means it's difficult to find much that the hexagonal version can do that the original cannot.

Regardless, it was fun to build and makes some cool little animations!

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

    .demo-buttons-split {
        display: flex;
        justify-content: space-around;
    }

    .demo-buttons-left {
        display: flex;
        gap: 15px;
    }
    .demo-buttons-right {
        display: flex;
        flex-direction: row;
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

    .demo-buttons button.color-selector {
        padding: 2px;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .demo-buttons button.color-selector .color-swatch {
        width: 100%;
        height: 100%;
        pointer-events: none;
    }

    .demo-buttons button.color-selector.selected {
        background-color: #d0d0d0;
        border-color: #999;
    }

    .demo-buttons button.color-selector.selected:hover {
        background-color: #d0d0d0;
    }
</style>

[^quantum]: Quantum Wireworld?