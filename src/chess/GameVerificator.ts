import { MoveAssistant } from '~/chess/MoveAssistant'
import { PieceName, Color } from '~/chess/Piece'
import { Game } from '~/chess/Game'
import { BoardUtils } from '~/chess/BoardUtils'
import _ from 'lodash'
import { Board } from '~/chess/Board'

export class GameVerificator {
    public static isOnCheck(board: Board, turn: Color) {
        const allAvailableMoves = MoveAssistant.getAllAvailableMovesFromPlayer(board, turn)

        for (const move of allAvailableMoves) {
            const positionValue = board[move]
            if (positionValue != undefined && positionValue.name == PieceName.King) {
                return true
            }
        }

        return false
    }

    public static isOnCheckMate(game: Game) {
        let dreamGame = _.cloneDeep(game)

        const allowedMoves: { [index: string]: string[] } = {}

        const pieces = BoardUtils.getAllPiecesInTheBoard(dreamGame.board, game.oppositeTurn)
        for (const piece of pieces) {
            const moves = piece.availableMoves(dreamGame.board)
            for (const move of moves) {
                dreamGame.movePieceToDestination(_.clone(piece), move)
                if (!GameVerificator.isOnCheck(dreamGame.board, game.currentTurn)) {
                    if (allowedMoves[piece.id]) {
                        allowedMoves[piece.id].push(move)
                    } else {
                        allowedMoves[piece.id] = [move]
                    }
                }
                dreamGame = _.cloneDeep(game)
            }
        }

        const isCheckMate = _.isEmpty(allowedMoves)

        if (!isCheckMate) {
            game.checkMoves = {
                color: game.oppositeTurn,
                movesById: allowedMoves
            }
        }

        console.log(allowedMoves)

        return isCheckMate
    }
}
