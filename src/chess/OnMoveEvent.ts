import { Game } from '~/chess/Game'
import { Board } from '~/chess/Board'
import { Piece, PieceName } from '~/chess/Piece'
import _ from 'lodash'
import { GameVerificator } from '~/chess/GameVerificator'

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
        }
    }

    private onCheck() {
        if (GameVerificator.isOnCheck(this.game.board, this.game.currentTurn)) {
            this.game.isOnCheck = this.game.oppositeTurn
            if (GameVerificator.isOnCheckMate(this.game)) {
                this.game.isOnCheckMate = this.game.oppositeTurn
            }
        } else {
            this.game.isOnCheck = false
            this.game.checkMoves = undefined
        }
    }
}
