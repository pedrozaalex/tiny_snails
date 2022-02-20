<template>
  <CThemeProvider>
    <CColorModeProvider>
      <div class="container">
        <CBox font-family="body" as="main">
          <CReset/>
          <app-body>
            <Nuxt/>
          </app-body>
        </CBox>
      </div>
    </CColorModeProvider>
  </CThemeProvider>
</template>
<script>
import {CBox, CColorModeProvider, CReset, CThemeProvider} from '@chakra-ui/vue';
import VueCookies from 'vue-cookies';
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
