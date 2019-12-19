<template lang="pug">
div.piece(@click='availableMoves')
    .position {{ piece.position }}
    img(:src='`/pieces/${color}_${name}.svg`')
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { Color, PieceName, Piece as PieceBase } from '~/common/Piece'
import { Board } from '~/common/Board'
import { store } from '~/front/store'
import $ from 'jquery'

@Component
export default class Piece extends Vue {
    piece: PieceBase

    get color() {
        return Color[this.piece.color]
    }

    get name() {
        return PieceName[this.piece.name]
    }

    availableMoves() {
        if (this.piece.color == store.state.game.currentTurn && !store.state.game.winner) {
            this.clearMoves()
            const availableMoves = this.piece.availableMoves(store.state.game.board)
            availableMoves.forEach(move => {
                document.getElementById(move)!.classList.add('available-move')
            })
            this.makeAvailableMovesInteractive()
        }
    }

    private makeAvailableMovesInteractive() {
        const self = this

        $('#board').off('click', '.available-move')
        $('#board').on('click', '.available-move', function(e) {
            e.stopImmediatePropagation()
            const destination = $(this).attr('id')
            store.commit('move', { piece: self.piece, destination })
            self.clearMoves()
        })
    }

    private clearMoves() {
        for (const position in store.state.game.board) {
            document.getElementById(position)!.classList.remove('available-move')
        }
    }
}
</script>

<style>
.position {
    position: absolute;
}

.piece {
    cursor: pointer;
}

.available-move {
    background-color: #cacaca !important;
    cursor: pointer;
}
</style>
