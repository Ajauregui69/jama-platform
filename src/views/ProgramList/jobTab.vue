<template>
  <div class="col-xl-2 xl-40 box-col-6">
    <div class="md-sidebar">
      <a
        class="btn btn-primary email-aside-toggle md-sidebar-toggle"
        @click="isOpen"
        >Filters</a
      >
      <div
        class="md-sidebar-aside job-sidebar filtro"
        :class="open ? 'open' : ''"
      >
        <div class="default-according style-1 faq-accordion job-accordion">
          <div class="accordion" id="accordionExample">
            <!-- <filterCard /> -->
            <filterCard @apply-filter="applyFilter"></filterCard>

            <sortCard @apply-sort="handleApplySort"></sortCard>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import filterCard from "./filterTab/filterCard.vue";
import sortCard from "./filterTab/sortCard.vue";

export default {
  components: {
    filterCard,
    sortCard,
  },

  methods: {
    isOpen() {
      this.open = !this.open;
    },
    handleApplySort(sortParams) {
      this.$emit("apply-sort", sortParams); // Emitir el evento hacia el componente programs
    },
  },
  data() {
    return {
      open: false,
    };
  },
};
</script>

<style scoped>
.filtro {
  width: 100%;
}
</style>
