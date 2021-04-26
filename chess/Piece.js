"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Piece = exports.PieceName = exports.MoveDirection = exports.Color = void 0;
const MoveAssistant_1 = require("~/chess/MoveAssistant");
const uuid_1 = __importDefault(require("uuid"));
var Color;
(function (Color) {
    Color[Color["Black"] = 0] = "Black";
    Color[Color["White"] = 1] = "White";
})(Color = exports.Color || (exports.Color = {}));
var MoveDirection;
(function (MoveDirection) {
    MoveDirection[MoveDirection["Up"] = 0] = "Up";
    MoveDirection[MoveDirection["Down"] = 1] = "Down";
    MoveDirection[MoveDirection["Left"] = 2] = "Left";
    MoveDirection[MoveDirection["Right"] = 3] = "Right";
    MoveDirection[MoveDirection["UpRight"] = 4] = "UpRight";
    MoveDirection[MoveDirection["UpLeft"] = 5] = "UpLeft";
    MoveDirection[MoveDirection["DownRight"] = 6] = "DownRight";
    MoveDirection[MoveDirection["DownLeft"] = 7] = "DownLeft";
})(MoveDirection = exports.MoveDirection || (exports.MoveDirection = {}));
var PieceName;
(function (PieceName) {
    PieceName[PieceName["King"] = 0] = "King";
    PieceName[PieceName["Queen"] = 1] = "Queen";
    PieceName[PieceName["Roock"] = 2] = "Roock";
    PieceName[PieceName["Bishop"] = 3] = "Bishop";
    PieceName[PieceName["Knight"] = 4] = "Knight";
    PieceName[PieceName["Pawn"] = 5] = "Pawn";
})(PieceName = exports.PieceName || (exports.PieceName = {}));
class Piece {
    constructor() {
        this.moveAssistant = new MoveAssistant_1.MoveAssistant(this);
        this.id = uuid_1.default();
    }
}
exports.Piece = Piece;
