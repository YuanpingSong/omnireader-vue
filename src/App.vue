<template>
  <v-app>

    <v-toolbar app scroll-off-screen="">
      <v-toolbar-side-icon @click="sidebar = !sidebar"></v-toolbar-side-icon>
      <v-toolbar-title>OmniReader</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn>Log in</v-btn>
        <v-btn>Edit</v-btn>
      </v-toolbar-items>
    </v-toolbar>


    <v-navigation-drawer app class="blue lighten-3" :mini-variant.sync="mini" dark v-model="sidebar" stateless>
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="https://randomuser.me/api/portraits/men/85.jpg">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>User</v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-btn icon @click.stop="mini = !mini">
                  <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <v-list>
        <v-list-tile v-for="item in items" :key="item.title">
          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{item.title}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>



    <v-content>
      <v-container fluid>
        <div id="input-view" v-bind:style="{display: inputViewDisplay}">
          <v-textarea name="input-article" auto-grow box autofocus v-model="textarea"></v-textarea>
          <div class="text-xs-right">
            <v-btn :loading="loadingUpload" :disabled="loadingUpload" @click="onUploadClick()"> Upload  <v-icon right dark>cloud_upload</v-icon></v-btn>
            <v-btn :loading="loadingSubmit" :disabled="loadingSubmit" @click="onSubmitClick"> Submit </v-btn>
          </div>
        </div>

        <div class="transition-view" v-bind:style="{display: transitionViewDisplay}">
          <v-progress-circular indeterminate color="red"></v-progress-circular>
        </div>

        <div class="reader-view" v-bind:style="{display: readerViewDisplay}">
            <div class="reader-content" v-bind:style="{width: columnWidth+'%', fontSize: textSize+'em', fontFamily: font, textAlign: align }"></div>

          <div class="reader-view-controls">
            <v-slider class="reader-view-width-control" v-model="columnWidth" label="width" min="30" max="90"></v-slider>
            <v-slider class="reader-view-size-control" v-model="textSize" label="font" min="1.0" max="2.5" step="0.1"></v-slider>
            <v-btn-toggle class="reader-view-alignment-control" v-model="align">
              <v-btn flat value="left"><v-icon>format_align_left</v-icon></v-btn>
              <v-btn flat value="center"><v-icon>format_align_center</v-icon></v-btn>
              <v-btn flat value="right"><v-icon>format_align_right</v-icon></v-btn>
              <v-btn flat value="justify"><v-icon>format_align_justify</v-icon></v-btn>
            </v-btn-toggle>
            <v-btn-toggle class="reader-view-font-control" v-model="font">
              <v-btn flat value="Times">Times</v-btn>
              <v-btn flat value="Helvetica">Helvetica</v-btn>
            </v-btn-toggle>
          </div>

          <div class="reader-view-controls-container">
            <ul class="reader-view-controls">
              <li><div><v-icon large>format_align_left</v-icon></div></li>
              <li><div><v-icon large>format_align_left</v-icon></div></li>
              <li><div><v-icon large>format_align_left</v-icon></div></li>
            </ul>
          </div>


        </div>


      </v-container>
    </v-content>
    <v-footer app dark class="grey darken-3 justify-center"> &copy;2018 — <strong>Yuanping Song</strong></v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {
    //
  },
  data () {
    return {
      font: "left",
      align: "left",
      columnWidth: "70",
      textSize: "1.5",
      inputViewDisplay: 'block',
      readerViewDisplay: 'none',
      transitionViewDisplay: 'none',
      loadingUpload : false,
      loadingSubmit: false,
      textarea: "",
      sidebar: false,
      mini : true,
      items: [
        { title: 'Home', icon: 'dashboard'},
        { title: 'About', icon: 'question_answer'}
      ]
    }
  },
  methods: {
    async onUploadClick () {
      this.loadingUpload = true;
      await new Promise(resolve => setTimeout(resolve, 2000));
      this.loadingUpload = false;
    },
    async onSubmitClick () {
      this.inputViewDisplay = "none";
      this.transitionViewDisplay = "flex";

      await new Promise(resolve => setTimeout(resolve, 1000));
      this.transitionViewDisplay = "none";
      this.readerViewDisplay = "flex";

      const readerContent= document.querySelector(".reader-view .reader-content");
      const paragraphArray = this.textarea.replace(/\n+/g, "\n").replace(/ +/g, " ").split('\n');
      for (const paragraph of paragraphArray) {
        const p = document.createElement('p');
        p.innerText = paragraph;
        readerContent.appendChild(p);
      }
    }
  }
}
</script>


<style scoped>
  .transition-view {
    width: 100%;
    justify-content: center;
  }

  .reader-view {

    flex-direction: column;
    width: 100%;
    align-items: center;
  }

  .reader-view .reader-content {
      font-size: 1.5em;
      font-family: Helvetica;

  }



  /* need transition, maybe? */

  .reader-view-controls-container {
    box-sizing: border-box;
    z-index: 10;
  }


  @media screen and (min-height: 420px) and (min-width: 32.5625em) {
    .reader-view-controls-container {
      top: 24px;
      position: relative;
      margin: 0px;
      padding: 0px;
      width: 200px;
    }
  }

  @media screen and (min-height: 26.25em) and (min-width: 49.4375em) {
    .reader-view-controls-container {
      top: 100px;
      right: 20px;
      left: auto;
      width: auto;
      position: fixed;

    }
  }


  .reader-view-controls {
    margin: 0;
    padding: 0;
    list-style: none;
    border: 1px solid #CCC;
    border-bottom: 0px; /* this is ugly, fix if you can */
  }

  .reader-view-controls li {
    list-style: none;   /* no marker for list item elements */
    color: #CCC;
    display: list-item;
    margin: 0;
    padding: 0;
    background-color: #FFF;
    position: relative;
    float: none;
  }

  .reader-view-controls div {
    display: table-cell;
    width: 48px;
    height: 48px;
    text-align: center;
    vertical-align: middle;
    /* transition: all .2s ease-in-out */
    border-bottom: 1px solid #CCC;
  }
</style>
