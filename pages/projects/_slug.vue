<template>
  <div class="relative">
    <Navigation class=" z-10 sticky top-5"/>

    <div
      class="relative flex ">

      <!-- PASSWORD: START -->
      <div
        v-if="!passChecked"
        class="w-full full flex justify-center items-center">
        <FormulateForm
          @submit="checkPass">
          <div
            class="flex-1  p-6 flex flex-col justify-between bg-blue-100"
          >
            <div class="flex-1 pt-4 flex flex-col justify-between font-light">
              <div class="flex-1">
                <FormulateInput
                  type="text"
                  name="pass"
                >
                  <template #label="{ id }">
                    <div>
                      <span class="font-semibold">Paswoord voor dit project:</span>
                    </div>
                  </template>
                </FormulateInput>
              </div>
            </div>
            <FormulateInput
              type="submit"
            >
              <template>
                <div>
                  Doorgaan
                </div>
              </template>
            </FormulateInput>
          </div>
        </FormulateForm>
      </div>
      <!-- PASSWORD: END -->
      <template v-if="passChecked">

        <Observations-List class="relative sticky top-20  h-screen overflow-hidden overflow-y-auto overflow-x-hidden w-1/5 mx-5 "/>
        <Observation
          v-if="observation"
          class="bg-white overflow-y-auto p-5 mt-20"
        />
        <div
          v-else
          class="w-full h-full flex justify-center items-center"
        >
          <span class="italic text-blue-500">Selecteer een observatie</span>
        </div>
      </template>
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
  data: function() {
    return {
      passChecked: false
    }
  },
  computed: {
    observation() {
      return this.$store.getters.activeObservation
    }
  },
  mounted() {
    this.setActiveProject(this.page)
  },
  methods: {
    ...mapActions({
      getData: 'getData',
      setActiveProject: 'setActiveProject'
    }),
    checkPass(data) {
      if (data.pass == this.page.password) {
        this.getData({ spreadSheetId: this.page.sheet })
        this.passChecked = true
      } else {
        this.passChecked = false
      }
    }
  }
}
</script>
