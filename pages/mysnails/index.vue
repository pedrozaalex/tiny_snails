<template>
  <CBox>
    <Header />
    <h1>snail owners page</h1>
    <div v-for="snail in mySnails" :key="snail.alias">
      {{ snail }}
    </div>
    <Footer />
  </CBox>
</template>

<script>
import axios from 'axios';
export default {
  middleware: 'auth',
  data() {
    return {
      mySnails: []
    };
  },
  async fetch() {
    // Get the access token from the auth wrapper
    const token = await this.$auth.strategy.token.get();

    try {
      const result = await axios.get('/api/owners', {
        headers: {
          // note: the token already has the Bearer prefix
          Authorization: token // send the access token through the 'Authorization' header
        }
      });
      console.log('result: ', result);
      this.mySnails = result.data.map((s) => s.data);
    } catch (error) {
      console.error('error: ', error);
    }
  },
  fetchOnServer: false
};
</script>
