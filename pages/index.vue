<template>
  <div class="container">
    <snail-creation
      v-if="!requestData"
      @request-sucess="requestData = $event"
    />
    <snail-display v-else :snail="requestData" />
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
