import { Piece, PieceColor, PieceName } from '~/common/Piece'
import { Queen } from '~/common/pieces/Queen'
import { King } from '~/common/pieces/King'
import { Knight } from '~/common/pieces/Knight'
import { Bishop } from '~/common/pieces/Bishop'
import { Roock } from '~/common/pieces/Roock'
import { Pawn } from '~/common/pieces/Pawn'
import _ from 'lodash'

export type BoardPositions = { [key: string]: Piece | undefined }

export class Board {
    positions: BoardPositions
    killedPieces: Piece[]
    winner: PieceColor | undefined

    static readonly numbers = ['1', '2', '3', '4', '5', '6', '7', '8']
    static readonly letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

    constructor() {
        this.positions = this.initBoard()
        this.winner = undefined
        this.killedPieces = []
    }

    public start() {
        this.setPiecesInTheBoard()
        this.letPiecesKnowTheirPosition()
    }

    public move(piece: Piece, destination: string) {
        if (!piece.moveAssistant.isAllowedMove(destination, this.positions)) {
            throw Error('Move is not allowed')
        }

        const pieceKilled = this.positions[destination]
        if (pieceKilled) {
            this.killedPieces.push(pieceKilled)
            if (pieceKilled.name == PieceName.King) {
                this.winner = piece.color
            }
        }

        this.movePieceToDestination(piece, destination)
    }

    private movePieceToDestination(piece: Piece, destination: string) {
        this.positions[piece.position] = undefined
        this.positions[destination] = piece
        piece.position = destination
    }

    private letPiecesKnowTheirPosition() {
        for (const position in this.positions) {
            const piece = this.positions[position]
            if (piece) {
                piece.position = position
            }
        }
    }

    private setPiecesInTheBoard() {
        this.positions['a8'] = new Roock(PieceColor.Black)
        this.positions['b8'] = new Knight(PieceColor.Black)
        this.positions['c8'] = new Bishop(PieceColor.Black)
        this.positions['d8'] = new Queen(PieceColor.Black)
        this.positions['e8'] = new King(PieceColor.Black)
        this.positions['f8'] = new Bishop(PieceColor.Black)
        this.positions['g8'] = new Knight(PieceColor.Black)
        this.positions['h8'] = new Roock(PieceColor.Black)
        this.fillRow('7', Pawn, PieceColor.Black)

        this.positions['a1'] = new Roock(PieceColor.White)
        this.positions['b1'] = new Knight(PieceColor.White)
        this.positions['c1'] = new Bishop(PieceColor.White)
        this.positions['d1'] = new Queen(PieceColor.White)
        this.positions['e1'] = new King(PieceColor.White)
        this.positions['f1'] = new Bishop(PieceColor.White)
        this.positions['g1'] = new Knight(PieceColor.White)
        this.positions['h1'] = new Roock(PieceColor.White)
        this.fillRow('2', Pawn, PieceColor.White)
    }

    private fillRow(rowNumber: string, piece: any, color: PieceColor) {
        const positions = this.positions
        Board.letters.forEach(letter => {
            positions[letter + rowNumber] = new piece(color)
        })
    }

    private initBoard() {
        const board: BoardPositions = {}

        Board.letters.forEach(letter => {
            Board.numbers.forEach(number => {
                board[letter + number] = undefined
            })
        })

        return board
    }
}
