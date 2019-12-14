import { BoardPositions } from '~/common/Board'

export enum PieceColor {
    Black,
    White
}

export enum Direction {
    Up,
    Down,
    Left,
    Right,
    UpRight,
    UpLeft,
    DownRight,
    DownLeft
}

export enum PieceName {
    King,
    Queen,
    Roock,
    Bishop,
    Knight,
    Pawn
}

export abstract class PieceBase {
    color: PieceColor
    name: PieceName
    position: string

    abstract availableMoves(board: BoardPositions): string[] | []

    protected followDirectionUntilObstacle(
        direction: Direction,
        positions: BoardPositions,
        squares = 7
    ) {
        let squaresLeft = squares
        const availableMoves: string[] = []
        const numbers = ['1', '2', '3', '4', '5', '6', '7', '8']

        if (direction == Direction.Down || direction == Direction.Up) {
            let lastOk = this.position
            while (squaresLeft != 0) {
                const nextMove =
                    lastOk[0] +
                    numbers[numbers.indexOf(lastOk[1]) - (direction == Direction.Down ? 1 : -1)]
                if (
                    nextMove[1] == '1' || // We hitted the bottom
                    (positions[nextMove] != undefined && positions[nextMove]?.color == this.color) // There is an ally
                ) {
                    break
                } else {
                    const enemyFound =
                        positions[nextMove] != undefined && positions[nextMove]?.color != this.color // There is an enemy
                    if (enemyFound) {
                        break
                    }

                    availableMoves.push(nextMove)
                    squaresLeft--

                    lastOk = nextMove
                }
            }
        }

        return availableMoves
    }
}
