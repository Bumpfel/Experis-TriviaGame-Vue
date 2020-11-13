<template>
    <header class="bg-secondary text-white p-2 pl-4">
        <router-link to="/">
            <h4>Trivia Game</h4>
        </router-link>
        <div v-if="gameData">
            <div>Selected category: {{ gameData.category }}</div>
            <div>Question: {{ gameData.currentQuestion }} of {{ gameData.amountOfQuestions }}</div>
            <div class="capitalize">Difficulty: {{ gameData.difficulty }}</div>
            <div class="text-center">
                <div>Your score: {{ gameData.score }}</div>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name: 'Header',
    props: {
       gameData: {}
    },
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

.capitalize {
    text-transform: capitalize;
}
</style>