<template>
  <div id="SendChatMessage" class="card">
    <div class="card-header">
      <h2 class="subtitle">
        <i class="fas fa-comment-alt-lines" style="margin-right:.5rem"></i>
        Send a Message
      </h2>
    </div>
    <div class="card-body">
      <p class="help">Enter a message to chat as robo0NEGUY</p>
      <b-field>
        <b-input
          expanded
          v-model="message"
          placeholder="catJAM"
          type="search"
          width="400"
        ></b-input>
        <p class="control">
          <b-button @click="fireMessage" class="button is-secondary search"
            >Send Message</b-button
          >
        </p>
      </b-field>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "SendChatMessages",
  data() {
    return {
      message: undefined,
    };
  },
  methods: {
    fireMessage() {
      const timestamp = new Date().toTimeString().split(" ")[0];
      const sendCommand = axios.post("http://localhost:9090/message", {
        message: this.message,
      });

      sendCommand
        .then(() => {
          this.$store.commit(
            "pushLog",
            `${timestamp} - send chat message: success`
          );
        })
        .catch(() =>
          this.$store.commit(
            "pushLog",
            `${timestamp} - send chat message: failed`
          )
        );
    },
  },
};
</script>

<style lang="scss" scoped></style>
