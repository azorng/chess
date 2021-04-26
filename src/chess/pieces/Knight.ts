import { Piece, PieceName, Color } from '~/chess/Piece'
import { Board } from '~/chess/Board'


export class Knight extends Piece {
    constructor(color: Color) {
        super()
        this.name = PieceName.Knight
        this.color = color
    }

    availableMoves(board: Board): string[] {
        const availableMoves: string[] = []

        const iLetter = Board.letters.indexOf(this.position[0])
        const iNumber = Board.numbers.indexOf(this.position[1])

        const possibleMoves = []
        for (let i = 1; i <= 2; i++) {
            for (let j = 1; j <= 2; j++) {
                if (i != j) {
                    const possibleMove1 = Board.letters[iLetter + i] + Board.numbers[iNumber + j]
                    const possibleMove2 = Board.letters[iLetter - i] + Board.numbers[iNumber - j]
                    const possibleMove3 = Board.letters[iLetter + i] + Board.numbers[iNumber - j]
                    const possibleMove4 = Board.letters[iLetter - i] + Board.numbers[iNumber + j]
                    possibleMoves.push(possibleMove1, possibleMove2, possibleMove3, possibleMove4)
                }
            }
        }

        possibleMoves.forEach(move => {
            if (this.moveAssistant.isValidMove(move, board)) {
                availableMoves.push(move)
            }
        })

        return availableMoves
    }
}
