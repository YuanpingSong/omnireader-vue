<template>
    <v-layout-row>
        <v-flex v-for="(word, i) in model" :key="i" xs5 md4>
            <v-card>
                <v-card-title primary-title>
                    <div>
                        <h3 class="headline mb-0">{{word.word}}</h3>
                        <div v-if="getPronunciation(word.word)">{{getPronunciation(word.word)}}</div>
                    </div>
                </v-card-title>
                <v-divider dark></v-divider>
                <v-card-text>
                    {{getOneDefinition(word)}}
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout-row>
</template>

<script>
    export default {
        name: "flashcardView",
        data: function () {
            return {
                model: [],
            }
        },
        async created () {
            try{
                const res = await fetch('http://localhost:3000/user/cards', {method: 'GET', credentials: 'include'});
                this.model = await res.json();
            } catch (error) {
                console.log('Encountered error fetching flashcards from server!');
            }
        },
        methods: {
            getPronunciation (word) {
                if (word.pronunciation) {
                    const p = word.pronunciation;
                    if (typeof p === 'object') {
                        return Object.values(p)[0];
                    } else {
                        return p;
                    }
                } else {
                     return "";
                }
            },
            getOneDefinition (word) {
                if (word.results) {
                    return word.results[0].definition;
                } else {
                    return 0;
                }
            },
            chooseColor () {

            },
        }

    }
</script>

<style scoped>

</style>