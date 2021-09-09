<template>
  <FormulateForm
    v-model="actionForm"
    @submit="handleForm">
    <div
      class="flex-1  p-6 flex flex-col justify-between rounded border-2 bg-blue-100"
    >
      <div class="flex-1 pt-4 flex flex-col justify-between font-light">
        <div class="flex-1">
          <FormulateInput
            type="textarea"
            name="text"
          >
            <template #label="{ id }">
              <div>
                <span class="font-semibold">Actie: </span>
              </div>
            </template>
          </FormulateInput>
        </div>
      </div>
      <div class="flex-1 pt-4 flex flex-col justify-between font-light">
        <div class="flex-1">
          <FormulateInput
            type="text"
            name="owner"
          >
            <template #label="{ id }">
              <div>
                <span class="font-semibold">Toegewezen aan: </span>
              </div>
            </template>
          </FormulateInput>
        </div>
      </div>

      <div class="flex-1 pt-4 flex flex-col justify-between font-light">
        <div class="flex-1">
          <FormulateInput
            type="text"
            name="owner"
          >
            <template #label="{ id }">
              <span class="font-semibold">Status: </span>
            </template>
          </FormulateInput>
        </div>
      </div>
      <FormulateInput
        :disabled="status != 0"
        :wrapper-class="['btn']"
        type="submit"
      >
        <template>
          <div>
            <span v-if="status === 0">Opslaan</span>
            <span v-else-if="status === 1">Even geduld...</span>
            <span v-else-if="status === 2">Verstuurd!</span>
          </div>
        </template>
      </FormulateInput>
    </div>
  </FormulateForm>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data: function() {
    return {
      actionForm: {}
    }
  },
  computed: {
    observation() {
      return this.$store.getters.activeObservation
    },
    status() {
      return this.$store.state.status
    },
    activeObservationId() {
      return this.$store.state.activeObservationId
    }
  },
  watch: {
    activeObservationId: function(val) {
      console.log(this.observation)
      this.actionForm = {
        text: this.observation['Actie'],
        owner: this.observation['Verantwoordelijke'],
        status: this.observation['Status']
      }
    }
  },
  methods: {
    ...mapActions({
      sendFormData: 'sendFormData'
    }),
    handleForm(data) {
      this.sendFormData({ data, observation: this.observation })
    }
  }
}
</script>
