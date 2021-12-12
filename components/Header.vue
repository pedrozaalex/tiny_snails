<template>
  <CFlex justify="space-between" pos="absolute" top="0" w="100%" p="3">
    <CHeading text>
      <CFlex align="flex-start">
        tiny snails
        <CImage src="snail.png" ml="3" d="inline-block" size="10" />
      </CFlex>
    </CHeading>
    <nav>
      <CIconButton
        :icon="colorMode === 'light' ? 'moon' : 'sun'"
        :aria-label="`Switch to ${
          colorMode === 'light' ? 'dark' : 'light'
        } mode`"
        @click="toggleColorMode"
      />
    </nav>
  </CFlex>
</template>

<script>
import { CIconButton, CFlex, CHeading } from '@chakra-ui/vue';

export default {
  name: 'App',
  components: {
    CIconButton,
    CFlex,
    CHeading
  },
  inject: ['$chakraColorMode', '$toggleColorMode'],
  computed: {
    toggleColorMode() {
      return this.$toggleColorMode;
    },
    colorMode() {
      return this.$chakraColorMode();
    }
  }
};
</script>

<style>
</style>