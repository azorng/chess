import { Piece, PieceName, PieceColor, Direction } from '~/common/Piece'
import { BoardPositions } from '~/common/Board'

export class Roock extends Piece {
    constructor(color: PieceColor) {
        super()
        this.name = PieceName.Roock
        this.color = color
    }

    availableMoves(board: BoardPositions): string[] {
        const availableMoves: string[] = []

        availableMoves.push(...this.moveAssistant.followDirectionUntilObstacle(Direction.Down, board))
        availableMoves.push(...this.moveAssistant.followDirectionUntilObstacle(Direction.Up, board))
        availableMoves.push(...this.moveAssistant.followDirectionUntilObstacle(Direction.Right, board))
        availableMoves.push(...this.moveAssistant.followDirectionUntilObstacle(Direction.Left, board))

        return availableMoves
    }
}
