import { PieceBase, PieceName, PieceColor } from '~/common/PieceBase'
import { BoardPositions } from '~/common/Board'

export class Queen extends PieceBase {
    constructor(color: PieceColor) {
        super()
        this.name = PieceName.Queen
        this.color = color
    }

    availableMoves(board: BoardPositions): string[] {
        throw Error()
    }
}
