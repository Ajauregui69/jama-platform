<template>
    <div class="col-md-12">
        <div class="card-header pb-0">
          <h5 class="card-title">Weakness</h5>
        </div>
        <div class="card-body">
          <div class="col-mb-2">
            <label class="form-label" for="">Select the type of the potential issue you have discovered. Can't pick just one? Select the <br> best match or submit a separate report for each distinct weakness.</label>
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
  import formValidation from "../../../mixins/formValidation"
  export default {
      mixins: [formValidation],
  }
  </script>

<style></style>