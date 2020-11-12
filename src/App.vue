<template>
  <div id="app">

    <button @click="started = true" v-if="!started">Start game</button>

    <div v-if="started">
      <GameScreen v-if="currentPollIndex < polls.length" :answers="answerOptions" :question="currentPoll" :score="currentScore" @answer-event="isCorrect($event)" />
      <ScoreScreen :answers="recordedAnswers" v-if="currentPollIndex == polls.length" />
    </div>
  </div>
</template>


<script>
import ScoreScreen from './components/ScoreScreen'
import GameScreen from './components/GameScreen'
import { format } from './test/functions.js'

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

export default {
  name: "App",
  components: {
    ScoreScreen,
    GameScreen
  },
  data() {
    fetch("https://opentdb.com/api.php?amount=5&category=11&difficulty=medium&encode=url3986").then(async (response) => {
      this.polls = JSON.parse(await response.text()).results;

      this.answerOptions = this.getAnswers();
      this.currentPoll = this.getQuestion();
    });
    
    return {
      polls: [],
      currentPollIndex: 0,
      recordedAnswers: {},
      currentScore: 0,
      started: false,
      answerOptions: [],
      currentPoll: String
    };
  },
  methods: {
    print: function(msg) {
      console.log(msg)
    },
    getQuestion: function() {
      return this.polls[this.currentPollIndex].question;
    },
    getAnswers: function() {
        const arr = [];
        this.polls[this.currentPollIndex].incorrect_answers.forEach((answer) =>
          arr.push(answer)
        );
        arr.push(this.polls[this.currentPollIndex].correct_answer);

        shuffleArray(arr);
        return arr;
    },
    isCorrect: function (answer) {
      let correct = this.polls[this.currentPollIndex].correct_answer === answer;
      answer = this.format(answer);
      this.recordedAnswers[this.polls[this.currentPollIndex].question] = { answer, wasCorrect: correct };
      this.currentPollIndex++;
      if (correct) {
        this.score += 10;
      }
      if(this.currentPollIndex < this.polls.length) {
        this.answerOptions = this.getAnswers();
        this.currentPoll = this.getQuestion();
      }
    },
    format: format
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
