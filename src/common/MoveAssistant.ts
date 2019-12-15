import { BoardPositions } from '~/common/Board'
import { Direction, PieceName, Piece } from '~/common/Piece'

const numbers = ['1', '2', '3', '4', '5', '6', '7', '8']
const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

export class MoveAssistant {
    constructor(private piece: Piece) {}

    public followDirectionUntilObstacle(
        direction: Direction,
        positions: BoardPositions,
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
            return lastMove[0] + numbers[numbers.indexOf(lastMove[1]) + 1]
        }

        if (direction == Direction.Down) {
            return lastMove[0] + numbers[numbers.indexOf(lastMove[1]) - 1]
        }

        if (direction == Direction.Right) {
            return letters[letters.indexOf(lastMove[0]) + 1] + lastMove[1]
        }

        if (direction == Direction.Left) {
            return letters[letters.indexOf(lastMove[0]) - 1] + lastMove[1]
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

    public isValidMove(move: string, board: BoardPositions) {
        if (
            move.length == 2 &&
            letters.includes(move[0]) && numbers.includes(move[1]) && // Is valid cell
            ((board[move] != undefined && board[move]?.color != this.piece.color) || // Is not ally
                board[move] == undefined) // Is free cell
        ) {
            return true
        }
        return false
    }

    public isAllowedMove(move: string, board: BoardPositions) {
        const allAvailableMoves = this.piece.availableMoves(board)
        return allAvailableMoves.includes(move)
    }
}
