<template>
  <div>
    <div>
      <div class="flex flex-col overflow-hidden container mx-auto">


        <div

        >
          <youtube
            :video-id="action.session.videoId"
            :player-vars="{ start: action.session.videoStartTime }"
            class="embed-container m-5"
          />
        </div>
        <div class="flex-1 bg-white p-6 flex flex-col justify-between">
          <div class="flex-1">
            <p class="text-xl text-gray-900">
              <span class="font-semibold">Moment</span>
            </p>

            <p class="text-md text-gray-500 py-2">
              {{ action.action.context }}
            </p>
          </div>
        </div>

        <div class="flex-1 bg-white p-6 flex flex-col justify-between">
          <div class="flex-1">
            <p class="text-xl text-gray-900 pb-5">
              <span class="font-semibold">Halte in wandeling </span>
            </p>
            <ol class="overflow-hidden">

              <li
                v-for="(p, key) in phases"
                :key="`phase-${key}`"
                class="relative pb-10"
              >
                <template v-if="key == action.phase.order">
                  <div
                    v-if="key != Object.keys(phases).length - 1"
                    class="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-gray-300"
                    aria-hidden="true"
                  />
                  <div class="relative flex items-start group">
                    <span class="h-9 flex items-center">
                      <span
                        class="relative z-10 w-8 h-8 flex items-center justify-center rounded-full"
                        style="background-color: #009de0"
                      >
                        <svg
                          class="w-5 h-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </span>
                    </span>
                    <span class="ml-4 min-w-0 flex flex-col">
                      <span
                        class="text-xs font-semibold tracking-wide uppercase"
                      >{{ p.Naam }}</span>
                      <span class="text-sm text-gray-500">{{ p.Beschrijving }}</span>
                    </span>
                  </div>
                </template>
                <template v-else>
                  <!-- Complete Step -->
                  <div
                    v-if="key != Object.keys(phases).length - 1"
                    class="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-gray-300"
                    aria-hidden="true"
                  />
                  <a
                    href="#"
                    class="relative flex items-start group"
                    aria-current="step"
                  >
                    <span
                      class="h-9 flex items-center"
                      aria-hidden="true">
                      <span
                        class="relative z-10 w-8 h-8 flex items-center justify-center bg-white border-2 rounded-full"
                        style="border-color: #009de0"
                      >
                        <span
                          class="h-2.5 w-2.5 rounded-full"
                          style="background-color: #009de0"
                        />
                      </span>
                    </span>
                    <span class="ml-4 min-w-0 flex flex-col">
                      <span
                        class="text-xs font-semibold tracking-wide uppercase"
                      >{{ p.Naam }}</span
                      >
                      <span class="text-sm text-gray-500">{{ p.Beschrijving }}</span>
                    </span>
                  </a>
                </template>
              </li>
            </ol>
            <!--
            <p class="text-xl text-gray-900">
              <span class="font-semibold">Fase:</span> {{ action.phase.order }}.
              {{ action.phase.name }}
            </p>
            <p class="text-md text-gray-500 py-2">{{ action.phase.descr }}</p> -->
          </div>
        </div>

        <div class="flex-1 bg-white p-6 flex flex-col justify-between">
          <div class="flex-1">
            <p class="text-xl text-gray-900">
              <span class="font-semibold">Testpersoon:</span>
              {{ action.user.name }}, {{ action.user.age }} jaar
            </p>
          </div>
        </div>

        <div class="flex-1 bg-white p-6 flex flex-col justify-between">
          <div class="flex-1">
            <p class="text-xl text-gray-900">
              <span class="font-semibold">Persona:</span>
              {{ action.persona.name }}
            </p>
            <p class="text-md text-gray-500 py-2">
              {{ action.persona.descr }}
            </p>
          </div>
        </div>

        <div class="flex-1 bg-white p-6 flex flex-col justify-between">
          <div class="flex-1">
            <p class="text-xl text-gray-900">
              <span class="font-semibold">Uitgevoerd op: </span>
              <time datetime="2020-03-16">{{ action.session.date }}</time>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    action() {
      return this.$store.getters.parsedObservation
    },
    status() {
      return this.$store.state.status
    },
    phases() {
      return this.$store.state.Fases
    }
  }
}
</script>
