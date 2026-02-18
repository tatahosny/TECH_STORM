<template>
  <div class="light-effect"></div>
</template>

<script>
export default {
  name: 'LightEffect'
}
</script>

<style scoped>
.light-effect {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: -1;
  background: 
    radial-gradient(
      circle at 20% 80%,
      rgba(255, 255, 255, 0.02) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 20%,
      rgba(255, 255, 255, 0.02) 0%,
      transparent 50%
    );
}

body.light-theme .light-effect {
  background: 
    radial-gradient(
      circle at 20% 80%,
      rgba(0, 0, 0, 0.02) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 20%,
      rgba(0, 0, 0, 0.02) 0%,
      transparent 50%
    );
}
</style>