<template>
    <div>
        <p>{{ format(question) }}</p>
        <button class="btn btn-primary m-2" v-for="(answer, index) of answers" :key="index" @click="$emit('answer-event', answer)">{{ format(answer) }}</button>
    </div>
</template>

<script>
import { format } from '../test/functions.js'

export default {
    name: 'GameScreen',
    props: {
        answers: {},
        answersOptions: {},
        question: String
    },
    methods: {
        format: format
    }
}
</script>

<style scoped>
div {
   
}

</style>