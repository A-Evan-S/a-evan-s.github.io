---
title: Hexagonal Wireworld
date: 2025-12-28
summary: Attempting to make a version of the Wireworld cellular automaton on a hexagonal grid
---

## Cellular Automata

Cellular automata are models comprised of a grid of cells, a finite set of states that each cell can be in, a neighborhood of cells whose states affect a given cell, and a set of rules which define how cells transition from one state to another. 

The most famous cellular automaton is likely John Conway's Game of Life. In this particular model, cells are in one of two states: Alive or Dead, and transition between these states based on the number of neighboring alive cells. Specifically, the Game of Life dictates that:

1. <button inert class="sample-cell">
        <div class="color-swatch" style="background-color: #F0F0F0;"></div>
   </button>**Dead** cells become alive if they have exactly three live neighbors
1. <button inert class="sample-cell">
        <div class="color-swatch" style="background-color: #333333;"></div>
   </button>**Alive** cells stay alive if they have two or three live neighbors

Here "neighbors" are defined by the [Moore neighborhood](https://en.wikipedia.org/wiki/Moore_neighborhood), meaning the 4 adjacent cells and the 4 diagonally adjacent cells.

These simple rules give rise to some marvelously complex behaviors if given the right starting cell states, and a seemingly natural chaos when randomly initialized.

<div class="demo-container">
<div class="demo-buttons">
<button id="gol-glider">Glider</button>
<button id="gol-mwss">Spaceship</button>
<button id="gol-glider-gun">Glider Gun</button>
<button id="gol-random">Random</button>
<button id="gol-clear">Clear</button>
</div>
<canvas id="gol-demo"></canvas>

<div class="demo-buttons demo-buttons-split">
<div class="demo-buttons-left">
<button id="gol-play-pause">Play/Pause</button>
<button id="gol-step">Step</button>
</div>
<div class="demo-buttons-right">
<button id="gol-selector-alive" class="gol-color-selector color-selector selected" aria-label="Alive">
    <div class="color-swatch" style="background-color: #333333;"></div>
</button>
<button id="gol-selector-dead" class="gol-color-selector color-selector" aria-label="Dead">
    <div class="color-swatch" style="background-color: #F0F0F0;"></div>
</button>
</div>
</div>
</div>

There are many other cellular automata using different states, rules, definitions of neighbors, or even numbers of dimensions. It is a [rabbit hole](https://en.wikipedia.org/wiki/Cellular_automaton#Specific_rules) well worth exploring.

## Wireworld

Wireworld, a cellular automaton first proposed by Brian Silverman, is relatively constrained compared to the Game of Life. Rather than allow every cell to transition freely, simulations are constrained to pre-initialized paths (conductors) and the rest of the cells are set to an empty state which can only transition to itself.

More precisely, Wireworld uses four different cell states with their own transition rules:

1. <button inert class="sample-cell">
        <div class="color-swatch" style="background-color: #F0F0F0;"></div>
   </button>**Empty** cells always stay Empty
2. <button inert class="sample-cell">
        <div class="color-swatch" style="background-color: #29b1ff;"></div>
   </button>**Electron Heads** transition to Electron Tails
3. <button inert class="sample-cell">
        <div class="color-swatch" style="background-color: #a1cae6;"></div>
   </button>**Electron Tails** transition to Conductors
4. <button inert class="sample-cell">
        <div class="color-swatch" style="background-color: #aaaaaa;"></div>
   </button>**Conductors** transition to Electron Heads if one or two neighboring (Moore neighborhood) cells are electron heads

In effect, this means that a long sequence of connected Conductor cells acts as a wire and pairs of Electron Heads and Electron Tails move along these wires. However, the constraint that three or more Electron Heads stop the propagation of the "electron" creates opportunities to design interesting circuits.

<div class="demo-container">
<div class="demo-buttons">
<button id="ww-diodes">Diode</button>
<button id="ww-or">OR gate</button>
<button id="ww-xor">XOR gate</button>
<button id="ww-flip-flop">Flip-flop</button>
<button id="ww-clear">Clear</button>
</div>
<canvas id="ww-demo"></canvas>

<div class="demo-buttons demo-buttons-split">
<div class="demo-buttons-left">
<button id="ww-play-pause">Play/Pause</button>
<button id="ww-step">Step</button>
</div>
<div class="demo-buttons-right">
<button id="ww-selector-conductor" class="ww-color-selector color-selector selected" aria-label="Conductor">
    <div class="color-swatch" style="background-color: #aaaaaa;"></div>
</button>
<button id="ww-selector-e-head" class="ww-color-selector color-selector" aria-label="Electron Head">
    <div class="color-swatch" style="background-color: #29b1ff;"></div>
</button>
<button id="ww-selector-e-tail" class="ww-color-selector color-selector" aria-label="Electron Tail">
    <div class="color-swatch" style="background-color: #a1cae6;"></div>
</button>
<button id="ww-selector-empty" class="ww-color-selector color-selector" aria-label="Empty">
    <div class="color-swatch" style="background-color: #F0F0F0;"></div>
</button>
</div>
</div>
</div>

While the above examples show some of the core features of this ruleset, David Moore and Mark Owen took these building blocks and implemented a [computer entirely in Wireworld](https://www.quinapalus.com/wi-index.html). I love projects that take a simple system and, through abstraction and clever design, push its limits.

## Hexagonal Grids

Wireworld is tremendously cool, and hexagons are tremendously cool, so what if we built Wireworld not on a square grid, but on a hexagonally tiled grid[^hexgrids]?

My hope at the outset was that the unique neighboring and the 6-fold symmetry (as opposed to the 4-fold of a square grid) would provide an opportunity for interesting rulesets and designs. I did wind up with what I think is an interesting result, but I quickly became disillusioned that the hexagonal grid by itself provides much value.

For example, hexagonal grids have six immediate neighbors as opposed to a square grid's four, potentially allowing for wires to be created with more natural patterns with fewer restrictions.

<div style="display: flex; gap: 20px; flex-wrap: wrap; justify-content: space-evenly; padding: 20px">
    <img alt="A square cell's four immediate neighbors" src="/assets/images/grid_four_neighbors.svg" style="min-width: 200px; width: 30%; height: auto">
    <img alt="A hexagonal cell's six immediate neighbors" src="/assets/images/hex_six_neighbors.svg" style="min-width: 200px; width: 30%; height: auto">
</div>

This is true to an extent, but misleading. A square grid does have 4 immediate neighbors, but by the rules for Wireworld, each of its eight neighbors present a valid direction for a wire. We haven't gone up from 4 neighbors, but down from 8 directions.

<div style="display: flex; gap: 20px; flex-wrap: wrap; justify-content: space-evenly; padding: 20px">
    <img alt="A square cell's eight directions" src="/assets/images/grid_eight_directions.svg" style="min-width: 200px; width: 30%; height: auto">
    <img alt="A hexagonal cell's six directions" src="/assets/images/hex_six_directions.svg" style="min-width: 200px; width: 30%; height: auto">
</div>

To bring back the possibilities of the hexagonal format, I decided to mirror the original's use of diagonal neighbors by including cells not immediately adjacent in determining cell transitions. First, we can look at some or all of the cells in the ring around the six immediate neighbors. Second, we can split the neighbors into multiple groups whose state counts are measured separately. I tried a number of rulesets and neighbor configurations, including the ones depicted here.

<div style="display: flex; gap: 20px; flex-wrap: wrap; justify-content: space-evenly; padding: 20px">
    <img alt="An alternative hexagonal neighbor definition" src="/assets/images/hex_neighbors_alt_1.svg" style="min-width: 150px; width: 25%; height: auto">
    <img alt="An alternative hexagonal neighbor definition" src="/assets/images/hex_neighbors_alt_2.svg" style="min-width: 150px; width: 25%; height: auto">
    <img alt="An alternative hexagonal neighbor definition" src="/assets/images/hex_neighbors_alt_3.svg" style="min-width: 150px; width: 25%; height: auto">
    <img alt="An alternative hexagonal neighbor definition" src="/assets/images/hex_neighbors_alt_4.svg" style="min-width: 150px; width: 25%; height: auto">
    <img alt="An alternative hexagonal neighbor definition" src="/assets/images/hex_neighbors_alt_5.svg" style="min-width: 150px; width: 25%; height: auto">
</div>

There are loads of combinations that could produce different results, so if I were to come back to this project later I maintain some optimism that other neighbor definitions and rulesets might result in worthwhile alternatives to explore.

## Hexagonal Wireworld

I ended up using a ruleset with 18 neighbors, split into two tiers: the 6 inner neighbors, and the 12 outer neighbors.


<div style="display: flex; gap: 20px; flex-wrap: wrap; justify-content: space-evenly; padding: 20px">
    <img alt="An alternative hexagonal neighbor definition" src="/assets/images/hex_neighbors_alt_6.svg" style="min-width: 200px; width: 30%; height: auto">
</div>

 I also added an intermediate cell state between Electron Head and Electron Tail, as we need two spaces away to prevent an electron from interacting with the wire behind it. Here are the rules I ended up with:

1. <button inert class="sample-cell">
        <div class="color-swatch" style="background-color: #F0F0F0;"></div>
   </button>**Empty** cells always stay Empty
2. <button inert class="sample-cell">
        <div class="color-swatch" style="background-color: #29b1ff;"></div>
   </button>**Electron Heads** transition to Electron Middles
2. <button inert class="sample-cell">
        <div class="color-swatch" style="background-color: #67c6f1;"></div>
   </button>**Electron Middles** transition to Electron Tails
3. <button inert class="sample-cell">
        <div class="color-swatch" style="background-color: #a1cae6;"></div>
   </button>**Electron Tails** transition to Conductors
4. <button inert class="sample-cell">
        <div class="color-swatch" style="background-color: #aaaaaa;"></div>
   </button>**Conductors** transition to Electron Heads if either
    * 1 inner-neighbor cell is an electron head and 0 or 1 outer-neighbor cells are electron heads
    * 0 inner-neighbor cells are electron heads and exactly 2 outer-neighbor cells are electron heads

This ruleset is a bit more convoluted than the original Wireworld, but provides what we need for interesting circuits:

* Electrons can move along wires and split at junctions
* Two electrons colliding on a simple wire cancel out (as in the original Wireworld)
* Two electrons can join or cancel out based on gate structure

It also has a cool visual effect reminiscent of inductance, where currents can affect each other and jump between conductors.

## Building Circuits

With the addition of electrons affecting cells two away, we have to be cautious with our intuition when laying out circuits. Two wires with a single gap in between is isolated only if we are dealing with one electron at a time, but as multiple electrons get involved we have to be cautious with spacing.

I was able to build some standard circuit components like diodes and logic gates, as well as a few other neat structures. The main weakness that isn't adequately shown here is each structure's fragility regarding timing (the XOR and AND gates work well, but the OR gate can only process signals at a slower rate). 

Below are a bunch of different interesting structures I found playing with this ruleset. I'd encourage you to try out modifying some of the circuits; your intuition will likely be correct for a lot of cases, but it's easy to occasionally forget the effects of the wider neighbor range.

<div class="demo-container">
<div class="demo-buttons">
<button id="hex-xor-gate">XOR Gate</button>
<button id="hex-and-gate">AND Gate</button>
<button id="hex-or-gate">OR Gate</button>
<button id="hex-diode">Diodes</button>
<button id="hex-repeaters">Repeaters</button>
<button id="hex-reflectors">Reflectors</button>
<button id="hex-flip-flop">Flip-Flop</button>
<button id="hex-flashers">Flashers</button>
<button id="hex-clear">Clear</button>
</div>
<canvas id="hex-demo"></canvas>

<div class="demo-buttons demo-buttons-split">
<div class="demo-buttons-left">
<button id="hex-play-pause">Play/Pause</button>
<button id="hex-step">Step</button>
</div>
<div class="demo-buttons-right">
<button id="selector-conductor" class="hex-color-selector color-selector selected" aria-label="Conductor">
    <div class="color-swatch" style="background-color: #aaaaaa;"></div>
</button>
<button id="selector-e-head" class="hex-color-selector color-selector" aria-label="Electron Head">
    <div class="color-swatch" style="background-color: #29b1ff;"></div>
</button>
<button id="selector-e-mid" class="hex-color-selector color-selector" aria-label="Electron Middle">
    <div class="color-swatch" style="background-color: #67c6f1;"></div>
</button>
<button id="selector-e-tail" class="hex-color-selector color-selector" aria-label="Electron Tail">
    <div class="color-swatch" style="background-color: #a1cae6;"></div>
</button>
<button id="selector-empty" class="hex-color-selector color-selector" aria-label="Empty">
    <div class="color-swatch" style="background-color: #F0F0F0;"></div>
</button>
</div>
</div>
</div>

## Reflection

Overall, the hexagonal grid didn't add much flexibility to Wireworld, and has relatively fragile structures with regard to signals needing to be in phase or processed at a certain rate. That combined with the larger structures due to the necessity of the Electron Middle state, means it's difficult to find much that the hexagonal version can do that the original cannot.

Regardless, it was fun to build and makes some cool animations!

<script src="/assets/js/hexagonal_wireworld_demos.js"></script>
<style>
    .demo-container canvas {
        width: 100%;
        display: block;
        margin: 15px auto;
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

    .color-swatch {
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

    .sample-cell {
        padding: 0;
        width: 1.3em;
        height: 1.3em;
        align-items: center;
        justify-content: center;
        margin-right: 0.3em;
    }
</style>

[^hexgrids]: 
I feel obligated to share, if you're ever doing anything with hexagonal grids, do yourself a favor and bookmark [Amit's guide to hexagonal grids](https://www.redblobgames.com/grids/hexagons/). It is a fantastic overview for dealing with coordinates, drawing, and everything else you might run into.