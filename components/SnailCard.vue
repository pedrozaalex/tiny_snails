<template>
  <CStack is-inline spacing="5" class="snailCardRow" as="li">
    <CBox class="alias">
      <CLink :href="$config.baseURL + '/s/' + snail.alias">{{
        snail.alias
      }}</CLink>
    </CBox>
    <CBox class="url">
      <CLink :href="snail.url">{{ removeUrlProtocol(snail.url) }}</CLink>
    </CBox>
    <CBox class="clicks">
      {{ snail.clicks }}
    </CBox>
    <CButton p="0" variant-color="red" :disabled="loading" @click="deleteSnail">
      <div v-if="loading"><CSpinner size="sm" /></div>
      <div v-else><CIcon name="close" /></div>
    </CButton>
  </CStack>
</template>

<script>
import axios from 'axios';
export default {
  props: {
    snail: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      loading: false
    };
  },
  methods: {
    async deleteSnail() {
      this.loading = true;
      const token = await this.$auth.strategy.token.get();
      try {
        await axios.delete(`/api/snails/${this.snail.alias}`, {
          headers: {
            // note: the token already has the Bearer prefix
            Authorization: token // send the access token through the 'Authorization' header
          }
        });
        this.$emit('deleted', this.snail);
      } catch (error) {
        alert(error.response.data.message);
      } finally {
        this.loading = false;
      }
    },
    removeUrlProtocol(url) {
      return url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '');
    }
  }
};
</script>

<style>
.snailCardRow {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
}

.snailCardRow:not(:last-child) {
  border-bottom: 1px solid #ccc;
}

.snailCardRow div {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.snailCardRow .alias {
  width: 30%;
}

.snailCardRow .url {
  width: 60%;
}

.snailCardRow .clicks {
  width: 10%;
  text-overflow: clip;
}
</style>
>
