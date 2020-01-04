import { Piece, PieceName, Color, MoveDirection } from '~/chess/Piece'
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
            ...this.moveAssistant.followDirectionUntilObstacle(MoveDirection.UpRight, board, 1),
            ...this.moveAssistant.followDirectionUntilObstacle(MoveDirection.UpLeft, board, 1),
            ...this.moveAssistant.followDirectionUntilObstacle(MoveDirection.DownRight, board, 1),
            ...this.moveAssistant.followDirectionUntilObstacle(MoveDirection.DownLeft, board, 1),
            ...this.moveAssistant.followDirectionUntilObstacle(MoveDirection.Down, board, 1),
            ...this.moveAssistant.followDirectionUntilObstacle(MoveDirection.Up, board, 1),
            ...this.moveAssistant.followDirectionUntilObstacle(MoveDirection.Left, board, 1),
            ...this.moveAssistant.followDirectionUntilObstacle(MoveDirection.Right, board, 1)
        )

        return availableMoves
    }
}
