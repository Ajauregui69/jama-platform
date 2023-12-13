<template>
  <div class="card">
    <div class="card-header" id="headingTwo">
      <h2 class="mb-0">
        <button
          class="btn btn-link btn-block text-start collapsed"
          type="button"
          style="font-weight: bold; font-family: Rubik, sans-serif"
          data-bs-target="#collapseTwo"
          :aria-expanded="active1 ? 'false' : 'true'"
          aria-controls="collapseTwo"
          @click="showOpen1"
        >
          Sort
        </button>
      </h2>
    </div>
    <div
      class="collapse"
      :class="active1 ? '' : 'show'"
      id="collapseTwo"
      aria-labelledby="headingTwo"
      data-bs-parent="#accordionExample"
    >
      <div class="card-body animate-chk">
        <div class="location-checkbox">
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
            <i :class="checkbox.class"></i>
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
      active1: false,
      selectedCheckboxes: [],
      checkboxes: [
        {
          label: "Name ",
          value: "nameAsc",
          class: "fa fa-sort-alpha-asc",
        },
        {
          label: "Name ",
          value: "nameDesc",
          class: "fa fa-sort-alpha-desc",
        },
        {
          label: "Creation Date",
          value: "dateRecent",
          class: "fa fa-sort-numeric-asc",
        },
        {
          label: "Creation Date",
          value: "dateOld",
          class: "fa fa-sort-numeric-desc",
        },
      ],
    };
  },
  watch: {
    selectedCheckboxes: {
      handler: "updateSort",
      deep: true,
    },
  },
  methods: {
    showOpen1() {
      this.active1 = !this.active1;
    },
    updateSort() {
      const statusParams = this.selectedCheckboxes;

      this.$emit("apply-sort", statusParams);
    },
  },
};
</script>
