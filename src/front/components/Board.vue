<template lang="pug">
div
    table#board
        tr(v-for="(number, i) in numbers")
            td.square(v-for="(letter, j) in letters",
             :id="letter + number",
             :class="i % 2 == 0 ? (j % 2 == 0 ? 'square-one' : 'square-two') : (j % 2 != 0 ? 'square-one' : 'square-two')")

</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import Piece from '~components/Piece.vue'
import { store } from '~/front/store'
import { PieceName, Color } from '~/chess/Piece'
import { Board as BoardObj } from '~/chess/Board'
import { Game } from '~/chess/Game'
import $ from 'jquery'

@Component
export default class Board extends Vue {
    game = store.state.game
    letters = [...BoardObj.letters]
    numbers = [...BoardObj.numbers].reverse() // Spread operator to avoid reference change

    @Watch('game')
    onGameChange() {
        this.renderBoard()
    }

    mounted() {
        this.renderBoard()
    }

    renderBoard() {
        this.cleanBoard()

        for (const position in this.game.board) {
            const piece = this.game.board[position]
            if (piece !== undefined) {
                const pieceComponent = new Piece({
                    data: { piece }
                })
                $(`#${position}`).html('<div id="z"></div>')
                pieceComponent.$mount('#z')
            }
        }
    }

    cleanBoard() {
        $('.piece').remove()
    }
}
</script>

<style scoped>
td:after {
    content: '';
    display: block;
    margin-top: 100%;
}
#board {
    border-spacing: 0;
    margin: auto;
    width: 100%;
    max-width: 85vh;
    position: relative;
    box-sizing: border-box;
}
.square-one {
    background-color: #ffe0b2;
}
.square-two {
    background-color: #6d4c41;
}
#board {
    position: relative;
}
</style>
