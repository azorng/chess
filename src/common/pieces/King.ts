import { Piece, PieceName, PieceColor, Direction } from '~/common/Piece'
import { BoardPositions } from '~/common/Board'

export class King extends Piece {
    constructor(color: PieceColor) {
        super()
        this.name = PieceName.King
        this.color = color
    }

    availableMoves(board: BoardPositions): string[] {
        const availableMoves: string[] = []

        availableMoves.push(
            ...this.moveAssistant.followDirectionUntilObstacle(Direction.UpRight, board, 1),
            ...this.moveAssistant.followDirectionUntilObstacle(Direction.UpLeft, board, 1),
            ...this.moveAssistant.followDirectionUntilObstacle(Direction.DownRight, board, 1),
            ...this.moveAssistant.followDirectionUntilObstacle(Direction.DownLeft, board, 1),
            ...this.moveAssistant.followDirectionUntilObstacle(Direction.Down, board, 1),
            ...this.moveAssistant.followDirectionUntilObstacle(Direction.Up, board, 1),
            ...this.moveAssistant.followDirectionUntilObstacle(Direction.Left, board, 1),
            ...this.moveAssistant.followDirectionUntilObstacle(Direction.Right, board, 1)
        )

        return availableMoves
    }
}
