<script setup>
import { computed } from 'vue'
import { RouterView } from "vue-router";
import Loader from "./components/Loader.vue";
import { useStore } from 'vuex'

const store = useStore()

const show = computed(() => store.getters.getLoader)

</script>

<template>
    <header>

    </header>
    <transition name="fade">
      <Loader v-if="show"/>
    </transition>
    <RouterView />
</template>

<style>

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>