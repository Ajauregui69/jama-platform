<template>
  <div class="col-md-12">
    <div class="card-header pb-0">
      <h5 class="card-title">Asset</h5>
    </div>
    <div class="card-body">
      <div class="mb-2">
        <label class="form-label" for=""
          >Select tge attack surface of this issue.</label
        >
        <select class="form-select" id="" required="">
          <option selected="" disabled="" value="">*.jamasecurity.com</option>
          <option>gujarat</option>
          <option>UP</option>
          <option>MP</option>
          <option>PUNJAB</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import formValidation from "../../../mixins/formValidation";
export default {
  //mixins: [formValidation],
};
</script>

<style></style>
