<template>
  <div id="LogsFeed" class="card">
    <div class="card-header">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <i class="fad fa-robot" style="margin-right:.5rem"></i>
            Logs Feed
          </div>
          <div class="level-item">
            <button
              @click="purgeLogs"
              class="button is-small is-danger is-rounded is-outlined"
            >
              Purge Logs
            </button>
          </div>
        </div>
        <div class="level-right"></div>
      </div>
    </div>
    <div class="card-body">
      <ul>
        <li v-for="(log, index) in logs.slice().reverse()" :key="index">
          {{ log }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "LogsFeeds",
  computed: {
    ...mapGetters(["logs"]),
  },
  methods: {
    purgeLogs() {
      this.$store.commit("purgeLogs");
    },
  },
};
</script>

<style lang="scss" scoped>
#LogsFeed {
  max-height: 400px;
  overflow-y: scroll;
}
</style>
