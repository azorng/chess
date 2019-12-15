import { Piece, PieceName, PieceColor, Direction } from '~/common/Piece'
import { BoardPositions } from '~/common/Board'

export class Queen extends Piece {
    constructor(color: PieceColor) {
        super()
        this.name = PieceName.Queen
        this.color = color
    }

    availableMoves(board: BoardPositions): string[] {
        const availableMoves: string[] = []

        availableMoves.push(
            ...this.moveAssistant.followDirectionUntilObstacle(Direction.UpRight, board),
            ...this.moveAssistant.followDirectionUntilObstacle(Direction.UpLeft, board),
            ...this.moveAssistant.followDirectionUntilObstacle(Direction.DownRight, board),
            ...this.moveAssistant.followDirectionUntilObstacle(Direction.DownLeft, board),
            ...this.moveAssistant.followDirectionUntilObstacle(Direction.Down, board),
            ...this.moveAssistant.followDirectionUntilObstacle(Direction.Up, board),
            ...this.moveAssistant.followDirectionUntilObstacle(Direction.Left, board),
            ...this.moveAssistant.followDirectionUntilObstacle(Direction.Right, board)
        )

        return availableMoves
    }
}
