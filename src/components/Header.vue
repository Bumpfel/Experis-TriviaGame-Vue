<template>
    <header class="bg-secondary text-white p-2 pl-4">
        <a href="#">
            <h4 @click="reset">Trivia Game</h4>
        </a>
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
    methods: {
        reset() {
            if(confirm('Are you sure you want to reset the game?')) {
                this.$router.replace({ name: 'Home' })
            }
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

.capitalize {
    text-transform: capitalize;
}
</style>