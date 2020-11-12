<template>
    <div>
        <div>{{ poll.question }}</div>
        <button class="btn btn-outline-primary m-2" v-for="answer of poll.answers" :key="answer" @click="$emit('answer', answer)">
            {{ answer }}
        </button>
    </div>
</template>

<script>
export default {
    name: 'PollScreen',
    props: {
        poll: {
            question: String,
            answers: Array,
            required: true
        }
    }
}
</script>
