<template>
  <CBox text-align="center">
    <CFlex direction="column" align="center">
      <CHeading as="h2" size="lg">
        top snails
        <CImage src="trophy.png" ml="1" d="inline-block" size="10"/>
      </CHeading>
      <CFlex
        direction="column"
        class="leaderboard"
      >
        <CFlex
          class="leaderboardHeader"
          justify="space-between"
          font-weight="600"
          p="4"
          border-bottom="1px solid #aaa"
        >
          <CText ml="10%">alias</CText>
          <CText>url</CText>
          <CText>clicks</CText>
        </CFlex>
        <CFlex
          overflow="hidden"
          direction="column"
          flex-grow="1"
        >
          <CSpinner v-if="loading" color="orange.300" margin="auto"/>

          <CList
            v-else
            overflow="auto"
            list-style="none"
            class="snailList"
          >
            <leaderboard-card
              v-for="(snail, index) in mySnails"
              :key="snail.alias"
              :snail="snail"
              :rank="index + 1"
            />
          </CList>
        </CFlex>
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
      const {data} = await axios.get('/api/snails');
      console.log(data);
      this.mySnails = data;
      this.loading = false;
    }
  }
};
</script>

<style scoped>
.leaderboard {
  margin: 1rem auto;
  width: 70vmin;
  text-align: justify;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  border: 1px solid rgba(204, 204, 204, 0.664);
  background-color: #0000001e;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
  height: 50vh;
  max-height: 50vh;
  overflow: hidden;
  padding-bottom: 0.5rem;
}

@media only screen and (max-width: 768px) {
  .leaderboard {
    width: 100vw;
    border-radius: 0;
    border: none;
    box-shadow: none;
  }
}

.snailList {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

@media only screen and (max-width: 768px) {
  .snailList {
    padding-left: 0;
    padding-right: 0;
  }
}
</style>
