<template lang="pug">
  #app
    Game

</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import Game from "~components/Game.vue"

@Component({
  components: {
    Game
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
  color: white;
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
  background-color: #212121;
}
</style>
