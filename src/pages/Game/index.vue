<template>
    <div>
        <Header :gameData="{ score: currentScore, category: categoryName, amountOfQuestions: polls.length, currentQuestion: currentPollIndex + 1, difficulty }" />
        <div class="container text-center" v-if="hasLoaded">
            <PollScreen v-if="!hasEnded" :poll="currentPoll" @answer="submitAnswer($event)" />
            <ScoreScreen v-if="hasEnded" :result="recordedResult" @start="startGame()" />
        </div>
    </div>
</template>

<script>
import { format, shuffleArray } from '../../utils/functions.js'
import { difficulties } from '../../utils/enums.js'
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
        requestedQuestions: String,
        difficulty: String,
    },
    data() {
        // check that necessary properties are set
        if(this.categoryId === undefined) {
            this.$router.replace('/')
        } else {
            this.startGame()
        }

        return {
            polls: [],
            categoryName: '',
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
            this.hasLoaded = false
            
            const dif = this.difficulty === difficulties.any ? '' : `&difficulty=${this.difficulty.toLowerCase()}`

            fetch(`https://opentdb.com/api.php?amount=${this.requestedQuestions}${dif}&category=${this.categoryId}&encode=url3986`).then(async (response) => {
                const parsedResponse = JSON.parse(await response.text())

                switch(parsedResponse.response_code) {
                    // ok
                    case 0:
                        this.polls = parsedResponse.results;
                        if(this.polls.length > 0) {
                            this.categoryName = format(this.polls[0].category)
                            this.currentPoll = this.getNextPoll(true);
                            
                            this.hasLoaded = true
                            this.hasEnded = false
                            this.recordedResult = {}
                            this.currentScore = 0
                        }   
                        break;
                    
                    // no result
                    case 1:
                        this.goBack(`Couldn't find the requested amount of questions for this category. Choose a lower number`, true)
                        break;
                    
                    // invalid params
                    case 2: 
                        this.goBack(`Invalid parameters`, true)
                        break;
                    
                    // some token error
                    default:    
                        this.goBack(`Unkown error`, true)

                }


                 
            });

        },
        goBack: function (msg, isErroneous) {            
            const payload = isErroneous ? { errMsg: msg } : { infoMsg: msg }
            this.$router.replace({ name: 'Home', params: payload })
        },
        format: format
    },
}
</script>

<style scoped>
</style>