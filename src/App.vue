<template>
    <div id="app">
        {{ getQuestion(0) }}
    </div>
</template>

<script>
  export default {
    name: "App",
    components: {},
    data() {
        fetch("https://opentdb.com/api.php?amount=5&category=11&difficulty=medium&encode=url3986").then(async response => { 
            this.polls = JSON.parse(await response.text()).results
        });
        return { 
            polls: [],
        };
    },
    methods: {
        getQuestion: function(index) {
            if(this.polls.length > 0) {
                return decodeURIComponent(this.polls[index].question)
            }
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
