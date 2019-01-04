<template>
    <v-card v-bind:value="value" v-on:input="$emit('input', $event.target.value)">
        <div class="transition-container" v-if="!value">
            <div class="transition-bounding-rect"><v-progress-circular size="48" indeterminate color="red"></v-progress-circular></div>
        </div>
        <div v-if="value" class="definition-container">
            <v-card-title primary-title>
                <div>
                    <h3 class="headline mb-0">{{word}}</h3>
                    <div v-if="pronunciation">/{{pronunciation}}/</div>
                </div>
            </v-card-title>

            <v-divider class="hr-bold"></v-divider>



            <v-layout row wrap> <!-- contains all definitions-->
                <v-flex xs12 v-for="result in results"> <!-- a single definition-->
                    <v-flex xs12>
                        <v-layout row wrap> <!-- parts of speech and definition -->
                            <v-flex xs1> <!-- parts of speech -->
                                <v-card-text class="white--text less-padding pos-offset">
                                    <em class="d-inline-block" v-bind:style="{backgroundColor: colorize(result.partOfSpeech), padding: '0px 5px'}">{{condense(result.partOfSpeech)}}</em>
                                </v-card-text>
                            </v-flex>
                            <v-flex xs11> <!-- definition -->
                                <v-card-text class="d-inline-block font-weight-medium less-padding">{{result.definition}}</v-card-text>
                            </v-flex>
                        </v-layout>
                    </v-flex>


                    <v-divider class="hr-lighter" v-if="result.examples || result.synonyms || result.antonyms"></v-divider> <!-- divider between definition and the rest -->
                    <v-flex xs12 v-if="result.examples"> <!-- example usage -->
                        <blockquote class="font-weight-regular font-italic example-sentence">"{{result.examples ? result.examples[0] : ""}}"</blockquote>
                    </v-flex>


                    <v-flex xs12 v-if="result.synonyms">
                        <v-layout>
                            <v-flex xs2><v-card-text class="attribute">Synonyms:</v-card-text></v-flex>
                            <v-flex xs10>
                                <v-card-text class="word-list" v-for="synonym in result.synonyms"><a>{{synonym}}</a></v-card-text>
                            </v-flex>
                        </v-layout>
                    </v-flex>


                    <v-flex xs12 v-if="result.antonyms">
                        <v-layout>
                            <v-flex xs2><v-card-text class="attribute">Antonyms:</v-card-text></v-flex>
                            <v-flex xs10><v-card-text class="word-list" v-for="antonym in result.antonyms"><a>{{antonym}}</a></v-card-text></v-flex>
                        </v-layout>
                    </v-flex>

                    <v-flex xs12 v-if="result.typeOf">
                        <v-layout>
                            <v-flex xs2><v-card-text class="attribute">Type of:</v-card-text></v-flex>
                            <v-flex xs10>
                                <v-card-text class="word-list" v-for="type in result.typeOf"><a>{{type}}</a></v-card-text>
                            </v-flex>
                        </v-layout>
                    </v-flex>

                    <v-flex xs12 v-if="result.hasTypes">
                        <v-layout>
                            <v-flex xs2><v-card-text class="attribute">Types:</v-card-text></v-flex>
                            <v-flex xs10 overflow-hidden>
                                <v-card-text class="word-list" v-for="type in result.hasTypes"><a>{{type}}</a></v-card-text>
                            </v-flex>
                        </v-layout>
                    </v-flex>

                    <!--
                    <v-divider class="hr-light"></v-divider>
                    -->
                </v-flex>
            </v-layout>

            <!--
            <div v-for="(result) in results">

                <v-card-text>
                    <em v-bind:style="{backgroundColor: colorize(result.partOfSpeech)}">{{result.partOfSpeech}}</em>
                    {{result.definition}}
                    <v-divider></v-divider>
                </v-card-text>
            </div>
            -->


            <v-card-actions>
                <v-btn flat color="orange">Share</v-btn>
                <v-btn flat color="orange">Explore</v-btn>
            </v-card-actions>
        </div>
    </v-card>
</template>

<script>
    export default {
        name: "dictionaryView",
        props: ['value'],
        data: function () {
            return {
                word: "",
                pronunciation: "",
                results: []
            }
        },
        watch: {
           value: function () {
               console.log('hi');
               if (this.value) {
                   this.word = this.value.word;
                   if (this.value.pronunciation) {
                       const p = this.value.pronunciation;
                       if (typeof p === 'object') {
                           this.pronunciation = Object.values(p)[0];
                       } else {
                           this.pronunciation = p;
                       }
                   } else {
                       this.pronunciation = "";
                   }
                   if (this.value.results ) {
                       this.results = this.value.results;
                   }
               } else {
                   this.word = "";
                   this.pronunciation = "";
                   this.results = [];
               }
           }
        },
        methods: {
            condense : function (pos) {
                switch (pos) {
                    case "noun":
                        return "n";
                    case "verb":
                        return "v";
                    case "adjective":
                        return "adj";
                    case "adverb":
                        return "adv";
                    case "preposition":
                        return "prep";
                    case "pronoun":
                        return "pronoun";
                    case "conjunction":
                        return "conj";
                    case null: case undefined:
                        return "";
                    default:
                        return pos;
                }
            },
            colorize: function (pos) {
                switch (pos) {
                    case "noun":
                        return "#DF3B57";
                    case "verb":
                        return "#0F7173";
                    case "adjective":
                        return "#EE4B6A";
                    case "adverb":
                        return "#3EA5CE";
                    case "preposition":
                        return "#227799";
                    case "pronoun":
                        return "#EDAE49";
                    case null: case undefined:
                        return "";
                    default:
                        return "#EDAE49";
                }
            }

        }

    }
</script>

<style scoped>
    .transition-container {
        width: 60vw;
        max-width: 720px;
        height: 50vh;
    }

    .transition-bounding-rect {
        position: absolute;
        top: 23vh;
        left: 30vw;
    }

    .definition-container {

    }


    .less-padding {
        padding: 6px;
    }

    .pos-offset {
        padding-left: 16px;
    }

    .hr-bold {
        margin: 0px 10px;
        border-width: 1px;
        border-color: rgb(0,0,0);
    }

    .hr-light {
        margin: 0px 10px;
        border-width: 0.5px;
        border-color: #222222;
    }

    .hr-lighter {
        margin: 4px 30px;
        border-width: 0.5px;
        border-color: lightgray;
    }

    .example-sentence {
        padding: 0px 6px 6px 30px;
        color: grey;
    }

    .word-list {
        display: inline-block;
        padding: 6px;
        width: auto;

    }

    .attribute {
        padding: 6px 6px 6px 30px;
        color: grey;

    }

</style>