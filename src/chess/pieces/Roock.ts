import { Piece, PieceName, Color, Direction } from '~/chess/Piece'
import { Board } from '~/chess/Board'

export class Roock extends Piece {
    constructor(color: Color) {
        super()
        this.name = PieceName.Roock
        this.color = color
    }

    availableMoves(board: Board): string[] {
        const availableMoves: string[] = []

        availableMoves.push(...this.moveAssistant.followDirectionUntilObstacle(Direction.Down, board))
        availableMoves.push(...this.moveAssistant.followDirectionUntilObstacle(Direction.Up, board))
        availableMoves.push(...this.moveAssistant.followDirectionUntilObstacle(Direction.Right, board))
        availableMoves.push(...this.moveAssistant.followDirectionUntilObstacle(Direction.Left, board))

        return availableMoves
    }
}
