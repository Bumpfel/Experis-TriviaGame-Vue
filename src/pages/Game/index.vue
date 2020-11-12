<template>
    <div>
        <Header :score="currentScore" />
        <div class="container text-center" v-if="hasLoaded">
            <PollScreen v-if="!hasEnded" :poll="currentPoll" @answer="submitAnswer($event)" />
            <ScoreScreen v-if="hasEnded" :result="recordedResult" @start="startGame()" />
        </div>
    </div>
</template>

<script>
import { format, shuffleArray } from '../../utils/functions.js'
import Header from '../../components/Header'
import PollScreen from './PollScreen'
import ScoreScreen from './ScoreScreen'

export default {
    name: 'Game',
    components: {
        Header,
        PollScreen,
        ScoreScreen,
    },
    props: {
        categoryId: {
            default: 11,
            // type: Number,
            // required: true
        },
        amountOfQuestions: {
            default: 10,
        },
        difficulty: {
            default: 'medium'
        }
    },
    data() {
        this.startGame()
    
        return {
            polls: [],
            currentPoll: {},
            currentPollIndex: 0,
            currentScore: 0,
            recordedResult: {},
            hasEnded: false,
            hasLoaded: false,
        };
    },
    methods: {
        /**
         * Builds an object that contains the question, the correct answer, and all of the answers in random order
         */
        getNextPoll: function(restart = false) {
            let poll = {}
            if(!restart) {
                this.currentPollIndex ++;
            } else {
                this.currentPollIndex = 0
            }

            poll.question = format(this.polls[this.currentPollIndex].question);
            poll.correctAnswer = format(this.polls[this.currentPollIndex].correct_answer)

            poll.answers = [];
            this.polls[this.currentPollIndex].incorrect_answers.forEach((answer) => poll.answers.push(format(answer)));
            poll.answers.push(format(this.polls[this.currentPollIndex].correct_answer));

            shuffleArray(poll.answers);
            return poll;
        },
        submitAnswer: function (answer) {
            this.recordedResult[this.currentPollIndex] = { question: this.currentPoll.question, answer, correctAnswer: this.currentPoll.correctAnswer };

            if (this.currentPoll.correctAnswer === answer) {
                this.currentScore += 10;
            }

            if(this.currentPollIndex + 1 < this.polls.length) {
                this.currentPoll = this.getNextPoll()
            } else {
                this.hasEnded = true
            }
        },
        startGame: function() {
            fetch(`https://opentdb.com/api.php?amount=${this.amountOfQuestions}&category=${this.categoryId}&difficulty=${this.difficulty}&encode=url3986`).then(async response => {
                this.polls = JSON.parse(await response.text()).results;

                this.currentPoll = this.getNextPoll(true);
                
                this.hasLoaded = true
                this.hasEnded = false
                this.recordedResult = {}
                this.currentScore = 0
            });
        },
        format: format
    },
}
</script>

<style scoped>
</style>