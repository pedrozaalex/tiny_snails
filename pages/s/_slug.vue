<template>
  <h1>Redirecting...</h1>
</template>

<script>
import axios from 'axios';
export default {
  async fetch({ params: { slug }, redirect }) {
    try {
      const { data } = await axios.get(`api/snails/${slug}`);
      return redirect(data.url);
    } catch (error) {
      return redirect('/404');
    }
  },
  fetchOnServer: false
};
</script>
