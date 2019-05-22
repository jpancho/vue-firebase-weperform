<template>
  <div class="home">
    <div id="loader-wrapper">
      <div id="quotes">
        <p class="display-1">Practice like you've never won.</p>
        <p class="display-2">Perform like you've never lost.</p>
        <span class="font-weight-light text--darken-4 display-4 text-uppercase blue--text">We</span>
        <span class="display-4 text-uppercase blue--text">Perform</span>
      </div>
      <div id="loader"></div>
      <div class="loader-section section-left"></div>
      <div class="loader-section section-right"></div>
    </div>
    <div class="md-layout">
      <div class="md-layout-item md-size-66 mx-auto md-small-size-100">
        <v-carousel
                :per-page="1"
                loop
                :speed="1000"
                autoplay
                :autoplay-timeout="4000"
                :mouse-drag="true"
                navigationEnabled
                navigationNextLabel="<i class='material-icons'>keyboard_arrow_right</i>"
                navigationPrevLabel="<i class='material-icons'>keyboard_arrow_left</i>"
                style="cursor: pointer"
        >
          <md-card>
            <v-carousel-item
                    v-for="(item,i) in items"
                    :key="i"
                    :src="item.src"
                    :title="item.title"
            >
                  <p class="headline" @click="search">{{ item.title }}</p>
            </v-carousel-item>
          </md-card>
        </v-carousel>
      </div>
    </div>
    <p></p>
    <v-toolbar-title class="text-uppercase">
      <h2 align="center">
        <span class="font-weight-light display-4 grey--text">We</span>
        <span class="display-4 black--text">Perform</span>
      </h2>
      <p></p>
      <v-layout>
        <v-flex xs4 sm12 sm8>
          <v-toolbar-title class="text-uppercase">
            <h2 align="center">
              <span class="blue-grey--text font-weight-bold display-2"><pre>Search</pre></span>
            </h2>
          </v-toolbar-title>
        </v-flex>
        <v-flex xs6 sm12 offset-sm1>
          <v-toolbar-title class="text-uppercase">
            <h2 align="center">
              <span class="blue-grey--text font-weight-bold display-2"><pre>Save</pre></span>
            </h2>
          </v-toolbar-title>
        </v-flex>
        <v-flex xs8 sm12 offset-sm1>
          <v-toolbar-title class="text-uppercase">
            <h2 align="center">
              <span class="blue-grey--text font-weight-bold display-2"><pre>Book</pre></span>
            </h2>
          </v-toolbar-title>

        </v-flex>
      </v-layout>
      <p></p>
    </v-toolbar-title>
    <h3 class="font-weight-light black--text">
      Designed to streamline the process of booking performers for events. Each performer has a profile describing their skill, expertise, and contact information, allowing patrons to search and book them with ease. This service saves the patrons time, effort, and money in search of their ideal performer, while also providing performers with a dedicated platform to promote themselves.
    </h3>
    <p></p>
    <v-divider color="grey"></v-divider>
    <v-divider color="grey"></v-divider>
    <p></p>

    <v-layout row>
      <h2 class="font-weight-light display-3 black--text">
        <pre>Performers based on your needs</pre>
      </h2>
      <v-spacer></v-spacer>
      <v-flex md6>
        <v-card>
          <v-img
            src="assets/img/talents/dancer_stage.jpg"
            height="300px"
          >
          </v-img>
        </v-card>
      </v-flex>
    </v-layout>
    <p></p>
    <v-layout row>
      <v-flex xs5>
        <v-divider color="grey"></v-divider>
        <v-divider color="grey"></v-divider>
      </v-flex>
      <v-flex xs2>
      </v-flex>
      <v-flex xs5>
        <v-divider color="grey"></v-divider>
        <v-divider color="grey"></v-divider>
      </v-flex>
    </v-layout>
    <p></p>
    <v-layout row>
      <v-flex sm12>
        <v-card max-width="700px">
          <v-img
            src="assets/img/talents/dancer_perform.jpg"
            height="300px"
          >
          </v-img>
        </v-card>
      </v-flex>
      <v-flex xs2 sm12 sm6 align-end>
        <h2 class="font-weight-light display-3 black--text">
          <pre>Filtered search options</pre>
          <v-flex xs2 sm12 sm6 align-end>
<!--            <v-icon>-->
<!--              check_circle-->
<!--            </v-icon>-->
            <h4 class="title font-weight-light"><v-icon>check_circle</v-icon> Genre</h4>
            <p></p><h4 class="title font-weight-light"><v-icon>check_circle</v-icon> Styles</h4>
            <p></p><h4 class="title font-weight-light"><v-icon>check_circle</v-icon> Pricing</h4>
            <p></p><h4 class="title font-weight-light"><v-icon>check_circle</v-icon> Location</h4>
            <p></p><h4 class="title font-weight-light"><v-icon>check_circle</v-icon> Experience</h4>
            <p></p><h4 class="title font-weight-light"><v-icon>check_circle</v-icon> Availability</h4>
<!--            <v-icon>-->
<!--              check_circle <span>Styles</span>-->
<!--            </v-icon>-->
<!--            <v-icon>-->
<!--              check_circle <span>Location</span>-->
<!--            </v-icon>-->
<!--            <v-icon>-->
<!--              check_circle <span>Availability</span>-->
<!--            </v-icon>-->
          </v-flex>
        </h2>
      </v-flex>
    </v-layout>
    <p></p>
    <v-layout row>
      <v-flex xs5>
        <v-divider color="grey"></v-divider>
        <v-divider color="grey"></v-divider>
      </v-flex>
      <v-flex xs2>
      </v-flex>
      <v-flex xs5>
        <v-divider color="grey"></v-divider>
        <v-divider color="grey"></v-divider>
      </v-flex>
    </v-layout>
    <p></p>
    <v-layout>
      <h2 class="font-weight-light display-3 black--text">
        <pre>Platform promoting talent</pre>
      </h2>
      <v-spacer></v-spacer>
      <v-flex md6>
        <v-card>
          <v-img
            src="assets/img/talents/singer_perform.jpg"
            height="300px"
          >
          </v-img>
        </v-card>
      </v-flex>
    </v-layout>
    <p></p>
    <v-divider color="grey"></v-divider>
    <v-divider color="grey"></v-divider>
    <v-divider color="grey"></v-divider>
    <v-divider color="grey"></v-divider>
    <v-divider color="grey"></v-divider>
    <p></p>
    <v-layout>
      <v-flex xs4 sm12 sm8>
        <v-hover>
          <v-toolbar-title class="text-uppercase">
            <h2 align="center">

              <PopupPerformer/>
<!--              <span class="headline black&#45;&#45;text" @click="search" style="cursor: pointer">-->
<!--                Book your performer-->
<!--                <v-icon x-large @click="search" style="cursor: pointer">keyboard_arrow_right</v-icon>-->
<!--              </span>-->
            </h2>
          </v-toolbar-title>
        </v-hover>
      </v-flex>
    </v-layout>
    <p></p>
  </div>
</template>

<script>
  import PopupPerformer from '../views/PopupPerformer';
export default {
  components: {PopupPerformer},
  data() {
    return {
      items: [
        {
          src: '/assets/img/talents/dancer.jpg',
          title: "Dancer"
        },
        {
          src: '/assets/img/talents/musicians_stage.jpg',
          title: "Musician"
        },
        {
          src: '/assets/img/talents/singer_stage.jpg',
          title: "Singer"
        }
      ]
    }
  },
  methods: {
    search() {
      this.$router.replace('/performers')
    },
    become() {
      this.$router.replace('/becomePerformer')
    }
  }
}
</script>

<style scoped>
  #loader-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
}
#loader {
  display: block;
  position: relative;
  left: 50%;
  top: 25%;
  width: 300px;
  height: 300px;
  margin: -150px 0 0 -150px;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: #3498DB;
   -webkit-animation: spin 1.5s linear infinite; /* Chrome, Opera 15+, Safari 5+ */
  animation: spin 1.5s linear infinite; /* Chrome, Firefox 16+, IE 10+, Opera */
  z-index: 1001;
}
  #quotes{
    color: white;
    font-size: 5vw;
    display: block;
    position: relative;
    left: 6%;
    top: 10%;
    z-index: 1001;
  }
  #quotes img{
    position: absolute;
    left: 25%;
    top:15%;
    width: 30%;
    z-index: -1;
  }
  #loader::before{
    content: "";
    position: absolute;
    top: 5px;
    left: 5px;
    right: 5px;
    bottom: 5px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: #E74C3C;
     -webkit-animation: spin 3s linear infinite; /* Chrome, Opera 15+, Safari 5+ */
    animation: spin 3s linear infinite; /* Chrome, Firefox 16+, IE 10+, Opera */
  }
  #loader::after{
    content: "";
    position: absolute;
    top: 15px;
    left: 15px;
    right: 15px;
    bottom: 15px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: #F9C927;
     -webkit-animation: spin 1.5s linear infinite; /* Chrome, Opera 15+, Safari 5+ */
    animation: spin 1.5s linear infinite; /* Chrome, Firefox 16+, IE 10+, Opera */
  }
  @-webkit-keyframes spin {
    0% {
       -webkit-transform: rotate(0deg);
       -ms-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
       -webkit-transform: rotate(360deg);
       -ms-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes spin {
    0% {
       -webkit-transform: rotate(0deg);
       -ms-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
       -webkit-transform: rotate(360deg);
       -ms-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  #loader-wrapper .loader-section {
    position: fixed;
    top: 0;
    width: 51%;
    height: 100%;
    background: #262626;
    z-index: 1000;
  }
  #loader-wrapper .loader-section.section-left{
    left: 0;
  }
  #loader-wrapper .loader-section.section-right{
    right: 0;
  }
  .loaded #loader-wrapper .loader-section.section-left{
     -webkit-transform: translateX(-100%);
     -ms-transform: translateX(-100%);
    transform: translateX(-100%);

     -webkit-transition: all 0.7s 0.3s cubic-bezier(0.645, 0.045, 0.355, 1.000);  /* Android 2.1+, Chrome 1-25, iOS 3.2-6.1, Safari 3.2-6  */
    transition: all 0.7s 0.3s cubic-bezier(0.645, 0.045, 0.355, 1.000);  /* Chrome 26, Firefox 16+, iOS 7+, IE 10+, Opera, Safari 6.1+  */
  }
  .loaded #loader-wrapper .loader-section.section-right{
     -webkit-transform: translateX(100%);
     -ms-transform: translateX(100%);
    transform: translateX(100%);

     -webkit-transition: all 0.7s 0.3s cubic-bezier(0.645, 0.045, 0.355, 1.000);  /* Android 2.1+, Chrome 1-25, iOS 3.2-6.1, Safari 3.2-6  */
    transition: all 0.7s 0.3s cubic-bezier(0.645, 0.045, 0.355, 1.000);  /* Chrome 26, Firefox 16+, iOS 7+, IE 10+, Opera, Safari 6.1+  */
  }
  .loaded #loader{
    opacity: 0;
     -webkit-transition: all 0.3s ease-out;  /* Android 2.1+, Chrome 1-25, iOS 3.2-6.1, Safari 3.2-6  */
    transition: all 0.3s ease-out;  /* Chrome 26, Firefox 16+, iOS 7+, IE 10+, Opera, Safari 6.1+  */
  }
  .loaded #quotes{
    opacity: 0;
     -webkit-transition: all 0.7s ease-out;  /* Android 2.1+, Chrome 1-25, iOS 3.2-6.1, Safari 3.2-6  */
    transition: all 0.7s ease-out;  /* Chrome 26, Firefox 16+, iOS 7+, IE 10+, Opera, Safari 6.1+  */
  }
  .loaded #loader-wrapper {
    visibility: hidden;
    -webkit-transform: translateY(-100%);
    -ms-transform: translateY(-100%);
    transform: translateY(-100%);

    -webkit-transition: all 0.3s 1s ease-out; /* Android 2.1+, Chrome 1-25, iOS 3.2-6.1, Safari 3.2-6  */
    transition: all 0.3s 1s ease-out; /* Chrome 26, Firefox 16+, iOS 7+, IE 10+, Opera, Safari 6.1+  */
  }
 .headline{
    color: honeydew;
   padding: 410px 0;
   text-align: center;
  }
  h3{
    text-align: center;
    font-size: 18px;
    padding: 10px 0;
  }
  h1{
    padding: 10px 0;
    color:gray;
  }
</style>
