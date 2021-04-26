"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bishop = void 0;
const Piece_1 = require("~/chess/Piece");
class Bishop extends Piece_1.Piece {
    constructor(color) {
        super();
        this.name = Piece_1.PieceName.Bishop;
        this.color = color;
    }
    availableMoves(board) {
        const availableMoves = [];
        availableMoves.push(...this.moveAssistant.followDirectionUntilObstacle(Piece_1.MoveDirection.UpRight, board), ...this.moveAssistant.followDirectionUntilObstacle(Piece_1.MoveDirection.UpLeft, board), ...this.moveAssistant.followDirectionUntilObstacle(Piece_1.MoveDirection.DownRight, board), ...this.moveAssistant.followDirectionUntilObstacle(Piece_1.MoveDirection.DownLeft, board));
        return availableMoves;
    }
}
exports.Bishop = Bishop;
