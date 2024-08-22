<template>
  <section class="banner-section d-middle w-100 p-10">
    <form @submit.prevent="onSearch">
      <div class="search-input d-middle">
        <input
          type="text"
          :required="true"
          v-model="inputValue"
          placeholder="Search movie"
        />
        <span>Search movie</span>
      </div>
      <button type="submit">Search</button>
    </form>
    <div class="container-image-banner">
      <img :src="imageUrl" alt="" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useMoviesStore } from '@/store/movies.store';
import headerImg from '@/assets/images/header-img.svg';

const imageUrl = ref(headerImg);
const inputValue = ref<string>('');
const router = useRouter();
const store = useMoviesStore();

const onSearch = async () => {
  const search = inputValue.value.trim();
  if (search) {
    // Actualiza la búsqueda en el store
    await store.searchMovies(search);
    // Redirigir a la página de resultados si es necesario
    router.push({ name: 'SearchResults' });
  } else {
    // Limpiar la búsqueda y mostrar todas las películas
    await store.getMovies('Batman');
  }
};
</script>

<style scoped lang="scss">
@import "@/components/banner/banner";
</style>
