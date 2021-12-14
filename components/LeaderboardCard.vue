<template>
  <CStack is-inline spacing="5" class="leaderboardCard" as="li">
    <CBox class="alias">
      <CLink :href="$config.baseURL + '/s/' + snail.alias">
        {{ snail.alias }}
      </CLink>
    </CBox>
    <CBox class="clicks">
      {{ snail.clicks }}
    </CBox>
  </CStack>
</template>

<script>
export default {
  props: {
    snail: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.leaderboardCard {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem;
}

.leaderboardCard div {
  /* padding: 5px; */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.leaderboardCard .alias {
  width: 75%;
}

.leaderboardCard .clicks {
  text-align: center;
  width: 25%;
}
</style>>