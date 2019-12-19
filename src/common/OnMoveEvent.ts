import { Game } from '~/common/Game'
import { Board } from '~/common/Board'
import { Piece, PieceName } from '~/common/Piece'
import _ from 'lodash'
import { GameVerificator } from '~/common/GameVerificator'

export class OnMoveEvent {
    latestBoardHistory: Board

    constructor(private game: Game, private movedPiece: Piece) {
        this.latestBoardHistory = game.history[game.history.length - 1]
        this.onPieceKilled()
        this.onCheck()
        this.toggleTurn()
    }

    private toggleTurn() {
        this.game.currentTurn = this.game.oppositeTurn
    }

    private onPieceKilled() {
        const pieceKilled = this.latestBoardHistory[this.movedPiece.position]
        if (pieceKilled) {
            this.game.cemetery.push(pieceKilled)
            if (pieceKilled.name == PieceName.King) {
                this.game.winner = this.movedPiece.color
            }
        }
    }

    private onCheck() {
        if (GameVerificator.isOnCheck(this.game, this.game.currentTurn)) {
            this.game.onCheck = this.game.oppositeTurn
            if (GameVerificator.isOnCheckMate(this.game)) {
                this.game.onCheckMate = this.game.oppositeTurn
            }
        } else {
            this.game.onCheck = false
            this.game.checkMoves = undefined
        }
    }
}
