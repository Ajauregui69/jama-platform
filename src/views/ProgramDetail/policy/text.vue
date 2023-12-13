<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-12">
        <div class="card">
          <div class="card-header">
            <h5>Policy</h5>
          </div>
          <div class="card-body">
            <div v-html="htmlParser(program.description)">
            </div>
            <div v-html="htmlParser(program.requirements)">
            </div>
            <div v-html="htmlParser(program.out_scope)">
            </div>
            <h3>Vulnerabilities in scope</h3>
            <ul class="list-group">
              <li v-for="(v, $v) in vulnerabilities" :key="$v" class="list-group-item list-group-item-action flex-column align-items-start">
                <h6 >{{ v.name }}</h6>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      program: (state) => state.programs.program,
      vulnerabilities: (state) => state.programs.selectedVulns
    }),

  }
  , methods: {
    decodeHTML(html) {
      let txt = document.createElement("textarea");

      txt.innerHTML = html;

      return txt.value;
    },
    htmlParser(data) {
      return this.decodeHTML(data);
    }
  }

};
</script>
