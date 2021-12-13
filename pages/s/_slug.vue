<template>
  <h1>Redirecting...</h1>
</template>

<script>
import axios from 'axios';
export default {
  async fetch({ params: { slug }, redirect }) {
    console.log('fetch: ', slug);
    try {
      const { data } = await axios.get(`/api/snails/${slug}`);
      console.log('data:', data);
      return redirect(data.url);
    } catch (error) {
      console.log('error:', error);
      return redirect('/404');
    }
  },
  fetchOnServer: false
};
</script>
