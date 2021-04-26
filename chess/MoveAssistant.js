"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoveAssistant = void 0;
const Piece_1 = require("~/chess/Piece");
const Board_1 = require("~/chess/Board");
const BoardUtils_1 = require("~/chess/BoardUtils");
class MoveAssistant {
    constructor(piece = undefined) {
        this.piece = piece;
    }
    followDirectionUntilObstacle(direction, positions, squares = 7) {
        var _a;
        let squaresLeft = squares;
        const availableMoves = [];
        let lastMove = this.piece.position;
        while (squaresLeft != 0) {
            const nextMove = this.calculateNextMove(direction, lastMove);
            if (!this.isValidMove(nextMove, positions)) {
                break;
            }
            const enemyFound = positions[nextMove] != undefined && ((_a = positions[nextMove]) === null || _a === void 0 ? void 0 : _a.color) != this.piece.color;
            if (enemyFound) {
                if (this.piece.name != Piece_1.PieceName.Pawn) {
                    availableMoves.push(nextMove);
                }
                else {
                    if (![Piece_1.MoveDirection.Up, Piece_1.MoveDirection.Down].includes(direction)) {
                        availableMoves.push(nextMove);
                    }
                }
                break;
            }
            availableMoves.push(nextMove);
            squaresLeft--;
            lastMove = nextMove;
        }
        return availableMoves;
    }
    calculateNextMove(direction, lastMove) {
        if (direction == Piece_1.MoveDirection.Up) {
            return lastMove[0] + Board_1.Board.numbers[Board_1.Board.numbers.indexOf(lastMove[1]) + 1];
        }
        if (direction == Piece_1.MoveDirection.Down) {
            return lastMove[0] + Board_1.Board.numbers[Board_1.Board.numbers.indexOf(lastMove[1]) - 1];
        }
        if (direction == Piece_1.MoveDirection.Right) {
            return Board_1.Board.letters[Board_1.Board.letters.indexOf(lastMove[0]) + 1] + lastMove[1];
        }
        if (direction == Piece_1.MoveDirection.Left) {
            return Board_1.Board.letters[Board_1.Board.letters.indexOf(lastMove[0]) - 1] + lastMove[1];
        }
        if (direction == Piece_1.MoveDirection.UpRight) {
            const up = this.calculateNextMove(Piece_1.MoveDirection.Up, lastMove);
            return this.calculateNextMove(Piece_1.MoveDirection.Right, up);
        }
        if (direction == Piece_1.MoveDirection.UpLeft) {
            const up = this.calculateNextMove(Piece_1.MoveDirection.Up, lastMove);
            return this.calculateNextMove(Piece_1.MoveDirection.Left, up);
        }
        if (direction == Piece_1.MoveDirection.DownRight) {
            const down = this.calculateNextMove(Piece_1.MoveDirection.Down, lastMove);
            return this.calculateNextMove(Piece_1.MoveDirection.Right, down);
        }
        if (direction == Piece_1.MoveDirection.DownLeft) {
            const down = this.calculateNextMove(Piece_1.MoveDirection.Down, lastMove);
            return this.calculateNextMove(Piece_1.MoveDirection.Left, down);
        }
        return '';
    }
    isValidMove(move, board) {
        var _a;
        return (move.length == 2 &&
            Board_1.Board.letters.includes(move[0]) &&
            Board_1.Board.numbers.includes(move[1]) && // Is valid cell
            ((board[move] !== undefined && ((_a = board[move]) === null || _a === void 0 ? void 0 : _a.color) != this.piece.color) || // Is not ally
                board[move] === undefined) // Is free cell
        );
    }
    isAllowedMove(move, board) {
        const allAvailableMoves = this.piece.availableMoves(board);
        return allAvailableMoves.includes(move);
    }
    static getAllAvailableMovesFromPlayer(board, color) {
        const allPieces = BoardUtils_1.BoardUtils.getAllPiecesInTheBoard(board, color);
        const allAvailableMoves = [];
        for (const piece of allPieces) {
            allAvailableMoves.push(...piece.availableMoves(board));
        }
        return [...new Set(allAvailableMoves)];
    }
}
exports.MoveAssistant = MoveAssistant;
