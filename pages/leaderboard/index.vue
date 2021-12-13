<template>
  <CSpinner v-if="loading" color="orange.300" />
  <CBox v-else>
    <CBox overflow-y="auto" max-height="50%" class="snailList" as="ul">
      <snail-card v-for="snail in mySnails" :key="snail.alias" :snail="snail" />
    </CBox>
  </CBox>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Leaderboard',
  data() {
    return {
      loading: true,
      mySnails: []
    };
  },
  async mounted() {
    await this.fetchSnails();
  },
  methods: {
    async fetchSnails() {
      const { data } = await axios.get(`${this.$config.baseURL}/api/snails`);
      this.mySnails = data;
      this.loading = false;
    }
  }
};
</script>
