"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Knight = void 0;
const Piece_1 = require("~/chess/Piece");
const Board_1 = require("~/chess/Board");
class Knight extends Piece_1.Piece {
    constructor(color) {
        super();
        this.name = Piece_1.PieceName.Knight;
        this.color = color;
    }
    availableMoves(board) {
        const availableMoves = [];
        const iLetter = Board_1.Board.letters.indexOf(this.position[0]);
        const iNumber = Board_1.Board.numbers.indexOf(this.position[1]);
        const possibleMoves = [];
        for (let i = 1; i <= 2; i++) {
            for (let j = 1; j <= 2; j++) {
                if (i != j) {
                    const possibleMove1 = Board_1.Board.letters[iLetter + i] + Board_1.Board.numbers[iNumber + j];
                    const possibleMove2 = Board_1.Board.letters[iLetter - i] + Board_1.Board.numbers[iNumber - j];
                    const possibleMove3 = Board_1.Board.letters[iLetter + i] + Board_1.Board.numbers[iNumber - j];
                    const possibleMove4 = Board_1.Board.letters[iLetter - i] + Board_1.Board.numbers[iNumber + j];
                    possibleMoves.push(possibleMove1, possibleMove2, possibleMove3, possibleMove4);
                }
            }
        }
        possibleMoves.forEach(move => {
            if (this.moveAssistant.isValidMove(move, board)) {
                availableMoves.push(move);
            }
        });
        return availableMoves;
    }
}
exports.Knight = Knight;
