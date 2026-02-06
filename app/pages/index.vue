<script setup lang="ts">
// const { subdomain, subdomainClass, detectSubdomain, facultyName } = useSubdomain();

// onMounted(() => {
//   detectSubdomain();
// });

const { data, pending, error } = await useFetch('/api/posts');
</script>

<template>
  <div class="min-h-screentext-slate-100 px-4 py-6 md:px-8">
    <!-- Banner -->
    <header>
      <div>
        <h1>
          Posts
        </h1>

        <h1 class="text-4xl font-extrabold mb-3">
          Faculty Feed
        </h1>

        <p class="max-w-xl">
          All posts grouped by faculty — styled only with Tailwind utilities.
        </p>
      </div>
    </header>

    <!-- Posts -->
    <main>
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 pt-10">
        <article v-for="post in data.posts" class="relative overflow-hidden rounded-2xl border p-5 shadow-lg">
          <!-- Faculty -->
          <div class="flex items-center gap-2 text-sm mb-3">
            <span class="h-2.5 w-2.5 rounded-full bg-primary" />
            Faculty ID:
            <span class="font-semibold">
              {{ post.faculty_id }}
            </span>
          </div>

          <!-- Title -->
          <h2 class="text-lg font-bold mb-2">
            {{ post.title }}
          </h2>

          <!-- Content -->
          <p class="text-sm leading-relaxed">
            {{ post.content }}
          </p>

          <!-- Actions -->
          <div class="mt-4 flex gap-2">
            <button class="px-3 py-1.5 rounded-lg text-sm font-medium border transition bg-brand">
              Open
            </button>
            <button class="px-3 py-1.5 rounded-lg text-sm font-medium border transition">
              Share
            </button>
          </div>
        </article>
      </div>
    </main>
  </div>
</template>