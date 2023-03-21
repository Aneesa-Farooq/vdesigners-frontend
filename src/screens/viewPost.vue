<template>
    <div class="bg-white p-6 rounded-lg shadow-lg">
        <div class="flex gap-6 mb-10">
            <img class="img-fluid w-[200px] rounded-lg" :src="postData.image" alt="" />
            <div>
                <h1 class="text-gray-700 text-4xl font-bold mb-3 tracking-normal">{{ $filters.capitalizeWords(postData.patternName) }}</h1>
                <p class="text-gray-500 mb-8 tracking-wide" >{{ $filters.formatDate(postData.createdAt, 'MMM dd, yyyy, hh:mm:ss a') }}</p>
                <p class="text-gray-700 text-lg">{{ postData.description }}</p>
            </div>
        </div>

        <p class="text-gray-700 text-2xl font-semibold mb-3 tracking-normal">Comments</p>
        <div v-if="Object.keys(postData).includes('comments')">
            <div class="bg-gray-100 p-4 rounded-lg">
                {{ postData.comments }} 
            </div>
        </div>
        <div v-else>
        No comments to show.
        </div>

        <form @submit.prevent="addComment" class="mt-6">
            <label for="comment" class="block mb-2">Add a comment:</label>
            <textarea id="comment" v-model="newComment" class="w-full p-2 border border-gray-300 rounded-lg mb-4" rows="4"
                placeholder="Write your comment here..."></textarea>
            <button type="submit" class="bg-mediumPink text-white px-4 py-2 rounded-lg" @click="addComment">Submit</button>
        </form>
    </div>
</template>
  
<script>
import axios from "axios";
import { Icon } from "@iconify/vue";

export default {
    name: "ViewPost",
    components: {
        Icon,
    },

    data() {
        return {
            postData: {
                patternName: 'Text',
                createdAt: '2023-03-21T07:19:15.146Z',
            },
            newComment: '',
        };
    },

    mounted() {
        axios
            .get(`https://vdesigners.herokuapp.com/api/pattern/postid/${this.$route.params.id}`)
            .then((response) => {
                console.log(response.data);
                this.postData = response.data;
                console.log(this.$route.params.id);
                console.log(this.postData);
            })
            .catch((error) => {
                console.log(error);
            });
    },
    methods: {
        addComment() {
            console.log(this.newComment)
            axios.put(`https://vdesigners.herokuapp.com/api/pattern/AddcommentStatus/${this.$route.params.id}`, { comments: this.newComment })
            .then(response => {
                console.log(response.data);
                this.postData.comments = this.newComment;
                document.querySelector('#comment').value = "";
                // handle successful response
            })
            .catch(error => {
                console.error(error);
                // handle error
            });
        },
    },
};
</script>  