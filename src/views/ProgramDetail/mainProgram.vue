<template>
  <Breadcrumbs :title="program.name" :main="'Programs'" />
  <div class="container-fluid">
    <div class="user-profile">
      <div class="row">
        <ProgramDetail/>
        <simplePage/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ProgramDetail from "./programDetail.vue";
import simplePage from "./simplePage.vue";

import store from "../../store/";

export default {
  components: {
    ProgramDetail,
    simplePage,
  },

  computed: {
    ...mapState({
      program: (state) => state.programs.program,
    }),
  },

  beforeRouteEnter(to, from, next) {
    store.dispatch("programs/show", to.params.id);
    next();
  },
};
</script>

<style scoped></style>
