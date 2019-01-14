<template>
    <v-layout row wrap fill-height>
        <v-flex v-for="(word, i) in model" :key="i" xs5 sm4 md3 lg2>
            <v-card :color="chooseColor()" dark class="ma-2">
                <v-card-title primary-title class="pa-2">
                    <div>
                        <h3 class="headline mb-0">{{word.word}}</h3>
                        <div v-if="getPronunciation(word)">/{{getPronunciation(word)}}/</div>
                    </div>
                </v-card-title>
                <v-divider light></v-divider>
                <v-card-text class="pa-2">
                    {{getOneDefinition(word)}}
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
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
                const res = await fetch('http://oreader.app/user/cards', {method: 'GET', credentials: 'include'});
                const json = await res.json();
                if (json.status == 0) {
                    this.model = json.cards;
                } else {
                    this.model = [];
                }
                console.log(this.model);
            } catch (error) {
                console.log('Encountered error fetching flashcards from server!');
            }
        },
        methods: {
            getPronunciation (word) {
                if (word && word.pronunciation) {
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
                const choices = [
                    "#DF3B57",
                    "#0F7173",
                    "#EE4B6A",
                    "#3EA5CE",
                    "#227799",
                    "#EDAE49"
                ];
                return choices[Math.floor(Math.random() * choices.length)];
            },
        }

    }
</script>

<style scoped>

</style>