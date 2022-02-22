<template>
  <CStack as="footer" spacing={4} mt={12} justifyContent="center" flexDirection="row">
    <CText fontSize="sm">
      made with
      <CImage src="purple-heart.png" d="inline-block" size="4"/>
      by
      <CLink
        class="nameLink"
        href="https://github.com/pedrozaalex"
        target="_blank"
        rel="noopener noreferrer"
      >
        Alexandre Pedroza
      </CLink
      >
    </CText>
    <CLink display="inline-block" href="https://github.com/pedrozaalex/tiny_snails/" aria-label="GitHub" isExternal>
      <CIcon name="github" size="24px" color="#ac8fd7"/>
    </CLink>
  </CStack>
</template>

<style>
.nameLink {
  text-decoration: underline;
}

.nameLink:hover {
  text-decoration: none;
  background-color: #7425f3;
  color: #fff;
}
</style>
