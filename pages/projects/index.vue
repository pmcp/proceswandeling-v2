<template>
  <section>
    <div class="bg-white px-4 py-5 border-b border-gray-200 sm:px-6 ">
      <h3 class="text-lg leading-6 font-medium text-gray-900 mb-5">
        Projecten
      </h3>
    </div>
    <ul
      role="list"
      class="divide-y divide-gray-200">
      <li
        v-for="(p, key) in projects"
        :key="`project-${key}`">

        <nuxt-link
          :to="`projects/${p.slug}`"
          class="block hover:bg-gray-50">
          <div class="flex items-center px-4 py-4 sm:px-6">
            <div class="min-w-0 flex-1 flex items-center">
              <div class="min-w-0 flex-1  md:grid md:grid-cols-2 md:gap-4">
                <div>
                  <div class="flex">
                    <p class="text-sm font-medium text-blue-600 truncate mr-3">{{ p.title }}</p>
                    <Pill>
                      {{ p.category }}
                    </Pill>
                  </div>

                  <p class="mt-2 flex items-center text-sm text-gray-500">
                    {{ p.description }}
                  </p>
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
        </nuxt-link>
      </li>
    </ul>
  </section>
</template>
<script>
export default {
  async asyncData({ $content, params }) {
    const projects = await $content('projects', params.slug).fetch()
    return {
      projects
    }
  }
}
</script>
