import { PieceBase, PieceName, PieceColor, Direction } from '~/common/PieceBase'
import { BoardPositions } from '~/common/Board'

export class Bishop extends PieceBase {
    constructor(color: PieceColor) {
        super()
        this.name = PieceName.Bishop
        this.color = color
    }

    availableMoves(board: BoardPositions): string[] | [] {
        const availableMoves: string[] = []

        availableMoves.push(
            ...this.moveHelper.followDirectionUntilObstacle(Direction.UpRight, board),
            ...this.moveHelper.followDirectionUntilObstacle(Direction.UpLeft, board),
            ...this.moveHelper.followDirectionUntilObstacle(Direction.DownRight, board),
            ...this.moveHelper.followDirectionUntilObstacle(Direction.DownLeft, board)
        )

        return availableMoves
    }
}
