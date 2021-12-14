<template>
  <div class="container">
    <transition name="slide-fade" mode="out-in">
      <!-- if no snail data present, show input fields -->
      <snail-creation v-if="!snailData" @snail-created="snailData = $event" />

      <!-- else, display the snail data -->
      <snail-display v-else :snail="snailData" @reset="snailData = null" />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      snailData: null
    };
  }
};
</script>

<style scoped>
.container {
  overflow: hidden;
}
.slide-fade-enter-active {
  transition: all 0.1s ease;
}
.slide-fade-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(100px);
  opacity: 0;
}
</style>
