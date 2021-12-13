<template>
  <div class="container">
    <Header />

    <snail-creation
      v-if="!requestData"
      @request-sucess="requestData = $event"
    />
    <snail-display v-else :snail="requestData" />

    <Footer />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      requestData: null
    };
  }
};
</script>
