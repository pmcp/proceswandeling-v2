<template>
  <section class="relative max-w-7xl mx-auto py-10 px-4 sm:py-10 sm:px-6 lg:px-8 mt-5 shadow rounded-xl">
    <Navigation/>
    <div class="bg-white px-4 py-5 border-b border-gray-200 sm:px-6 ">
      <h3 class="text-lg leading-6 font-medium text-gray-600 mb-5">
        Projecten
      </h3>
      <p class="font-medium text-gray-600 text-sm">Phasellus ac rhoncus ex, quis bibendum ipsum. Nullam quis magna vitae diam scelerisque interdum. Praesent vehicula tristique hendrerit. Nunc efficitur tortor gravida turpis aliquam, id pulvinar ex faucibus. Duis nec lectus vel justo congue pharetra. Donec consectetur interdum mauris non interdum. Cras tristique purus a feugiat pellentesque. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed et quam ut libero scelerisque vehicula. Nulla a massa malesuada, lobortis purus eget, vulputate ligula. </p>
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
              <div class="min-w-0 flex-1  md:grid md:grid -cols-2 md:gap-4">
                <div>
                  <div class="flex">
                    <p class="text-sm font-medium text-blue-600 truncate mr-3">{{ p.title }}</p>
                    <Pill>
                      {{ p.Status }}
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
