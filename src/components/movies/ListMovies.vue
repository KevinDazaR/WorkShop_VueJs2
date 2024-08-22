<template>
    <h1>Listado de Películas</h1>
      <!-- <div class="container-movies d-middle p-100"> -->
    <div class="container-movies d-middle p-10 w-100" v-if="movies.length > 0">
        <CardMovie
        v-for="movie in movies"
        :key="movie.imdbID"
        :title="movie.Title"
        :year="movie.Year"
        :type="movie.Type"
        :poster="movie.Poster"
        :id="movie.imdbID"
        />
    </div>
    <div class="d-middle w-100" v-else>
        <p>No hay resultados en la búsqueda</p>
    </div>
      <!-- </div> -->
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, watch } from 'vue';
  import { useMoviesStore } from '@/store/movies.store';
  import CardMovie from './CardMovie.vue'; // Asegúrate de que esta ruta sea correcta
  
  const store = useMoviesStore();
  const movies = ref(store.listMovies);
  
  // Cargar las películas de Batman al montar el componente
  onMounted(async () => {
    await store.getMovies('Batman');
  });
  
  // Actualizar la lista de películas cuando cambie en el store
  watch(() => store.listMovies, (newMovies) => {
    movies.value = newMovies;
  }, { immediate: true }); // `immediate` asegura que se ejecute al montar el componente
  </script>
  
  <style scoped lang="scss">
  .container-movies {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
  
  p {
    color: $white;
  }

  h1{
    color: $white;
    text-align: center;
    margin: 10px 0px 10px 0px;
  }
  </style>
  