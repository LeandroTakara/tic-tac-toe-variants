<template>
  <header class="main-header">
    <div class="header-max">
      <div class="logo">
        <span class="logo-part1">TicTacToe</span>
        <span class="logo-part2">Variants #</span>
      </div>

      <nav class="game-variants">
        <ul>
          <li class="game-variant-item"><a class="game-variant-link" href="/">Classic</a></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
  .main-header {
    height: 70px;
    padding-inline: 30px;
    background-color: rgb(62, 50, 83);
    font-family: "Poppins", sans-serif;
    box-shadow: 0px 0 12px 6px rgba(0, 0, 0, 0.1);
  }

  .header-max {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 900px;
    height: inherit;
    margin: 0 auto;
  }

  .logo {
    position: relative;
    font-size: 20px;
    text-shadow: 3px 3px 7px black;
  }

  .logo-part1 {
    position: absolute;
    top: -1.2em;
    left: 1.2em;
    color: white;
    text-decoration: underline;
  }

  .logo-part2 {
    position: absolute;
    top: -1em;
    color: white;
    width: max-content;
  }
  .logo-part2::first-letter {
    font-size: 1.7em;
  }

  .game-variant-item {
    list-style-type: none;
  }

  .game-variant-link {
    color: white;
    text-decoration: none;
  }
  .game-variant-link:hover {
    text-shadow: 0 0 4px white;
  }
</style>
