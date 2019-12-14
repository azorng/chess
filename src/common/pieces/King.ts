import { PieceBase, PieceName, PieceColor } from '~/common/PieceBase'
import { BoardPositions } from '~/common/Board'

export class King extends PieceBase {
    constructor(color: PieceColor) {
        super()
        this.name = PieceName.King
        this.color = color
    }

    availableMoves(board: BoardPositions): string[] {
        throw Error()
    }
}
