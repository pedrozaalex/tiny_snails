<template>
  <div class="container">
    <CThemeProvider>
      <CColorModeProvider>
        <CBox font-family="body" as="main">
          <CReset />
          <app-body>
            <Nuxt />
          </app-body>
        </CBox>
      </CColorModeProvider>
    </CThemeProvider>
  </div>
</template>
<script>
import {
  CThemeProvider,
  CColorModeProvider,
  CReset,
  CBox
} from '@chakra-ui/vue';
import AppBody from '~/components/AppBody.vue';

export default {
  name: 'App',
  components: {
    CThemeProvider,
    CColorModeProvider,
    CReset,
    CBox,
    AppBody
  }
};
</script>

<style>
html,
body,
#__nuxt,
#__layout,
.container,
#__chakra-app {
  height: 100%; /* Allow percentage-based heights in the application */
}

main {
  height: 100%;
}
</style>
