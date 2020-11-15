<template>
    <div>
        <Header />
    
        <div class="container">
            <h2>Pick a category</h2>
            <form>
                <div class="form-group">
                    <label for="difficulty">Choose category</label>
                    <select v-model="selectedCategory" class="form-control">
                        <option v-for="category of categories" :key="category.id" :value="category.id">{{ category.name }}</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="difficulty">Choose difficulty</label>
                    <select id="difficulty" v-model="selectedDifficulty" class="form-control">
                        <option v-for="difficulty of difficulties" :key="difficulty">{{ difficulty }}</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="nrQuestions">Amount of questions (max 50)</label>
                    <select class="form-control" id="nrQuestionsSelect" v-model="nrQuestions" @change="checkQuestions">
                        <option>{{ customValue }}</option>
                        <option>5</option>
                        <option>10</option>
                        <option>15</option>
                        <option>20</option>
                        <option>25</option>
                        <option>30</option>
                        <option>40</option>
                        <option>50</option>
                    </select>
                    <div class="d-flex">
                        <button id="nrQuestionButton" class="btn btn-light d-none" type="button" @click="switchQuestionInput"><i class="fa fa-angle-left" /></button>
                        <input type="number" placeholder="Enter a number" class="form-control d-none" id="nrQuestionsInput" v-model="nrQuestions">
                    </div>
                </div>

                <small class="red">{{ errorMsg + errMsg }}</small>
                <br><br>

                <button class="btn btn-primary" type="submit" @click.prevent="startGame">Start game</button>
            </form>
        </div>
    </div>
</template>

<script>
import Header from '../components/Header'
import { difficulties } from '../utils/enums'

export default {
    name: 'PickCategory',
    components: {
        Header
    },
    props: {
        errMsg: {
            type: String,
            default: ''
        },
        infoMsg: {
            type: String,
            default: ''
        },
    },
    data() {
        fetch('https://opentdb.com/api_category.php').then(async response => {
            const result = JSON.parse(await response.text());
            this.categories = result.trivia_categories;
            this.selectedCategory = this.categories[0].id
        })      

        return {
            categories: [],
            customValue: '- Custom -',
            difficulties: new Set(Object.values(difficulties)),
            selectedCategory: -1,
            selectedDifficulty: 'Medium',
            nrQuestions: '10',
            errorMsg: ''
        }
    },
    methods: {
        startGame() {
            this.$router.push({ name: 'Game', params: { categoryId: this.selectedCategory, requestedQuestions: this.nrQuestions, difficulty: this.selectedDifficulty }})
        },
        checkQuestions() {
            if(this.nrQuestions === this.customValue) {
                document.querySelector('#nrQuestionsSelect').classList.add('d-none')
                document.querySelector('#nrQuestionsInput').classList.remove('d-none')
                document.querySelector('#nrQuestionButton').classList.remove('d-none')
            }
        },
        switchQuestionInput() {
            document.querySelector('#nrQuestionsSelect').classList.remove('d-none')
            document.querySelector('#nrQuestionsInput').classList.add('d-none')
            document.querySelector('#nrQuestionButton').classList.add('d-none')
            if(this.nrQuestions === this.customValue) {
                this.nrQuestions = '10'
            }
        }
    }
}
</script>

<style scoped>
.container {
    text-align: center;
}

form {
    margin: 0 auto;
    max-width: 500px;
}

.btn-light {
    background-color: white;
    border: 0;
}
.btn-light:hover {
    background-color: #ddd;
}

</style>