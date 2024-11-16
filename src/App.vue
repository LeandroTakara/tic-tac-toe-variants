<script setup>
  import { ref } from 'vue'
  import { RouterView } from 'vue-router'

  import Header from './components/Header.vue'
  import PlayerDisplay from './components/PlayerDisplay.vue'
  import HowToPlay from './components/HowToPlay.vue'

  const isPlayer1Turn = ref(null)
  const openHowToPlay = ref(false)

  function changePlayerDisplay(isPlayer1TurnData) {
    isPlayer1Turn.value = isPlayer1TurnData
  }

  function openHowToPlayMenu() {
    openHowToPlay.value = true
  }

  function closeHowToPlayMenu() {
    openHowToPlay.value = false
  }
</script>

<template>
  <Header @openHowToPlay="openHowToPlayMenu" />

  <main>
    <PlayerDisplay :isPlayer1Turn="isPlayer1Turn" />

    <RouterView @isPlayer1Turn="changePlayerDisplay" />

    <HowToPlay v-if="openHowToPlay" @closeHowToPlay="closeHowToPlayMenu" />
  </main>
</template>
