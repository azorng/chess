import { PieceBase, PieceName, PieceColor } from '~/common/PieceBase'
import { BoardPositions } from '~/common/Board'

export class Knight extends PieceBase {
    constructor(color: PieceColor) {
        super()
        this.name = PieceName.Knight
        this.color = color
    }

    availableMoves(board: BoardPositions): string[] {
        throw Error()
    }
}
