<template>
  <div>
    {{ page }}
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  async asyncData({ $content, params, error }) {
    const slug = 'pages/' + params.slug
    const page = await $content(slug)
      .fetch()
      .catch(err => {
        error({ statusCode: 404, message: 'Page not found' })
      })

    return {
      page
    }
  }
}
</script>
