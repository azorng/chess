import { Board } from '~/chess/Board'
import { MoveAssistant } from '~/chess/MoveAssistant'
import uuid from 'uuid'

export enum Color {
    Black,
    White
}

export enum MoveDirection {
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
    color: Color
    name: PieceName
    position: string
    moveAssistant: MoveAssistant
    id: string

    constructor() {
        this.moveAssistant = new MoveAssistant(this)
        this.id = uuid()
    }

    abstract availableMoves(board: Board): string[] 
}
