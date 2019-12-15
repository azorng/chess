import Vue from 'vue'
import Vuex from 'vuex'
import { Board, BoardPositions } from '~/common/Board'
import { Piece, PieceColor } from '~/common/Piece'

Vue.use(Vuex)

interface State {
    currentTurn: PieceColor
    board: Board
}

const board = new Board()
board.start()

export const store = new Vuex.Store({
    state: {
        currentTurn: PieceColor.White,
        board
    },
    mutations: {
        move(state: State, { piece, destination }: { piece: Piece; destination: string }) {
            board.move(piece, destination)
            triggerReactivity(state.board)
        },

        toggleTurn(state: State) {
            state.currentTurn =
                state.currentTurn == PieceColor.White ? PieceColor.Black : PieceColor.White
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
