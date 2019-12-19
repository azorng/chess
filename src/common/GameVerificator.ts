import { MoveAssistant } from '~/common/MoveAssistant'
import { PieceName, Color } from '~/common/Piece'
import { Game } from '~/common/Game'
import { BoardUtils } from '~/common/Board'
import _ from 'lodash'

export class GameVerificator {
    public static isOnCheck(game: Game, turn: Color) {
        const allAvailableMoves = new MoveAssistant().getAllAvailableMovesFromPlayer(game, turn)

        for (const move of allAvailableMoves) {
            const positionValue = game.board[move]
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
                if (!GameVerificator.isOnCheck(dreamGame, game.currentTurn)) {
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

        return isCheckMate
    }
}
