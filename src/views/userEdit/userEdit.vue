<template>
  <Breadcrumbs title="Edit Profile" main="Users" />
  <div class="container-fluid">
    <div class="edit-profile">
      <div class="row">
        <sidePage />
        <editProfile />
      </div>
    </div>
  </div>
</template>
<script>
import sidePage from "./sidePage.vue";
import editProfile from "./editProfile.vue";
export default {
  components: {
    sidePage,
    editProfile,
  },
};
</script>
