(function(t){function e(e){for(var a,s,o=e[0],c=e[1],l=e[2],d=0,v=[];d<o.length;d++)s=o[d],r[s]&&v.push(r[s][0]),r[s]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(t[a]=c[a]);u&&u(e);while(v.length)v.shift()();return i.push.apply(i,l||[]),n()}function n(){for(var t,e=0;e<i.length;e++){for(var n=i[e],a=!0,o=1;o<n.length;o++){var c=n[o];0!==r[c]&&(a=!1)}a&&(i.splice(e--,1),t=s(s.s=n[0]))}return t}var a={},r={app:0},i=[];function s(e){if(a[e])return a[e].exports;var n=a[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=t,s.c=a,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)s.d(n,a,function(e){return t[e]}.bind(null,a));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=e,o=o.slice();for(var l=0;l<o.length;l++)e(o[l]);var u=c;i.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"0732":function(t,e,n){"use strict";var a=n("9b56"),r=n.n(a);r.a},"52aa":function(t,e,n){},"56d7":function(t,e,n){"use strict";n.r(e);n("cadf"),n("551c"),n("097d");var a=n("2b0e"),r=n("bb71");n("da64");a["a"].use(r["a"],{iconfont:"md"});var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",[n("v-dialog",{attrs:{width:"50vw"},model:{value:t.logInDialog,callback:function(e){t.logInDialog=e},expression:"logInDialog"}},[t.logInDialog?n("v-tabs",{attrs:{color:"grey","fixed-tabs":"",dark:"","slider-color":"yellow"},model:{value:t.signUpTabState,callback:function(e){t.signUpTabState=e},expression:"signUpTabState"}},[n("v-tab",{key:1,attrs:{ripple:""}},[t._v(" Sign In ")]),n("v-tab",{key:2,attrs:{ripple:""}},[t._v(" Sign Up ")]),n("v-tab-item",{key:1},[n("v-card",{attrs:{flat:""}},[n("v-card-media",[n("v-layout",{staticClass:"justify-center"},[n("v-flex",{attrs:{xs11:""}},[n("v-form",{ref:"loginForm",attrs:{"lazy-validation":""},model:{value:t.loginFormValid,callback:function(e){t.loginFormValid=e},expression:"loginFormValid"}},[n("v-text-field",{staticClass:"mt-2",attrs:{required:"",label:"Email",rules:t.emailRules,clearable:""},model:{value:t.loginEmail,callback:function(e){t.loginEmail=e},expression:"loginEmail"}}),n("v-text-field",{attrs:{required:"",label:"Password",rules:t.passwordRules,type:"password",clearable:""},model:{value:t.loginPassword,callback:function(e){t.loginPassword=e},expression:"loginPassword"}})],1)],1)],1)],1),n("v-card-actions",[n("v-spacer"),n("v-btn",{attrs:{color:"primary",flat:""},on:{click:t.onLogInUser}},[t._v("Sign In")])],1)],1)],1),n("v-tab-item",{key:2},[n("v-card",{attrs:{flat:""}},[n("v-card-media",[n("v-layout",{staticClass:"justify-center"},[n("v-flex",{attrs:{xs11:""}},[n("v-form",{ref:"signUpForm",attrs:{"lazy-validation":""},model:{value:t.signUpFormValid,callback:function(e){t.signUpFormValid=e},expression:"signUpFormValid"}},[n("v-text-field",{attrs:{required:"",label:"Name",rules:[function(t){return!!t||"Name is required"}],clearable:""},model:{value:t.signUpName,callback:function(e){t.signUpName=e},expression:"signUpName"}}),n("v-text-field",{attrs:{required:"",label:"Email",rules:t.emailRules,clearable:""},model:{value:t.signUpEmail,callback:function(e){t.signUpEmail=e},expression:"signUpEmail"}}),n("v-text-field",{attrs:{required:"",label:"Password",rules:t.passwordRules,type:"password",clearable:""},model:{value:t.signUpPassword,callback:function(e){t.signUpPassword=e},expression:"signUpPassword"}}),n("v-text-field",{attrs:{required:"",label:"Confirm Password",rules:t.confirmPasswordRules,type:"password",clearable:""},model:{value:t.signUpConfirmPassword,callback:function(e){t.signUpConfirmPassword=e},expression:"signUpConfirmPassword"}})],1)],1)],1)],1),n("v-card-actions",[n("v-spacer"),n("v-btn",{attrs:{color:"primary",flat:""},on:{click:t.onSignUpUser}},[t._v("Create Account")])],1)],1)],1)],1):t._e()],1),n("v-toolbar",{attrs:{app:"","scroll-off-screen":""}},[n("v-toolbar-side-icon",{on:{click:function(e){t.sidebar=!t.sidebar}}}),n("v-toolbar-title",[t._v("OmniReader")]),n("v-spacer"),n("v-toolbar-items",[t.isLoggedIn?t._e():n("v-btn",{on:{click:t.onLogIn}},[t._v("Log in")]),t.isLoggedIn?n("v-btn",{on:{click:t.onLogOut}},[t._v("Log out")]):t._e()],1)],1),n("v-navigation-drawer",{attrs:{app:"",dark:"",stateless:""},model:{value:t.sidebar,callback:function(e){t.sidebar=e},expression:"sidebar"}},[n("v-toolbar",{staticClass:"transparent",attrs:{flat:""}},[n("v-list",{staticClass:"pa-2"},[n("v-list-tile",[n("v-list-tile-content",[n("v-list-tile-title",[t._v(t._s(t.greeting))])],1)],1)],1)],1),n("v-divider",{attrs:{light:""}}),n("v-list",{staticClass:"pt-0",attrs:{dense:""}},[n("v-divider",{attrs:{light:""}}),t._l(t.items,function(e){return n("v-list-tile",{key:e.title,on:{click:function(n){t.loadView(e.title)}}},[n("v-list-tile-action",[n("v-icon",[t._v(t._s(e.icon))])],1),n("v-list-tile-content",[n("v-list-tile-title",[t._v(t._s(e.title))])],1)],1)})],2)],1),n("v-content",[n("v-container",{attrs:{fluid:""}},["Home"===t.activeView?n("welcome-view",{directives:[{name:"show",rawName:"v-show",value:t.activeViewReady,expression:"activeViewReady"}],attrs:{"file-upload-event-handler":"onSubmitClick","submit-text-event-handler":"onSubmitClick","submit-u-r-l-event-handler":"onSubmitClick"}}):t._e(),t.activeViewReady?t._e():n("div",{staticClass:"transition-view d-flex",attrs:{xs11:""}},[n("v-progress-circular",{attrs:{indeterminate:"",color:"red"}})],1),"Reader"===t.activeView?n("div",{directives:[{name:"show",rawName:"v-show",value:t.activeViewReady,expression:"activeViewReady"}],staticClass:"reader-view d-flex"},[n("div",{staticClass:"reader-view-controls-container"},[n("ul",[n("li",[n("div",{staticClass:"icon-container",on:{click:function(e){t.controlItemOnClick(0)}}},[n("v-hover",{scopedSlots:t._u([{key:"default",fn:function(e){var a=e.hover;return n("v-icon",{attrs:{color:""+(a?"#00ee8d":void 0),large:""}},[t._v("format_align_center")])}}])})],1),n("div",{style:{display:t.controlsState[0]},attrs:{id:"align-selector"}},[n("v-btn-toggle",{model:{value:t.align,callback:function(e){t.align=e},expression:"align"}},[n("v-btn",{attrs:{flat:"",value:"left"}},[n("v-icon",[t._v("format_align_left")])],1),n("v-btn",{attrs:{flat:"",value:"center"}},[n("v-icon",[t._v("format_align_center")])],1),n("v-btn",{attrs:{flat:"",value:"right"}},[n("v-icon",[t._v("format_align_right")])],1),n("v-btn",{attrs:{flat:"",value:"justify"}},[n("v-icon",[t._v("format_align_justify")])],1)],1)],1)]),n("li",[n("div",{staticClass:"icon-container",on:{click:function(e){t.controlItemOnClick(1)}}},[n("v-hover",{scopedSlots:t._u([{key:"default",fn:function(e){var a=e.hover;return n("v-icon",{attrs:{color:""+(a?"#00ee8d":void 0),large:""}},[t._v("aspect_ratio")])}}])})],1),n("div",{style:{display:t.controlsState[1]},attrs:{id:"aspect-selector"}},[n("v-slider",{staticClass:"reader-view-width-control",attrs:{label:"width",min:"30",max:"90"},model:{value:t.columnWidth,callback:function(e){t.columnWidth=e},expression:"columnWidth"}})],1)]),n("li",[n("div",{staticClass:"icon-container",on:{click:function(e){t.controlItemOnClick(2)}}},[n("v-hover",{scopedSlots:t._u([{key:"default",fn:function(e){var a=e.hover;return n("v-icon",{attrs:{color:""+(a?"#00ee8d":void 0),large:""}},[t._v("title")])}}])})],1),n("div",{style:{display:t.controlsState[2]},attrs:{id:"font-selector"}},[n("v-btn-toggle",{staticClass:"reader-view-font-control",model:{value:t.font,callback:function(e){t.font=e},expression:"font"}},[n("v-btn",{attrs:{flat:"",value:"Times"}},[t._v("Times")]),n("v-btn",{attrs:{flat:"",value:"Helvetica"}},[t._v("Helvetica")])],1)],1)]),n("li",[n("div",{staticClass:"icon-container",on:{click:function(e){t.controlItemOnClick(3)}}},[n("v-hover",{scopedSlots:t._u([{key:"default",fn:function(e){var a=e.hover;return n("v-icon",{attrs:{color:""+(a?"#00ee8d":void 0),large:""}},[t._v("format_size")])}}])})],1),n("div",{style:{display:t.controlsState[3]},attrs:{id:"size-selector"}},[n("v-slider",{staticClass:"reader-view-size-control",attrs:{label:"font",min:"1.0",max:"2.5",step:"0.1"},model:{value:t.textSize,callback:function(e){t.textSize=e},expression:"textSize"}})],1)])])]),n("div",{staticClass:"reader-content",style:{width:t.columnWidth+"%",fontSize:t.textSize+"em",fontFamily:t.font,textAlign:t.align},on:{mouseup:t.getSelectionText}}),n("v-dialog",{attrs:{width:"70vw"},model:{value:t.dictionaryDialog,callback:function(e){t.dictionaryDialog=e},expression:"dictionaryDialog"}},[n("v-btn",{attrs:{slot:"activator",id:"define-btn",color:"warning",fab:"",dark:""},on:{click:t.lookupWord},slot:"activator"},[n("v-icon",[t._v("language")])],1),n("dictionary-view",{model:{value:t.dictionaryJson,callback:function(e){t.dictionaryJson=e},expression:"dictionaryJson"}})],1)],1):t._e(),"Flashcards"===t.activeView?n("flashcard-view",{directives:[{name:"show",rawName:"v-show",value:t.activeViewReady,expression:"activeViewReady"}]}):t._e(),"Articles"===t.activeView?n("article-view",{directives:[{name:"show",rawName:"v-show",value:t.activeViewReady,expression:"activeViewReady"}]}):t._e()],1),n("v-snackbar",{staticClass:"cyan--text",attrs:{bottom:"",timeout:t.timeout},model:{value:t.snackbar,callback:function(e){t.snackbar=e},expression:"snackbar"}},[t._v(t._s(t.snackbar_text))])],1),n("v-footer",{staticClass:"grey darken-3 justify-center",attrs:{app:"",dark:""}},[t._v(" ©2019 — "),n("strong",[t._v("Yuanping Song")])])],1)},s=[],o=(n("6b54"),n("ac4d"),n("8a81"),n("ac6a"),n("a481"),n("28a5"),n("96cf"),n("1da1")),c=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-card",{attrs:{value:t.value},on:{input:function(e){t.$emit("input",e.target.value)}}},[t.value?t._e():n("v-container",{staticClass:"text-xs-center transition-container",attrs:{fluid:""}},[n("v-progress-circular",{staticClass:"transition-bounding-rect",attrs:{width:"2",size:"48",indeterminate:"",color:"red"}})],1),t.onLoad?n("v-progress-linear",{staticClass:"pb-0 mb-0",attrs:{color:"cyan lighten-3",indeterminate:!0}}):t._e(),t.hasError?n("v-container",{attrs:{fluid:"","justify-center":"","align-center":"","align-content-space-around":""}},[n("div",{staticClass:"text-xs-center"},[n("h1",{staticClass:"fourOfour"},[t._v("404")]),n("h1",{staticClass:"headline fourOfour-line-padding"},[t._v("Oops... We couldn't define this word!")]),n("h1",{staticClass:"headline fourOfour-line-padding"},[t._v("༼∵༽ ༼⍨༽ ༼⍢༽ ༼⍤༽")])]),n("v-card-actions",{staticClass:"justify-right"},[n("v-btn",{attrs:{flat:"",color:"normal"},on:{click:t.close}},[t._v("Close")])],1)],1):t._e(),t.value&&!t.hasError?n("div",{staticClass:"definition-container"},[t.value.length>1?n("div",[n("v-breadcrumbs",{staticClass:"pb-0 pl-3 neg-bottom-margin",attrs:{items:t.breadcrumbItems,divider:">"},scopedSlots:t._u([{key:"item",fn:function(e){return[n("button",{staticClass:"blue-grey--text",on:{click:function(n){t.popUntil(e.item.text)}}},[t._v(t._s(e.item.text))])]}}])})],1):t._e(),n("v-card-title",{staticClass:"pt-4",attrs:{"primary-title":""}},[n("div",[n("h3",{staticClass:"headline mb-0"},[t._v(t._s(t.word))]),t.pronunciation?n("div",[t._v("/"+t._s(t.pronunciation)+"/")]):t._e()])]),n("v-divider",{staticClass:"hr-bold"}),n("v-expansion-panel",{staticClass:"no-box-shadow",attrs:{expand:""}},t._l(t.results,function(e,a){return n("v-expansion-panel-content",{key:a},[n("v-flex",{attrs:{slot:"header",xs12:""},slot:"header"},[n("v-layout",{attrs:{row:"",wrap:""}},[n("v-flex",{attrs:{xs1:""}},[n("v-card-text",{staticClass:" less-padding pos-offset"},[t._v("\n                                "+t._s(a+1)+"\n                                "),n("em",{staticClass:"d-inline-block white--text",style:{backgroundColor:t.colorize(e.partOfSpeech),padding:"0px 5px 0px 2px"}},[t._v(t._s(t.condense(e.partOfSpeech)))])])],1),n("v-flex",{attrs:{xs11:""}},[n("v-card-text",{staticClass:"d-inline-block font-weight-medium less-padding"},t._l(e.definition.split(" "),function(e){return n("button",{staticClass:"pr-1",on:{click:function(n){t.pushWord(e,n)}}},[t._v(t._s(e))])}),0)],1)],1)],1),n("v-card",[e.examples||e.synonyms||e.antonyms?n("v-divider",{staticClass:"hr-lighter"}):t._e(),e.examples?n("v-flex",{attrs:{xs12:""}},[n("blockquote",{staticClass:"font-weight-regular font-italic example-sentence"},[t._v('"'+t._s(e.examples?e.examples[0]:"")+'"')])]):t._e(),e.synonyms?n("v-flex",{attrs:{xs12:""}},[n("v-layout",[n("v-flex",{attrs:{xs2:""}},[n("v-card-text",{staticClass:"attribute"},[t._v("Synonyms:")])],1),n("v-flex",{attrs:{xs10:""}},t._l(e.synonyms,function(e){return n("v-card-text",{staticClass:"word-list"},[n("button",{staticClass:"blue-grey--text",on:{click:function(n){t.pushWord(e)}}},[t._v(t._s(e))])])}),1)],1)],1):t._e(),e.antonyms?n("v-flex",{attrs:{xs12:""}},[n("v-layout",[n("v-flex",{attrs:{xs2:""}},[n("v-card-text",{staticClass:"attribute"},[t._v("Antonyms:")])],1),n("v-flex",{attrs:{xs10:""}},t._l(e.antonyms,function(e){return n("v-card-text",{staticClass:"word-list"},[n("button",{staticClass:"blue-grey--text",on:{click:function(n){t.pushWord(e)}}},[t._v(t._s(e))])])}),1)],1)],1):t._e(),e.typeOf?n("v-flex",{attrs:{xs12:""}},[n("v-layout",[n("v-flex",{attrs:{xs2:""}},[n("v-card-text",{staticClass:"attribute"},[t._v("Type of:")])],1),n("v-flex",{attrs:{xs10:""}},t._l(e.typeOf,function(e){return n("v-card-text",{staticClass:"word-list"},[n("button",{staticClass:"blue-grey--text",on:{click:function(n){t.pushWord(e)}}},[t._v(t._s(e))])])}),1)],1)],1):t._e(),e.hasTypes?n("v-flex",{attrs:{xs12:""}},[n("v-layout",[n("v-flex",{attrs:{xs2:""}},[n("v-card-text",{staticClass:"attribute"},[t._v("Types:")])],1),n("v-flex",{attrs:{xs10:"","overflow-hidden":""}},t._l(e.hasTypes,function(e){return n("v-card-text",{staticClass:"word-list"},[n("button",{staticClass:"blue-grey--text",on:{click:function(n){t.pushWord(e)}}},[t._v(t._s(e))])])}),1)],1)],1):t._e()],1)],1)}),1),n("v-card-actions",{staticClass:"justify-right"},[n("v-btn",{attrs:{flat:"",color:"cyan"},on:{click:t.addCard}},[t._v("Add To Deck")]),n("v-btn",{attrs:{flat:"",color:"normal"},on:{click:t.close}},[t._v("Close")])],1)],1):t._e()],1)},l=[],u=(n("8615"),n("53ca")),d={name:"dictionaryView",props:["value"],data:function(){return{word:"",pronunciation:"",results:[],panel:[!0],onLoad:!1,hasError:!1}},computed:{breadcrumbItems:function(){for(var t=[],e=this.value.length-1,n=0;n<this.value.length;n++)t.push({text:null==this.value[n]?"404":this.value[n].word,disabled:n==e});return t}},watch:{value:function(){if(this.hasError=!1,this.value){var t=this.value[this.value.length-1];if(null==t)return void(this.hasError=!0);if(this.word=t.word,t.pronunciation){var e=t.pronunciation;"object"===Object(u["a"])(e)?this.pronunciation=Object.values(e)[0]:this.pronunciation=e}else this.pronunciation="";t.results&&(this.results=t.results)}else this.word="",this.pronunciation="",this.results=[]}},methods:{condense:function(t){switch(t){case"noun":return"n";case"verb":return"v";case"adjective":return"adj";case"adverb":return"adv";case"preposition":return"prep";case"pronoun":return"pronoun";case"conjunction":return"conj";case"definite article":case"indefinite article":return"artcl";case null:case void 0:return"";default:return t}},colorize:function(t){switch(t){case"noun":return"#DF3B57";case"verb":return"#0F7173";case"adjective":return"#EE4B6A";case"adverb":return"#3EA5CE";case"preposition":return"#227799";case"pronoun":return"#EDAE49";case null:case void 0:return"";default:return"#EDAE49"}},close:function(){this.hasError=!1;var t=new Event("closeDictionary");document.dispatchEvent(t)},popUntil:function(t){if(!this.hasError||"404"!=t){this.hasError&&this.value.pop();while(this.value[this.value.length-1].word!=t)this.value.pop()}},pushWord:function(){var t=Object(o["a"])(regeneratorRuntime.mark(function t(e,n){var a,r;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return n&&n.stopPropagation(),this.onLoad=!0,t.prev=2,t.next=5,fetch("/dict/"+e,{method:"GET",credentials:"include"});case 5:a=t.sent,t.next=12;break;case 8:return t.prev=8,t.t0=t["catch"](2),this.value.push(null),t.abrupt("return");case 12:if(200==a.status){t.next=15;break}return this.value.push(null),t.abrupt("return");case 15:return t.next=17,a.json();case 17:if(r=t.sent,"word not found"!=r.message){t.next=21;break}return this.value.push(null),t.abrupt("return");case 21:this.value.push(r),this.onLoad=!1;case 23:case"end":return t.stop()}},t,this,[[2,8]])}));function e(e,n){return t.apply(this,arguments)}return e}(),addCard:function(){var t=Object(o["a"])(regeneratorRuntime.mark(function t(e){var n,a,r,i;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return n="/card/"+this.word,t.next=3,fetch(n,{credentials:"include"});case 3:return a=t.sent,t.next=6,a.json();case 6:r=t.sent,i=new CustomEvent("addCardEvent",{detail:r.status}),document.dispatchEvent(i);case 9:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}()}},v=d,f=(n("0732"),n("2877")),p=n("6544"),h=n.n(p),m=n("2bc5"),g=n("8336"),b=n("b0af"),x=n("99d9"),w=n("12b2"),y=n("a523"),_=n("ce7e"),k=n("cd55"),C=n("49e2"),V=n("0e8f"),E=n("a722"),S=n("490a"),T=n("8e36"),O=Object(f["a"])(v,c,l,!1,null,"a87f03de",null);O.options.__file="dictionaryView.vue";var R=O.exports;h()(O,{VBreadcrumbs:m["a"],VBtn:g["a"],VCard:b["a"],VCardActions:x["a"],VCardText:x["b"],VCardTitle:w["a"],VContainer:y["a"],VDivider:_["a"],VExpansionPanel:k["a"],VExpansionPanelContent:C["a"],VFlex:V["a"],VLayout:E["a"],VProgressCircular:S["a"],VProgressLinear:T["a"]});var L=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",{attrs:{fluid:""}},[n("v-layout",{staticClass:"justify-center",attrs:{row:"",wrap:""}},[n("v-flex",{staticClass:"text-xs-right",attrs:{xs11:"",md9:"",lg8:""}},[n("v-textarea",{attrs:{name:"input-article",placeholder:"Enter some text or an URL to begin! Ex. https://en.wikipedia.org/wiki/Web_application","auto-grow":"",box:"",autofocus:"",clearable:""},model:{value:t.textInput,callback:function(e){t.textInput=e},expression:"textInput"}}),n("v-btn",{on:{click:t.onUpload}},[t._v(" Upload  "),n("v-icon",{attrs:{right:"",dark:""}},[t._v("cloud_upload")])],1),n("v-btn",{on:{click:t.onSubmit}},[t._v(" Submit ")])],1)],1)],1)},j=[],U=(n("4917"),n("3b2b"),{name:"welcomeView",data:function(){return{textInput:"",fileInput:""}},methods:{onSubmit:function(){if(this.textInput){var t=/[-a-zA-Z0-9@:%_+.~#?&\/\/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&\/\/=]*)?/gi,e=new RegExp(t);if(this.textInput.match(e)){var n=new CustomEvent("submit_url",{detail:this.textInput});document.dispatchEvent(n)}else{var a=new CustomEvent("submit_text",{detail:this.textInput});document.dispatchEvent(a)}}},onUpload:function(){var t=new CustomEvent("upload",{detail:this.fileInput});document.dispatchEvent(t)}}}),P=U,I=(n("f5bb"),n("132d")),D=n("a844"),A=Object(f["a"])(P,L,j,!1,null,"eb0d1718",null);A.options.__file="welcomeView.vue";var F=A.exports;h()(A,{VBtn:g["a"],VContainer:y["a"],VFlex:V["a"],VIcon:I["a"],VLayout:E["a"],VTextarea:D["a"]});var B=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-layout",{attrs:{row:"",wrap:"","fill-height":""}},t._l(t.model,function(e,a){return n("v-flex",{key:a,attrs:{xs5:"",sm4:"",md3:"",lg2:""}},[n("v-card",{staticClass:"ma-2",attrs:{color:t.chooseColor(),dark:""}},[n("v-card-title",{staticClass:"pa-2",attrs:{"primary-title":""}},[n("div",[n("h3",{staticClass:"headline mb-0"},[t._v(t._s(e.word))]),t.getPronunciation(e)?n("div",[t._v("/"+t._s(t.getPronunciation(e))+"/")]):t._e()])]),n("v-divider",{attrs:{light:""}}),n("v-card-text",{staticClass:"pa-2"},[t._v("\n                "+t._s(t.getOneDefinition(e))+"\n            ")])],1)],1)}),1)},H=[],M={name:"flashcardView",data:function(){return{model:[]}},created:function(){var t=Object(o["a"])(regeneratorRuntime.mark(function t(){var e,n;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,fetch("/user/cards",{method:"GET",credentials:"include"});case 3:return e=t.sent,t.next=6,e.json();case 6:n=t.sent,0==n.status?this.model=n.cards:this.model=[],console.log(this.model),t.next=14;break;case 11:t.prev=11,t.t0=t["catch"](0),console.log("Encountered error fetching flashcards from server!");case 14:case"end":return t.stop()}},t,this,[[0,11]])}));function e(){return t.apply(this,arguments)}return e}(),methods:{getPronunciation:function(t){if(t&&t.pronunciation){var e=t.pronunciation;return"object"===Object(u["a"])(e)?Object.values(e)[0]:e}return""},getOneDefinition:function(t){return t.results?t.results[0].definition:0},chooseColor:function(){var t=["#DF3B57","#0F7173","#EE4B6A","#3EA5CE","#227799","#EDAE49"];return t[Math.floor(Math.random()*t.length)]}}},W=M,z=(n("df55"),Object(f["a"])(W,B,H,!1,null,"f3f3d538",null));z.options.__file="flashcardView.vue";var J=z.exports;h()(z,{VCard:b["a"],VCardText:x["b"],VCardTitle:w["a"],VDivider:_["a"],VFlex:V["a"],VLayout:E["a"]});var N=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-layout",{attrs:{row:"",wrap:"","fill-height":""}},t._l(t.model,function(e,a){return n("v-flex",{key:a,attrs:{xs6:"",sm4:"",md3:"",lg2:""}},[n("v-card",{staticClass:"ma-2",attrs:{color:t.chooseColor(),dark:""}},[n("v-card-title",{staticClass:"pa-2",attrs:{"primary-title":""}},[n("div",[n("h3",{staticClass:"headline mb-0"},[t._v(t._s(e.title))]),e.domain?n("div",[t._v(t._s(e.domain))]):t._e()])]),n("v-divider",{attrs:{light:""}}),e.excerpt?n("v-card-text",{staticClass:"pa-2"},[t._v("\n                "+t._s(e.excerpt)+"\n            ")]):t._e()],1)],1)}),1)},q=[],$={name:"articleView",data:function(){return{model:[]}},created:function(){var t=Object(o["a"])(regeneratorRuntime.mark(function t(){var e,n;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,fetch("/user/articles",{method:"GET",credentials:"include"});case 3:return e=t.sent,t.next=6,e.json();case 6:n=t.sent,0==n.status?this.model=n.articles:this.model=[],console.log(this.model),t.next=14;break;case 11:t.prev=11,t.t0=t["catch"](0),console.log("Encountered error fetching articles from server!");case 14:case"end":return t.stop()}},t,this,[[0,11]])}));function e(){return t.apply(this,arguments)}return e}(),methods:{chooseColor:function(){var t=["#DF3B57","#0F7173","#EE4B6A","#3EA5CE","#227799","#EDAE49"];return t[Math.floor(Math.random()*t.length)]}}},G=$,Z=(n("fa62"),Object(f["a"])(G,N,q,!1,null,"761ac23f",null));Z.options.__file="articleView.vue";var Y=Z.exports;h()(Z,{VCard:b["a"],VCardText:x["b"],VCardTitle:w["a"],VDivider:_["a"],VFlex:V["a"],VLayout:E["a"]});var K={name:"App",components:{DictionaryView:R,WelcomeView:F,FlashcardView:J,ArticleView:Y},mounted:function(){console.log("mounted"),document.addEventListener("closeDictionary",this.closeDict),document.addEventListener("submit_text",this.onSubmitText),document.addEventListener("submit_url",this.onSubmitUrl),document.addEventListener("addCardEvent",this.onAddCard)},watch:{dictionaryDialog:function(){0==this.dictionaryDialog&&(this.dictionaryJson=void 0)}},data:function(){var t=this;return{greeting:"Hi There",timeout:6e3,snackbar:!1,snackbar_text:"",loginFormValid:!1,signUpFormValid:!1,loginEmail:void 0,loginPassword:void 0,signUpEmail:void 0,signUpName:void 0,signUpPassword:void 0,signUpConfirmPassword:void 0,emailRules:[function(t){return!!t||"E-mail is required"},function(t){return/.+@.+/.test(t)||"E-mail must be valid"}],passwordRules:[function(t){return!!t||"Password is required"},function(t){return t&&t.length>=6||"Password must use at least 6 characters"}],confirmPasswordRules:[function(t){return!!t||"Please confirm you password"},function(e){return!!e||e==t.signUpPassword||"Passwords must match"}],signUpTabState:0,logInDialog:!1,isLoggedIn:!1,dictionaryJson:void 0,dictionaryDialog:!1,controlsState:["none","none","none","none"],font:"Helvetica",align:"left",columnWidth:"70",textSize:"1.5",readerViewInnerHTML:"",activeView:"Home",activeViewReady:!0,loadingUpload:!1,loadingSubmit:!1,textarea:"",sidebar:!1,mini:!0,items:[{title:"Home",icon:"search"},{title:"Reader",icon:"book"},{title:"Flashcards",icon:"library_books"},{title:"Articles",icon:"bookmarks"}]}},methods:{onUploadClick:function(){var t=Object(o["a"])(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return this.loadingUpload=!0,t.next=3,new Promise(function(t){return setTimeout(t,2e3)});case 3:this.loadingUpload=!1;case 4:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),onSubmitText:function(){var t=Object(o["a"])(regeneratorRuntime.mark(function t(e){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:this.activeViewReady=!1,this.activeView="Reader",this.$nextTick(function(){var t=document.querySelector(".reader-view .reader-content");console.log(t);var n=e.detail.replace(/\n+/g,"\n").replace(/ +/g," ").split("\n"),a=!0,r=!1,i=void 0;try{for(var s,o=n[Symbol.iterator]();!(a=(s=o.next()).done);a=!0){var c=s.value,l=document.createElement("p");l.innerText=c,t.appendChild(l)}}catch(u){r=!0,i=u}finally{try{a||null==o.return||o.return()}finally{if(r)throw i}}document.addEventListener("scroll",this.hideBtn),document.addEventListener("pointerdown",this.hideBtn),this.readerViewInnerHTML=t.innerHTML,this.activeViewReady=!0});case 3:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}(),onSubmitUrl:function(){var t=Object(o["a"])(regeneratorRuntime.mark(function t(e){var n,a,r;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return this.activeViewReady=!1,this.activeView="Reader",n=e.detail,t.prev=3,t.next=6,fetch("/api/webparser?url="+n,{method:"GET",credentials:"include"});case 6:return a=t.sent,t.next=9,a.json();case 9:r=t.sent,t.next=17;break;case 12:return t.prev=12,t.t0=t["catch"](3),t.next=16,this.onSubmitUrl(e);case 16:return t.abrupt("return");case 17:this.$nextTick(function(){var t=document.querySelector(".reader-view .reader-content");if(r.hasOwnProperty("title")){var e=document.createElement("h1");e.innerText=r["title"],t.appendChild(e)}if(r.hasOwnProperty("author")){var n=document.createElement("em");n.innerText=r["author"],t.appendChild(n);var a=document.createElement("br");t.appendChild(a)}if(r.hasOwnProperty("lead_image_url")){var i=document.createElement("img");i.src=r["lead_image_url"],i.style.maxHeight="90%",i.style.maxWidth="90%",t.appendChild(i)}t.innerHTML=t.innerHTML+r["content"],this.readerViewInnerHTML=t.innerHTML,document.addEventListener("scroll",this.hideBtn),document.addEventListener("pointerdown",this.hideBtn),this.activeViewReady=!0});case 18:case"end":return t.stop()}},t,this,[[3,12]])}));function e(e){return t.apply(this,arguments)}return e}(),controlItemOnClick:function(t){for(var e=0;e<4;e++)e==t&&"none"==this.controlsState[e]?this.$set(this.controlsState,e,"block"):this.$set(this.controlsState,e,"none");document.addEventListener("click",this.cancelAll)},cancelAll:function(t){if(!t.target.closest(".reader-view-controls-container"))for(var e=0;e<4;e++)this.$set(this.controlsState,e,"none")},getSelectionText:function(t){var e=window.getSelection(),n=e.toString().trim();if(""!=n&&-1==n.indexOf(" ")){var a=e.getRangeAt(0),r=a.getBoundingClientRect(),i=(r.left+r.right)/2,s=window.innerHeight-r.bottom<200?r.top-80:r.bottom+20,o=document.getElementById("define-btn");o.style.top=s+"px",o.style.left=i+"px",o.style.display="block"}},hideBtn:function(t){if(!(t&&"pointerdown"==t.type&&t.target&&t.target.closest("#define-btn"))){var e=document.getElementById("define-btn");e.style.display="none"}},lookupWord:function(){var t=Object(o["a"])(regeneratorRuntime.mark(function t(){var e,n,a;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(e=window.getSelection(),e.isCollapsed){t.next=27;break}return console.log("sent request to server for word: "+e.toString()),t.prev=3,t.next=6,fetch("/dict/"+e.toString().toLowerCase(),{method:"GET",credentials:"include"});case 6:n=t.sent,t.next=14;break;case 9:return t.prev=9,t.t0=t["catch"](3),this.dictionaryJson=[null],console.log(t.t0),t.abrupt("return");case 14:if(console.log("status code is "),console.log(n.status),200==n.status){t.next=19;break}return this.dictionaryJson=[null],t.abrupt("return");case 19:return t.next=21,n.json();case 21:if(a=t.sent,"word not found"!=a.message){t.next=25;break}return this.dictionaryJson=[null],t.abrupt("return");case 25:this.dictionaryJson=[a],console.log(a);case 27:case"end":return t.stop()}},t,this,[[3,9]])}));function e(){return t.apply(this,arguments)}return e}(),closeDict:function(){this.dictionaryJson=void 0,this.dictionaryDialog=!1},onLogIn:function(t){t.preventDefault(),t.stopPropagation(),this.logInDialog=!0,this.signUpTabState=0},onLogOut:function(){var t=Object(o["a"])(regeneratorRuntime.mark(function t(){var e,n;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return console.log("attempting to logout"),e=void 0,t.prev=2,t.next=5,fetch("/logout",{credentials:"include"});case 5:return n=t.sent,t.next=8,n.json();case 8:e=t.sent,t.next=15;break;case 11:return t.prev=11,t.t0=t["catch"](2),console.log("encountered error while logging out"),t.abrupt("return");case 15:0==e.status?(console.log("here"),this.isLoggedIn=!1,this.snackbar=!0,this.snackbar_text="Successfully Logged Out!",this.greeting="Hi There"):(this.snackbar=!0,this.snackbar_text="Umm... Please try again");case 16:case"end":return t.stop()}},t,this,[[2,11]])}));function e(){return t.apply(this,arguments)}return e}(),onLogInUser:function(){var t=Object(o["a"])(regeneratorRuntime.mark(function t(e){var n,a,r;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return e.preventDefault(),e.stopPropagation(),n={logemail:this.loginEmail,logpassword:this.loginPassword},a=void 0,t.prev=4,t.next=7,fetch("/login",{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify(n)});case 7:return r=t.sent,t.next=10,r.json();case 10:a=t.sent,t.next=16;break;case 13:return t.prev=13,t.t0=t["catch"](4),t.abrupt("return");case 16:a.username?(this.snackbar=!0,this.snackbar_text="Welcome back, "+a.username+"!",this.greeting="Hello, "+a.username,this.isLoggedIn=!0,this.logInDialog=!1):(this.snackbar=!0,this.snackbar_text="Oops... can't log in with credential");case 17:case"end":return t.stop()}},t,this,[[4,13]])}));function e(e){return t.apply(this,arguments)}return e}(),onSignUpUser:function(){var t=Object(o["a"])(regeneratorRuntime.mark(function t(e){var n,a,r;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(e.preventDefault(),e.stopPropagation(),!this.$refs.signUpForm.validate()){t.next=20;break}return n={username:this.signUpName,email:this.signUpEmail,password:this.signUpPassword,passwordConf:this.signUpConfirmPassword},console.log(JSON.stringify(n)),a=void 0,t.prev=6,t.next=9,fetch("/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n),credentials:"include"});case 9:return r=t.sent,t.next=12,r.json();case 12:a=t.sent,t.next=19;break;case 15:return t.prev=15,t.t0=t["catch"](6),console.log(t.t0),t.abrupt("return");case 19:0==a.status?(this.logInDialog=!1,this.snackbar=!0,this.snackbar_text="Success!",this.isLoggedIn=!0):(this.snackbar=!0,this.snackbar_text="Email already taken ... Please provide a different email address");case 20:case"end":return t.stop()}},t,this,[[6,15]])}));function e(e){return t.apply(this,arguments)}return e}(),onAddCard:function(t){0==t.detail?(this.snackbar=!0,this.snackbar_text="Added Card!"):(this.snackbar=!0,this.snackbar_text="Cannot Add Card. Please First Log In!",this.logInDialog=!0)},loadView:function(t){t!==this.activeView&&("Reader"===this.activeView&&(document.removeEventListener("scroll",this.hideBtn),document.removeEventListener("pointerdown",this.hideBtn)),this.activeViewReady=!1,this.activeView=t,this.$nextTick(function(){if("Reader"===t&&(document.addEventListener("scroll",this.hideBtn),document.addEventListener("pointerdown",this.hideBtn)),"Reader"==this.activeView&&this.readerViewInnerHTML){var e=document.querySelector(".reader-view .reader-content");e.innerHTML=this.readerViewInnerHTML}this.activeViewReady=!0}))}}},Q=K,X=(n("e4d9"),n("7496")),tt=n("a609"),et=n("b901"),nt=n("549c"),at=n("169a"),rt=n("553a"),it=n("4bd4"),st=n("ce87"),ot=n("8860"),ct=n("ba95"),lt=n("40fe"),ut=n("5d23"),dt=n("f774"),vt=n("ba0d"),ft=n("2db4"),pt=n("9910"),ht=n("71a3"),mt=n("c671"),gt=n("fe57"),bt=n("2677"),xt=n("71d9"),wt=n("2a7f"),yt=n("706c"),_t=Object(f["a"])(Q,i,s,!1,null,"d0217614",null);_t.options.__file="App.vue";var kt=_t.exports;h()(_t,{VApp:X["a"],VBtn:g["a"],VBtnToggle:tt["a"],VCard:b["a"],VCardActions:x["a"],VCardMedia:et["a"],VContainer:y["a"],VContent:nt["a"],VDialog:at["a"],VDivider:_["a"],VFlex:V["a"],VFooter:rt["a"],VForm:it["a"],VHover:st["a"],VIcon:I["a"],VLayout:E["a"],VList:ot["a"],VListTile:ct["a"],VListTileAction:lt["a"],VListTileContent:ut["a"],VListTileTitle:ut["b"],VNavigationDrawer:dt["a"],VProgressCircular:S["a"],VSlider:vt["a"],VSnackbar:ft["a"],VSpacer:pt["a"],VTab:ht["a"],VTabItem:mt["a"],VTabs:gt["a"],VTextField:bt["a"],VToolbar:xt["a"],VToolbarItems:wt["a"],VToolbarSideIcon:yt["a"],VToolbarTitle:wt["b"]}),a["a"].config.productionTip=!1,new a["a"]({render:function(t){return t(kt)}}).$mount("#app")},"59ab":function(t,e,n){},9727:function(t,e,n){},"9b56":function(t,e,n){},df55:function(t,e,n){"use strict";var a=n("9727"),r=n.n(a);r.a},e4d9:function(t,e,n){"use strict";var a=n("eff1"),r=n.n(a);r.a},eff1:function(t,e,n){},f5bb:function(t,e,n){"use strict";var a=n("52aa"),r=n.n(a);r.a},fa62:function(t,e,n){"use strict";var a=n("59ab"),r=n.n(a);r.a}});
//# sourceMappingURL=app.05727eaf.js.map