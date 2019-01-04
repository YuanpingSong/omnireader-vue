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




        <!-- The welcome screen -->
        <div id="input-view" v-bind:style="{display: inputViewDisplay}">
          <v-textarea name="input-article" auto-grow box autofocus v-model="textarea"></v-textarea>
          <div class="text-xs-right">
            <v-btn :loading="loadingUpload" :disabled="loadingUpload" @click="onUploadClick()"> Upload  <v-icon right dark>cloud_upload</v-icon></v-btn>
            <v-btn :loading="loadingSubmit" :disabled="loadingSubmit" @click="onSubmitClick"> Submit </v-btn>
          </div>
        </div>





        <!-- loading screen -->
        <div class="transition-view" v-bind:style="{display: transitionViewDisplay}">
          <v-progress-circular indeterminate color="red"></v-progress-circular>
        </div>





        <!-- reader -->
        <div class="reader-view" v-bind:style="{display: readerViewDisplay}">
          <!-- Controllers for how to present the content -->
          <div class="reader-view-controls-container">
            <ul>
              <!-- the first control item: Alignment -->
              <li><div @click="controlItemOnClick(0)" class="icon-container"><v-hover><v-icon slot-scope="{ hover }" :color="`${hover? '#00ee8d' : undefined}`" large>format_align_center</v-icon></v-hover></div>
                <div id="align-selector" :style="{display: controlsState[0]}">
                  <v-btn-toggle v-model="align">
                    <v-btn flat value="left"><v-icon>format_align_left</v-icon></v-btn>
                    <v-btn flat value="center"><v-icon>format_align_center</v-icon></v-btn>
                    <v-btn flat value="right"><v-icon>format_align_right</v-icon></v-btn>
                    <v-btn flat value="justify"><v-icon>format_align_justify</v-icon></v-btn>
                  </v-btn-toggle>
                </div></li>
              <!-- the second control item: Width -->
              <li><div @click="controlItemOnClick(1)" class="icon-container"><v-hover><v-icon slot-scope="{ hover }" :color="`${hover? '#00ee8d' : undefined}`" large>aspect_ratio</v-icon></v-hover></div>
                <div id="aspect-selector" :style="{display: controlsState[1]}"><v-slider class="reader-view-width-control" v-model="columnWidth" label="width" min="30" max="90"></v-slider></div>
              </li>
              <!-- the third control item: Font -->
              <li><div @click="controlItemOnClick(2)" class="icon-container"><v-hover><v-icon slot-scope="{ hover }" :color="`${hover? '#00ee8d' : undefined}`" large>title</v-icon></v-hover></div>
                <div id="font-selector" :style="{display: controlsState[2]}">
                  <v-btn-toggle class="reader-view-font-control" v-model="font">
                    <v-btn flat value="Times">Times</v-btn>
                    <v-btn flat value="Helvetica">Helvetica</v-btn>
                  </v-btn-toggle></div>
              </li>
              <!-- the forth control item: Size -->
              <li><div @click="controlItemOnClick(3)" class="icon-container"><v-hover><v-icon slot-scope="{ hover }" :color="`${hover? '#00ee8d' : undefined}`" large>format_size</v-icon></v-hover></div>
                <div id="size-selector" :style="{display: controlsState[3]}">
                  <v-slider class="reader-view-size-control"  v-model="textSize" label="font" min="1.0" max="2.5" step="0.1"></v-slider>
                </div>
              </li>
            </ul>
          </div>



          <!-- The main content on the page -->
          <div class="reader-content" @mouseup="getSelectionText" v-bind:style="{width: columnWidth+'%', fontSize: textSize+'em', fontFamily: font, textAlign: align }"></div>


          <!-- The define button, normally hidden -->
            <v-dialog v-model="dictionaryDialog" width="70vw">
              <v-btn slot="activator" @click="lookupWord" id="define-btn" color="warning" fab dark>
                <v-icon>language</v-icon>
              </v-btn>

              <dictionary-view v-model="dictionaryJson"></dictionary-view>
            </v-dialog>








        </div>


      </v-container>
    </v-content>
    <v-footer app dark class="grey darken-3 justify-center"> &copy;2018 — <strong>Yuanping Song</strong></v-footer>
  </v-app>
</template>

<script>

import DictionaryView from "./components/dictionaryView";
export default {
  name: 'App',
  components: {
    DictionaryView
    //
  },
  mounted () {
    console.log('mounted');
    document.addEventListener('scroll', this.hideBtn);
    document.addEventListener('pointerdown', this.hideBtn);
    document.addEventListener('closeDictionary', this.closeDict);
  },
  watch: {
    dictionaryDialog: function() {
      if (this.dictionaryDialog == false) this.dictionaryJson = undefined;
    }
  },
  data () {
    return {
      dictionaryJson: undefined,
      dictionaryDialog: false,
      controlsState :['none', 'none', 'none', 'none'],
      font: "Helvetica",
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

      await new Promise(resolve => setTimeout(resolve, 300));
      this.transitionViewDisplay = "none";
      this.readerViewDisplay = "flex";

      const readerContent= document.querySelector(".reader-view .reader-content");
      const paragraphArray = this.textarea.replace(/\n+/g, "\n").replace(/ +/g, " ").split('\n');
      for (const paragraph of paragraphArray) {
        const p = document.createElement('p');
        p.innerText = paragraph;
        readerContent.appendChild(p);
      }
    },
    controlItemOnClick (selector) {
      for (let i = 0; i < 4; i++) {
        if (i == selector && this.controlsState[i] == 'none') {
          this.$set(this.controlsState, i, 'block');
        } else {
          this.$set(this.controlsState, i, 'none');
        }
      }
      document.addEventListener('click', this.cancelAll);
    },
    cancelAll (event) {
      if (event.target.closest(".reader-view-controls-container")) {
        return;
      }
      for (let j = 0; j < 4; j++) {
        this.$set(this.controlsState, j, 'none');
      }
    },
    getSelectionText(event) {
      const sel = window.getSelection();
      const text = sel.toString().trim();
      if (text == "" || (text.indexOf(" ") != -1)) return; /* single word only */
      const oRange = sel.getRangeAt(0);
      const oRect = oRange.getBoundingClientRect();

      const xpos = (oRect.left + oRect.right) / 2;
      const ypos = (window.innerHeight - oRect.bottom) < 200 ? oRect.top - 80 : oRect.bottom + 20;

      const btn = document.getElementById('define-btn');


      btn.style.top = ypos + 'px';
      btn.style.left = xpos + 'px';
      btn.style.display = 'block';
    },
    hideBtn(event) {
      if (event && event.type == 'pointerdown' && event.target && event.target.closest("#define-btn")) return;
      const btn = document.getElementById('define-btn');
      btn.style.display = 'none';
    },
    async lookupWord () {
      const sel = window.getSelection();
      if (!sel.isCollapsed) {
        const range = document.createRange();
        range.setStart(sel.anchorNode, sel.anchorOffset);
        range.setEnd(sel.focusNode, sel.focusOffset);
        const backwards = range.collapsed;
        range.detach();

        sel.collapse(sel.anchorNode, sel.anchorOffset);
        let direction;
        if (backwards)
          direction = ['backward', 'forward'];
        else
          direction = ['forward', 'backward'];

        sel.modify("move", direction[0], "character");
        sel.modify('move', direction[1], "word");

        sel.extend(sel.focusNode, sel.focusOffset);

        sel.modify("extend", direction[1], "character");
        sel.modify("extend", direction[0], "word");


        console.log('sent request to server for word: ' + sel.toString());
        const res = await fetch('http://localhost:3000/dict/' + sel.toString().toLowerCase(), {method: 'GET'});
        const json = await res.json();
        this.dictionaryJson = json;
        console.log(json);
      }

    },
    closeDict() {
      this.dictionaryJson = undefined;
      this.dictionaryDialog = false;
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

  #define-btn {
    display: none;
    position: fixed;
  }


  /* Mobile */
  /* container positions the controls on screen */
  .reader-view-controls-container {
    box-sizing: border-box;
    z-index: 1;
    top: 24px;
    position: relative;
    width: 193px;
    border: 1px solid #CCC;
    border-right: 0px;
  }


  .reader-view-controls-container ul {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    list-style: none;
    display: block;

  }

  .reader-view-controls-container li {
    box-sizing: border-box;
    list-style: none;   /* no marker for list item elements */
    color: #CCC;
    display: list-item;
    margin: 0;
    padding: 0;
    background-color: #FFF;
    position: relative;
    float: right;

  }

  .reader-view-controls-container .icon-container {
    box-sizing: border-box;
    display: table-cell;
    width: 48px;
    height: 48px;
    text-align: center;
    vertical-align: middle;
    /* transition: all .2s ease-in-out */
    border-right: 1px solid #CCC;
  }

  #align-selector {
    left: -130px;
    top: 55px;
    width: 300px;
    position: absolute;
    z-index: 99;
  }

  #aspect-selector {
    left: -145px;
    top: 40px;
    width: 300px;
    position: absolute;
    z-index: 99;
  }

  #font-selector {
    left: -30px;
    top: 55px;
    width: 300px;
    position: absolute;
    z-index: 99;
  }

  #size-selector {
    left: -49px;
    top: 40px;
    width: 300px;
    position: absolute;
    z-index: 99;
  }

  .reader-content {
    margin-top: 60px;
  }


  @media screen and (min-height: 26.25em) and (min-width: 49.4375em) {
    .reader-view-controls-container {
      top: 100px;
      right: 20px;
      left: auto;
      width: auto;
      position: fixed;
      border: 1px solid #CCC;
      border-bottom: 0px;
    }

    .reader-view-controls-container li {
      float: none;
    }

    .reader-view-controls-container .icon-container {
      border: 0px;
      border-bottom: 1px solid #CCC;
    }

    #align-selector {
      position: absolute;
      width: 180px;
      right: 46px;
      padding: .3125rem  .8rem .375rem;
      border-right: none;
      top: -1px;
      z-index: 99;
      left: auto;
    }

    #aspect-selector {
      position: absolute;
      right: 66px;
      padding: 0rem  1.2rem .375rem;
      border-right: none;
      top: -8px;
      z-index: 99;
      width: 150px;
      left: auto;
    }

    #font-selector {
      position: absolute;
      right: 53px;
      padding: 0;
      border-right: none;
      top: 5px;
      z-index: 99;
      width: 150px;
      left: auto;
    }

    #size-selector {
      position: absolute;
      right: 66px;
      padding: 0rem  1.2rem .375rem;
      border-right: none;
      top: -8px;
      z-index: 99;
      width: 140px;
      left: auto;
    }



  }




</style>
