import { Game } from '~/chess/Game'
import { Board } from '~/chess/Board'
import { Piece } from '~/chess/Piece'
import _ from 'lodash'
import { Check } from '~/chess/Check'

export class OnMoveEvent {
    latestBoardState: Board

    constructor(private game: Game, private movedPiece: Piece) {
        this.latestBoardState = game.history[game.history.length - 1]
        this.onPieceKilled()
        this.onCheck()
        this.toggleTurn()
    }

    private toggleTurn() {
        this.game.currentTurn = this.game.oppositeTurn
    }

    private onPieceKilled() {
        const pieceKilled = this.latestBoardState[this.movedPiece.position]
        if (pieceKilled) {
            this.game.cemetery.push(pieceKilled)
        }
    }

    private onCheck() {
        if (Check.isInCheck(this.game.board, this.game.currentTurn)) {
            this.game.isCheck = this.game.oppositeTurn
            if (Check.isInCheckMate(this.game)) {
                this.game.isCheckMate = this.game.oppositeTurn
            }
        } else {
            this.game.isCheck = false
            Check.movesAllowedByCheckedPlayer = undefined
        }
    }
}
