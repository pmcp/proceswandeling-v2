<template>
  <div
    class="relative h-screen flex overflow-hidden bg-white">
    <Observations-List class="overflow-y-auto flex-0 "/>
    <Observation class="overflow-y-auto flex-1 "/>
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
