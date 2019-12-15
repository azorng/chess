import { PieceBase, PieceName, PieceColor, Direction } from '~/common/PieceBase'
import { BoardPositions } from '~/common/Board'

export class Roock extends PieceBase {
    constructor(color: PieceColor) {
        super()
        this.name = PieceName.Roock
        this.color = color
    }

    availableMoves(board: BoardPositions): string[] | [] {
        const availableMoves: string[] = []

        availableMoves.push(...this.moveHelper.followDirectionUntilObstacle(Direction.Down, board))
        availableMoves.push(...this.moveHelper.followDirectionUntilObstacle(Direction.Up, board))
        availableMoves.push(...this.moveHelper.followDirectionUntilObstacle(Direction.Right, board))
        availableMoves.push(...this.moveHelper.followDirectionUntilObstacle(Direction.Left, board))

        return availableMoves
    }
}
