"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pawn = void 0;
const Piece_1 = require("~/chess/Piece");
class Pawn extends Piece_1.Piece {
    constructor(color) {
        super();
        this.name = Piece_1.PieceName.Pawn;
        this.color = color;
    }
    availableMoves(board) {
        const availableMoves = [];
        availableMoves.push(...this.moveAssistant.followDirectionUntilObstacle(this.color == Piece_1.Color.Black ? Piece_1.MoveDirection.Down : Piece_1.MoveDirection.Up, board, this.position[1] == '7' || this.position[1] == '2' ? 2 : 1));
        // Diagonal kill
        const diagonalMoves = this.color == Piece_1.Color.White
            ? [
                ...this.moveAssistant.followDirectionUntilObstacle(Piece_1.MoveDirection.UpLeft, board, 1),
                ...this.moveAssistant.followDirectionUntilObstacle(Piece_1.MoveDirection.UpRight, board, 1)
            ]
            : [
                ...this.moveAssistant.followDirectionUntilObstacle(Piece_1.MoveDirection.DownLeft, board, 1),
                ...this.moveAssistant.followDirectionUntilObstacle(Piece_1.MoveDirection.DownRight, board, 1)
            ];
        diagonalMoves.forEach(move => {
            // Move is valid and there is an enemy is in the target cell
            if (this.moveAssistant.isValidMove(move, board) && board[move] !== undefined) {
                availableMoves.push(move);
            }
        });
        return availableMoves;
    }
}
exports.Pawn = Pawn;
