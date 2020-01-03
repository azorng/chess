import Vue from 'vue'
import Vuex from 'vuex'
import { Game } from '~/chess/Game'
import { Piece } from '~/chess/Piece'

Vue.use(Vuex)

interface State {
    game: Game
}

const game = new Game()
game.start()

export const store = new Vuex.Store({
    state: {
        game
    },
    mutations: {
        move(state: State, { piece, destination }: { piece: Piece; destination: string }) {
            game.move(piece, destination)
            triggerReactivity(state.game)
        }
    }
})

const triggerReactivity = (...objs: any) => {
    for (let obj of objs) {
        if (obj) {
            Vue.set(obj, 'xxx', undefined)
            delete obj['xxx']
        }
    }
}
