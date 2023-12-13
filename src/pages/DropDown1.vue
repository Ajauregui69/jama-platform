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
      class="dropdown-menu dropdown-menu-start"
      :class="{ show: isDropdownOpen }"
      aria-labelledby="incomedropdown"
      style="
        position: absolute;
        left: 0;
        transform: translate(-100%, 0);
        max-height: 200px;
        overflow-y: auto;
      "
    >
      <!-- <a
        v-for="item in dropdownItems"
        :key="item"
        class="dropdown-item"
        :href="item.link"
      >
        {{ item.label }}
      </a> -->
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const isDropdownOpen = ref(false);

const props = defineProps({
  dropdownItems: {
    type: Array,
    default: () => [],
  },
});

const dropdownItems = ref(
  props.dropdownItems.length > 0 ? props.dropdownItems : getDefaultItems()
);

function getDefaultItems() {
  // Valores por defecto si no se proporciona ninguna prop
  return [
    { label: "Today", link: "#" },
    { label: "Tomorrow", link: "#" },
    { label: "Yesterday", link: "#" },
  ];
}

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

<!-- <template>
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
      class="dropdown-menu dropdown-menu-start"
      :class="{ show: isDropdownOpen }"
      aria-labelledby="incomedropdown"
      style="
        position: absolute;
        left: 0;
        transform: translate(-100%, 0);
        max-height: 200px;
        overflow-y: auto;
      "
    >
      <router-link
        v-for="item in dropdownItems"
        :key="item.label"
        class="dropdown-item"
        :to="item.link"
      >
        {{ item.label }}
      </router-link>
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const isDropdownOpen = ref(false);

const props = defineProps({
  dropdownItems: {
    type: Array,
    default: () => [],
  },
});

const dropdownItems = ref(
  props.dropdownItems.length > 0 ? props.dropdownItems : getDefaultItems()
);

function getDefaultItems() {
  // Valores por defecto si no se proporciona ninguna prop
  return [
    { label: "Today", link: "" }, // Cambia "#" a la ruta que deseas
    { label: "Tomorrow", link: "/" }, // Cambia "#" a la ruta que deseas
    { label: "Yesterday", link: "/" }, // Cambia "#" a la ruta que deseas
  ];
}

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
</script> -->
