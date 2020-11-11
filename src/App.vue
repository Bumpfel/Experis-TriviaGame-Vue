<template>
    <div id="app" v-if="polls.length > 0">
        {{ getQuestion(0) }}
    </div>
</template>

<script>
  export default {
    name: "App",
    components: {},
    data() {
        fetch("https://opentdb.com/api.php?amount=5&category=11&difficulty=medium&encode=url3986").then(async response => { 
            const result = await response.text()
            this.polls = JSON.parse(result).results
        });
        return { 
            polls: [],
        };
    },
    methods: {
        getQuestion: function(index) {
            return decodeURIComponent(this.polls[index].question)
        }
    }
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
