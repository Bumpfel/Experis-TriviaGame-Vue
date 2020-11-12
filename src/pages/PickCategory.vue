<template>
    <div>
        <Header />
    
        <div class="container">
            <h2>Pick a category</h2>
            <form>
                <div class="form-group">
                    <label for="difficulty">Choose category</label>
                    <select v-model="selectedCategory" class="form-control">
                        <option v-for="category of categories" :key="category.id" :value="category.id" >{{ category.name }}</option>
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

            <router-link :to="{ name: 'Game', params: { categoryId: selectedCategory, amountOfQuestions: nrQuestions, difficulty: selectedDifficulty }}">
                <button class="btn btn-primary">Start game</button>
            </router-link>
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

</style>