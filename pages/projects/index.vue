<template>
  <div>
    <div class="bg-white">
      <!-- Header -->
      <div class="relative pb-32 bg-gray-800">
        <div class="absolute inset-0">
          <img
            class="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1525130413817-d45c1d127c42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=60&&sat=-100"
            alt="">
          <div
            class="absolute inset-0 bg-gray-800 mix-blend-multiply"
            aria-hidden="true"/>
        </div>
        <div class="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <Navigation class="mb-5"/>
          <h1 class="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">Projecten</h1>
        </div>
      </div>

      <section class="-mt-32 max-w-7xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8 bg-white rounded-2xl shadow-xl py-5">
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
    </div>
  </div>

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
