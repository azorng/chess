<template lang="pug">
div
    #top-menu Current turn: #[.turn(attribute='value') {{ turn }}] 

</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { Color } from '~/chess/Piece'
import { store } from '~/front/store'

@Component
export default class TopMenu extends Vue {

    get turn() {
        return Color[store.state.game.currentTurn]
    }

}
</script>

<style scoped>
#top-menu {
    position: relative;
    height: 50px;
    text-align: center;
    padding-top: 14px;
}

.turn {
    display: inline;
    font-size: 18px;
    font-weight: bold;
}

</style>
