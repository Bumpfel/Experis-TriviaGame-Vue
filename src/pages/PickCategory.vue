<template>
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
                <input type="number" class="form-control" id="nrQuestions" value="10" min="1">
            </div>
        </form>

        <br>

        <router-link :to="{ name: 'Game', params: { categoryId: selectedCategory, amountOfQuestions: nrQuestions, difficulty: selectedDifficulty }}">
            <button class="btn btn-primary">Start game</button>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'PickCategory',
    data() {
        fetch('https://opentdb.com/api_category.php').then(async response => {
            const result = JSON.parse(await response.text());
            this.categories = result.trivia_categories;
        })
        return {
            categories: 9,
            selectedCategory: '',
            selectedDifficulty: 'medium',
            nrQuestions: ''
        }
    }
}
</script>

<style scoped>
.container {
    margin-top: 60px;
    text-align: center;
    margin-bottom: 20px;
}

form {
    margin: 0 auto;
    max-width: 500px;
}

</style>