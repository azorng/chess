"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Check = void 0;
const MoveAssistant_1 = require("~/chess/MoveAssistant");
const Piece_1 = require("~/chess/Piece");
const BoardUtils_1 = require("~/chess/BoardUtils");
const lodash_1 = __importDefault(require("lodash"));
class Check {
    static isInCheck(board, turn) {
        const allAvailableMoves = MoveAssistant_1.MoveAssistant.getAllAvailableMovesFromPlayer(board, turn);
        for (const move of allAvailableMoves) {
            const positionValue = board[move];
            if (positionValue != undefined && positionValue.name == Piece_1.PieceName.King) {
                return true;
            }
        }
        return false;
    }
    static isInCheckMate(game) {
        let dreamGame = lodash_1.default.cloneDeep(game); // Clone in order to avoid changes in reference
        const allowedMoves = {};
        const pieces = BoardUtils_1.BoardUtils.getAllPiecesInTheBoard(dreamGame.board, game.oppositeTurn);
        for (const piece of pieces) {
            const availableMoves = piece.availableMoves(dreamGame.board);
            for (const destination of availableMoves) {
                dreamGame.movePieceToDestination(lodash_1.default.clone(piece), destination);
                if (!Check.isInCheck(dreamGame.board, game.currentTurn)) {
                    allowedMoves[piece.id]
                        ? allowedMoves[piece.id].push(destination)
                        : (allowedMoves[piece.id] = [destination]);
                }
                dreamGame = lodash_1.default.cloneDeep(game);
            }
        }
        const isCheckMate = lodash_1.default.isEmpty(allowedMoves);
        if (!isCheckMate) {
            Check.movesAllowedByCheckedPlayer = {
                color: game.oppositeTurn,
                movesById: allowedMoves
            };
        }
        return isCheckMate;
    }
}
exports.Check = Check;
Check.movesAllowedByCheckedPlayer = undefined;
