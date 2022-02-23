<template>
  <CListItem class="leaderboardCard">
    <CText w="10%">{{ rank }}</CText>
    <CLink class="alias" w="35%" :href="$config.baseURL + '/s/' + snail.alias">
      {{ snail.alias }}
    </CLink>
    <CLink class="url" :title="snail.url" w="35%" :href="snail.url">
      {{ removeUrlProtocol(snail.url) }}
    </CLink>
    <CText w="20%" text-align="right">
      {{ snail.clicks }}
    </CText>
  </CListItem>
</template>

<script>
export default {
  props: {
    snail: {
      type: Object,
      required: true
    },
    rank: {
      type: Number,
      required: true
    }
  },
  methods: {
    removeUrlProtocol(url) {
      return url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '');
    }
  }
};
</script>

<style scoped>
.leaderboardCard {
  font-family: 'Roboto Condensed', sans-serif;
  width: 100%;
  display: flex;
  padding: 0.6rem 0.8rem 0.6rem 0;
}

@media screen and (max-width: 768px) {
  .leaderboardCard {
    padding-right: 0;
    padding-left: 0;
  }
}

.leaderboardCard p {
  font-family: inherit;
}

.leaderboardCard p,
a {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
}

.leaderboardCard p:first-child {
  margin-left: 0.5rem;
}

.leaderboardCard p:last-child {
  margin-right: 0.5rem;
}

.leaderboardCard:not(:last-child) {
  border-bottom: 1px solid #afbed2;
}

@media screen and (min-width: 400px) {
  .alias {
    width: 25%;
  }

  .url {
    width: 45%;
  }
}
@media screen and (min-width: 600px) {
  .alias {
    width: 20%;
  }

  .url {
    width: 50%;
  }
}
</style>
>
