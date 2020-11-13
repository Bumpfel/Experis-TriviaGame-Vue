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
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="nrQuestions">Amount of questions</label>
                    <input type="number" class="form-control" id="nrQuestions" min="1" v-model="nrQuestions">
                </div>
            </form>

            <br>

            <button class="btn btn-primary" @click="startGame">Start game</button>
        </div>
    </div>
</template>

<script>
import Header from '../components/Header'

export default {
    name: 'PickCategory',
    components: {
        Header
    },
    data() {
        fetch('https://opentdb.com/api_category.php').then(async response => {
            const result = JSON.parse(await response.text());
            this.categories = result.trivia_categories;
            this.selectedCategory = this.categories[0].id
        })
        return {
            categories: [],
            selectedCategory: -1,
            selectedDifficulty: 'medium',
            nrQuestions: 10
        }
    },
    methods: {
        startGame() {
            // console.log('diff:', this.difficulties[this.selectedDifficulty])

            // if(this.selectedCategory && this.nrQuestions > 0 && this.difficulties[this.selectedDifficulty])
            this.$router.push({ name: 'Game', params: { categoryId: this.selectedCategory, amountOfQuestions: this.nrQuestions | 1, difficulty: this.selectedDifficulty }})
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

option {
    text-transform: capitalize;
}
</style>