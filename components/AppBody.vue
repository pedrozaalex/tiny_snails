<template>
  <CBox
    v-bind="mainStyles[colorMode]"
    class="appBody"
    d="flex"
    w="100%"
    h="100%"
    flex-dir="column"
    justify-content="center"
    position="relative"
  >
    <AppHeader />
    <slot />
    <AppFooter />
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
