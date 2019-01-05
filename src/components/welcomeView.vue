<template>
    <!-- The welcome screen -->
    <v-container fluid>
        <v-layout row wrap class="justify-center">
                    <v-flex xs11 md9 lg8>
                        <v-textarea name="input-article" auto-grow box autofocus clearable v-model="textarea" ></v-textarea>
                    </v-flex>
                    <v-flex xs11 md9 lg8 class="text-xs-right">
                        <v-btn  @click="fileUploadEventHandler"> Upload  <v-icon right dark>cloud_upload</v-icon></v-btn>
                        <v-btn  @click="submitURLEventHandler"> Upload  <v-icon right dark>cloud_upload</v-icon></v-btn>
                        <v-btn  @click="submitTextEventHandler"> Submit </v-btn>
                    </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "welcomeView",
        props: ['submitTextEventHandler', 'submitURLEventHandler', 'fileUploadEventHandler'],
        data: function () {
            return {
                textarea: ""
            };
        }
    }
</script>

<style scoped>

</style>