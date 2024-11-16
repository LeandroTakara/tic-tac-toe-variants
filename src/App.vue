<script setup>
  import { ref } from 'vue'
  import { RouterView } from 'vue-router'

  import Header from './components/Header.vue'
  import PlayerDisplay from './components/PlayerDisplay.vue'

  const isPlayer1Turn = ref(null)

  function changePlayerDisplay(isPlayer1TurnData) {
    isPlayer1Turn.value = isPlayer1TurnData
  }
</script>

<template>
  <Header />

  <main>
    <PlayerDisplay :isPlayer1Turn="isPlayer1Turn" />

    <RouterView @isPlayer1Turn="changePlayerDisplay" />
  </main>
</template>
