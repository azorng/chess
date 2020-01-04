import { Piece, PieceName, Color, MoveDirection } from '~/chess/Piece'
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
                this.color == Color.Black ? MoveDirection.Down : MoveDirection.Up,
                board,
                this.position[1] == '7' || this.position[1] == '2' ? 2 : 1
            )
        )

        // Diagonal kill
        const diagonalMoves = this.color == Color.White
            ? [
                  ...this.moveAssistant.followDirectionUntilObstacle(MoveDirection.UpLeft, board, 1),
                  ...this.moveAssistant.followDirectionUntilObstacle(MoveDirection.UpRight, board, 1)
              ]
            : [
                  ...this.moveAssistant.followDirectionUntilObstacle(MoveDirection.DownLeft, board, 1),
                  ...this.moveAssistant.followDirectionUntilObstacle(MoveDirection.DownRight, board, 1)
              ]

        diagonalMoves.forEach(move => {
            // Move is valid and there is an enemy is in the target cell
            if (this.moveAssistant.isValidMove(move, board) && board[move] !== undefined) {
                availableMoves.push(move)
            }
        })

        return availableMoves
    }
}
