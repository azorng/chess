<template lang="pug">
div
    #game
        Top-Menu
        Board
        Bottom-Menu

</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import Board from '~components/Board.vue'
import TopMenu from '~components/TopMenu.vue'
import BottomMenu from '~components/BottomMenu.vue'
import { store } from '~/front/store'
import { Color } from '~/chess/Piece'

@Component({
    components: {
        Board,
        TopMenu,
        BottomMenu
    }
})
export default class Game extends Vue {
    private game = store.state.game

    @Watch('game')
    onGameChange() {
        const board: any = this.$children.find((child: Object) =>
            child.hasOwnProperty('renderBoard')
        )
        board.renderBoard()

        if (this.game.isOnCheck !== false) {
            alert('Check to: ' + Color[this.game.isOnCheck] + ' king.')
        }

        if (this.game.isOnCheckMate !== false) {
            alert('Check mate to: ' + Color[this.game.isOnCheckMate] + ' king')
        }
    }
}
</script>

