import { Game } from '~/common/Game'
import { Direction, PieceName, Piece, Color } from '~/common/Piece'
import { Board, BoardUtils } from '~/common/Board'

export class MoveAssistant {
    constructor(private piece: Piece = undefined) {}

    public followDirectionUntilObstacle(
        direction: Direction,
        positions: Board,
        squares = 7
    ) {
        let squaresLeft = squares
        const availableMoves: string[] = []

        let lastMove = this.piece.position
        while (squaresLeft != 0) {
            const nextMove = this.calculateNextMove(direction, lastMove)

            if (!this.isValidMove(nextMove, positions)) {
                break
            }

            const enemyFound =
                positions[nextMove] != undefined && positions[nextMove]?.color != this.piece.color

            if (enemyFound) {
                if (this.piece.name != PieceName.Pawn) {
                    availableMoves.push(nextMove)
                } else {
                    if (![Direction.Up, Direction.Down].includes(direction)) {
                        availableMoves.push(nextMove)
                    }
                }
                break
            }

            availableMoves.push(nextMove)

            squaresLeft--
            lastMove = nextMove
        }

        return availableMoves
    }

    private calculateNextMove(direction: Direction, lastMove: string): string {
        if (direction == Direction.Up) {
            return lastMove[0] + Board.numbers[Board.numbers.indexOf(lastMove[1]) + 1]
        }

        if (direction == Direction.Down) {
            return lastMove[0] + Board.numbers[Board.numbers.indexOf(lastMove[1]) - 1]
        }

        if (direction == Direction.Right) {
            return Board.letters[Board.letters.indexOf(lastMove[0]) + 1] + lastMove[1]
        }

        if (direction == Direction.Left) {
            return Board.letters[Board.letters.indexOf(lastMove[0]) - 1] + lastMove[1]
        }

        if (direction == Direction.UpRight) {
            const up = this.calculateNextMove(Direction.Up, lastMove)
            return this.calculateNextMove(Direction.Right, up)
        }

        if (direction == Direction.UpLeft) {
            const up = this.calculateNextMove(Direction.Up, lastMove)
            return this.calculateNextMove(Direction.Left, up)
        }

        if (direction == Direction.DownRight) {
            const down = this.calculateNextMove(Direction.Down, lastMove)
            return this.calculateNextMove(Direction.Right, down)
        }

        if (direction == Direction.DownLeft) {
            const down = this.calculateNextMove(Direction.Down, lastMove)
            return this.calculateNextMove(Direction.Left, down)
        }

        return ''
    }

    public isValidMove(move: string, board: Board) {
        if (
            move.length == 2 &&
            Board.letters.includes(move[0]) &&
            Board.numbers.includes(move[1]) && // Is valid cell
            ((board[move] != undefined && board[move]?.color != this.piece.color) || // Is not ally
                board[move] == undefined) // Is free cell
        ) {
            return true
        }
        return false
    }

    public isAllowedMove(move: string, board: Board) {
        const allAvailableMoves = this.piece.availableMoves(board)
        return allAvailableMoves.includes(move)
    }

    public getAllAvailableMovesFromPlayer(game: Game, color: Color) {
        const allPieces = BoardUtils.getAllPiecesInTheBoard(game.board, color)
        const allAvailableMoves = []
        for (const piece of allPieces) {
            allAvailableMoves.push(...piece.availableMoves(game.board))
        }
        return [...new Set(allAvailableMoves)]
    }
}
