import { Board } from '~/chess/Board'
import { Color, Piece } from '~/chess/Piece'

export class BoardUtils {
    static getAllPiecesInTheBoard(board: Board, color: Color) {
        const pieces: Piece[] = []

        for (const position in board) {
            const positionValue = board[position]
            if (positionValue != undefined && positionValue.color == color) {
                pieces.push(positionValue)
            }
        }

        return pieces
    }

    static fillRow(board: Board, rowNumber: string, piece: any, color: Color) {
        Board.letters.forEach(letter => {
            board[letter + rowNumber] = new piece(color)
        })
    }
}
