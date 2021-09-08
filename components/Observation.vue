<template>
  <div>
    {{ observation }}
  </div>
</template>
<script>
export default {
  computed: {
    observation() {
      return this.$store.getters.activeObservation
    }
  }
}
</script>
