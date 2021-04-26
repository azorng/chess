"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardUtils = void 0;
const Board_1 = require("~/chess/Board");
class BoardUtils {
    static getAllPiecesInTheBoard(board, color) {
        const pieces = [];
        for (const position in board) {
            const positionValue = board[position];
            if (positionValue != undefined && positionValue.color == color) {
                pieces.push(positionValue);
            }
        }
        return pieces;
    }
    static fillRow(board, rowNumber, piece, color) {
        Board_1.Board.letters.forEach(letter => {
            board[letter + rowNumber] = new piece(color);
        });
    }
}
exports.BoardUtils = BoardUtils;
