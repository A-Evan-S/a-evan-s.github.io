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


First, we run stockfish in multipv mode to identify and rank the top 15 moves.
Then we calculate the maia probability of each of these moves
We remove any that don't meet the current epsilon threshold
Then we use softmax to select one of the moves, skewing towards worse moves

For example, take the following board:

![A chessboard mid-game](lichess-fen.gif){: style="max-width: 600px"}

Its moves would be calculated as:

| move | cp | p |
|------|-----|-------|
| f7f6 | 64 | 0.2783 |
| b6b5 | -56 | 0.0326 |
| d8e8 | -58 | 0.0060 |
| d8e7 | -60 | 0.0380 |
| d8c7 | -61 | 0.0513 |
| a7a6 | -62 | 0.1592 |
| a7a5 | -64 | 0.1360 |
| h7h6 | -90 | 0.0271 |
| a8b8 | -102 | 0.0063 |
| d7b8 | -103 | 0.0294 |
| f7f5 | -111 | 0.0681 |
| f8e8 | -112 | 0.0224 |
| d8g5 | -113 | 0.1064 |
| g7g6 | -113 | 0.0130 |
| g8h8 | -131 | 0.0043 |

With an epsilon value of 0.05, the only allowed moves would be: f7f6, d8c7, a7a6, a7a5, f7f5, and d8g5. We then use each of their resulting cp values to calculate their probability of being selected as a move, weighting towards worse moves but not deterministically selecting the worst every time.

$$\text{Weight} = e^{T * \frac{-cp}{100}}$$

where $T$ is an adjustable temperature constant. Producing the following weights and probabilities:

| move | cp | p | weight | prob |
|------|-----|-------|---|---|
| f7f6 | 64 | 0.2783 | 0.527 | 4.3 |
| d8c7 | -61 | 0.0513 | 1.840 | 15.0 |
| a7a6 | -62 | 0.1592 | 1.859 | 15.2 |
| a7a5 | -64 | 0.1360 | 1.896 | 15.5 |
| f7f5 | -111 | 0.0681 | 3.034 | 24.8 |
| d8g5 | -113 | 0.1064 | 3.096 | 25.2 |

Note that the the optimal move will still be played on occasion, and the bot will never play a move so bad that it would be unlikely for a decent player to make that mistake. Instead, it just consistantly flubs opportunities and leaves itself in a somewhat worse state.


Tweaks & Details

    A few more details about the engine's precise functionality that aren't covered by the general approach:

    - The engine only even considers the top 15 stockfish rated moves. This doesn't have much of an impact, as it's very unlikely for a move below that to pass the maia threshold, but it saves some computation time. Similarly, it limits the stockfish search to a depth of 10, which should be plenty for the level of play expected.
    - The epsilon value is dynamic. As the play progresses, it uses the cached search to measure the quality of the opponent's response. If they're responding well, epsilon is raised and the bot will play closer to raw Maia 1500. If the opponent isn't taking advantage of the bot's mistakes, it lowers epsilon and makes more obvious errors.
    - After some testing, it was clear that mistakes in early and late game play are more obvious to the player, so both of these have adjustments from the core algorithm:
        - At the start of the game, the epsilon value is set quite high, and drops to a normal value over the first ~10 moves, avoiding obvious errors where a typical mid-level player would likely be playing on book.
        - If we're near the end of a game (measured as <14 pieces on the board and one player with a substantial advantage), it switches the move selection to favor better, more Maia likely moves. This avoids obvious errors like avoiding checkmating the opponent or trying to throw a game its already lost.
