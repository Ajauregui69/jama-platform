<template>
  <div class="col-xl">
    <div class="card-body">
      <!-- Card Body -->
      <ul class="op nav nav-tabs border-tab" id="top-tab" role="tablist">
        <li class="nav-item">
          <a
            class="nav-link active"
            id="top-policy-tab"
            data-bs-toggle="tab"
            href="#top-policy"
            role="tab"
            aria-controls="top-policy"
            aria-selected="true"
            >Policy</a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            id="scope-top-tab"
            data-bs-toggle="tab"
            href="#top-scope"
            role="tab"
            aria-controls="top-scope"
            aria-selected="false"
            >Scope</a
          >
        </li>
        <li class="nav-item mb-center me-3 ms-auto">
          <router-link
            :to="`/program/edit/${programs.id}`"
            class="btn btn-primary btn"
          >
            Edit Program
          </router-link>
        </li>
      </ul>
      <div class="tab-content" id="top-tabContent">
        <div
          class="tab-pane fade show active"
          id="top-policy"
          role="tabpanel"
          aria-labelledby="top-policy-tab"
        >
          <policy />
        </div>
        <div
          class="tab-pane fade"
          id="top-scope"
          role="tabpanel"
          aria-labelledby="scope-top-tab"
        >
          <scope />
        </div>
        <div
          class="tab-pane fade"
          id="report-btn"
          role="tabpanel"
          aria-labelledby="report-btn-top"
        >
          
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import ProgramDetail from "./programDetail.vue";
import scope from "./scope.vue";
import policy from "./policy/policy.vue";


export default {
  components: {
    ProgramDetail,
    scope,
    policy
  },
  computed:{
    ...mapState({
      programs: (state) => state.programs.program
    })
  }
  
};
</script>

<style>
.op {
  position: relative;
  display: flex;
  flex-direction: row;
  min-width: 0;
  height: 60px;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.5rem;
}
</style>
