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
import { PieceName } from '~/common/PieceBase'
import { Board as BoardObj } from '~/common/Board'
import _ from 'lodash'
import $ from 'jquery'

@Component
export default class Board extends Vue {
    boardPositions = store.state.boardPositions
    letters = BoardObj.letters

    @Watch('boardPositions')
    onBoardChange() {
        $('.piece').remove()
        this.renderPositions()
    }

    get numbers() {
        return _.clone(BoardObj.numbers).reverse()
    }

    mounted() {
        this.renderPositions()
    }

    renderPositions() {
        for (const position in this.boardPositions) {
            const piece = this.boardPositions[position]
            if (piece) {
                const pieceComponent = new Piece({
                    data: { piece, positions: this.boardPositions }
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
    background-color: #fff59d;
}
.square-two {
    background-color: #4e342e;
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
