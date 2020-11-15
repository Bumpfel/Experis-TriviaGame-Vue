<template>
    <div>
        <div>{{ poll.question }}</div>
        <fieldset>
            <button class="btn btn-outline-primary m-2"
            v-for="(answer, index) of poll.answers" :id="'button' + index" :key="poll.question + answer" @click="chooseOption(answer, index)">
                {{ answer }}
            </button>
        </fieldset>
    </div>
</template>

<script>
import { sleep } from '../../utils/functions.js'

export default {
    name: 'PollScreen',
    created() {
        this.correctAnswerIndex = this.getCorrectAnswerIndex()
    },
    updated() {
        this.correctAnswerIndex = this.getCorrectAnswerIndex()
    },
    props: {
        poll: {
            question: String,
            answers: Array,
            correctAnswer: String,
            correctAnswerIndex: Number,
            required: true,
        }
    },
    methods: {
        chooseOption: async function(answer, index) {
            const clickedButton = this.$el.querySelector('#button' + index)

            const fieldset = this.$el.querySelector('fieldset')
            fieldset.disabled = true

            const correctButton = this.$el.querySelector('#button' + this.correctAnswerIndex)
            correctButton.className = 'btn btn-success m-2'
            if(this.poll.correctAnswer !== answer) {
                correctButton.style.opacity = .8
                clickedButton.className = 'btn btn-danger m-2'
            }
            await sleep(1500)
            this.$emit('answer', answer)
            fieldset.disabled = false
        },
        getCorrectAnswerIndex() {
            return this.poll.answers.findIndex(answer => answer === this.poll.correctAnswer)
        }
    }
}
</script>

<style scoped>
    button:disabled, button[disabled] {
        opacity: 1;
    }
</style>