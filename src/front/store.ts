import Vue from 'vue'
import Vuex from 'vuex'
import { Game } from '~/chess/Game'
import { Piece } from '~/chess/Piece'

Vue.use(Vuex)

interface State {
    game: Game,
    notifications: string[]
}

const game = new Game()
game.start()

export const store = new Vuex.Store({
    state: {
        game,
        notifications: []
    },
    mutations: {
        move(state: State, { piece, destination }: { piece: Piece; destination: string }) {
            try {
                game.move(piece, destination)
                triggerReactivity(state.game)
            } catch (e) {
                state.notifications.push(e.message)
            }
        }
    }
})

const triggerReactivity = (...objs: any) => {
    for (let obj of objs) {
        if (obj) {
            Vue.set(obj, '_xxx', undefined)
            delete obj['_xxx']
        }
    }
}
