<template>
  <CFlex justify="space-between" pos="absolute" top="0" w="100%" p="3">
    <nuxt-link to="/">
      <CHeading as="h1">
        tiny snails
        <CImage src="snail.png" ml="1" d="inline-block" size="10"/>
      </CHeading>
    </nuxt-link>
    <nav>
      <CFlex align="center" class="navLinks">
        <!-- Leaderboard -->
        <CLink as="nuxt-link" to="/leaderboard" class="leaderboard"
        >leaderboard
        </CLink
        >

        <!-- Unlogged user -->
        <CLink
          v-if="!$auth.loggedIn"
          mr="2"
          class="signin"
          @click="$auth.loginWith('auth0')"
        >
          sign in
        </CLink>

        <!-- Logged user -->
        <CLink
          v-if="$auth.loggedIn"
          as="nuxt-link"
          to="/mysnails"
          class="mysnails"
        >
          my snails
        </CLink>
        <CLink v-if="$auth.loggedIn" class="signout" @click="$auth.logout()">
          sign out
        </CLink>

        <!-- Toggle dark mode -->
        <CIconButton
          :icon="colorMode === 'light' ? 'moon' : 'sun'"
          :aria-label="`Switch to ${
            colorMode === 'light' ? 'dark' : 'light'
          } mode`"
          @click="toggleColorMode"
        />
      </CFlex>

      <!-- drawer for mobile -->
      <CIconButton
        id="drawerButton"
        icon="chevron-left"
        aria-label="Open drawer"
        @click="openDrawer"
      />
      <CDrawer
        :is-open="isDrawerOpen"
        placement="right"
        :on-close="closeDrawer"
      >
        <CDrawerOverlay/>
        <CDrawerContent max-width="60vw">
          <CDrawerCloseButton/>
          <CDrawerBody>
            <CStack direction="column" spacing="5" align="start">
              <!-- Toggle dark mode -->
              <CIconButton
                :icon="colorMode === 'light' ? 'moon' : 'sun'"
                :aria-label="`Switch to ${
                  colorMode === 'light' ? 'dark' : 'light'
                } mode`"
                @click="toggleColorMode"
              />

              <!-- Leaderboard -->
              <CLink as="nuxt-link" to="/leaderboard" class="leaderboard"
              >leaderboard
              </CLink
              >

              <!-- Unlogged user -->
              <CLink
                v-if="!$auth.loggedIn"
                mr="2"
                class="signin"
                @click="$auth.loginWith('auth0')"
              >
                sign in
              </CLink>

              <!-- Logged user -->
              <CLink
                v-if="$auth.loggedIn"
                as="nuxt-link"
                to="/mysnails"
                class="mysnails"
              >
                my snails
              </CLink>
              <CLink
                v-if="$auth.loggedIn"
                class="signout"
                @click="$auth.logout()"
              >
                sign out
              </CLink>
            </CStack>
          </CDrawerBody>
        </CDrawerContent>
      </CDrawer>
    </nav>
  </CFlex>
</template>

<script>
export default {
  inject: ['$chakraColorMode', '$toggleColorMode'],
  data() {
    return {
      isDrawerOpen: false
    };
  },
  computed: {
    toggleColorMode() {
      return this.$toggleColorMode;
    },
    colorMode() {
      return this.$chakraColorMode();
    }
  },
  methods: {
    openDrawer() {
      this.isDrawerOpen = true;
    },
    closeDrawer() {
      this.isDrawerOpen = false;
    }
  },
  watch: {
    colorMode (newVal) {
      if (!process.client) { return }
      window.$cookies.set("theme", this.$chakraColorMode(), 63072000);
    }
  },
  created () {
    if (!process.client) return
    const savedColorMode = window.$cookies.get("theme")
    if (!savedColorMode) return
    if ((savedColorMode && this.colorMode) && (this.colorMode !== savedColorMode)) {
      this.$toggleColorMode()
    }
  }
};
</script>
<style scoped>
.navLinks a {
  padding-right: 0.5rem;
  padding-left: 0.5rem;
}

#drawerButton {
  display: none;
}

@media screen and (max-width: 768px) {
  .navLinks {
    display: none;
  }

  #drawerButton {
    display: block;
  }
}
</style>
