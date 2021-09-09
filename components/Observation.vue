<template>
  <div class="flex ">
    <Card class="w-full"/>
    <Action class="w-1/3 sticky top-5 mr-5"/>
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
