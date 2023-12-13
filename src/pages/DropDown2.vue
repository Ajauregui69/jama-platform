<!-- <template>
    <div class="dropdown">
                    <button
                      class="btn dropdown-toggle"
                      id="dropdownMenuButton"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="true"
                    >
                      Today
                    </button>
                    <div
                      class="dropdown-menu dropdown-menu-end"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <a class="dropdown-item" href="#">Today</a
                      ><a class="dropdown-item" href="#">Tomorrow</a
                      ><a class="dropdown-item" href="#">Yesterday </a>
                    </div>
                  </div>
</template> -->

<template>
  <div class="dropdown">
    <button
      class="btn dropdown-toggle"
      id="dropdownMenuButton"
      @click="toggleDropdown"
      type="button"
      aria-expanded="true"
    >
      Today
    </button>
    <div
      class="dropdown-menu dropdown-menu-start"
      :class="{ show: isDropdownOpen }"
      aria-labelledby="dropdownMenuButton"
      style="
        position: absolute;
        right: 0;
        transform: translate(-60%, 0);
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
