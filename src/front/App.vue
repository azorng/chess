<template lang="pug">
  #app
    Board

</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import Board from "~components/Board.vue"

@Component({
  components: {
    Board
  }
})
export default class App extends Vue {}
</script>

<style>
@import "https://fonts.googleapis.com/icon?family=Material+Icons";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

i {
  font-family: "Material Icons";
}

html {
  overflow-y: auto !important;
  margin: 0;
  padding: 0;
}

body {
  margin: 0;
  padding: 0;
}
</style>
