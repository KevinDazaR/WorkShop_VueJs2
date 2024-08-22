<template>
  <div v-if="movie" class="movie-details">
    <h1>{{ movie.Title }}</h1>
    <img :src="movie.Poster" alt="Poster" />
    <p><strong>Año:</strong> {{ movie.Year }}</p>
    <p><strong>Tipo:</strong> {{ movie.Type }}</p>
    <p><strong>IMDB ID:</strong> {{ movie.imdbID }}</p>
    <p v-if="movie.Plot"><strong>Plot:</strong> {{ movie.Plot }}</p>
    <router-link to="/">Volver a la búsqueda</router-link>
  </div>
  <div v-else>
    <p>Cargando...</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useMoviesStore } from '@/store/movies.store';

const route = useRoute();
const movieId = route.params.id as string;
const movie = ref<any>(null);
const store = useMoviesStore();

onMounted(async () => {
  try {
    movie.value = await store.getMovieById(movieId);
    console.log('Movie details:', movie.value); // Para depuración
  } catch (error) {
    console.error('Error fetching movie details:', error);
  }
});
</script>

<style scoped>
.movie-details {
  text-align: center;
  margin: 20px;
}

img {
  max-width: 300px;
  border-radius: 8px;
}

p {
  font-size: 18px;
  margin: 10px 0;
}
</style>
