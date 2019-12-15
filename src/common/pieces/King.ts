import { PieceBase, PieceName, PieceColor, Direction } from '~/common/PieceBase'
import { BoardPositions } from '~/common/Board'

export class King extends PieceBase {
    constructor(color: PieceColor) {
        super()
        this.name = PieceName.King
        this.color = color
    }

    availableMoves(board: BoardPositions): string[] | [] {
        const availableMoves: string[] = []

        availableMoves.push(
            ...this.moveHelper.followDirectionUntilObstacle(Direction.UpRight, board, 1),
            ...this.moveHelper.followDirectionUntilObstacle(Direction.UpLeft, board, 1),
            ...this.moveHelper.followDirectionUntilObstacle(Direction.DownRight, board, 1),
            ...this.moveHelper.followDirectionUntilObstacle(Direction.DownLeft, board, 1),
            ...this.moveHelper.followDirectionUntilObstacle(Direction.Down, board, 1),
            ...this.moveHelper.followDirectionUntilObstacle(Direction.Up, board, 1),
            ...this.moveHelper.followDirectionUntilObstacle(Direction.Left, board, 1),
            ...this.moveHelper.followDirectionUntilObstacle(Direction.Right, board, 1)
        )

        return availableMoves
    }
}
