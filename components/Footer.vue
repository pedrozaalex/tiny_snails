<template>
  <footer>
    <CBox pos="absolute" bottom="0" w="100%" p="2">
      <CText text-align="center">
        made with 💜 by
        <CLink
          class="nameLink"
          href="https://github.com/pedrozaalex"
          target="_blank"
          rel="noopener noreferrer"
        >
          Alexandre Pedroza</CLink
        >
      </CText>
    </CBox>
  </footer>
</template>

<script>
import { CBox, CStack, CText, CLink } from '@chakra-ui/vue';
export default { CBox, CStack, CText, CLink };
</script>

<style>
.nameLink {
  text-decoration: underline;
}
.nameLink:hover {
  text-decoration: none;
  background-color: #7425f3;
}
</style>