import { Piece, Color } from '~/chess/Piece'
import { Queen } from '~/chess/pieces/Queen'
import { King } from '~/chess/pieces/King'
import { Knight } from '~/chess/pieces/Knight'
import { Bishop } from '~/chess/pieces/Bishop'
import { Roock } from '~/chess/pieces/Roock'
import { Pawn } from '~/chess/pieces/Pawn'
import { OnMoveEvent } from '~/chess/OnMoveEvent'
import { Board } from '~/chess/Board'
import { BoardUtils } from '~/chess/BoardUtils'
import { GameVerificator } from '~/chess/GameVerificator'
import _ from 'lodash'

export interface AllowedMoves {
    color: Color
    movesById: { [index: string]: string[] }
}

export class Game {
    board: Board
    cemetery: Piece[]
    history: Board[]
    currentTurn: Color
    isOnCheck: Color | false
    isOnCheckMate: Color | false

    checkMoves: AllowedMoves | undefined

    constructor() {
        this.isOnCheck = false
        this.currentTurn = Color.White
        this.isOnCheckMate = false
        this.board = new Board()
        this.cemetery = []
        this.history = []
        this.checkMoves = undefined
    }

    public start() {
        this.setPiecesInTheBoard()
        this.letPiecesKnowTheirPosition()
    }

    get oppositeTurn() {
        return this.currentTurn == Color.White ? Color.Black : Color.White
    }

    public move(piece: Piece, destination: string) {
        this.validateMove(piece, destination)

        this.history.push(_.clone(this.board))

        this.movePieceToDestination(piece, destination)

        new OnMoveEvent(this, piece)
    }

    public movePieceToDestination(piece: Piece, destination: string) {
        this.board[piece.position] = undefined
        this.board[destination] = piece
        piece.position = destination
    }

    private validateMove(piece: Piece, destination: string) {
        if (!piece.moveAssistant.isAllowedMove(destination, this.board)) {
            throw Error('Move is not allowed.')
        }

        if (this.checkMoves && this.checkMoves.color == this.currentTurn) {
            const movesAllowedByPiece = this.checkMoves.movesById[piece.id]
            if (!movesAllowedByPiece || !movesAllowedByPiece.includes(destination)) {
                throw Error('The king is on check.')
            }
        }

        const dreamBoard = _.cloneDeep(this)
        dreamBoard.movePieceToDestination(_.clone(piece), destination)
        if (GameVerificator.isOnCheck(dreamBoard.board, this.oppositeTurn)) {
            throw Error("Can't move here, king could be killed.")
        }
    }

    private letPiecesKnowTheirPosition() {
        for (const position in this.board) {
            const piece = this.board[position]
            if (piece) {
                piece.position = position
            }
        }
    }

    private setPiecesInTheBoard() {
        this.board.a8 = new Roock(Color.Black)
        this.board.b8 = new Knight(Color.Black)
        this.board.c8 = new Bishop(Color.Black)
        this.board.d8 = new Queen(Color.Black)
        this.board.e8 = new King(Color.Black)
        this.board.f8 = new Bishop(Color.Black)
        this.board.g8 = new Knight(Color.Black)
        this.board.h8 = new Roock(Color.Black)
        BoardUtils.fillRow(this.board, '7', Pawn, Color.Black)

        this.board.a1 = new Roock(Color.White)
        this.board.b1 = new Knight(Color.White)
        this.board.c1 = new Bishop(Color.White)
        this.board.d1 = new Queen(Color.White)
        this.board.e1 = new King(Color.White)
        this.board.f1 = new Bishop(Color.White)
        this.board.g1 = new Knight(Color.White)
        this.board.h1 = new Roock(Color.White)
        BoardUtils.fillRow(this.board, '2', Pawn, Color.White)
    }
}
