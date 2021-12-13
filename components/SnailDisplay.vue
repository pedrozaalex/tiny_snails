<template>
  <CFlex direction="column" align="center">
    <CHeading>success!</CHeading>

    <CText> your shortened url: </CText>

    <CFlex
      text-align="center"
      rounded="md"
      border-color="indigo.200"
      border-width="md"
      border-style="solid"
      p="2"
      px="4"
      align-items="baseline"
      w="fit-content"
    >
      <CText mr="2"> {{ $config.baseURL }}/s/{{ snail.alias }} </CText>
      <CButton variant-color="indigo" p="1" @click="copyUrl"> 📋 </CButton>
    </CFlex>
    <CLink as="div" @click="reset">create another one</CLink>
  </CFlex>
</template>

<script>
import { CText, CHeading, CFlex } from '@chakra-ui/vue';

export default {
  components: { CText, CHeading, CFlex },
  props: {
    snail: {
      type: Object,
      required: true
    }
  },
  methods: {
    reset() {
      this.$emit('reset');
    },
    copyUrl() {
      const textToCopy = `${this.$config.baseURL}/s/${this.snail.alias}`;
      if (navigator.clipboard) {
        navigator.clipboard
          .writeText(textToCopy)
          .then(function () {
            alert('Url copied to clipboard');
          })
          .catch(function () {
            alert('err');
          });
      } else {
        const el = document.createElement('textarea');
        el.value = textToCopy;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        const selected =
          document.getSelection().rangeCount > 0
            ? document.getSelection().getRangeAt(0)
            : false;
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        if (selected) {
          document.getSelection().removeAllRanges();
          document.getSelection().addRange(selected);
        }
      }
    }
  }
};
</script>

<style>
</style>