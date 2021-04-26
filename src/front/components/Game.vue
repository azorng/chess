<template lang="pug">
div
    #game
        Top-Menu
        Board

</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import Board from '~components/Board.vue'
import TopMenu from '~components/TopMenu.vue'
import { store } from '~/front/store'
import { Color } from '~/chess/Piece'

@Component({
    components: {
        Board,
        TopMenu
    }
})
export default class Game extends Vue {
    game = store.state.game
    notifications = store.state.notifications

    @Watch('game')
    onGameChange() {
        if (this.game.isCheck !== false) {
            if (this.game.isCheckMate !== false) {
                this.$notify({
                    title: 'Check mate',
                    text: `Check mate. ${Color[this.game.oppositeTurn]} wins the game.`
                })
            } else {
                this.$notify({
                    title: 'Check',
                    text: `The ${Color[this.game.isCheck]} king is in check.`
                })
            }
        }
    }

    @Watch('notifications')
    onNewNotification() {
        this.$notify({
            title: 'Error',
            text: this.notifications[this.notifications.length - 1]
        })
    }
}
</script>
