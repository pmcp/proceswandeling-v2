<template>
  <div>
    {{ page }}
  </div>
</template>
<script>
export default {
  async asyncData({ $content, params, error }) {
    const slug = params.slug || 'index'
    console.log($content)
    const page = await $content(slug)
      .fetch()
      .catch(err => {
        console.log(err)
        error({ statusCode: 404, message: 'Page not found' })
      })

    return {
      page
    }
  }
}
</script>
