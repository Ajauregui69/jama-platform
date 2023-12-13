<template>
  <div class="modal-dialog modal-dialog-scrollable" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <slot name="header"></slot>
        <button class="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body text-start">
        <slot name="body"></slot>
      </div>
      <div class="modal-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
</script>

<style lang="scss">
.modal-dialog {
  width: 1000px;
  max-width: 1000px;

  .modal-content {
    //background-color: blue;
    width: 100%;
    padding: 15px;
  }
}
</style>