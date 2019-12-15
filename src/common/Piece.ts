import { BoardPositions } from '~/common/Board'
import { MoveAssistant } from '~/common/MoveAssistant'

export enum PieceColor {
    Black,
    White
}

export enum Direction {
    Up,
    Down,
    Left,
    Right,
    UpRight,
    UpLeft,
    DownRight,
    DownLeft
}

export enum PieceName {
    King,
    Queen,
    Roock,
    Bishop,
    Knight,
    Pawn
}

export abstract class Piece {
    color: PieceColor
    name: PieceName
    position: string
    moveAssistant: MoveAssistant

    constructor() {
        this.moveAssistant = new MoveAssistant(this)
    }

    abstract availableMoves(board: BoardPositions): string[] 
}
