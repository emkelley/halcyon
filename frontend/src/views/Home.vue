<template>
  <div class="home">
    <div class="hero is-small is-primary is-bold">
      <div class="hero-head">
        <div class="container">
          <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
              <a
                class="navbar-item help"
                href="https://twitter.com/0NEGUYY"
                style="color: #ff005b; letter-spacing: .03rem"
                target="_blank"
              >
                Made with
                <i class="fad fa-heart" style="margin: 0 .5rem"></i> by @0NEGUYY
              </a>

              <a
                role="button"
                class="navbar-burger"
                aria-label="menu"
                aria-expanded="false"
                data-target="navbarBasicExample"
              >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </a>
            </div>

            <div id="navbarBasicExample" class="navbar-menu">
              <div class="navbar-start"></div>

              <div class="navbar-end">
                <a class="navbar-item">
                  Documentation
                </a>
                <div class="navbar-item">
                  <div class="buttons">
                    <a class="button is-secondary is-outlined is-small">
                      Help
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
      <div class="hero-body has-text-centered">
        <h1 class="title">Halcyon Dashboard</h1>
      </div>
    </div>
    <br /><br />
    <div class="container">
      <div class="columns is-multiline">
        <div class="column is-12">
          <div id="StreamStats" class="card">
            <div class="card-header">
              <h2 class="subtitle">
                <i
                  class="fad fa-tachometer-alt-fast"
                  style="margin-right:.5rem"
                ></i>
                Stream Stats
              </h2>
            </div>
            <div class="card-body">
              <div class="command-group">
                <p class="help">
                  Fire commands from Halcyon using the buttons below.
                </p>
                <b-field grouped group-multiline>
                  <p v-for="n in 5" :key="n" class="control">
                    <b-button
                      size="is-small is-secondary is-rounded"
                      label="!admin"
                    />
                  </p>
                </b-field>
              </div>
            </div>
          </div>
        </div>
        <div class="column is-8">
          <SendChatMessage />
          <br />
          <div class="columns">
            <div class="column is-6">
              <div id="FireCommands" class="card">
                <div class="card-header">
                  <h2 class="subtitle">
                    <i
                      class="fad fa-rocket-launch"
                      style="margin-right:.5rem"
                    ></i>
                    Run Commands
                  </h2>
                </div>
                <div class="card-body">
                  <div class="command-group">
                    <p class="help">
                      Fire commands from Halcyon using the buttons below.
                    </p>
                    <b-field grouped group-multiline>
                      <p
                        v-for="command in commands"
                        :key="command.name"
                        class="control"
                      >
                        <b-button
                          @click="fireCommand(command.name)"
                          size="is-small is-secondary is-rounded"
                          :label="command.name"
                          :class="{ 'is-loading': isLoading }"
                          v-if="command.name !== 'shoutout'"
                        />
                      </p>
                    </b-field>
                  </div>
                </div>
              </div>
            </div>
            <div class="column is-6">
              <StreamerShoutouts />
            </div>
          </div>

          <div id="CRONCommands" class="card">
            <div class="card-header">
              <h2 class="subtitle">
                <i class="fad fa-stopwatch" style="margin-right:.5rem"></i>
                CRON Commands
              </h2>
            </div>
            <div class="card-body">
              <div class="command-group">
                <div class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <h2 class="subtitle">
                        Active CRON commands
                      </h2>
                    </div>
                  </div>
                  <div class="level-right">
                    <div class="level-item">
                      <button class="button is-primary">
                        <i class="fad fa-plus" style="margin-right:.5rem"></i
                        >Add A New CRON Command
                      </button>
                    </div>
                  </div>
                </div>
                <b-table
                  :data="data"
                  ref="table"
                  detailed
                  hoverable
                  custom-detail-row
                  detail-key="name"
                  @details-open="
                    (row, index) => $buefy.toast.open(`Expanded ${row.name}`)
                  "
                  :show-detail-icon="showDetailIcon"
                >
                  <b-table-column
                    field="name"
                    :visible="columnsVisible['name'].display"
                    :label="columnsVisible['name'].title"
                    width="300"
                    sortable
                    v-slot="props"
                  >
                    <template v-if="showDetailIcon">
                      {{ props.row.name }}
                    </template>
                    <template v-else>
                      <a @click="toggle(props.row)">
                        {{ props.row.name }}
                      </a>
                    </template>
                  </b-table-column>

                  <b-table-column
                    field="sold"
                    :visible="columnsVisible['sold'].display"
                    :label="columnsVisible['sold'].title"
                    sortable
                    centered
                    v-slot="props"
                  >
                    {{ props.row.sold }}
                  </b-table-column>

                  <b-table-column
                    field="available"
                    :visible="columnsVisible['available'].display"
                    :label="columnsVisible['available'].title"
                    sortable
                    centered
                    v-slot="props"
                  >
                    {{ props.row.available }}
                  </b-table-column>

                  <b-table-column
                    :visible="columnsVisible['cleared'].display"
                    :label="columnsVisible['cleared'].title"
                    centered
                    v-slot="props"
                  >
                    <span
                      :class="[
                        'tag',
                        {
                          'is-danger':
                            props.row.sold / props.row.available <= 0.45,
                        },
                        {
                          'is-success':
                            props.row.sold / props.row.available > 0.45,
                        },
                      ]"
                    >
                      {{
                        Math.round(
                          (props.row.sold / props.row.available) * 100
                        )
                      }}%
                    </span>
                  </b-table-column>

                  <template slot="detail">
                    details
                  </template>
                </b-table>
              </div>
            </div>
          </div>
        </div>
        <div class="column is-4">
          <div id="TwitchChat" class="card">
            <div class="card-header">
              <h2 class="subtitle">
                <i class="fad fa-comments" style="margin-right:.5rem"></i>
                Chat Feed
              </h2>
            </div>
            <div class="card-body chat-wrapper">
              <iframe
                src="https://www.twitch.tv/embed/0neguy/chat?darkpopout&parent=localhost"
                height="550px"
                width="100%"
              >
              </iframe>
            </div>
          </div>
          <br />
          <LogsFeed />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import StreamerShoutouts from "@/components/StreamerShoutouts";
import SendChatMessage from "@/components/SendChatMessage";
import LogsFeed from "@/components/LogsFeed";
export default {
  name: "Home",
  components: {
    StreamerShoutouts,
    SendChatMessage,
    LogsFeed,
  },
  data() {
    return {
      isLoading: false,
      message: "Hello from the frontend",
      commands: undefined,
      shoutout: undefined,
      data: [
        {
          name: "Sponsor Plug",
          sold: 131,
          available: 301,
          items: [
            {
              name: "Monopoly",
              sold: 57,
              available: 100,
            },
            {
              name: "Scrabble",
              sold: 23,
              available: 84,
            },
            {
              name: "Chess",
              sold: 37,
              available: 61,
            },
            {
              name: "Battleships",
              sold: 14,
              available: 56,
            },
          ],
        },
      ],
      columnsVisible: {
        name: { title: "CRON Name", display: true },
        sold: { title: "Stock Sold", display: true },
        available: { title: "Duration", display: true },
        cleared: { title: "Active", display: true },
      },
      showDetailIcon: true,
    };
  },
  mounted() {
    this.getCommands();
  },
  methods: {
    async getCommands() {
      const { data } = await axios.get("http://localhost:9090/commands");
      this.commands = data;
    },

    fireCommand(command) {
      this.isLoading = true;
      const sendCommand = axios.post(
        `http://localhost:9090/command/${command}`
      );
      sendCommand
        .then(() => (this.isLoading = false))
        .catch(() => (this.isLoading = false));
    },
  },
};
</script>
<style lang="scss">
.hero {
  border-bottom: 2px solid $secondary;
}
.field {
  label.label {
    text-align: left;
  }
}

.card {
  border-radius: 10px;
  background: darken($color: #16163d, $amount: 7);
  border: 1px solid darken($color: #16163d, $amount: 8);
  box-shadow: rgba(9, 9, 10, 0.5) 5px 5px 10px 0px,
    rgba(42, 42, 49, 0.376) -5px -5px 10px 0px;
  color: ghostwhite;
  .card-header {
    padding: 1rem;
    border-bottom: 1px solid $secondary;
    h2 {
      color: ghostwhite;
    }
  }
  .card-body {
    color: ghostwhite;
    padding: 1.5rem;
    &.chat-wrapper {
      padding: 0.75rem;
    }
  }
}
p.help {
  margin-bottom: 1rem;
  font-size: 1rem;
}
iframe {
  overflow: hidden;
  border-radius: 6px;
  border-style: none;
  box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.2);
}
.search {
  border-top-right-radius: 999px;
  border-bottom-right-radius: 999px;
}
.chevron-cell,
svg {
  color: $secondary !important;
}
hr {
  background: $secondary;
  height: 1px;
}
.b-table table {
  border-color: $secondary;
}
.b-table .table th.is-current-sort {
  border-color: $secondary;
}
</style>
