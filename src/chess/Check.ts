import { MoveAssistant } from '~/chess/MoveAssistant'
import { PieceName, Color } from '~/chess/Piece'
import { Game } from '~/chess/Game'
import { BoardUtils } from '~/chess/BoardUtils'
import _ from 'lodash'
import { Board } from '~/chess/Board'

interface AllowedMoves {
    color: Color
    movesById: { [index: string]: string[] }
}

export class Check {
    public static movesAllowedByCheckedPlayer: AllowedMoves | undefined = undefined

    public static isInCheck(board: Board, turn: Color) {
        const allAvailableMoves = MoveAssistant.getAllAvailableMovesFromPlayer(board, turn)

        for (const move of allAvailableMoves) {
            const positionValue = board[move]
            if (positionValue != undefined && positionValue.name == PieceName.King) {
                return true
            }
        }

        return false
    }

    public static isInCheckMate(game: Game) {
        let dreamGame = _.cloneDeep(game) // Clone in order to avoid changes in reference

        const allowedMoves: { [index: string]: string[] } = {}

        const pieces = BoardUtils.getAllPiecesInTheBoard(dreamGame.board, game.oppositeTurn)
        for (const piece of pieces) {
            const availableMoves = piece.availableMoves(dreamGame.board)
            for (const destination of availableMoves) {
                dreamGame.movePieceToDestination(_.clone(piece), destination)
                if (!Check.isInCheck(dreamGame.board, game.currentTurn)) {
                    allowedMoves[piece.id]
                        ? allowedMoves[piece.id].push(destination)
                        : (allowedMoves[piece.id] = [destination])
                }
                dreamGame = _.cloneDeep(game)
            }
        }

        const isCheckMate = _.isEmpty(allowedMoves)

        if (!isCheckMate) {
            Check.movesAllowedByCheckedPlayer = {
                color: game.oppositeTurn,
                movesById: allowedMoves
            }
        }

        return isCheckMate
    }
}
