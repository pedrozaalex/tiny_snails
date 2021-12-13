<template>
  <CStack is-inline spacing="5" class="snailCardRow" as="li">
    <CBox class="alias">
      <CLink :href="$config.baseURL + '/s/' + snail.alias">{{
        $config.baseURL + '/s/' + snail.alias
      }}</CLink>
    </CBox>
    <CBox class="url">
      <CLink :href="snail.url">{{ snail.url }}</CLink>
    </CBox>
    <CBox class="clicks">
      {{ snail.clicks }}
    </CBox>
    <CButton
      class="delete"
      variant-color="red"
      :disabled="loading"
      @click="deleteSnail"
    >
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
        console.error(error);
      } finally {
        this.loading = false;
      }
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
  border-bottom: 1px solid #ccc;
}

.snailCardRow div {
  /* padding: 5px; */
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
  width: 5%;
}
</style>>