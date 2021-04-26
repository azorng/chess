"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const Piece_1 = require("~/chess/Piece");
const Queen_1 = require("~/chess/pieces/Queen");
const King_1 = require("~/chess/pieces/King");
const Knight_1 = require("~/chess/pieces/Knight");
const Bishop_1 = require("~/chess/pieces/Bishop");
const Roock_1 = require("~/chess/pieces/Roock");
const Pawn_1 = require("~/chess/pieces/Pawn");
const OnMoveEvent_1 = require("~/chess/OnMoveEvent");
const Board_1 = require("~/chess/Board");
const BoardUtils_1 = require("~/chess/BoardUtils");
const Check_1 = require("~/chess/Check");
const lodash_1 = __importDefault(require("lodash"));
class Game {
    constructor() {
        this.isCheck = false;
        this.isCheckMate = false;
        this.board = new Board_1.Board();
        this.cemetery = [];
        this.history = [];
    }
    start() {
        this.setPiecesInTheBoard();
        this.letPiecesKnowTheirPosition();
        this.currentTurn = Piece_1.Color.White;
    }
    get oppositeTurn() {
        return this.currentTurn == Piece_1.Color.White ? Piece_1.Color.Black : Piece_1.Color.White;
    }
    move(piece, destination) {
        this.validateMove(piece, destination);
        this.history.push(lodash_1.default.clone(this.board));
        this.movePieceToDestination(piece, destination);
        new OnMoveEvent_1.OnMoveEvent(this, piece);
    }
    movePieceToDestination(piece, destination) {
        this.board[piece.position] = undefined;
        this.board[destination] = piece;
        piece.position = destination;
    }
    validateMove(piece, destination) {
        if (!piece.moveAssistant.isAllowedMove(destination, this.board)) {
            throw Error('Move is not allowed.');
        }
        if (Check_1.Check.movesAllowedByCheckedPlayer !== undefined &&
            Check_1.Check.movesAllowedByCheckedPlayer.color == this.currentTurn) {
            const movesAllowedByPiece = Check_1.Check.movesAllowedByCheckedPlayer.movesById[piece.id];
            if (!movesAllowedByPiece || !movesAllowedByPiece.includes(destination)) {
                throw Error('Move is not allowed. The king is in check.');
            }
        }
        const dreamBoard = lodash_1.default.cloneDeep(this);
        dreamBoard.movePieceToDestination(lodash_1.default.clone(piece), destination);
        if (Check_1.Check.isInCheck(dreamBoard.board, this.oppositeTurn)) {
            throw Error('Move is not allowed. The king would be in check.');
        }
    }
    letPiecesKnowTheirPosition() {
        for (const position in this.board) {
            const piece = this.board[position];
            if (piece) {
                piece.position = position;
            }
        }
    }
    setPiecesInTheBoard() {
        this.board.a8 = new Roock_1.Roock(Piece_1.Color.Black);
        this.board.b8 = new Knight_1.Knight(Piece_1.Color.Black);
        this.board.c8 = new Bishop_1.Bishop(Piece_1.Color.Black);
        this.board.d8 = new Queen_1.Queen(Piece_1.Color.Black);
        this.board.e8 = new King_1.King(Piece_1.Color.Black);
        this.board.f8 = new Bishop_1.Bishop(Piece_1.Color.Black);
        this.board.g8 = new Knight_1.Knight(Piece_1.Color.Black);
        this.board.h8 = new Roock_1.Roock(Piece_1.Color.Black);
        BoardUtils_1.BoardUtils.fillRow(this.board, '7', Pawn_1.Pawn, Piece_1.Color.Black);
        this.board.a1 = new Roock_1.Roock(Piece_1.Color.White);
        this.board.b1 = new Knight_1.Knight(Piece_1.Color.White);
        this.board.c1 = new Bishop_1.Bishop(Piece_1.Color.White);
        this.board.d1 = new Queen_1.Queen(Piece_1.Color.White);
        this.board.e1 = new King_1.King(Piece_1.Color.White);
        this.board.f1 = new Bishop_1.Bishop(Piece_1.Color.White);
        this.board.g1 = new Knight_1.Knight(Piece_1.Color.White);
        this.board.h1 = new Roock_1.Roock(Piece_1.Color.White);
        BoardUtils_1.BoardUtils.fillRow(this.board, '2', Pawn_1.Pawn, Piece_1.Color.White);
    }
}
exports.Game = Game;
