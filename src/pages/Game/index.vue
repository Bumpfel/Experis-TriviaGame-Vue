<template>
    <div>
        <Header :gameData="{ score: currentScore, category: categoryName, amountOfQuestions, currentQuestion: currentPollIndex + 1, difficulty: displayDifficulty }" />
        <div class="container text-center" v-if="hasLoaded">
            <PollScreen v-if="!hasEnded" :poll="currentPoll" @answer="submitAnswer($event)" />
            <ScoreScreen v-if="hasEnded" :result="recordedResult" @start="startGame()" />
        </div>
    </div>
</template>

<script>
import { format, shuffleArray, sleep } from '../../utils/functions.js'
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
        categoryId: Number,
        amountOfQuestions: Number,
        difficulty: String,
    },
    data() {
        if(this.categoryId === undefined) {
            this.$router.replace('/')
        } else {
            this.startGame()
        }
            
        return {
            polls: [],
            categoryName: '',
            displayDifficulty: '',
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
        submitAnswer:  async function (answer) {
           await sleep(1500)
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
            // TODO check if sanitation is necessary
            console.log(`https://opentdb.com/api.php?amount=${this.amountOfQuestions}&category=${this.categoryId}&difficulty=${this.difficulty}&encode=url3986`)

            this.displayDifficulty = this.difficulty.charAt(0).toUpperCase() + this.difficulty.slice(1)
            console.log(this.displayDifficulty)

            fetch(`https://opentdb.com/api.php?amount=${this.amountOfQuestions}&category=${this.categoryId}&difficulty=${this.difficulty}&encode=url3986`).then(async response => {
                this.polls = JSON.parse(await response.text()).results;

                this.categoryName = format(this.polls[0].category)

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