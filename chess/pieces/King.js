"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.King = void 0;
const Piece_1 = require("~/chess/Piece");
class King extends Piece_1.Piece {
    constructor(color) {
        super();
        this.name = Piece_1.PieceName.King;
        this.color = color;
    }
    availableMoves(board) {
        const availableMoves = [];
        availableMoves.push(...this.moveAssistant.followDirectionUntilObstacle(Piece_1.MoveDirection.UpRight, board, 1), ...this.moveAssistant.followDirectionUntilObstacle(Piece_1.MoveDirection.UpLeft, board, 1), ...this.moveAssistant.followDirectionUntilObstacle(Piece_1.MoveDirection.DownRight, board, 1), ...this.moveAssistant.followDirectionUntilObstacle(Piece_1.MoveDirection.DownLeft, board, 1), ...this.moveAssistant.followDirectionUntilObstacle(Piece_1.MoveDirection.Down, board, 1), ...this.moveAssistant.followDirectionUntilObstacle(Piece_1.MoveDirection.Up, board, 1), ...this.moveAssistant.followDirectionUntilObstacle(Piece_1.MoveDirection.Left, board, 1), ...this.moveAssistant.followDirectionUntilObstacle(Piece_1.MoveDirection.Right, board, 1));
        return availableMoves;
    }
}
exports.King = King;
