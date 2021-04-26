<template lang="pug">
div.piece(@click='availableMoves')
    img(:src='`./pieces/${color}_${name}.svg`')
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Color, PieceName, Piece as PieceBase } from '~/chess/Piece'
import { store } from '~/front/store'
import $ from 'jquery'

@Component
export default class Piece extends Vue {
    piece: PieceBase
    game = store.state.game

    get color() {
        return Color[this.piece.color]
    }

    get name() {
        return PieceName[this.piece.name]
    }

    availableMoves() {
        if (this.piece.color == this.game.currentTurn && this.game.isCheckMate === false) {
            this.clearMoves()
            const availableMoves = this.piece.availableMoves(this.game.board)
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
.piece {
    cursor: pointer;
    position: absolute;
    width: 12.22%;
}

.piece img {
    width: 100%;
}

.available-move {
    background-color: #212121 !important;
    cursor: pointer;
}
</style>
