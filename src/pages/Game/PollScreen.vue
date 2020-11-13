<template>
    <div>
        <div>{{ poll.question }}</div>
        <button class="btn btn-outline-primary m-2"
        v-for="(answer, index) of poll.answers" :id="'button' + index" :key="poll.question + answer" @click="onClick(answer, index)">
            {{ answer }}
        </button>
    </div>
</template>

<script>
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
        onClick: function(answer, index){
            const clickedButton = document.querySelector('#button' + index)

            if(this.poll.correctAnswer === answer){
                
                clickedButton.className = 'btn btn-success m-2'
                this.correctBtn = true
            }
            else{
                const correctButton = document.querySelector('#button' + this.correctAnswerIndex)
                correctButton.className = 'btn btn-success m-2'
                correctButton.style.opacity = .7
                clickedButton.className = 'btn btn-danger m-2'
                this.incorrectBtn = true
            }
            this.$emit('answer', answer)
        },
        getCorrectAnswerIndex() {
            return this.poll.answers.findIndex(answer => answer === this.poll.correctAnswer)
        }
    }
}
</script>
