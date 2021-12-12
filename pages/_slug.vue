<template>
  <h1>Redirecting...</h1>
</template>

<script>
import axios from 'axios';
export default {
  async asyncData({ params: { slug }, redirect, $config }) {
    try {
      const { data: url } = await axios.get(
        `${$config.baseURL}/api/url/${slug}`
      );
      return redirect(url);
    } catch (error) {
      return redirect('/404.html');
    }
  }
};
</script>
