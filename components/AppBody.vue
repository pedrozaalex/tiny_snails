<template>
  <CBox
    v-bind="mainStyles[colorMode]"
    d="flex"
    w="100vw"
    h="100vh"
    flex-dir="column"
    justify-content="center"
    position="relative"
  >
    <slot />
  </CBox>
</template>

<script>
export default {
  inject: ['$chakraColorMode'],
  data() {
    return {
      mainStyles: {
        dark: {
          bg: 'gray.700',
          color: 'whiteAlpha.900'
        },
        light: {
          bg: 'white',
          color: 'gray.900'
        }
      }
    };
  },
  computed: {
    colorMode() {
      return this.$chakraColorMode();
    },
    theme() {
      return this.$chakraTheme();
    }
  }
};
</script>

<style>
</style>