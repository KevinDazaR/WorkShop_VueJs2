// src/store/movies.store.ts

import type { Movie } from "@/model/movie.model";
import { defineStore } from 'pinia';
import axios from '@/api/client-http';

export const useMoviesStore = defineStore('movies', {
  state: () => ({
    listMovies: [] as Movie[],
  }),
  actions: {
    async getMovies(searchTerm = 'Batman') {
      try {
        const response = await axios.get('/', {
          params: { s: searchTerm }
        });
        this.listMovies = response.data.Search || [];
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
      await this.getMovies(searchTerm);
    }
  }
});
