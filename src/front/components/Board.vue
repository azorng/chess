<template lang="pug">
div
    table#board
        tr(v-for="(number, i) in numbers")
            td.square(v-for="(letter, j) in letters",
             :id="letter+number",
             :class="i % 2 == 0 ? (j % 2 == 0 ? 'square-one' : 'square-two') : (j % 2 != 0 ? 'square-one' : 'square-two')")
             .position {{letter+number}}

</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import Piece from '~components/Piece.vue'
import { store } from '~/front/store'
import { PieceName, Color } from '~/common/Piece'
import { Board as BoardObj } from '~/common/Board'
import { Game } from '~/common/Game'
import _ from 'lodash'
import $ from 'jquery'

@Component
export default class Board extends Vue {
    game = store.state.game
    letters = [...BoardObj.letters]
    numbers = [...BoardObj.numbers].reverse()

    @Watch('game')
    onGameChange(game: Game) {
        $('.piece').remove()
        this.renderBoard()

        if (game.winner !== false) {
            alert(Color[game.winner] + 's win!')
        }

        if (game.onCheck !== false) {
            alert('Check to: ' + Color[game.onCheck] + ' king.')
        }

        if (game.onCheckMate !== false) {
            alert('Check mate to: ' + Color[game.onCheckMate] + ' king')
        }
    }

    mounted() {
        this.renderBoard()
    }

    renderBoard() {
        for (const position in this.game.board) {
            const piece = this.game.board[position]
            if (piece) {
                const pieceComponent = new Piece({
                    data: { piece }
                })
                document.getElementById(position)!.innerHTML = '<div id="z"></div>'
                pieceComponent.$mount('#z')
            }
        }
    }
}
</script>

<style scoped>
.position {
    position: absolute;
}
td:after {
    content: '';
    display: block;
    margin-top: 100%;
}
#board {
    border-spacing: 0;
    margin: auto;
    width: 100%;
    max-width: 99vh;
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

<style>
.piece {
    position: absolute;
    width: 12.22%;
}

.piece img {
    width: 100%;
}
</style>
