<template>
  <div
    :class="{ 'bg-blue-100 hover:bg-blue-100': isActive }"
    class="block hover:bg-blue-50 bg-white cursor-pointer"
    @click="setActiveObservation(id -1)">
    <div class="flex items-center px-4 py-4 sm:px-6">
      <div class="min-w-0 flex-1 flex items-center">
        <div>
          <div class="flex flex-col">
            <p class="text-sm font-medium text-blue-600 truncate pb-2">{{ card.opmerking }}</p>
            <Pill>
              {{ card.status }}
            </Pill>
          </div>
        </div>

      </div>
      <div>
        <!-- Heroicon name: solid/chevron-right -->
        <svg
          class="h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true">
          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd" />
        </svg>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  props: {
    id: {
      type: Number,
      default: function() {
        return -1
      }
    }
  },
  computed: {
    isActive() {
      return this.id === this.$store.state.activeObservationId
    },
    card() {
      if (this.id === -1) return
      console.log('the id', this.id)
      const card = this.$store.state.Observaties[this.id - 1]

      let status = 'Niet bepaald'
      if (typeof card.Status != 'undefined') {
        if (card.Status !== '') {
          status = card.Status
        }
      }
      return { opmerking: card.Opmerking, status }
    }
  },
  methods: {
    ...mapActions({
      setActiveObservation: 'setActiveObservation'
    })
  }
}
</script>
