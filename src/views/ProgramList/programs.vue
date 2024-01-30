<script>
import { mapState } from "vuex";
import { useLoading } from "vue3-loading-overlay";
import store from "../../store";
import DropDown1 from "../../pages/DropDown1.vue";
import axios from "axios";
import jobtab from "./jobTab.vue";

export default {
  data() {
    return {
      activeSort: null,
      programs: [],
      currentPage: 1,
      isLoading: false,
      lastPage: null,
      url: null,
    };
  },
  components: {
    jobtab,
    DropDown1,
  },
  async mounted(){
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy(){
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleApplySort(sortType) {
      this.activeSort = sortType; // Actualiza el tipo de ordenamiento activo
    },
    sortByType(list, sortType) {
      return list.sort((a, b) => {
        if (sortType === "nameAsc") {
          return a.name.localeCompare(b.name); // Orden alfabético ascendente por nombre
        } else if (sortType === "nameDesc") {
          return b.name.localeCompare(a.name); // Orden alfabético descendente por nombre
        } else if (sortType === "dateRecent") {
          return new Date(b.created_at) - new Date(a.created_at); // Orden por fecha más reciente
        } else if (sortType === "dateOld") {
          return new Date(a.created_at) - new Date(b.created_at); // Orden por fecha más antigua
        } else {
          return 0; // No ordenar si el tipo no coincide
        }
      });
    },
    badgeClass(status) {
      if (status === "review") {
        return "badge badge-info";
      } else if (status === "published") {
        return "badge badge-success";
      } else {
        return "badge badge-danger"; // Clase por defecto
      }
    },
    decodeHTML(html) {
      let txt = document.createElement("textarea");

      txt.innerHTML = html;

      return txt.value;
    },
    htmlParser(data) {
      return this.decodeHTML(data);
    },
    formattedDate(dateString) {
      const date = new Date(dateString);
      const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      };
      return date.toLocaleString("en-EN", options);
    },
    async handleScroll() {
      const scrollPosition = window.innerHeight + window.scrollY; 
      // console.log(scrollPosition);
      // console.log(document.body.offsetHeight);
      // console.log(this.isLoading);
      setTimeout(() => {
            this.isLoading = false;  
            store.dispatch("setHideLoader");
      }, 1500);
      if (scrollPosition >= (document.body.offsetHeight-10) && !this.isLoading) {
        await this.loadMorePrograms();
      }
    },
    async loadMorePrograms() {
      if (this.currentPage < this.lastPage && !this.isLoading) {
        this.isLoading = true;
        store.dispatch("setShowLoader");
        this.currentPage++;
        await this.fetchNextPage(this.currentPage);

      }
    },
    async fetchNextPage(page) {
      await store.dispatch("programs/index", `current_page=${this.currentPage}&${this.url}`);
    },
    toggle() {},
    unpublish_alert: function (id) {
      this.$swal({
        text: "Are you sure you want to Unpublish?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes!",
        confirmButtonColor: "#4466f2",
        cancelButtonText: '<span style="color: #ffffff ;">Cancel!</span>',
        cancelButtonColor: "#cb3234",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          const apiUrl = `${
            import.meta.env.VITE_API_JAMA
          }/programs/status/${id}`;
          axios
            .put(apiUrl /* Tu cuerpo de solicitud aquí */)
            .then((response) => {
              // Aquí puedes manejar la respuesta exitosa si lo deseas
              if (response.status === 200) {
                this.$swal.fire(
                  "Unpublished!",
                  "Your program has been Unpublished.",
                  "success"
                );
                // Recargar la página después de 1 segundo (puedes ajustar el tiempo)
                store.dispatch("programs/index");
              }
              // Mostrar el mensaje de éxito con SweetAlert2
            })
            .catch((error) => {
              // Aquí puedes manejar el error si ocurre
              console.error("API error:", error);

              // Mostrar el mensaje de error con SweetAlert2
              this.$swal.fire(
                "Error",
                "An error occurred while unpublishing.",
                "error"
              );
            });
        }
      });
    },
    publish_alert: function (id) {
      this.$swal({
        text: "Are you sure you want to Publish?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes!",
        confirmButtonColor: "#4466f2",
        cancelButtonText: '<span style="color: #ffffff ;">Cancel!</span>',
        cancelButtonColor: "#cb3234",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          const apiUrl = `${
            import.meta.env.VITE_API_JAMA
          }/programs/status/${id}`;
          axios
            .put(apiUrl /* Tu cuerpo de solicitud aquí */)
            .then((response) => {
              // Aquí puedes manejar la respuesta exitosa si lo deseas
              if (response.status === 200) {
                this.$swal.fire(
                  "Published!",
                  "Your program has been Published.",
                  "success"
                );
                // Recargar la página después de 1 segundo (puedes ajustar el tiempo)
                store.dispatch("programs/index");
              }
              // Mostrar el mensaje de éxito con SweetAlert2
            })
            .catch((error) => {
              // Aquí puedes manejar el error si ocurre
              console.error("API error:", error);

              // Mostrar el mensaje de error con SweetAlert2
              this.$swal.fire(
                "Error",
                "An error occurred while Publishing.",
                "error"
              );
            });
        }
      });
    },
  },
  computed: {
    ...mapState({
      programsList: (state) => state.programs.programs,
      meta: (state) => state.programs.meta.last_page,
    }),
    sortedPrograms() {
      if (this.programs.length === 0) {
        this.lastPage = this.meta;
      }
              
      this.programs = this.programs.concat(this.programsList);
      console.log("--------programsList")
      console.log(this.programsList)
      console.log("-------------Programs")
      console.log(this.programs)
      console.log(this.activeSort)
      
      if (this.activeSort === null) {
        return this.programs;
      }

      
      let sortedList = this.programs.slice();

      // Obtenemos un array de los valores de los sort activos
      const activeSorts = Object.values(this.activeSort);

      // Aplicamos cada tipo de ordenamiento en secuencia
      activeSorts.forEach((sortType) => {
        sortedList = this.sortByType(sortedList, sortType);
      });

      return sortedList;
    },
  },

  beforeRouteEnter(to, from, next) {
    store.dispatch("setShowLoader");
    store.dispatch("programs/index", to.query.q);
    store.dispatch("setHideLoader");

    next();
  },
  async beforeRouteUpdate(to, from, next) {
    store.dispatch("setShowLoader");
    this.currentPage = 1;
    this.url = to.query.q;
    await store.dispatch("programs/index", `current_page=${this.currentPage}&${to.query.q}`);
    console.log("------jejejejeejeje")
    this.programs = [];
    store.dispatch("setHideLoader");
    next();
  },
};
</script>
<template>
  <Breadcrumbs title="Programs" main="Program" />
  <div class="col-md-12 project-list">
    <div class="row">
      <div class="col-md-6 d-flex">
        <ul
          class="nav nav-tabs border-tab"
          id="top-tab"
          role="tablist"
          v-for="(item, index) in tab"
          :key="index"
        >
          <li class="nav-item">
            <a
              class="nav-link"
              :class="{ active: item.active }"
              id="top-home-tab"
              data-bs-toggle="tab"
              href="javascript:void(0)"
              role="tab"
              aria-controls="top-home"
              :aria-selected="item.active ? 'true' : 'false'"
              @click.prevent="active(item)"
              ><vue-feather :type="item.icon"></vue-feather>{{ item.name }}</a
            >
          </li>
        </ul>
      </div>
      <div class="col-md-6">
        <div class="form-group mb-0 me-0"></div>
        <router-link class="btn btn-primary" to="/program/create">
          <vue-feather class="me-1" type="plus-square"> </vue-feather>Create New
          Program</router-link
        >
      </div>
    </div>
  </div>

  <div class="container-fluid">
    <div class="row">
      <jobtab @apply-sort="handleApplySort"></jobtab>

      <div class="col-xl-10 xl-60 text-start">
        <div
          class="card"
          v-for="(program, index) in sortedPrograms"
          :key="index"
        >
          <div class="job-search">
            <div class="card-body program">
              <div class="card-header-right-icon program-dropdown">
                <DropDown1>
                  <router-link
                    :to="`/program/edit/${program.id}`"
                    class="dropdown-item"
                    >Edit</router-link
                  >
                  <Button
                    class="dropdown-item"
                    v-if="
                      `${program.status}` === 'unpublished' ||
                      `${program.status}` === 'review'
                    "
                    v-on:click="publish_alert(`${program.id}`)"
                    >Publish</Button
                  >
                  <Button
                    class="dropdown-item"
                    v-else
                    v-on:click="unpublish_alert(`${program.id}`)"
                    >Unpublish</Button
                  >
                </DropDown1>
              </div>
              <div class="media">
                <div class="image">
                  <img
                    class="img-70 img-fluid m-r-20"
                    :style="{
                      'background-image': `url(${program.photo})`,
                    }"
                    alt=""
                  />
                </div>

                <div class="media-body">
                  <h6 class="f-w-600">
                    <router-link
                      class="titleProgram"
                      :to="`/program/detail/${program.id}`"
                      >{{ program.name }}</router-link
                    >
                    <span :class="badgeClass(`${program.status}`)">{{
                      program.status
                    }}</span>
                  </h6>
                  <span v-html="formattedDate(program.created_at)"></span>
                  <span
                    class="description trunc"
                    v-html="htmlParser(program.description)"
                  ></span>
                  <span class="badge badge-warning">{{
                      program.company.company_name
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.trunc {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

.job-search {
  .program-dropdown {
    position: absolute;
    right: 40px;
    max-width: 100%;
  }

  img {
    background-size: cover;
    background-position: center;
    height: 70px;
    border-radius: 50%;
  }

  .titleProgram {
    padding-right: 10px; // Ajusta el valor según el espacio que desees
    padding-bottom: 5px;
    /* Otros estilos que desees aplicar al span */
  }

  .media {
    display: flex;
    align-items: center; /* Alinear los elementos en la parte superior */
    justify-content: center;
    gap: 10px; /* Espacio entre los elementos */
  }

  .image {
    flex: 0 0 auto; /* El elemento de imagen no se expandirá */
  }

  .media-body {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto; /* El cuerpo se expandirá para llenar el espacio restante */
    width: calc(100% - 100px);
  }

  .badge-warning {
    width: auto;
    font-size: 12px;
    align-self: flex-end;
  }

  .description {
    max-width: 100%;
    overflow-wrap: break-word;
    // word-break: break-all;
  }

  @media (max-width: 768px) {
    .media {
      flex-direction: column; /* Cambiar a un diseño en columna en pantallas pequeñas */
    }
    .image {
      order: 1; /* Cambiar el orden de la imagen */
    }
    .media-body {
      order: 2; /* Cambiar el orden del cuerpo de los medios (título y estado) */
      flex-basis: auto;
    }
    .description {
      order: 3; /* Mantener el orden de la descripción */
    }
  }
  // .options-dropdown {
  //   border: 1px solid black;
  //   position: absolute;
  //   right: 0;
  //   a {
  //     padding: 10px;
  //   }
  //   a:nth-last-child(1) {
  //     border-top: 1px solid black;
  //   }
  // }
}
</style>
