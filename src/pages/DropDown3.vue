<!-- <template>
    <div class="dropdown icon-dropdown">
                      <button
                        class="btn dropdown-toggle"
                        id="userdropdown"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i class="icon-more-alt"></i>
                      </button>
                      <div
                        class="dropdown-menu dropdown-menu-end"
                        aria-labelledby="userdropdown"
                      >
                        <a class="dropdown-item" href="#">Weekly</a
                        ><a class="dropdown-item" href="#">Monthly</a
                        ><a class="dropdown-item" href="#">Yearly</a>
                      </div>
                    </div>
</template> -->

<template>
  <div class="dropdown icon-dropdown">
    <button
      class="btn dropdown-toggle"
      id="incomedropdown"
      @click="toggleDropdown"
      type="button"
      aria-expanded="false"
    >
      <i class="icon-more-alt"></i>
    </button>
    <div
      class="dropdown-menu dropdown-menu-end"
      :class="{ show: isDropdownOpen }"
      aria-labelledby="incomedropdown"
      style="
        position: absolute;
        right: 0;
        transform: translate(-20%, 0);
        max-height: 200px;
        overflow-y: auto;
      "
    >
      <a class="dropdown-item" href="#">Today</a>
      <a class="dropdown-item" href="#">Tomorrow</a>
      <a class="dropdown-item" href="#">Yesterday</a>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const isDropdownOpen = ref(false);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const closeDropdownOnOutsideClick = (event) => {
  if (!event.target.closest(".dropdown")) {
    isDropdownOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", closeDropdownOnOutsideClick);
});

onUnmounted(() => {
  document.removeEventListener("click", closeDropdownOnOutsideClick);
});
</script>
