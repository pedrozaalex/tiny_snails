<template>
  <footer>
    <CStack as="footer" spacing={4} mt={12} textAlign="center">
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
      <CStack mt={4} direction="row" spacing="12px" justify="center">
        <CLink display="inline-block" href="https://github.com/pedrozaalex/tiny_snails/" aria-label="GitHub" isExternal>
          <CIcon name="github" size="24px" color="#ac8fd7" />
        </CLink>
      </CStack>
    </CStack>
  </footer>
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