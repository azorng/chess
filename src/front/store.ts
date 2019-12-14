import Vue from 'vue'
import Vuex from 'vuex'
import { Board, BoardPositions } from '~/common/Board'
import { PieceBase } from '~/common/PieceBase'

Vue.use(Vuex)

interface State {
    boardPositions: BoardPositions
}

const board = new Board()
board.start()

export const store = new Vuex.Store({
    state: {
        boardPositions: board.positions
    },
    mutations: {
        move(state: State, { piece, destination }: { piece: PieceBase; destination: string }) {
            delete state.boardPositions[piece.position]
            Vue.set(state.boardPositions, piece.position, undefined)

            delete state.boardPositions[destination]
            Vue.set(state.boardPositions, destination, piece)

            piece.position = destination
        }
    }
})
