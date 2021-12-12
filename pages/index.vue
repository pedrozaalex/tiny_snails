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

      <!-- v-if="!request.success" -->
      <snail-input v-if="!requestData" @request-sucess="requestData = $event" />

      <CBox v-else text-align="center">
        shortened url:
        <CLink :href="'/' + requestData.alias">
          {{ $config.baseURL }}/{{ requestData.alias }}
        </CLink>
      </CBox>
    </CBox>
  </div>
</template>

<script lang="js">
import {
  CBox,
  CLink
} from '@chakra-ui/vue'

export default {
  name: 'App',
  components: {
    CBox,
    CLink
  },
  inject: ['$chakraColorMode'],
  data () {
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
      requestData: null,
    }
  },
  computed: {
    colorMode () {
      return this.$chakraColorMode()
    },
    theme () {
      return this.$chakraTheme()
    }
  },
}
</script>
