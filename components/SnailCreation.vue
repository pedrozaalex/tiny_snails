<template>
  <CStack justify="center" direction="column" align="center">
    <CFormControl
      text-align="center"
      max-w="80%"
      :is-invalid="request.error != null"
    >
      <CFormLabel for="url">your url:</CFormLabel>
      <CInput
        id="url"
        v-model="inputUrl"
        type="text"
        aria-describedby="url-helper-text"
        aria-placeholder="URL to shorten"
        placeholder="URL to shorten"
        focus-border-color="indigo.100"
        @keyup.enter="onSubmit"
      />
      <br />
      <CFormLabel for="slug">shortened url:</CFormLabel>
      <CInputGroup>
        <CInputLeftAddon color="orange.300">
          {{ $config.baseURL }}/s/
        </CInputLeftAddon>
        <CInput
          id="slug"
          v-model="inputSlug"
          type="text"
          aria-describedby="slug-helper-text"
          aria-placeholder="URL to shorten"
          focus-border-color="indigo.100"
          rounded-left="0"
          error-border-color="crimson"
          @keyup.enter="onSubmit"
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
        font-weight="bold"
        @click="onSubmit"
      >
        shorten it!</CButton
      >
    </CFormControl>
  </CStack>
</template>

<script>
import axios from 'axios';
import {
  CFormControl,
  CFormLabel,
  CInput,
  CFormHelperText,
  CInputLeftAddon,
  CInputGroup,
  CStack,
  CButton,
  CFormErrorMessage
} from '@chakra-ui/vue';

export default {
  name: 'App',
  components: {
    CFormControl,
    CFormLabel,
    CInput,
    CFormHelperText,
    CInputLeftAddon,
    CInputGroup,
    CStack,
    CButton,
    CFormErrorMessage
  },
  data() {
    return {
      inputUrl: '',
      inputSlug: '',
      request: {
        error: null,
        loading: false,
        success: null,
        data: null
      }
    };
  },
  methods: {
    // send the data from the form to the server
    async onSubmit() {
      this.request.loading = true;
      this.request.error = null;
      this.request.success = null;
      this.request.data = null;

      const url = this.inputUrl;
      const slug = this.inputSlug;

      try {
        const token = await this.$auth.strategy.token.get();
        const result = await axios.post(
          `${this.$config.baseURL}/api/snails`,
          {
            url,
            slug: slug || null
          },
          {
            headers: {
              Authorization: token
            }
          }
        );
        const { data } = result;
        this.request.loading = false;
        this.request.success = true;
        this.$emit('request-sucess', data);
      } catch (error) {
        if (error.response?.status === 400)
          this.request.error = 'invalid url or alias';
        else this.request.error = error;

        this.request.loading = false;
      }
    }
  }
};
</script>

<style>
</style>