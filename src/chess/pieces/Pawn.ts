import { Piece, PieceName, Color, Direction } from '~/chess/Piece'
import { Board } from '~/chess/Board'

export class Pawn extends Piece {
    constructor(color: Color) {
        super()
        this.name = PieceName.Pawn
        this.color = color
    }

    availableMoves(board: Board): string[] {
        const availableMoves: string[] = []
        availableMoves.push(
            ...this.moveAssistant.followDirectionUntilObstacle(
                this.color == Color.Black ? Direction.Down : Direction.Up,
                board,
                this.position[1] == '7' || this.position[1] == '2' ? 2 : 1
            )
        )

        // Diagonal kill
        const diagonalMoves = this.color == Color.White
            ? [
                  ...this.moveAssistant.followDirectionUntilObstacle(Direction.UpLeft, board, 1),
                  ...this.moveAssistant.followDirectionUntilObstacle(Direction.UpRight, board, 1)
              ]
            : [
                  ...this.moveAssistant.followDirectionUntilObstacle(Direction.DownLeft, board, 1),
                  ...this.moveAssistant.followDirectionUntilObstacle(Direction.DownRight, board, 1)
              ]

        diagonalMoves.forEach(move => {
            if (board[move] != undefined && board[move]?.color != this.color) {
                availableMoves.push(move)
            }
        })

        return availableMoves
    }
}
