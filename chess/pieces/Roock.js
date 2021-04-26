"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roock = void 0;
const Piece_1 = require("~/chess/Piece");
class Roock extends Piece_1.Piece {
    constructor(color) {
        super();
        this.name = Piece_1.PieceName.Roock;
        this.color = color;
    }
    availableMoves(board) {
        const availableMoves = [];
        availableMoves.push(...this.moveAssistant.followDirectionUntilObstacle(Piece_1.MoveDirection.Down, board));
        availableMoves.push(...this.moveAssistant.followDirectionUntilObstacle(Piece_1.MoveDirection.Up, board));
        availableMoves.push(...this.moveAssistant.followDirectionUntilObstacle(Piece_1.MoveDirection.Right, board));
        availableMoves.push(...this.moveAssistant.followDirectionUntilObstacle(Piece_1.MoveDirection.Left, board));
        return availableMoves;
    }
}
exports.Roock = Roock;
