<template>
  <CFlex justify="center" direction="column" align="center" h="100%">
    <CFormControl
      text-align="center"
      max-w="80%"
      :is-invalid="request.error != null"
      @submit="createSnail"
      @keyup.enter="createSnail"
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
        @keyup.enter="createSnail"
      />
      <br />
      <CFormLabel for="slug">shortened url:</CFormLabel>
      <CInputGroup @keyup.enter="createSnail">
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
          @keyup.enter="createSnail"
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
        @click="createSnail"
      >
        shorten it!</CButton
      >
    </CFormControl>
  </CFlex>
</template>

<script>
import axios from 'axios';
import { string, object } from 'yup';

const schema = object().shape({
  url: string().url().required(),
  slug: string().optional()
});

export default {
  name: 'App',
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
    async createSnail() {
      const url = this.inputUrl;
      const slug = this.inputSlug;

      try {
        await schema.validate({ url, slug }, { abortEarly: false });
      } catch (error) {
        this.request.error = error.errors.join(', ');
      }

      this.request.loading = true;
      this.request.error = null;
      this.request.success = null;
      this.request.data = null;

      try {
        const body = {
          url,
          slug: slug || null
        };
        const params = {};
        if (this.$auth.loggedIn)
          params.headers = {
            // note: the token already has the Bearer prefix
            Authorization: await this.$auth.strategy.token.get()
          };

        const { data } = await axios.post('/api/snails', body, params);

        this.request.loading = false;
        this.request.success = true;

        this.$emit('snail-created', data);
      } catch (error) {
        if (error.response?.status === 400)
          this.request.error = 'invalid url or alias';
        else this.request.error = 'something went wrong';

        this.request.loading = false;
      }
    }
  }
};
</script>

<style>
</style>