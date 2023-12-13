<script setup></script>
<template>
  <div class="col-xxl-4 col-sm-6 box-col-6">
    <div class="col-xl-12 pb-0">
      <div class="card">
        <div class="card-header card-no-border">
          <div class="header-top">
            <h5>Users this month</h5>
          </div>
        </div>
        <div class="card-body">
          <ul class="user-list">
            <li>
              <div class="user-icon primary">
                <div class="user-box">
                  <vue-feather
                    class="font-primary"
                    type="user-plus"
                  ></vue-feather>
                </div>
              </div>
              <div>
                <h5 class="mb-2">178,098</h5>
                <span class="font-primary d-flex align-items-center"
                  ><i class="icon-arrow-up icon-rotate me-1"> </i
                  ><span class="f-w-500">+30.89</span></span
                >
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user-list {
  li {
    flex-direction: column;
    gap: 0;
    column-count: 1;
  }
}
</style>
