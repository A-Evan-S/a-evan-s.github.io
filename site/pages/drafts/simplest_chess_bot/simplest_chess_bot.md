---
title: Writing a Chess Bot to Throw Games
date: 2026-05-06
summary: My attempt to create a chess bot that intentionally throws games so I can feel better about myself.
---

Background
    - I'm bad at chess
    - Like playing it anyways for fun
    - Like to win
    - Don't like it to be obvious that my opponent is letting me win

Chess Engines
    - Basic premise of a chess engine:
        - Look at all possible moves
        - Descend down game tree
        - Use a heuristic to assess game state
        - Assign each move a predicted value
        - Pick the best one

    [Pretty diagram of steps]
    [image of board state]
    [list of possible moves]
    [assign quality to each move and sort (represented by color)]
    [select best move]

    - We overtook human level play a while back, and can now run it on a phone. The interesting part is making it BAD

How to Make it Bad?
    - Main approaches to making a bad chess engine
        - Make it good, but weaken it (reduce search depth, limit computation time)
        - Do everything right, then select wrong (distribution of selection over best moves)
        - Make it more human (train on human data not RL, simulate human failings explicitly)
    - The approach I took was a mix of these latter two

The Algorithm
    - Based on IIda et. al. paper "Tutoring Strategies in Game-Tree Search" from 1996
    - Paper builds off of previous paper about opponent modeling search, which takes into account not only your own assessment of state quality, but that of  your (presumably imperfect) opponent
    - Aim is to select the move which is
        - Worst for the bot, best for the opponent
        - Would be plausibly selected by the opponent model
    - Intent is to play as bad as you can without being so bad that the opponent would notice

Implementation

    - My implementation uses Maia 1500 as its opponent model
    - Use regular stockfish to determine quality of moves
    - Doesn't always select **worst** move, instead selects via a distribution

    [Pretty diagram of steps]
    [image of board state]
    [list of possible moves]
    [filter by Maia probability (represented by size)]
    [use epsilon to eliminate low-probability moves]
    [assign quality to each move and sort (represented by color)]
    [choose by distribution over the move options]

Tweaks & Details

    - Adjusts the epsilon on the fly based on the opponent's play (if they're not noticing, start making larger mistakes)
    - Limits the stockfish depth to save time (we don't need to be super accurate, as we're capped at 1500 level play anyways)
    - Fine tunes the epsilon and distrubution for eary game and endgame play: it's easy to spot intentional errors here, so play more guarded