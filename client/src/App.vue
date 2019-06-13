<template>
  <div id="app">
    <header-page />
    <div class="container">
        <div class="row">
        <div class="col-md-3">
          <left-side-bar 
              v-on:changeMaxPrice="updateMaxPrice($event)" 
              v-on:chooseTypeCondition="updateType($event)"
            />
        </div>
        <div class="col-md-9 padding-right">
          <router-view :max-price="maxPrice" :type-condition="typeCondition"/>
        </div>
      </div>
    </div>
    <footer-page />
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
import LeftSideBar from './components/LeftSideBar'
export default {
  name: 'App',
  data(){
    return{
      maxPrice : '150',
      typeCondition: true,
    }
  },
  methods: {
    updateMaxPrice(price){
      this.maxPrice = price
    },
    updateType(type){
      this.typeCondition = type
    }
  },
  components:{
    headerPage: Header,
    footerPage: Footer,
    leftSideBar: LeftSideBar,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>
