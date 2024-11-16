<script setup>
import { isHowToPlayMenuOpened } from '@/stores/howToPlayMenu'
</script>

<template>
  <div class="blur" @click.self="() => isHowToPlayMenuOpened = false">
    <div class="content">
      <h2>How to play</h2>
      <button class="closeButton" @click="() => isHowToPlayMenuOpened = false">
        <img src="@/assets/close.png" alt="Close">
      </button>
      <slot/>
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
