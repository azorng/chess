"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queen = void 0;
const Piece_1 = require("~/chess/Piece");
class Queen extends Piece_1.Piece {
    constructor(color) {
        super();
        this.name = Piece_1.PieceName.Queen;
        this.color = color;
    }
    availableMoves(board) {
        const availableMoves = [];
        availableMoves.push(...this.moveAssistant.followDirectionUntilObstacle(Piece_1.MoveDirection.UpRight, board), ...this.moveAssistant.followDirectionUntilObstacle(Piece_1.MoveDirection.UpLeft, board), ...this.moveAssistant.followDirectionUntilObstacle(Piece_1.MoveDirection.DownRight, board), ...this.moveAssistant.followDirectionUntilObstacle(Piece_1.MoveDirection.DownLeft, board), ...this.moveAssistant.followDirectionUntilObstacle(Piece_1.MoveDirection.Down, board), ...this.moveAssistant.followDirectionUntilObstacle(Piece_1.MoveDirection.Up, board), ...this.moveAssistant.followDirectionUntilObstacle(Piece_1.MoveDirection.Left, board), ...this.moveAssistant.followDirectionUntilObstacle(Piece_1.MoveDirection.Right, board));
        return availableMoves;
    }
}
exports.Queen = Queen;
