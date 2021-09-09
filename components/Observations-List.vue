<template>
  <div class="pb-20">
    <div class="px-5 ">
      <FormulateInput
        :options="ObservationsListSortOptions"
        type="select"
        placeholder="Selecteer"
        @input="setActiveOrderBy">
        <template #label="{ id }">
          <div class="pb-2">
            <span class="font-semibold">Sorteer: </span>
          </div>
        </template>
      </FormulateInput>
    </div>
    <ul class="bg-blue-400">
      <li
        v-for="(t, key) in orderedList"
        :key="`topic-${key}`"
      >
        <div class="px-4 py-2 sm:px-6 uppercase sticky top-0 bg-blue-400">
          <h3 class="text-sm text-white leading-6 ">
            {{ key }}
          </h3>
          <p class="text-white text-sm italic">
            {{ t.description }}
          </p>
        </div>
        <ul
          role="list"
          class="divide-y divide-gray-200">
          <li
            v-for="(c, key) in t.cards"
            :key="`card-${key}`">
            <Observation-In-List
              :id="c"
              @click="setActiveObservation(c)"/>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    orderBy() {
      return this.$store.state.activeOrderByOption
    },
    ObservationsListSortOptions() {
      return this.$store.getters.ObservationsListSortOptions
    },
    ...mapGetters({
      orderedList: 'ObservationsOrderedBy'
    })
  },
  methods: {
    ...mapActions({
      setActiveOrderBy: 'setActiveOrderBy'
    })
  }
}
</script>
