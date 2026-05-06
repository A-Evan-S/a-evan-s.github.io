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


```
r1b2rk1/pp1n1ppp/1p2p3/3pP1q1/1P1P4/P3P1P1/2P4P/R1BQKB1R w KQ - 1 13

1. d4 d5 2. Nc3 {11s} Nf6 3. e3 {8.1s} e6 4. Nf3 {12s} Bb4 5. a3 {1.9s} Ba5
6. b4 {50s} Bb6 7. Na4 {29s} O-O 8. Nxb6 {14s} cxb6 9. Ne5 {15s} Nbd7
10. f4 {119s} Nxe5 11. fxe5 {8.3s} Nd7 12. g3 {35s} Qg5 *

2026-05-06 13:51:48 [INFO] move | mode=candidate selected=d8g5 cp=-113 optimal=f7f6 optimal_cp=64 delta=177 epsilon=0.05
2026-05-06 13:51:48 [INFO]   move_list | rank=1 move=f7f6 cp=64 p=0.2783 [optimal]
2026-05-06 13:51:48 [INFO]   move_list | rank=2 move=b6b5 cp=-56 p=0.0326
2026-05-06 13:51:48 [INFO]   move_list | rank=3 move=d8e8 cp=-58 p=0.0060
2026-05-06 13:51:48 [INFO]   move_list | rank=4 move=d8e7 cp=-60 p=0.0380
2026-05-06 13:51:48 [INFO]   move_list | rank=5 move=d8c7 cp=-61 p=0.0513 [passing]
2026-05-06 13:51:48 [INFO]   move_list | rank=6 move=a7a6 cp=-62 p=0.1592 [passing]
2026-05-06 13:51:48 [INFO]   move_list | rank=7 move=a7a5 cp=-64 p=0.1360 [passing]
2026-05-06 13:51:48 [INFO]   move_list | rank=8 move=h7h6 cp=-90 p=0.0271
2026-05-06 13:51:48 [INFO]   move_list | rank=9 move=a8b8 cp=-102 p=0.0063
2026-05-06 13:51:48 [INFO]   move_list | rank=10 move=d7b8 cp=-103 p=0.0294
2026-05-06 13:51:48 [INFO]   move_list | rank=11 move=f7f5 cp=-111 p=0.0681 [passing]
2026-05-06 13:51:48 [INFO]   move_list | rank=12 move=f8e8 cp=-112 p=0.0224
2026-05-06 13:51:48 [INFO]   move_list | rank=13 move=d8g5 cp=-113 p=0.1064 [passing,selected]
2026-05-06 13:51:48 [INFO]   move_list | rank=14 move=g7g6 cp=-113 p=0.0130
2026-05-06 13:51:48 [INFO]   move_list | rank=15 move=g8h8 cp=-131 p=0.0043
```

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