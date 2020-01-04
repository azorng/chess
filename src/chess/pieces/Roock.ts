import { Piece, PieceName, Color, MoveDirection } from '~/chess/Piece'
import { Board } from '~/chess/Board'

export class Roock extends Piece {
    constructor(color: Color) {
        super()
        this.name = PieceName.Roock
        this.color = color
    }

    availableMoves(board: Board): string[] {
        const availableMoves: string[] = []

        availableMoves.push(...this.moveAssistant.followDirectionUntilObstacle(MoveDirection.Down, board))
        availableMoves.push(...this.moveAssistant.followDirectionUntilObstacle(MoveDirection.Up, board))
        availableMoves.push(...this.moveAssistant.followDirectionUntilObstacle(MoveDirection.Right, board))
        availableMoves.push(...this.moveAssistant.followDirectionUntilObstacle(MoveDirection.Left, board))

        return availableMoves
    }
}
