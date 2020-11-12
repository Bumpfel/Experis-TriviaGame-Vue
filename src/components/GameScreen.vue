<template>
    <div>
        <p>Your score: {{ score }}</p>
        <p>{{ format(question) }}</p>

        <button v-for="(answer, index) of answers" :key="index" @click="$emit('answer-event', answer)">{{ format(answer) }}</button>
    </div>
</template>

<script>
import { format } from '../test/functions.js'

export default {
    name: 'GameScreen',
    props: {
        answers: {},
        answersOptions: {},
        question: String,
        score: Number
    },
    methods: {
        format: format
    }
}
</script>

<style scoped>
</style>