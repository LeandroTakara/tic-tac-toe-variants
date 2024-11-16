<script setup>
  import { defineEmits } from 'vue'
  import { useRoute } from 'vue-router'
  import howToPlay from '@/howToPlay'

  const route = useRoute()

  const emit = defineEmits(['closeHowToPlay'])

  function closeHowToPlay() {
    emit('closeHowToPlay')
  }

  const howToPlayObj = howToPlay[route.name]
</script>

<template>
  <div class="blur" @click.self="closeHowToPlay">
    <div class="content">
      <h2>How to play</h2>
      <p v-for="txt in howToPlayObj.howToPlay">{{ txt }}</p>
      <button class="closeButton" @click="closeHowToPlay">
        <img src="@/assets/close.png" alt="Close">
      </button>
    </div>
  </div>
</template>

<style scoped>
  .blur {
    position: fixed;
    top: 0;
    left: 0;
    width: 100dvw;
    height: 100dvh;
    background-color: rgba(0, 0, 0, 0.3);
  }

  .content {
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    width: 500px;
    height: 600px;
    padding: 20px;
    color: white;
    background-color: var(--main-color2);
    border-radius: 20px;
    font-family: "Poppins", sans-serif;
  }
  .content h2 {
    text-align: center;
  }
  .content p {
    margin-top: 10px;
  }

  .closeButton {
    position: absolute;
    top: 5px;
    right: 5px;
    width: 30px;
    height: 30px;
    background-color: transparent;
    cursor: pointer;
  }
  .closeButton img {
    width: 100%;
    height: 100%;
  }
</style>
