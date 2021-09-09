<template>
  <div>
    <ul class="my-5 list-disc">
      <li class="px-4 sm:px-6 bold ">
        Sorteer op
      </li>
      <li class="px-4 sm:px-6 text-sm">
        <button
          :class="{ 'text-blue-400': orderBy == 1 }"
          class="underline text-left"
          @click="setActiveOrderBy(1)">Topic</button>
      </li>
      <li class="px-4 sm:px-6 text-sm">
        <button
          :class="{ 'text-blue-400': orderBy == 0 }"
          class="underline text-left"
          @click="setActiveOrderBy(0)">Status</button>
      </li>
      <li class="px-4 sm:px-6 text-sm">
        <button
          :class="{ 'text-blue-400': orderBy == 2 }"
          class="underline text-left"
          @click="setActiveOrderBy(2)">Verantwoordelijke</button>
      </li>
    </ul>
    <ul class="bg-blue-400">
      <li
        v-for="(t, key) in orderedList"
        :key="`topic-${key}`"
      >
        <div class="px-4 py-5 sm:px-6 sticky top-0 bg-blue-400">
          <h3 class="text-lg text-white leading-6 font-medium ">
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
