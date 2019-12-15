import { BoardPositions } from '~/common/Board'
import { MoveHelper } from '~/common/MoveHelper'

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

export abstract class PieceBase {
    color: PieceColor
    name: PieceName
    position: string
    moveHelper: MoveHelper

    constructor() {
        this.moveHelper = new MoveHelper(this)
    }

    abstract availableMoves(board: BoardPositions): string[] | []
}
