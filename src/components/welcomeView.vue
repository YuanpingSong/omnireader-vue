<template>
    <v-container fluid>
        <v-layout row wrap class="justify-center" >
            <v-flex xs11 md9 lg8 class="text-xs-right">
                <v-textarea name="input-article" auto-grow box autofocus clearable v-model="textInput" ></v-textarea>
                <v-btn  @click="onUpload"> Upload  <v-icon right dark>cloud_upload</v-icon></v-btn>
                <v-btn  @click="onSubmit"> Submit </v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "welcomeView",
        data: function () {
            return {
                textInput: "",
                fileInput: "", // This needs to be updated
            };
        },
        methods: {
            onSubmit : function () {
                if (!this.textInput) return;

                // determine if input is url
                const expression = /[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/gi;
                const regex = new RegExp(expression);

                if (this.textInput.match(regex)) {
                    const event = new CustomEvent('submit_url', {detail: this.textInput});
                    document.dispatchEvent(event);
                } else {
                    const event = new CustomEvent('submit_text', {detail: this.textInput});
                    document.dispatchEvent(event);
                }
            },
            onUpload: function () {
                const event = new CustomEvent('upload', {detail: this.fileInput});
                document.dispatchEvent(event);
            }

        }
    }
</script>

<style scoped>


</style>