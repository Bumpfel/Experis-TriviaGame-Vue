<template>
  <div id="app">
    {{ format(getNextPoll()) }}
    <br />

    <button v-for="(answer, index) of getAnswers(currentPollIndex)" :key="index" @click="isCorrect(answer)">
      {{ format(answer) }}
    </button>
  </div>
</template>

<script>

const shuffleArray = (array) => {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
}

export default {
  name: "App",
  components: {},
  data() {
    fetch(
      "https://opentdb.com/api.php?amount=5&category=11&difficulty=medium&encode=url3986"
    ).then(async (response) => {
      this.polls = JSON.parse(await response.text()).results;
    });
    return {
      polls: [],
      answers: [],
      currentPollIndex: 0,
      recordedAnswers: {},
      score: 0
    };
  },
  methods: {
    getNextPoll: function () {
      
      if (this.polls.length > 0) {
        return this.polls[this.currentPollIndex].question;
      }
    },
    getAnswers: function () {
      if (this.polls.length > 0) {
        const arr = []
        this.polls[this.currentPollIndex].incorrect_answers.forEach(answer => arr.push(answer));
        arr.push(this.polls[this.currentPollIndex].correct_answer);

        shuffleArray(this.answers)

        return arr
      }
    },
    isCorrect: function (answer) {
      let correct = this.polls[this.currentPollIndex].correct_answer === answer
      this.recordedAnswers[this.polls[this.currentPollIndex].question] = { answer, wasCorrect: correct }
      this.currentPollIndex++;
      if(correct){
        this.score++
      }
    },
    format: function(str) {
      return decodeURIComponent(str)
    }
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
