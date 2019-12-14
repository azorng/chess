import { PieceBase, PieceName, PieceColor, Direction } from '~/common/PieceBase'
import { BoardPositions } from '~/common/Board'

export class Pawn extends PieceBase {
    constructor(color: PieceColor) {
        super()
        this.name = PieceName.Pawn
        this.color = color
    }

    availableMoves(board: BoardPositions): string[] | [] {
        const availableMoves: [] = []

        if (this.position[1] == '7' || this.position[1] == '2') {
            return this.followDirectionUntilObstacle(
                this.color == PieceColor.Black ? Direction.Down : Direction.Up,
                board,
                2
            )
        } else {
            return this.followDirectionUntilObstacle(
                this.color == PieceColor.Black ? Direction.Down : Direction.Up,
                board,
                1
            )
        }

        return availableMoves
    }
}
