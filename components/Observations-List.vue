<template>
  <div>
    <button
      v-if="activeList == 0"
      class="px-4 py-5 sm:px-6 text-sm underline"
      @click="switchList(1)">Sorteer op Topic</button>
    <button
      v-if="activeList == 1"
      class="px-4 py-5 sm:px-6 text-sm underline"
      @click="switchList(0)">Sorteer op Status</button>
    <ul class="bg-blue-400">
      <li
        v-for="(t, key) in list"
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
import { mapGetters } from 'vuex'

export default {
  data: function() {
    return {
      activeList: 0
    }
  },
  computed: {
    ...mapGetters({
      Topics: 'ObservationsPerTopic',
      Status: 'ObservationsPerStatus'
    }),
    list() {
      if (this.activeList == 0) {
        return this.Status
      } else {
        return this.Topics
      }
    }
  },
  mounted() {
    this.list = this.Topics
  },
  methods: {
    switchList(list) {
      this.activeList = list
    }
  }
}
</script>
