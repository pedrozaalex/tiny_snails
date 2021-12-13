<template>
  <CBox text-align="center">
    <CSpinner v-if="loading" color="orange.300" />
    <CFlex v-else direction="column" align="center">
      <CHeading
        >top snails <CImage src="trophy.png" ml="1" d="inline-block" size="10"
      /></CHeading>
      <CFlex
        class="leaderboardHeader"
        justify="space-between"
        mt="5"
        px="4vw"
        pb="0"
      >
        <CText>alias</CText>
        <CText>clicks</CText>
      </CFlex>
      <CBox overflow-y="auto" max-height="50%" class="leaderboard" as="ul">
        <leaderboard-card
          v-for="snail in mySnails"
          :key="snail.alias"
          :snail="snail"
        />
      </CBox>
    </CFlex>
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

<style  scoped>
div {
  --leaderboard-width: 25vmax;
}

.leaderboard {
  margin: 1rem auto;
  padding: 1rem;
  max-height: 50vh;
  width: var(--leaderboard-width);
  overflow: auto;
  text-align: justify;
  border-radius: 5px;
  border: 1px solid rgba(204, 204, 204, 0.664);
  background-color: #0000001e;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
}

.leaderboardHeader {
  width: var(--leaderboard-width);
}
</style>
