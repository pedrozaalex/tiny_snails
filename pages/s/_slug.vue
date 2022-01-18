<template>
  <h1>Redirecting...</h1>
</template>

<script>
export default {
  async fetch({ params: { slug }, redirect, $axios }) {
    try {
      const { data } = await $axios.get(`/api/snails/${slug}`);
      return redirect(data.url);
    } catch (error) {
      console.error('error when fetching original url: ', error);
      return redirect('/404');
    }
  },
  fetchOnServer: false
};
</script>
