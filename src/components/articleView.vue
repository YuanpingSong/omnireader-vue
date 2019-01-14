<template>
    <v-layout row wrap fill-height>
        <v-flex v-for="(article, i) in model" :key="i" xs6 sm4 md3 lg2>
            <v-card :color="chooseColor()" dark class="ma-2">
                <v-card-title primary-title class="pa-2">
                    <div>
                        <h3 class="headline mb-0">{{article.title}}</h3>
                        <div v-if="article.domain">{{article.domain}}</div>
                    </div>
                </v-card-title>
                <v-divider light></v-divider>
                <v-card-text class="pa-2" v-if="article.excerpt">
                    {{article.excerpt}}
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        name: "articleView",
        data: function () {
            return {
                model: [],
            }
        },
        async created () {
            try{
                const res = await fetch('http://oreader.app/user/articles', {method: 'GET', credentials: 'include'});
                const json = await res.json();
                if (json.status == 0) {
                    this.model = json.articles;
                } else {
                    this.model = [];
                }
                console.log(this.model);
            } catch (error) {
                console.log('Encountered error fetching articles from server!');
            }
        },
        methods: {
            chooseColor () {
                const choices = [
                    "#DF3B57",
                    "#0F7173",
                    "#EE4B6A",
                    "#3EA5CE",
                    "#227799",
                    "#EDAE49"
                ];
                return choices[Math.floor(Math.random() * choices.length)];
            }
        }
    }
</script>

<style scoped>

</style>