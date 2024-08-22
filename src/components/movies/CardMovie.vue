<template>
    <div class="card-movie">
      <h3 class="title-movie">{{ title }}</h3>
      <img :src="poster" :alt="title">
      <p><span>Año:</span> {{ year }}</p>
      <p><span>Tipo:</span> {{ type }}</p>
      <router-link :to="{ name: 'movie-details', params: { id }}">Ver Detalles</router-link>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

interface IProps {
    title: string;
    year: string;
    type: string;
    poster: string;
    id: string;
}

const props = defineProps<IProps>();
</script>


<style lang="scss" scoped>
    .card-movie {
        height: 100%;
        width: 300px;  
        background: $secondary;
        padding: 10px;
        text-align: center;
        border: 2px solid $primary;
        border-radius: 10px;

        .title-movie {
            color: $white;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        p{
            color: $white;
            span {
                color: $primary;
                font-weight: bold;
            }
        }

        img {
            width: 90%;
            height: 300px;
            object-fit: scale-down;
            border-radius: 10px;
        }
    }
</style>