<template>
<div>
    <div class="text-left">
        <h2>Results</h2>

        <div class="result" v-for="(poll, index) in result" :key="index">
            {{ poll.question }}
            <div :class="{ green: wasCorrect(poll), red: !wasCorrect(poll) }">
                Your answer: {{ poll.answer }}
            </div>
            <div v-if="!wasCorrect(poll)" class="green">
                Correct Answer: {{ poll.correctAnswer }}
            </div>
        </div>
    </div>
    <button class="btn btn-primary m-2" @click="$emit('start')">Play again</button>
    <router-link to="/">
        <button class="btn btn-warning m-2">Change settings</button>
    </router-link>
</div>

</template>

<script>
import { format } from '../../utils/functions.js'

export default {
    name: 'ScoreScreen',
    props: {
        result: {
            required: true
        }
    },
    methods: {
        wasCorrect: function(poll) {
            return poll.correctAnswer === poll.answer
        },
        format: format
    }
}
</script>

<style scoped>
    .result {
        margin-bottom: 20px;
    }
    .red {
        color: red;
    }
    .green {
        color: green;
    }
</style>