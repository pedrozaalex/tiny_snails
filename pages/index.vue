<template>
  <div class="container">
    <snail-creation
      v-if="!requestData"
      @request-sucess="requestData = $event"
    />
    <CBox v-else>
      <snail-display :snail="requestData" @reset="requestData = null" />
    </CBox>
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
