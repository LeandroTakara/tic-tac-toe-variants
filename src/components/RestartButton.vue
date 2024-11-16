<template>
  <button class="restart-button">
    <div class="icon"></div>
  </button>
</template>

<style scoped>
.restart-button {
  --bg-color: rgb(39 144 39);
  --arrow-color: rgb(25 233 25);

  position: relative;
  width: 40px;
  height: 40px;
  background-color: var(--bg-color);
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
}

.icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotateZ(-30deg);
  width: 20px;
  height: 20px;
  border: solid var(--arrow-color) 3px;
  border-radius: 100%;
  transition: transform 0.5s;
}

.restart-button:hover {
  box-shadow: 0 0 20px 2px rgba(255, 255, 255, 0.2);
}
.icon:hover {
  transform: translate(-50%, -50%) rotateZ(-390deg);
}

.icon::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-left: solid var(--bg-color) 12px;
  border-top: solid transparent 20px;
  border-bottom: solid transparent 20px;
  border-right: solid transparent 20px;
}

.icon::after {
  content: '';
  position: absolute;
  top: -4%;
  left: -62%;
  transform: translate(-50%, -50%);
  border-left: solid var(--arrow-color) 7px;
  border-top: solid transparent 5px;
  border-bottom: solid transparent 5px;
  rotate: 124deg;
}
</style>
