<template>
    <h1>Lista de Películas</h1>
    <div class="container-movies d-middle p-100">
      <div v-if="movies.length > 0">
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
    </div>
</template>
  
<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import apiClient from '../../api/client-http';
    import CardMovie from './CardMovie.vue'; // Asegúrate de que esta ruta sea correcta
    
    interface Movie {
        Title: string;
        Year: string;
        imdbID: string;
        Type: string;
        Poster: string;
    }
    
    const movies = ref<Movie[]>([]);
    
    onMounted(async () => {
        try {
        const response = await apiClient.get('/', {
            params: {
            s: 'star wars'
            }
        });
        movies.value = response.data.Search;
        } catch (error) {
        console.error("Error fetching data:", error);
        }
    });
</script>
  
<style scoped lang="scss">
  .container-movies {
    display: flex;
      flex-wrap: wrap;
      gap: 20px
  }

  p{
      color: $white;
  }
</style>    