<template>
  <div id="app">
    <header class="bg-secondary text-white p-2 pl-4">
      <h4>Trivia Game</h4>
      <div class="text-center">Your score: {{ currentScore }}</div>
    </header>
  
    <div class="container">
      <div class="text-center">
        <button class="btn btn-warning " @click="isStarted = true" v-if="!isStarted">Start game</button>
      </div>

      <div v-if="isStarted">
        <div class="text-center">
          <GameScreen v-if="!hasEnded" :answers="answerOptions" :question="currentPoll" @answer-event="isCorrect($event)" />
          <ScoreScreen :answers="recordedAnswers" v-if="hasEnded" @started-event="startGame()" />
        </div>
      </div>
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
    this.startGame()
    
    return {
      polls: [],
      currentPollIndex: 0,
      recordedAnswers: {},
      currentScore: 0,
      isStarted: false,
      answerOptions: [],
      currentPoll: String,
      hasEnded: false
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
        this.currentScore += 10;
      }
      if(this.currentPollIndex < this.polls.length) {
        this.answerOptions = this.getAnswers();
        this.currentPoll = this.getQuestion();
      } else {
        this.hasEnded = true
      }
    },
    startGame: function() {
      this.currentPollIndex = 0

      fetch("https://opentdb.com/api.php?amount=5&category=11&difficulty=medium&encode=url3986").then(async (response) => {
        this.polls = JSON.parse(await response.text()).results;

        this.answerOptions = this.getAnswers();
        this.currentPoll = this.getQuestion();
        
        this.hasEnded = false
        this.recordedAnswers = {}
        this.currentScore = 0
      });
    },
    format: format
  },
};
</script>

<style>
header {
  white-space: nowrap;
}

.container {
  width: auto;
  margin: 0 auto;
  margin-top: 50px
}
</style>
