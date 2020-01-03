import { Piece } from '~/chess/Piece'

export type Position = Piece | undefined

export class Board {
    [index: string]: Position

    static numbers = ['1', '2', '3', '4', '5', '6', '7', '8']
    static letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

    a2: Position = undefined
    a1: Position = undefined
    a3: Position = undefined
    a4: Position = undefined
    a5: Position = undefined
    a6: Position = undefined
    a7: Position = undefined
    a8: Position = undefined

    b1: Position = undefined
    b2: Position = undefined
    b3: Position = undefined
    b4: Position = undefined
    b5: Position = undefined
    b6: Position = undefined
    b7: Position = undefined
    b8: Position = undefined

    c1: Position = undefined
    c2: Position = undefined
    c3: Position = undefined
    c4: Position = undefined
    c5: Position = undefined
    c6: Position = undefined
    c7: Position = undefined
    c8: Position = undefined

    d1: Position = undefined
    d2: Position = undefined
    d3: Position = undefined
    d4: Position = undefined
    d5: Position = undefined
    d6: Position = undefined
    d7: Position = undefined
    d8: Position = undefined

    e1: Position = undefined
    e2: Position = undefined
    e3: Position = undefined
    e4: Position = undefined
    e5: Position = undefined
    e6: Position = undefined
    e7: Position = undefined
    e8: Position = undefined

    f1: Position = undefined
    f2: Position = undefined
    f3: Position = undefined
    f4: Position = undefined
    f5: Position = undefined
    f6: Position = undefined
    f7: Position = undefined
    f8: Position = undefined

    g1: Position = undefined
    g2: Position = undefined
    g3: Position = undefined
    g4: Position = undefined
    g5: Position = undefined
    g6: Position = undefined
    g7: Position = undefined
    g8: Position = undefined

    h1: Position = undefined
    h2: Position = undefined
    h3: Position = undefined
    h4: Position = undefined
    h5: Position = undefined
    h6: Position = undefined
    h7: Position = undefined
    h8: Position = undefined
}
