<template>
  <h1>Redirecting...</h1>
</template>

<script>
export default {
  async asyncData({ params: { slug }, redirect, $config }) {
    const url = await fetch(`${$config.baseURL}/api/url/${slug}`)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          return null;
        }
      })
      .then((data) => {
        if (data?.url) {
          return data.url;
        } else {
          return null;
        }
      });

    if (url) {
      return redirect(url);
    } else {
      return redirect('/404');
    }
  }
};
</script>
