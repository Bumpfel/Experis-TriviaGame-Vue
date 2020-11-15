<template>
<div>
    <div class="text-left">
        
        <h2>Results</h2>

        <div class="result" v-for="(poll, index) in result" :key="index" ref="resultList">
            {{ poll.question }}
            <div :class="{ green: wasCorrect(poll), red: !wasCorrect(poll) }">
                Your answer: {{ poll.answer }}
            </div>
            <div v-if="!wasCorrect(poll)" class="green">
                Correct Answer: {{ poll.correctAnswer }}
            </div>
        </div>

        <!-- <div class="result" v-for="(t, index) of test" :key="'t' + index">
            {{ t }}
        </div> -->
    </div>
    <button class="btn btn-primary m-2" @click="$emit('start')">Play again</button>
    
    <router-link to="/">
        <button class="btn btn-warning m-2">Change settings</button>
    </router-link>
    <div class="video-container" ref="vContainer">
        <VideoBg :sources="['./confetti.mp4']" id="fullvid"/>
    </div>
</div>

</template>

<script>
import { format } from '../../utils/functions.js'
import VideoBg from 'vue-videobg'

export default {
    name: 'ScoreScreen',

    components: { VideoBg },
    props: {
        result: {
            required: true
        }
    },
    mounted() {
        const video = document.querySelector('#fullvid')
        const scrollHeight = Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
        );
        video.style.height = scrollHeight + 'px'
    },
    data() {
        return {
            test: ['question', 'question', 'question', 'question', 'question', 'question', 'question', 'question', 'question', 'question', 'question', 'question', 'question', 'question', 'question', 'question', 'question', 'question', 'question', 'question', 'question']
        }
    },
    methods: {
        wasCorrect: function(poll) {
            return poll.correctAnswer === poll.answer
        },
        matchHeight: function(){
            this.$refs.vContainer.clientHeight = this.$refs.resultList.clientHeight
        },
        format: format
    }
}
</script>

<style scoped>
    .result {
        margin-bottom: 20px;
    }

    .video-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%; 
        z-index: -1;
    }

    #fullvid{
       opacity:0.4;
    }
</style>