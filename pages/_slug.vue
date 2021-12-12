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
  // async mounted({ params: { slug }, redirect, $config }) {
  //   if (!process.server) {
  //     console.log('slug', slug);
  //     try {
  //       const { data: url } = await axios.get(
  //         `${$config.baseURL}/api/url/${slug}`
  //       );
  //       return redirect(url);
  //     } catch (error) {
  //       return redirect('/404.html');
  //     }
  //   }
  // }
};
</script>
