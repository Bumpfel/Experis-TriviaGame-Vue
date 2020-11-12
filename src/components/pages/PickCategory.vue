<template>
    <div>
        <h2>Pick a category</h2>
        <select v-model="selectedCategory">
            <option value="" disabled selected>-- Choose category --</option>
            <option v-for="category of categories" :key="category.id" :value="category.id" >{{ category.name }}</option>
        </select>
        
        <br>

        <select v-model="selectedDifficulty">
            <option value="" disabled selected>-- Choose difficulty --</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
        </select>

        <br>

        <router-link :to="{ name: 'Game', params: { categoryId: selectedCategory }}">
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
            categories: '',
            selectedCategory: '',
            selectedDifficulty: '',
        }
    },
    updated() {
        console.log('rendered')
    }
}
</script>

<style scoped>

* {
    margin-top: 60px;
    text-align: center;
}
</style>