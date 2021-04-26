"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnMoveEvent = void 0;
const Check_1 = require("~/chess/Check");
class OnMoveEvent {
    constructor(game, movedPiece) {
        this.game = game;
        this.movedPiece = movedPiece;
        this.latestBoardState = game.history[game.history.length - 1];
        this.onPieceKilled();
        this.onCheck();
        this.toggleTurn();
    }
    toggleTurn() {
        this.game.currentTurn = this.game.oppositeTurn;
    }
    onPieceKilled() {
        const pieceKilled = this.latestBoardState[this.movedPiece.position];
        if (pieceKilled) {
            this.game.cemetery.push(pieceKilled);
        }
    }
    onCheck() {
        if (Check_1.Check.isInCheck(this.game.board, this.game.currentTurn)) {
            this.game.isCheck = this.game.oppositeTurn;
            if (Check_1.Check.isInCheckMate(this.game)) {
                this.game.isCheckMate = this.game.oppositeTurn;
            }
        }
        else {
            this.game.isCheck = false;
            Check_1.Check.movesAllowedByCheckedPlayer = undefined;
        }
    }
}
exports.OnMoveEvent = OnMoveEvent;
