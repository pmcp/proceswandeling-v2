<template>
  <div
    class="relative h-screen flex overflow-hidden bg-white">
    <Observations-List class="overflow-y-auto w-1/5"/>
    <Observation
      v-if="observation"
      class="overflow-y-auto w-full m-5"
    />
    <div
      v-else
      class="w-full h-full flex justify-center items-center"
    >
      <span class="italic text-blue-500">Selecteer een observatie</span>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  async asyncData({ $content, params, error }) {
    const slug = 'projects/' + params.slug
    const page = await $content(slug)
      .fetch()
      .catch(err => {
        error({ statusCode: 404, message: 'Page not found' })
      })

    return {
      page
    }
  },
  computed: {
    observation() {
      return this.$store.getters.activeObservation
    }
  },
  mounted() {
    this.getData({ spreadSheetId: this.page.sheet })
    // this.getSheet({ spreadSheetId: this.page.sheet, sheet: 'Fases' })
    // this.getSheet({ spreadSheetId: this.page.sheet, sheet: 'Observaties' })
  },
  methods: {
    ...mapActions({
      getData: 'getData'
    })
  }
}
</script>
