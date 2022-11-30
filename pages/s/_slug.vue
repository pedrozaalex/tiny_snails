<template>
  <h1>Redirecting...</h1>
</template>

<script>
export default {
  async fetch({ params: { slug }, redirect, $axios }, _$config) {
    let url;
    try {
      url = (await $axios.get(`/api/snails/${slug}`)).data.url;
    } catch (error) {
      return redirect('/404');
    }

    if (
      /tny-snls.xyz\/s\/\w+/.test(url ?? '') ||
      /tny-snls.xyz\/s\/\w+/.test(decodeURI(url ?? ''))
    ) {
      return redirect('/cheeky');
    }

    return redirect(url);
  },
  fetchOnServer: false
};
</script>
