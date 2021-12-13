<template>
  <div class="container">
    <CBox
      v-bind="mainStyles[colorMode]"
      d="flex"
      w="100vw"
      h="100vh"
      flex-dir="column"
      justify-content="center"
      position="relative"
    >
      <Header />

      <snail-input v-if="!requestData" @request-sucess="requestData = $event" />
      <snail-display v-else :snail="requestData" />

      <Footer />
    </CBox>
  </div>
</template>

<script>
import { CBox } from '@chakra-ui/vue';

export default {
  name: 'App',
  components: {
    CBox
  },
  inject: ['$chakraColorMode'],
  data() {
    return {
      showModal: false,
      mainStyles: {
        dark: {
          bg: 'gray.700',
          color: 'whiteAlpha.900'
        },
        light: {
          bg: 'white',
          color: 'gray.900'
        }
      },
      requestData: null
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
