<template>
<div>
    <div class="text-left">
        <h2>Results</h2>
        <ul>
            <li v-for="(item, question) in answers" :key="question">
                {{ format(question) }} <br />
                <span :class="{ green: item.wasCorrect, red: !item.wasCorrect }"> Answer: {{ item.answer }} </span>
            </li>
        </ul>
    </div>
    <button class="btn btn-warning" @click="$emit('started-event')">Play again</button>
</div>

</template>

<script>
import { format } from '../../utils/functions.js'

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
    ul {
        padding: 0;
    }
    li {
        margin-bottom: 20px;
        list-style-type: none;
    }
    .red {
        color: red;
    }
    .green {
        color: green;
    }
</style>