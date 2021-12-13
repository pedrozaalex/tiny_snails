<template>
  <CFlex
    justify="space-between"
    pos="absolute"
    top="0"
    w="100%"
    p="3"
    z-index="1"
  >
    <CHeading text>
      <CFlex align="flex-start">
        <nuxt-link to="/">
          tiny snails
          <CImage src="snail.png" ml="1" d="inline-block" size="10" />
        </nuxt-link>
      </CFlex>
    </CHeading>
    <nav>
      <CFlex align="center">
        <!-- Unlogged user -->
        <CLink v-if="!$auth.loggedIn" mr="2" @click="$auth.loginWith('auth0')">
          sign in
        </CLink>

        <!-- Logged user -->
        <CLink v-if="$auth.loggedIn" p="2" @click="$auth.logout()">
          sign out
        </CLink>
        <nuxt-link v-if="$auth.loggedIn" to="/mysnails">
          <CAvatar size="md" mr="2" :src="$auth.user.picture" />
        </nuxt-link>

        <!-- Toggle dark mode -->
        <CIconButton
          :icon="colorMode === 'light' ? 'moon' : 'sun'"
          :aria-label="`Switch to ${
            colorMode === 'light' ? 'dark' : 'light'
          } mode`"
          @click="toggleColorMode"
        />
      </CFlex>
    </nav>
  </CFlex>
</template>

<script>
export default {
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