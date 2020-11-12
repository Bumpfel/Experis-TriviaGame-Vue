<template>
  <div id="app">

    <button @click="started = true" v-if="!started">Start game</button>

    <div v-if="started">
      <p>Your score: {{ score }}</p>
      <p v-if="currentPollIndex < polls.length">{{ format(getNextPoll()) }}</p>

      <button v-for="(answer, index) of getAnswers(currentPollIndex)" :key="index" @click="isCorrect(answer)">{{ format(answer) }} </button>
      
      <ul v-if="currentPollIndex == polls.length">
        <li v-for="(item, key) in recordedAnswers" :key="key">
          Question: {{ format(key) }} <br />
          Answer: {{ item.answer }} WasCorrect: {{ item.wasCorrect }} <br /><br />
        </li>
      </ul>
    </div>
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
};

export default {
  name: "App",
  components: {
  },
  data() {
    fetch(
      "https://opentdb.com/api.php?amount=5&category=11&difficulty=medium&encode=url3986"
    ).then(async (response) => {
      this.polls = JSON.parse(await response.text()).results;
    });
    return {
      polls: [],
      currentPollIndex: 0,
      recordedAnswers: {},
      score: 0,
      started: false
    };
  },
  methods: {
    print: function(msg) {
      console.log(msg)
    },
    getNextPoll: function () {
      if (this.polls.length > 0 ) {
        return this.polls[this.currentPollIndex].question;
      }
    },
    getAnswers: function () {
      if (this.polls.length > 0 && this.currentPollIndex < this.polls.length) {
        const arr = [];
        this.polls[this.currentPollIndex].incorrect_answers.forEach((answer) =>
          arr.push(answer)
        );
        arr.push(this.polls[this.currentPollIndex].correct_answer);

        shuffleArray(arr);

        return arr;
      }
    },
    isCorrect: function (answer) {
      let correct = this.polls[this.currentPollIndex].correct_answer === answer;
      answer = this.format(answer);
      this.recordedAnswers[this.polls[this.currentPollIndex].question] = { answer, wasCorrect: correct };
      this.currentPollIndex++;
      if (correct) {
        this.score += 10;
      }
    },
    format: function (str) {
      return decodeURIComponent(str);
    },
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
