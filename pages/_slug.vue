<template>
  <h1>Redirecting...</h1>
</template>

<script>
import axios from 'axios';
export default {
  async fetch({ params: { slug }, redirect, $config }) {
    try {
      const { data } = await axios.get(`${$config.baseURL}/api/snails/${slug}`);
      return redirect(data.url);
    } catch (error) {
      return redirect('/404');
    }
  },
  fetchOnServer: false
};
</script>
