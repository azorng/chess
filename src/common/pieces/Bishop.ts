import { PieceBase, PieceName, PieceColor } from '~/common/PieceBase'
import { BoardPositions } from '~/common/Board'

export class Bishop extends PieceBase {
    constructor(color: PieceColor) {
        super()
        this.name = PieceName.Bishop
        this.color = color
    }

    availableMoves(board: BoardPositions): string[] {
        throw Error()
    }
}
