// src/store/movies.store.ts

import type { Movie } from "@/model/movie.model";
import { defineStore } from 'pinia';
import axios from '@/api/client-http';

export const useMoviesStore = defineStore('movies', {
  state: () => ({
    listMovies: [] as Movie[],
    currentPage: 1,
    totalResults: 0,
    resultsPerPage: 8,
    searchTerm: '', // Añadido para mantener el término de búsqueda actual
  }),
  actions: {
    async getMovies(searchTerm = '', page = 1) {
      try {
        const response = await axios.get('/', {
          params: {
            s: searchTerm,
            page: page
          }
        });
        this.listMovies = response.data.Search || [];
        this.totalResults = response.data.totalResults || 0;
        this.currentPage = page;
        this.searchTerm = searchTerm; // Actualiza el término de búsqueda actual
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    },
    async getMovieById(id: string) {
      try {
        const response = await axios.get('/', {
          params: { i: id }
        });
        return response.data;
      } catch (error) {
        console.error('Error fetching movie details:', error);
        throw error;
      }
    },
    async searchMovies(searchTerm: string) {
      await this.getMovies(searchTerm, 1); // Reset to first page on new search
    }
  }
});
