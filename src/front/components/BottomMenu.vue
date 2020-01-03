<template lang="pug">
div
    #bottom-menu
        v-btn.opt(fab, color='red')
            v-icon(dark) undo
        v-btn.opt(fab, color='red')
            v-icon(dark) redo    

</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { Color } from '~/chess/Piece'
import { store } from '~/front/store'

@Component
export default class BottomMenu extends Vue {}
</script>

<style scoped>
#bottom-menu {
    margin-top: 10px;
    text-align: center;
}

.opt {
    margin: 0 10px;
}
</style>
