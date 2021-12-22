<template>
  <CBox text-align="center">
    <CFlex direction="column" align="center">
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
      <CFlex
        overflow-y="auto"
        height="50vh"
        class="leaderboard"
        as="ul"
        direction="column"
      >
        <CSpinner v-if="loading" color="orange.300" margin="auto" />

        <leaderboard-card
          v-for="snail in mySnails"
          v-else
          :key="snail.alias"
          :snail="snail"
        />
      </CFlex>
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
      const { data } = await axios.get('/api/snails');
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

@media only screen and (max-width: 1100px) {
  .leaderboard {
    --leaderboard-width: 40vw;
  }
}

@media only screen and (max-width: 768px) {
  .leaderboard {
    --leaderboard-width: 60vw;
  }
}

@media only screen and (max-width: 500px) {
  .leaderboard {
    --leaderboard-width: 75vw;
  }
}

@media only screen and (max-width: 350px) {
  .leaderboard {
    --leaderboard-width: 100vw;
    border-radius: 0;
    border: none;
  }
}
</style>
