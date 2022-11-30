<template>
  <CBox text-align="center">
    <CBox v-if="error">
      <CHeading>An error occurred when trying to access your snails :(</CHeading>
      <CText>{{ error }}</CText>
    </CBox>

    <CHeading v-else-if="!loading && mySnails.length === 0">
      You have no snails :(
    </CHeading>

    <CBox v-else>
      <CHeading>your snails:</CHeading>
      <CSpinner v-if="loading" color="orange.300" />
      <CBox v-else>
        <CBox overflow-y="auto" max-height="50%" class="snailList" as="ul">
          <snail-card
            v-for="snail in mySnails"
            :key="snail.alias"
            :snail="snail"
            @deleted="deleteSnail($event)"
          />
        </CBox>
      </CBox>
    </CBox>
  </CBox>
</template>

<script>
import axios from 'axios';

export default {
    name: "MySnailsPage",
    middleware: "auth",
    data() {
        return {
            mySnails: [],
            loading: true,
            error: null
        };
    },
    async fetch() {
        // Get the access token from the auth wrapper
        const token = await this.$auth.strategy.token.get();
        try {
            const result = await axios.get("/api/owners", {
                headers: {
                    // note: the token already has the Bearer prefix
                    Authorization: token // send the access token through the 'Authorization' header
                }
            });
            this.mySnails = result.data.map((s) => s.data);
            this.loading = false;
        }
        catch (error) {
            this.error = error;
        }
    },
    methods: {
        deleteSnail(snail) {
            this.mySnails = this.mySnails.filter((s) => s.alias !== snail.alias);
        }
    },
    fetchOnServer: false,
};
</script>

<style scoped>
.snailList {
  margin: 5px auto;
  padding: 5px;
  max-height: 50vh;
  width: 90%;
  max-width: 50rem;
  overflow: auto;
  text-align: justify;
  border-radius: 5px;
  border: 1px solid rgba(204, 204, 204, 0.664);
  background-color: #0000000e;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
}

@media screen and (max-width: 768px) {
  .snailList {
    width: 100%;
    border-radius: 0;
    max-height: 70vh;
  }
}
</style>
