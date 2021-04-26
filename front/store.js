"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = void 0;
const vue_1 = __importDefault(require("vue"));
const vuex_1 = __importDefault(require("vuex"));
const Game_1 = require("~/chess/Game");
vue_1.default.use(vuex_1.default);
const game = new Game_1.Game();
game.start();
exports.store = new vuex_1.default.Store({
    state: {
        game,
        notifications: []
    },
    mutations: {
        move(state, { piece, destination }) {
            try {
                game.move(piece, destination);
                triggerReactivity(state.game);
            }
            catch (e) {
                state.notifications.push(e.message);
            }
        }
    }
});
const triggerReactivity = (...objs) => {
    for (let obj of objs) {
        if (obj) {
            vue_1.default.set(obj, '_xxx', undefined);
            delete obj['_xxx'];
        }
    }
};
