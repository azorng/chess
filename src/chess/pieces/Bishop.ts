import { Piece, PieceName, Color, MoveDirection } from '~/chess/Piece'
import { Board } from '~/chess/Board'

export class Bishop extends Piece {
    constructor(color: Color) {
        super()
        this.name = PieceName.Bishop
        this.color = color
    }

    availableMoves(board: Board): string[] {
        const availableMoves: string[] = []

        availableMoves.push(
            ...this.moveAssistant.followDirectionUntilObstacle(MoveDirection.UpRight, board),
            ...this.moveAssistant.followDirectionUntilObstacle(MoveDirection.UpLeft, board),
            ...this.moveAssistant.followDirectionUntilObstacle(MoveDirection.DownRight, board),
            ...this.moveAssistant.followDirectionUntilObstacle(MoveDirection.DownLeft, board)
        )

        return availableMoves
    }
}
