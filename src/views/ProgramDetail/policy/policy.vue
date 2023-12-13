<template>
  <div class="container-fluid">
    <div class="card">
      <div class="row">
        <rewards />
      </div>
    </div>
    <div class="card">
      <div class="row">
        <txt />
      </div>
    </div>
  </div>
</template>

<script>
import rewards from "./rewards.vue";
import txt from "./text.vue";

export default {
  components: {
    rewards,
    txt,
  },
};
</script>
