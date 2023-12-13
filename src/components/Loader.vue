<template>
  <div class="vue-loader">
    <div class="loader"></div>
  </div>
</template>

<script>
export default {
  name: "Loader",
  data() {
    return {
      isVisible: false
    }
  },
  mounted() {
    document.body.style.overflow = 'hidden'
  },
  beforeUnmount() {
    document.body.style.overflow = 'auto'
  }
}
</script>

<style>
.vue-loader {
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  z-index: 10000;
  top: 0;
  left: 0;
}

.loader {
  display: inline-block;
	width: 80px;
	height: 80px;
	pointer-events: none;
	border: 8px solid #0EEBE1;
	border-bottom-color: transparent;
	border-radius: 50%;
	animation: 1s loader linear infinite;
	position: absolute;
  top: calc(50% - 40px);
  left: calc(50% - 40px);
  z-index: 10001;
}

@keyframes loader {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>