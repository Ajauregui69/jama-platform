<template>
  <div class="container-fluid">
    <div class="col-md-12">
      <div class="card-header">
        <h5>Rewards</h5>
      </div>
      <div class="card-body">
        <div class="follow">
          <div v-if="getPrograms.rewards.length > 0" class="row">
            <div class="col-3 text-center">
              <div class="badge badge-success">Low</div>
              <br />
              <span>{{ `$${getPrograms.rewards[3].price}` }}</span>
            </div>
            <div class="col-3 text-center">
              <div class="badge badge-primary">medium</div>
              <br />
              <span>{{ `$${getPrograms.rewards[2].price}` }}</span>
            </div>
            <div class="col-3 text-center">
              <div class="badge badge-warning">High</div>
              <br />
              <span>{{ `$${getPrograms.rewards[1].price}` }}</span>
            </div>
            <div class="col-3 text-center">
              <div class="badge badge-danger">Critical</div>
              <br />
              <span>{{ `$${getPrograms.rewards[0].price}` }}</span>
            </div>
          </div>
          <div v-else>
            <p>Please update your rewards table</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


export default{
  name: "rewardsComponent",
  computed: {
    getPrograms(){
      return this.$store.state.programs
    }
  }
}
</script>
