<!-- <template>
  <div class="card">
    <div class="card-header" id="headingOne">
      <h2 class="mb-0">
        <button
          class="btn btn-link btn-block text-start"
          type="button"
          data-bs-target="#collapseOne"
          style="font-weight: bold; font-family: Rubik, sans-serif"
          :aria-expanded="active ? 'false' : 'true'"
          aria-controls="collapseOne"
          @click="showOpen"
        >
          Filters
        </button>
      </h2>
    </div>
    <div
      class="collapse"
      :class="active ? '' : 'show'"
      id="collapseOne"
      aria-labelledby="headingOne"
      data-bs-parent="#accordionExample"
    >
      <div class="card-body animate-chk">
        <div class="checkbox-animated m-0">
          <label class="d-block" for="chk-ani">
            <input
              class="checkbox_animated"
              id="chk-ani"
              type="checkbox"
              v-model="selectedCheckboxes"
              value="review"
            />Review
          </label>
          <label class="d-block" for="chk-ani2">
            <input
              class="checkbox_animated"
              id="chk-ani2"
              type="checkbox"
              v-model="selectedCheckboxes"
              value="published"
            />Publish
          </label>
          <label class="d-block" for="chk-ani3">
            <input
              class="checkbox_animated"
              id="chk-ani3"
              type="checkbox"
              v-model="selectedCheckboxes"
              value="unpublished"
            />Unpublished
          </label>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: false,
      selectedCheckboxes: [],
    };
  },
  watch: {
    selectedCheckboxes: {
      handler: "updateURL",
      deep: true,
    },
  },
  methods: {
    showOpen() {
      this.active = !this.active;
    },
    updateURL() {
      const statusParams = this.selectedCheckboxes
        .map((checkbox) => `status[]=${encodeURIComponent(checkbox)}`)
        .join("&");
      const newQuery = "?" + statusParams;
      this.$router.replace({ query: { q: statusParams } });
    },
    updateQueryParams(value, index) {
      this.$router.push({ query: { q: `status[]=${index}` } });

      if (value === false) {
        this.$router.push({ query: { q: "" } });
      }
    },
  },
};
</script> -->

<template>
  <div class="card">
    <div class="card-header" id="headingOne">
      <h2 class="mb-0">
        <!-- Botón para activar/desactivar el colapso -->
        <!-- :area-expanded sirve para Accesibilidad: Indica si el colapso está abierto o cerrado -->
        <!-- @click="toggleCollapse" es un Manejador para abrir/cerrar el colapso -->
        <button
          class="btn btn-link btn-block text-start"
          type="button"
          style="font-weight: bold; font-family: Rubik, sans-serif"
          :aria-expanded="!active"
          aria-controls="collapseOne"
          @click="toggleCollapse"
        >
          Filters
        </button>
      </h2>
    </div>
    <!-- Colapso que contiene las opciones de filtro -->
    <div
      class="collapse"
      :class="{ show: active }"
      id="collapseOne"
      aria-labelledby="headingOne"
    >
      <div class="card-body animate-chk">
        <div class="checkbox-animated m-0">
          <!-- Ciclo para generar opciones de checkbox -->
          <label
            v-for="(checkbox, index) in checkboxes"
            :key="checkbox.value"
            class="d-block"
          >
            <input
              class="checkbox_animated"
              :id="'chk-ani' + index"
              type="checkbox"
              v-model="selectedCheckboxes"
              :value="checkbox.value"
            />
            {{ checkbox.label }}
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: true, // Estado del colapso (abierto/cerrado)
      selectedCheckboxes: [], // Almacena los valores de los checkboxes seleccionados
      checkboxes: [
        // Opciones de los checkboxes con etiquetas y valores
        { label: "Review", value: "review" },
        { label: "Publish", value: "published" },
        { label: "Unpublish", value: "unpublished" },
      ],
    };
  },
  watch: {
    selectedCheckboxes: {
      handler: "updateURL", // Llama al método updateURL cuando cambia selectedCheckboxes
      deep: true,
    },
  },
  methods: {
    toggleCollapse() {
      // Alterna el estado del colapso (abierto/cerrado)
      this.active = !this.active;
    },
    updateURL() {
      // Actualiza la URL con los parámetros de estado seleccionados
      const statusParams = this.selectedCheckboxes
        .map((checkbox) => `status[]=${encodeURIComponent(checkbox)}`)
        .join("&");
      const newQuery = "?" + statusParams;
      this.$router.replace({ query: { q: statusParams } });
    },
  },
};
</script>
