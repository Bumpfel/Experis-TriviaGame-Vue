<template>
<div>
    <div class="text-left">
        
        <h2>Results</h2>

        <div class="result" v-for="(poll, index) in result" :key="index">
            {{ poll.question }}
            <div :class="{ green: wasCorrect(poll), red: !wasCorrect(poll) }">
                Your answer: {{ poll.answer }}
            </div>
            <div v-if="!wasCorrect(poll)" class="green">
                Correct Answer: {{ poll.correctAnswer }}
            </div>
        </div>
    </div>
    <button class="btn btn-primary m-2" @click="$emit('start')">Play again</button>
    
    <router-link to="/">
        <button class="btn btn-warning m-2">Change settings</button>
    </router-link>
    <div class="video-container">
        <VideoBg :sources="['./background.mp4']" id="fullvid"/>
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
    methods: {
        wasCorrect: function(poll) {
            return poll.correctAnswer === poll.answer
        },
        format: format
    }
}
</script>

<style scoped>
    .result {
        margin-bottom: 20px;
    }
    .red {
        color: red;
    }
    .green {
        color: green;
    }
    .video-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: -1;
    }

    #fullvid{
        height: 100vh; 
        width: 100vh;
        min-width: 100%; 
        object-fit: cover;
        opacity:0.4;
    }
</style>