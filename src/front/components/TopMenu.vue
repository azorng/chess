<template lang="pug">
div
    #top-menu 
        #winner(v-if='winner !== undefined') {{ winner }} wins the game.
        div(v-else) Current turn: #[.turn(attribute='value') {{ turn }}] 

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Color } from '~/chess/Piece'
import { store } from '~/front/store'

@Component
export default class TopMenu extends Vue {
    game = store.state.game

    get winner() {
        return this.game.isCheckMate !== false ? Color[this.game.oppositeTurn] : undefined
    }

    get turn() {
        return Color[this.game.currentTurn]
    }
}
</script>

<style scoped>
#top-menu {
    position: relative;
    height: 40px;
    text-align: center;
    padding-top: 20px;
}

.turn {
    display: inline;
    font-size: 20px;
    font-weight: bold;
}

#winner {
    font-weight: bold;
    font-size: 20px;
}
</style>
