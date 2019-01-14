<template>
    <v-card v-bind:value="value" v-on:input="$emit('input', $event.target.value)">
        <v-container fluid class="text-xs-center transition-container" v-if="!value">
            <v-progress-circular class="transition-bounding-rect" width="2" size="48" indeterminate color="red"></v-progress-circular>
        </v-container>

        <v-progress-linear class="pb-0 mb-0" color="cyan lighten-3" v-if="onLoad" :indeterminate="true"></v-progress-linear>


        <v-container fluid justify-center align-center align-content-space-around v-if="hasError">

                <div class="text-xs-center">
                    <h1 class="fourOfour">404</h1>
                    <h1 class="headline fourOfour-line-padding">Oops... We couldn't define this word!</h1>
                    <h1 class="headline fourOfour-line-padding">༼∵༽ ༼⍨༽ ༼⍢༽ ༼⍤༽</h1>
                </div>

            <v-card-actions class="justify-right">
                <v-btn flat color="normal" @click="close">Close</v-btn>
            </v-card-actions>
        </v-container>

        <div v-if="value && (!hasError)" class="definition-container">

            <div  v-if="value.length > 1">
                <v-breadcrumbs class="pb-0 pl-3 neg-bottom-margin" v-bind:items="breadcrumbItems" divider=">">
                    <template slot="item" slot-scope="props">
                        <button class="blue-grey--text" @click="popUntil(props.item.text)">{{props.item.text}}</button>
                    </template>
                </v-breadcrumbs>
            </div>


            <v-card-title class="pt-4" primary-title>
                <div>
                    <h3 class="headline mb-0">{{word}}</h3>
                    <div v-if="pronunciation">/{{pronunciation}}/</div>
                </div>
            </v-card-title>

            <v-divider class="hr-bold"></v-divider>


            <v-expansion-panel expand class="no-box-shadow">
                <v-expansion-panel-content v-for="(result, i) in results" :key="i">
                    <v-flex xs12 slot="header">
                        <v-layout row wrap> <!-- parts of speech and definition -->
                            <v-flex xs1> <!-- parts of speech -->
                                <v-card-text class=" less-padding pos-offset">
                                    {{i + 1}}
                                    <em class="d-inline-block white--text" v-bind:style="{backgroundColor: colorize(result.partOfSpeech), padding: '0px 5px 0px 2px'}">{{condense(result.partOfSpeech)}}</em>
                                </v-card-text>
                            </v-flex>
                            <v-flex xs11> <!-- definition -->
                                <v-card-text class="d-inline-block font-weight-medium less-padding">
                                    <!--{{result.definition}}-->
                                    <button class="pr-1" v-for="word in result.definition.split(' ')" @click="pushWord(word, $event)">{{word}}</button>
                                </v-card-text>
                            </v-flex>
                        </v-layout>
                    </v-flex>

                    <v-card>
                        <v-divider class="hr-lighter" v-if="result.examples || result.synonyms || result.antonyms"></v-divider> <!-- divider between definition and the rest -->
                        <v-flex xs12 v-if="result.examples"> <!-- example usage -->
                            <blockquote class="font-weight-regular font-italic example-sentence">"{{result.examples ? result.examples[0] : ""}}"</blockquote>
                        </v-flex>


                        <v-flex xs12 v-if="result.synonyms">
                            <v-layout>
                                <v-flex xs2><v-card-text class="attribute">Synonyms:</v-card-text></v-flex>
                                <v-flex xs10>
                                    <v-card-text class="word-list" v-for="synonym in result.synonyms"><button class="blue-grey--text" @click="pushWord(synonym)">{{synonym}}</button></v-card-text>
                                </v-flex>
                            </v-layout>
                        </v-flex>


                        <v-flex xs12 v-if="result.antonyms">
                            <v-layout>
                                <v-flex xs2><v-card-text class="attribute">Antonyms:</v-card-text></v-flex>
                                <v-flex xs10><v-card-text class="word-list" v-for="antonym in result.antonyms"><button class="blue-grey--text" @click="pushWord(antonym)">{{antonym}}</button></v-card-text></v-flex>
                            </v-layout>
                        </v-flex>

                        <v-flex xs12 v-if="result.typeOf">
                            <v-layout>
                                <v-flex xs2><v-card-text class="attribute">Type of:</v-card-text></v-flex>
                                <v-flex xs10>
                                    <v-card-text class="word-list" v-for="type in result.typeOf"><button class="blue-grey--text" @click="pushWord(type)">{{type}}</button></v-card-text>
                                </v-flex>
                            </v-layout>
                        </v-flex>

                        <v-flex xs12 v-if="result.hasTypes">
                            <v-layout>
                                <v-flex xs2><v-card-text class="attribute">Types:</v-card-text></v-flex>
                                <v-flex xs10 overflow-hidden>
                                    <v-card-text class="word-list" v-for="type in result.hasTypes"><button class="blue-grey--text" @click="pushWord(type)">{{type}}</button></v-card-text>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-card>
                </v-expansion-panel-content>
            </v-expansion-panel>

            <v-card-actions class="justify-right">
                <v-btn flat color="cyan" @click="addCard">Add To Deck</v-btn>
                <v-btn flat color="normal" @click="close">Close</v-btn>
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
                results: [],
                panel: [true],
                onLoad: false,
                hasError: false
            }
        },
        computed: {
            breadcrumbItems: function () {
                const ans = [];
                const lastIdx = this.value.length - 1;
                for (let i = 0; i < this.value.length; i++) {
                    ans.push({text: (this.value[i] == null) ? "404" : this.value[i].word, disabled: i == lastIdx});
                }
                return ans;
            }
        },
        watch: {
           value: function () {
               this.hasError = false;
               if (this.value) {
                   const elt = this.value[this.value.length -1];
                   if (elt == null) {
                       this.hasError = true;
                       return;
                   }
                   this.word = elt.word;
                   if (elt.pronunciation) {
                       const p = elt.pronunciation;
                       if (typeof p === 'object') {
                           this.pronunciation = Object.values(p)[0];
                       } else {
                           this.pronunciation = p;
                       }
                   } else {
                       this.pronunciation = "";
                   }
                   if (elt.results ) {
                       this.results = elt.results;
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
                    case "definite article": case "indefinite article":
                        return 'artcl';
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
            },
            close: function () {
                this.hasError = false;
                const event = new Event('closeDictionary');
                document.dispatchEvent(event);
            },
            popUntil: function (word) {
                if (this.hasError && (word == '404')) {
                    return;
                }
                if (this.hasError) {
                    this.value.pop();
                }
                while (this.value[this.value.length -1 ].word != word) {
                    this.value.pop();
                }
            },
            pushWord: async function (word, event) {
                if (event) event.stopPropagation();
                this.onLoad = true;
                let res;
                try {
                    res = await fetch('/dict/' + word, {method: 'GET', credentials: 'include'});
                } catch (error) {
                    this.value.push(null);
                    return;
                }
                if (res.status != 200) {
                    this.value.push(null);
                    return;
                }

                const json = await res.json();

                if (json.message == "word not found") {
                    this.value.push(null);
                    return;
                }

                this.value.push(json);
                this.onLoad = false;
            },
            addCard: async function (event) {
                const url = 'http://oreader.app/card/' + this.word;
                const res = await fetch(url, {credentials: 'include'});
                const json = await res.json();

                const ev = new CustomEvent('addCardEvent', {detail: json.status} );
                document.dispatchEvent(ev);
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
        margin-top: 20vh;
    }

    .less-padding {
        padding: 6px;
    }

    .pos-offset {
        padding-left: 6px;
        width: auto;
    }

    .hr-bold {
        margin: 0px 10px;
        border-width: 1px;
        border-color: rgb(0,0,0);
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

    .no-box-shadow {
        box-shadow: none;
    }


    .justify-right {
        justify-content: flex-end;
    }

    .neg-bottom-margin {
        margin-bottom: -20px;
    }

    .fourOfour {
        font-size: 1500%;
        font-weight: lighter;
        font-family: Helvetica;
    }

    .fourOfour-line-padding {
        padding: 15px;
    }


</style>