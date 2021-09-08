<template>
  <ul class="">
    <li
      v-for="(t, key) in Topics"
      :key="`topic-${key}`"
      class="mb-10"
    >
      <div class="bg-white px-4 py-5 sm:px-6 sticky top-0">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          {{ key }}
        </h3>
        <p class="text-sm italic">
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
