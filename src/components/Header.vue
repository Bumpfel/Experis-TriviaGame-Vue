<template>
    <header class="bg-secondary text-white p-2 pl-4">
        <router-link to="/">
            <h4>Trivia Game</h4>
        </router-link>
        <div v-if="score > -1" class="text-center">Your score: {{ score }}</div>
    </header>
</template>

<script>
export default {
    name: 'Header',
    props: {
        score: {
            type: Number,
            default: -1,
        }
    }
}
</script>

<style>
header {
    white-space: nowrap;
}
a {
    color:white;
}
a:hover {
    color: white;
    text-decoration: none;
}
</style>