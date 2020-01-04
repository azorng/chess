import { MoveDirection, PieceName, Piece, Color } from '~/chess/Piece'
import { Board } from '~/chess/Board'
import { BoardUtils } from '~/chess/BoardUtils'

export class MoveAssistant {
    constructor(private piece: Piece = undefined) {}

    public followDirectionUntilObstacle(
        direction: MoveDirection,
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
                    if (![MoveDirection.Up, MoveDirection.Down].includes(direction)) {
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

    private calculateNextMove(direction: MoveDirection, lastMove: string): string {
        if (direction == MoveDirection.Up) {
            return lastMove[0] + Board.numbers[Board.numbers.indexOf(lastMove[1]) + 1]
        }

        if (direction == MoveDirection.Down) {
            return lastMove[0] + Board.numbers[Board.numbers.indexOf(lastMove[1]) - 1]
        }

        if (direction == MoveDirection.Right) {
            return Board.letters[Board.letters.indexOf(lastMove[0]) + 1] + lastMove[1]
        }

        if (direction == MoveDirection.Left) {
            return Board.letters[Board.letters.indexOf(lastMove[0]) - 1] + lastMove[1]
        }

        if (direction == MoveDirection.UpRight) {
            const up = this.calculateNextMove(MoveDirection.Up, lastMove)
            return this.calculateNextMove(MoveDirection.Right, up)
        }

        if (direction == MoveDirection.UpLeft) {
            const up = this.calculateNextMove(MoveDirection.Up, lastMove)
            return this.calculateNextMove(MoveDirection.Left, up)
        }

        if (direction == MoveDirection.DownRight) {
            const down = this.calculateNextMove(MoveDirection.Down, lastMove)
            return this.calculateNextMove(MoveDirection.Right, down)
        }

        if (direction == MoveDirection.DownLeft) {
            const down = this.calculateNextMove(MoveDirection.Down, lastMove)
            return this.calculateNextMove(MoveDirection.Left, down)
        }

        return ''
    }

    public isValidMove(move: string, board: Board) {
        return (
            move.length == 2 &&
            Board.letters.includes(move[0]) &&
            Board.numbers.includes(move[1]) && // Is valid cell
            ((board[move] !== undefined && board[move]?.color != this.piece.color) || // Is not ally
                board[move] === undefined) // Is free cell
        )
    }

    public isAllowedMove(move: string, board: Board) {
        const allAvailableMoves = this.piece.availableMoves(board)
        return allAvailableMoves.includes(move)
    }

    public static getAllAvailableMovesFromPlayer(board: Board, color: Color) {
        const allPieces = BoardUtils.getAllPiecesInTheBoard(board, color)
        const allAvailableMoves = []
        for (const piece of allPieces) {
            allAvailableMoves.push(...piece.availableMoves(board))
        }
        return [...new Set(allAvailableMoves)]
    }
}
