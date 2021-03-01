<template>
  <div id="FireCommands" class="card">
    <div class="card-header">
      <h2 class="subtitle">
        <i class="fad fa-megaphone" style="margin-right:.5rem"></i>
        Streamer Shoutouts
      </h2>
    </div>
    <div class="card-body">
      <div class="command-group">
        <p style="margin-bottom: 1rem">
          Enter a streamer's username below to shout them out with Halcyon.
        </p>
        <b-field>
          <b-input
            expanded
            v-model="shoutout"
            placeholder="0NEGUYY"
            type="search"
            width="400"
          ></b-input>
          <p class="control">
            <b-button @click="fireShoutout" class="button is-secondary search"
              >Send Shoutout</b-button
            >
          </p>
        </b-field>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "StreamerShoutouts",
  data() {
    return {
      shoutout: undefined,
    };
  },
  methods: {
    fireShoutout() {
      const sendShoutout = axios.post("http://localhost:9090/message", {
        message: `!so ${this.shoutout}`,
      });
      sendShoutout
        .then(() => this.$store.commit("pushLog", "StreamerShoutouts sent"))
        .catch(() => this.$store.commit("pushLog", "StreamerShoutouts failed"));
    },
  },
};
</script>

<style lang="scss" scoped></style>
