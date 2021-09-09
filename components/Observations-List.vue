<template>
  <ul class="bg-blue-400">
    <li
      v-for="(t, key) in Topics"
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
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      Topics: 'ObservationsPerTopic'
    })
  }
}
</script>
