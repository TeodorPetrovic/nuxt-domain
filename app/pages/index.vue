<script setup lang="ts">
interface Post {
  post_id: number;
  title: string;
  content: string;
  faculty_id: number | null;
  name: string | null;
  subdomain: string | null;
}

interface Faculty {
  faculty_id: number;
  name: string;
  subdomain: string;
}

interface PostsResponse {
  posts: Post[];
  faculty: Faculty | null;
}

const { data } = await useFetch<PostsResponse>('/api/posts');
const facultyName = computed(() => data.value?.faculty?.name || null);
const pageTitle = computed(() => {
  return facultyName.value ? `Postovi za fakultet ${facultyName.value}` : 'Svi postovi';
});
</script>

<template>
  <div class="min-h-screen text-slate-100 px-4 py-6 md:px-8">
    <!-- Banner -->
    <header class="rounded-2xl bg-brand px-6 py-6 shadow-lg">
      <div>
        <h1 class="text-sm uppercase tracking-widest text-white/80">
          Postovi
        </h1>

        <h1 class="text-4xl font-extrabold mb-3 text-white">
          {{ pageTitle }}
        </h1>

        <p class="max-w-xl text-white/90" v-if="facultyName">
          Pregledajte postove za {{ facultyName }}
        </p>
        <p class="max-w-xl text-white/90" v-else>
          Pregledajte sve postove sa svih fakulteta
        </p>
      </div>
    </header>

    <!-- Posts -->
    <main>
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 pt-10">
        <article v-for="post in data?.posts" :key="post.post_id" class="relative overflow-hidden rounded-2xl border p-5 shadow-lg text-slate-900">
          <!-- Faculty -->
          <div class="flex items-center gap-2 text-sm mb-3">
            <span class="h-2.5 w-2.5 rounded-full bg-brand" />
            Fakultet:
            <span class="font-semibold">
              {{ post.name || 'Univerzitet' }}
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

          <div class="mt-4 flex gap-2">
            <button class="px-3 py-1.5 rounded-lg text-sm font-medium border transition bg-brand text-white">
             Otvori 
            </button>
            <button class="px-3 py-1.5 rounded-lg text-sm font-medium border transition">
              Deli
            </button>
          </div>
        </article>
      </div>
    </main>
  </div>
</template>