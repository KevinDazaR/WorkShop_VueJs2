<template>
    <h1>Lista de Películas</h1>
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
  
    <!-- Controles de Paginación -->
    <div class="pagination-controls d-middle">
      <button @click="changePage(currentPage - 1)" :disabled="currentPage <= 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="changePage(currentPage + 1)" :disabled="currentPage >= totalPages">Next</button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, watch } from 'vue';
  import { useMoviesStore } from '@/store/movies.store';
  import CardMovie from './CardMovie.vue'; // Asegúrate de que esta ruta sea correcta
  
  const store = useMoviesStore();
  const movies = ref(store.listMovies);
  const currentPage = ref(store.currentPage);
  const totalPages = ref(Math.ceil(store.totalResults / store.resultsPerPage));
  const searchTerm = ref(''); // Añadido para mantener el término de búsqueda actual
  
  const loadMovies = async (page: number) => {
    if (searchTerm.value) {
      await store.getMovies(searchTerm.value, page);
    } else {
      await store.getMovies('Batman', page);
    }
  };
  
  const changePage = (page: number) => {
    if (page > 0 && page <= totalPages.value) {
      currentPage.value = page;
      loadMovies(page);
    }
  };
  
  onMounted(async () => {
    // Carga la primera página con el término de búsqueda actual
    searchTerm.value = store.listMovies.length ? searchTerm.value : 'Batman'; // Reemplaza con el término de búsqueda actual si está disponible
    await loadMovies(currentPage.value);
  });
  
  watch(() => store.listMovies, (newMovies) => {
    movies.value = newMovies;
  }, { immediate: true });
  
  watch(() => store.currentPage, (newPage) => {
    currentPage.value = newPage;
    totalPages.value = Math.ceil(store.totalResults / store.resultsPerPage);
  });
  
  watch(() => store.searchTerm, (newSearchTerm) => {
    searchTerm.value = newSearchTerm; // Actualiza el término de búsqueda
  });
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
  
  .pagination-controls {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
  }
  
  button {
    padding: 10px 20px;
    background-color: green;
    color: $white;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin: 10px 0px 40px 0px;
  }
  
  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  h1 {
    color: white;
    font-weight: 400;
    text-align: center;
  }
  </style>
  