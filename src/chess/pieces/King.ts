import { Piece, PieceName, Color, Direction } from '~/chess/Piece'
import { Board } from '~/chess/Board'

export class King extends Piece {
    constructor(color: Color) {
        super()
        this.name = PieceName.King
        this.color = color
    }

    availableMoves(board: Board): string[] {
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
