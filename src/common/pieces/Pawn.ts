import { PieceBase, PieceName, PieceColor, Direction } from '~/common/PieceBase'
import { BoardPositions, Board } from '~/common/Board'

export class Pawn extends PieceBase {
    constructor(color: PieceColor) {
        super()
        this.name = PieceName.Pawn
        this.color = color
    }

    availableMoves(board: BoardPositions): string[] | [] {
        const availableMoves: string[] = []

        availableMoves.push(
            ...this.moveHelper.followDirectionUntilObstacle(
                this.color == PieceColor.Black ? Direction.Down : Direction.Up,
                board,
                this.position[1] == '7' || this.position[1] == '2' ? 2 : 1
            )
        )

        // Diagonal kill
        const diagonalMoves = this.color == PieceColor.White
            ? [
                  ...this.moveHelper.followDirectionUntilObstacle(Direction.UpLeft, board, 1),
                  ...this.moveHelper.followDirectionUntilObstacle(Direction.UpRight, board, 1)
              ]
            : [
                  ...this.moveHelper.followDirectionUntilObstacle(Direction.DownLeft, board, 1),
                  ...this.moveHelper.followDirectionUntilObstacle(Direction.DownRight, board, 1)
              ]

        diagonalMoves.forEach(move => {
            if (board[move] != undefined && board[move]?.color != this.color) {
                availableMoves.push(move)
            }
        })

        return availableMoves
    }
}
