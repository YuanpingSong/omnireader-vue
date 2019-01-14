<template>
  <v-app>

    <v-dialog  v-model="logInDialog" width="50vw">
      <v-tabs v-if="logInDialog" v-model="signUpTabState" color="grey" fixed-tabs dark slider-color="yellow">
        <v-tab :key="1" ripple> Sign In </v-tab>
        <v-tab :key="2" ripple> Sign Up </v-tab>

        <v-tab-item :key="1">
          <v-card flat>
            <v-card-media>
              <v-layout class="justify-center">
                <v-flex xs11>
                  <v-form v-model="loginFormValid" lazy-validation ref="loginForm">
                    <v-text-field class="mt-2"  required label="Email" v-model="loginEmail" :rules="emailRules" clearable></v-text-field>
                    <v-text-field required  label="Password" v-model="loginPassword" :rules="passwordRules" type="password" clearable></v-text-field>
                  </v-form>
                </v-flex>
              </v-layout>
            </v-card-media>
            <v-card-actions>
              <v-spacer></v-spacer> <v-btn color="primary" flat @click="onLogInUser">Sign In</v-btn>
            </v-card-actions>
          </v-card>
        </v-tab-item>

        <v-tab-item :key="2">
          <v-card flat>
          <v-card-media>
            <v-layout class="justify-center">
              <v-flex xs11>
                <v-form v-model="signUpFormValid" lazy-validation ref="signUpForm">
                  <v-text-field required label="Name"  v-model="signUpName" :rules="[v => !!v || 'Name is required']"  clearable></v-text-field>
                  <v-text-field required label="Email"   v-model="signUpEmail" :rules="emailRules"  clearable></v-text-field>
                  <v-text-field required label="Password"  v-model="signUpPassword" :rules="passwordRules" type="password"  clearable></v-text-field>
                  <v-text-field required label="Confirm Password"  v-model="signUpConfirmPassword" :rules="confirmPasswordRules" type="password"  clearable></v-text-field>
                </v-form>
              </v-flex>
            </v-layout>
          </v-card-media>
          <v-card-actions>
            <v-spacer></v-spacer> <v-btn color="primary" flat @click="onSignUpUser">Create Account</v-btn>
          </v-card-actions>
        </v-card>
        </v-tab-item>
      </v-tabs>

    </v-dialog>

    <v-toolbar app scroll-off-screen="">
      <v-toolbar-side-icon @click="sidebar = !sidebar"></v-toolbar-side-icon>
      <v-toolbar-title>OmniReader</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn v-if="!isLoggedIn" @click="onLogIn">Log in</v-btn>


        <v-btn v-if="isLoggedIn" @click="onLogOut">Log out</v-btn>
      </v-toolbar-items>
    </v-toolbar>


    <v-navigation-drawer app dark v-model="sidebar" stateless>
      <v-toolbar flat class="transparent">
        <v-list class="pa-2">
          <v-list-tile >

            <v-list-tile-content>
              <v-list-tile-title>{{greeting}}</v-list-tile-title>
            </v-list-tile-content>

          </v-list-tile>
        </v-list>
      </v-toolbar>

      <v-divider light></v-divider>



      <v-list class="pt-0" dense>
        <v-divider light></v-divider>

        <v-list-tile
                v-for="item in items"
                :key="item.title"
                @click="loadView(item.title)"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>



    <v-content>
      <v-container fluid >




        <!-- The welcome screen -->
        <welcome-view v-if="activeView==='Home'" v-show="activeViewReady"
                      file-upload-event-handler="onSubmitClick"
                      submit-text-event-handler="onSubmitClick"
                      submit-u-r-l-event-handler="onSubmitClick">
        </welcome-view>
        <!--
        <div id="input-view" v-bind:style="{display: inputViewDisplay}">
          <v-textarea name="input-article" auto-grow box autofocus v-model="textarea"></v-textarea>
          <div class="text-xs-right">
            <v-btn :loading="loadingUpload" :disabled="loadingUpload" @click="onUploadClick()"> Upload  <v-icon right dark>cloud_upload</v-icon></v-btn>
            <v-btn :loading="loadingSubmit" :disabled="loadingSubmit" @click="onSubmitClick"> Submit </v-btn>
          </div>
        </div>
        -->




        <!-- loading screen -->
        <div class="transition-view d-flex" xs11 v-if="!activeViewReady">
          <v-progress-circular indeterminate color="red"></v-progress-circular>
        </div>





        <!-- reader -->
        <div class="reader-view d-flex" v-if="activeView==='Reader'" v-show="activeViewReady">
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


        <!-- Flashcards -->
        <flashcard-view v-if="activeView === 'Flashcards'" v-show="activeViewReady"></flashcard-view>

        <!-- Articles -->
        <article-view v-if="activeView === 'Articles' " v-show="activeViewReady"></article-view>

      </v-container>

      <v-snackbar v-model="snackbar" bottom :timeout="timeout" class="cyan--text" >{{snackbar_text}}</v-snackbar>
    </v-content>
    <v-footer app dark class="grey darken-3 justify-center"> &copy;2019 — <strong>Yuanping Song</strong></v-footer>
  </v-app>
</template>

<script>

import DictionaryView from "./components/dictionaryView";
import WelcomeView from "./components/welcomeView";
import FlashcardView from "./components/flashcardView";
import ArticleView from "./components/articleView";
export default {
  name: 'App',
  components: {
    DictionaryView,
    WelcomeView,
    FlashcardView,
    ArticleView,

    //
  },
  mounted () {
    console.log('mounted');

    document.addEventListener('closeDictionary', this.closeDict);
    document.addEventListener('submit_text', this.onSubmitText);
    document.addEventListener('submit_url', this.onSubmitUrl);
    document.addEventListener('addCardEvent', this.onAddCard);
  },
  watch: {
    dictionaryDialog: function() {
      if (this.dictionaryDialog == false) this.dictionaryJson = undefined;
    }
  },
  data () {
    return {
      greeting: "Hi There",
      timeout: 6000,
      snackbar: false,
      snackbar_text: "",
      loginFormValid: false,
      signUpFormValid: false,
      loginEmail: undefined,
      loginPassword: undefined,
      signUpEmail: undefined,
      signUpName: undefined,
      signUpPassword: undefined,
      signUpConfirmPassword: undefined,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 6) || 'Password must use at least 6 characters'
      ],
      confirmPasswordRules: [
        v => !!v || 'Please confirm you password',
        v => (!!v || v == this.signUpPassword) || 'Passwords must match'
      ],
      signUpTabState: 0,
      logInDialog: false,
      isLoggedIn: false,
      dictionaryJson: undefined,
      dictionaryDialog: false,
      controlsState :['none', 'none', 'none', 'none'],
      font: "Helvetica",
      align: "left",
      columnWidth: "70",
      textSize: "1.5",
      // inputViewDisplay: true,
      // readerViewDisplay: 'none',
      // transitionViewDisplay: false,
      readerViewInnerHTML: "",
      activeView: 'Home',
      activeViewReady: true,
      loadingUpload : false,
      loadingSubmit: false,
      textarea: "",
      sidebar: false,
      mini : true,
      items: [
        { title: 'Home', icon: 'search'},
        { title: 'Reader', icon: 'book'},
        { title: 'Flashcards', icon: 'library_books'},
        { title: 'Articles', icon: 'bookmarks'}
      ]
    }
  },
  methods: {
    async onUploadClick () {
      this.loadingUpload = true;
      await new Promise(resolve => setTimeout(resolve, 2000));
      this.loadingUpload = false;
    },
    async onSubmitText (event) {
      //this.inputViewDisplay = false;
      //this.transitionViewDisplay = "flex";
      this.activeViewReady = false;
      this.activeView = 'Reader';

      // await new Promise(resolve => setTimeout(resolve, 1000));
      // this.transitionViewDisplay = "none";
      // this.readerViewDisplay = "flex";

      this.$nextTick(function () {
        const readerContent= document.querySelector(".reader-view .reader-content");
        console.log(readerContent);
        const paragraphArray = event.detail.replace(/\n+/g, "\n").replace(/ +/g, " ").split('\n');
        for (const paragraph of paragraphArray) {
          const p = document.createElement('p');
          p.innerText = paragraph;
          readerContent.appendChild(p);
        }

        document.addEventListener('scroll', this.hideBtn);
        document.addEventListener('pointerdown', this.hideBtn);

        this.readerViewInnerHTML = readerContent.innerHTML;

        this.activeViewReady = true;
      });
    },
    async onSubmitUrl (event) {
      // this.inputViewDisplay = false;
      // this.transitionViewDisplay = "flex";
      this.activeViewReady = false;
      this.activeView = 'Reader';
      const url = event.detail;

      try {
        const res = await fetch('http://localhost:3000/api/webparser?url=' + url, {method: 'GET', credentials: 'include'} );
        var json = await res.json();
      } catch(err) {
        await this.onSubmitUrl(event);
        return;
      }
      this.$nextTick(function () {
        const readerContent= document.querySelector(".reader-view .reader-content");
        if (json.hasOwnProperty('title')) {
          const t = document.createElement('h1');
          t.innerText = json['title'];
          readerContent.appendChild(t);
        }

        if (json.hasOwnProperty('author')) {
          const em = document.createElement('em');
          em.innerText = json['author'];
          readerContent.appendChild(em);
          const br = document.createElement('br');
          readerContent.appendChild(br);
        }

        if (json.hasOwnProperty('lead_image_url')) {
          const img = document.createElement('img');
          img.src = json['lead_image_url'];
          img.style.maxHeight = '90%';
          img.style.maxWidth = '90%';
          readerContent.appendChild(img);
        }

        readerContent.innerHTML = readerContent.innerHTML + json['content'];
        this.readerViewInnerHTML = readerContent.innerHTML;
        // this.transitionViewDisplay = "none";
        // this.readerViewDisplay = "flex";

        document.addEventListener('scroll', this.hideBtn);
        document.addEventListener('pointerdown', this.hideBtn);

        this.activeViewReady = true;
      });
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
        let res;
        try {
          res = await fetch('http://localhost:3000/dict/' + sel.toString().toLowerCase(), {method: 'GET', credentials: 'include'});
        } catch (error) {
          this.dictionaryJson = [null];
          console.log(error);
          return;
        }

        console.log('status code is ');
        console.log(res.status);

        if (res.status != 200) {
          this.dictionaryJson = [null];
          return;
        }
        const json = await res.json();
        if (json.message == "word not found") {
          this.dictionaryJson = [null];
          return;
        }
        this.dictionaryJson = [json];
        console.log(json);
      }

    },
    closeDict() {
      this.dictionaryJson = undefined;
      this.dictionaryDialog = false;
    },
    onLogIn(event) {
      event.preventDefault();
      event.stopPropagation();
      //this.$refs.loginForm.reset();
      //this.$refs.signUpForm.reset();
      this.logInDialog = true;
      this.signUpTabState = 0;
    },
    async onLogOut() {
      console.log('attempting to logout');
      let json = undefined;
      try {
        const res = await fetch('http://localhost:3000/logout', {credentials: 'include'});
        json = await res.json();
      } catch (error) {
        console.log('encountered error while logging out');
        return;
      }
      if (json.status == 0) {
        console.log('here');
        this.isLoggedIn = false;
        this.snackbar = true;
        this.snackbar_text = 'Successfully Logged Out!';
        this.greeting = "Hi There"
      } else {
        this.snackbar = true;
        this.snackbar_text = 'Umm... Please try again';
      }

    },
    async onLogInUser (event) {
      event.preventDefault();
      event.stopPropagation();
      let payload = {
        logemail: this.loginEmail,
        logpassword: this.loginPassword,
      };
      let json = undefined;
      try {
        const res = await fetch('http://localhost:3000/login',
                {method: 'POST', headers: {"Content-Type": "application/json"}, credentials: 'include', body: JSON.stringify(payload)} );
        json = await res.json();
      } catch (error) {
        return;
      }
      if (json.username) {
        this.snackbar = true;
        this.snackbar_text = "Welcome back, " + json.username +"!";
        this.greeting = "Hello, " + json.username;
        this.isLoggedIn = true;
        this.logInDialog = false;
      } else {
        this.snackbar = true;
        this.snackbar_text = "Oops... can't log in with credential"
      }

    },
    async onSignUpUser(event) {
      event.preventDefault();
      event.stopPropagation();

      if (this.$refs.signUpForm.validate()) {
        let payload = {
          username: this.signUpName,
          email: this.signUpEmail,
          password: this.signUpPassword,
          passwordConf: this.signUpConfirmPassword
        };
        console.log(JSON.stringify(payload), );

        let json = undefined;
        try {
          const res = await fetch(
                  'http://localhost:3000/login',
                  {
                    method: 'POST',
                    headers: {
                      "Content-Type": "application/json",
                      // "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: JSON.stringify(payload),
                    credentials: 'include',
                  });
          json = await res.json();
        } catch (err) {
          console.log(err);
          return;
        }


        if (json.status == 0) {
          this.logInDialog = false;
          this.snackbar= true;
          this.snackbar_text = 'Success!';
          this.isLoggedIn = true;
        } else {
          this.snackbar= true;
          this.snackbar_text = 'Email already taken ... Please provide a different email address';
        }
      }

    },
    onAddCard (event) {
      if (event.detail == 0) {
        this.snackbar = true;
        this.snackbar_text = 'Added Card!'
      } else {
        this.snackbar = true;
        this.snackbar_text = 'Cannot Add Card. Please First Log In!'
        this.logInDialog = true;
      }
    },
    loadView(title) {
      if (title !== this.activeView) {

        if (this.activeView === 'Reader') {
          document.removeEventListener('scroll', this.hideBtn);
          document.removeEventListener('pointerdown', this.hideBtn);
        }

        this.activeViewReady = false;
        this.activeView = title;
        this.$nextTick(function () {
          if (title === 'Reader') { // transition to reader, add event listeners
            document.addEventListener('scroll', this.hideBtn);
            document.addEventListener('pointerdown', this.hideBtn);
          }
          if (this.activeView == 'Reader' && this.readerViewInnerHTML) {
            const readerContent= document.querySelector(".reader-view .reader-content");
            readerContent.innerHTML = this.readerViewInnerHTML;
          }
          this.activeViewReady = true;
        });
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
