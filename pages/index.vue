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
      <CStack
        v-if="!request.data"
        justify="center"
        direction="column"
        align="center"
      >
        <CFormControl
          text-align="center"
          :is-invalid="request.success === false"
        >
          <CFormLabel for="url">your url</CFormLabel>
          <CInput
            id="url"
            v-model="url"
            type="text"
            aria-describedby="url-helper-text"
            aria-placeholder="URL to shorten"
            placeholder="URL to shorten"
            focus-border-color="indigo.100"
          />
          <br />
          <CFormLabel for="slug">shortened url</CFormLabel>
          <CInputGroup>
            <CInputLeftAddon color="orange.300">
              {{ $config.baseURL }}/
            </CInputLeftAddon>
            <CInput
              id="slug"
              v-model="slug"
              type="text"
              aria-describedby="slug-helper-text"
              aria-placeholder="URL to shorten"
              focus-border-color="indigo.100"
              rounded-left="0"
              error-border-color="crimson"
            />
          </CInputGroup>
          <CFormHelperText id="slug-helper-text">
            leave it blank to get a random one
          </CFormHelperText>
          <CFormErrorMessage>
            {{ request.error }}
          </CFormErrorMessage>
          <br />
          <CButton
            mt="2"
            variant-color="indigo"
            :is-loading="request.loading"
            @click="onSubmit"
          >
            shorten it!</CButton
          >
        </CFormControl>
      </CStack>
      <CBox v-else text-align="center">
        shortened url:
        <CLink :href="'/' + request.data.alias">
          {{ $config.baseURL }}/{{ request.data.alias }}
        </CLink>
      </CBox>
    </CBox>
  </div>
</template>

<script lang="js">
import {
  CBox,
  CIconButton,
  CFlex,
  CHeading,
  CFormControl,
  CFormLabel,
  CInput,
  CFormHelperText,
  CInputLeftAddon,
  CInputGroup,
  CStack,
  CButton,
  CFormErrorMessage,
  CLink
} from '@chakra-ui/vue'

export default {
  name: 'App',
  components: {
    CBox,
    CIconButton,
    CFlex,
    CHeading,
    CFormControl,
    CFormLabel,
    CInput,
    CFormHelperText,
    CInputLeftAddon,
    CInputGroup,
    CStack,
    CButton,
    CFormErrorMessage,
    CLink
  },
  inject: ['$chakraColorMode', '$toggleColorMode'],
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
      url: '',
      slug: '',
      request: {
        error: null,
        loading: false,
        success: null,
        data: null
      }
    }
  },
  computed: {
    colorMode () {
      return this.$chakraColorMode()
    },
    theme () {
      return this.$chakraTheme()
    },
    toggleColorMode () {
      return this.$toggleColorMode
    }
  },
  methods: {
    // send the data from the form to the server
    async onSubmit () {
      this.request.loading = true
      this.request.error = null
      this.request.success = null
      this.request.results = null

      const url = this.url
      const slug = this.slug

      // send the request to the server
      try {
        const results = await fetch(`${this.$config.baseURL}/api/url`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            url,
            slug
          })
        })
        const data = await results.json()
        this.request.data = data
        this.request.loading = false
        this.request.success = true
      } catch (error) {
        this.request.error = error
        this.request.loading = false
      }
    }
  }
}
</script>
