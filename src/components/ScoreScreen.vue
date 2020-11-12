<template>
    <ul>
        <li v-for="(item, key) in answers" :key="key">
            Question: {{ format(key) }} <br />
            Answer: {{ item.answer }} WasCorrect: {{ item.wasCorrect }} <br /><br />
        </li>
    </ul>
</template>

<script>
import { format } from '../test/functions.js'

export default {
    name: 'ScoreScreen',
    props: {
        answers: {}
    },
    methods: {
        format: format
    }
}
</script>

<style scoped>
</style>