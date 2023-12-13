<template>
  <li class="onhover-dropdown">
    <div class="notification-box" @mouseover="removeDiv()">
      <svg>
        <use href="@/assets/svg/icon-sprite.svg#notification"></use>
      </svg>
      <span class="badge rounded-pill badge-secondary" v-show="!hideBadge">
        {{ showDiv(replies.replys) }}
      </span>
  </div>
    <div
      class="notification-dropdown onhover-show-div"
      :class="{ active: notification }"
    >
      <h6 class="f-18 mb-0 dropdown-title">Notitications</h6>
      <ul class="message-list">
        <div v-for="(replies, index) in replies.replys" :key="index">
          <li class='b-l-primary border-4' @click="changeRoute(replies.report_id)">
            <p style="font-weight: bold;">{{`${
                  replies.type === "reply"
                      ? "New message from " + replies.sender
                      : "New report from " + replies.sender
                }`}}
              <span class="font-danger">{{ formattedDate(replies.created_at)}}</span>
            </p>
            <span class="message">{{ replies.message }}</span>
          </li>
          <br/>
        </div>
      </ul>
    </div>
  </li>
</template>

<script>
  import { mapState } from "vuex";
  import axios from "axios";

  export default {
    name: 'Notifications',
    data() {
      return {
        hideBadge: false,
        // Otros datos iniciales
      };
    },
    computed: {
      ...mapState({
        replies: (state) => state.reports.reportReply,
      })
    },
    beforeMount() {
      this.$store.dispatch("reports/reply");
    },

    created() {
       this.$socket.on('notification', (data) => {
          this.$store.dispatch("reports/reply");
          this.hideBadge = false;
        });
    },

    methods: {

      changeRoute(id) {
        this.$router.push(`/reports/all/report/${id}`);
      },

      formattedDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const timeDifference = now - date;

        // 1 hora en milisegundos
        const oneHour = 60 * 60 * 1000;

        if (timeDifference >= oneHour && timeDifference < 24 * oneHour) {
          // Si la diferencia de tiempo es mayor o igual a 1 hora y menor a 24 horas, mostrar las horas
          const hoursPassed = Math.floor(timeDifference / oneHour);
          return `${hoursPassed} ${hoursPassed === 1 ? "hour" : "hours"} ago`;
        } else if (timeDifference >= 24 * oneHour) {
          // Si la diferencia de tiempo es mayor o igual a 24 horas, mostrar la fecha y hora completa
          const options = {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          };
          return date.toLocaleString("en-EN", options);
        } else {
          // Si la diferencia de tiempo es menor a 1 hora, mostrar los minutos
          const minutesPassed = Math.floor(timeDifference / (60 * 1000));
          return `${minutesPassed} ${minutesPassed === 1 ? "minute" : "minutes"} ago`;
        }
      },

      showDiv(data) {
        if(data){
          let cont = 0;
          for(let i = 0; i < data.length ; i++){
            if(data[i].status === "active"){
              cont += 1;
            }
          }
          if (cont == 0){
            this.hideBadge = true;
          }
          else{
            return cont
          }
        }
      },

      removeDiv() {
        if(this.hideBadge === false){
          axios
          .put(`${import.meta.env.VITE_API_CLIENT}/reply/`)
          .catch((e) => {
            console.log(e);
          });
        }
        this.hideBadge = true;
      }

    },
  };
</script>

<style lang="scss" scoped>

.message-list {
  max-height: 70vh; /* Ajusta la altura máxima como desees */
  overflow-y: auto; /* Agrega una barra de desplazamiento vertical cuando sea necesario */
}

.message{
  max-width: 100%;
  overflow-wrap: break-word;
}

</style>
