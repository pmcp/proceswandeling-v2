<template>
  <div class="relative">
    <div class="relative bg-gray-800 pb-32">
      <div class="absolute inset-0">
        <img
          class="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1525130413817-d45c1d127c42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=60&&sat=-100"
          alt="">
        <div
          class="absolute inset-0 bg-gray-800 mix-blend-multiply"
          aria-hidden="true"/>
      </div>
      <div class="relative  px-4 py-5 sm:px-6 lg:px-8">
        <Navigation class="mb-5"/>
      </div>
    </div>

    <div
      class="relative flex rounded-2xl shadow-xl mx-8 -mt-32 bg-white">
      <!-- PASSWORD: START -->
      <div
        v-if="!passChecked"
        class="w-full full flex justify-center items-center">
        <FormulateForm
          @submit="checkPass">
          <div
            class="flex-1  p-6 flex flex-col justify-between"
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

        <Observations-List class="relative sticky top-0 h-screen overflow-y-auto overflow-x-hidden w-1/5"/>
        <div
          v-if="observation"
          class="flex relative sticky top-20 w-4/5 py-5">
          <Card class="bg-white  px-5 w-2/3" />
          <div class="h-full w-1/3">
            <Action class=" relative sticky top-5 mr-5"/>
          </div>
        </div>

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
