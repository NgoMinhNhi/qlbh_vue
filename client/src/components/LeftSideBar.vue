<template>
    <div class="">
        <div class="left-sidebar">
                <div class="price-range"><!--price-range-->
                <h2>Price Range</h2>
                <span  class="value-range">0</span>
                <input id="range-2" 
                v-model="value" 
                type="range" 
                min="0" max="150" 
                step="1" @change="changeMaxPrice">
                <span class="value-range">150</span>
                    <div class="mt-2">Max price: {{ value }}</div>
            </div><!--/price-range-->
            <h2>Type of Condition</h2>
            <div class="panel-group category-products" id="accordian"><!--category-productsr-->
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4 class="panel-title">
                            <div class="btn-choose-type" v-on:click="chooseTypeCondition(true)">
                                All types
                            </div>
                        </h4>
                    </div>
                    <div class="panel-heading">
                        <h4 class="panel-title">
                            <div class="btn-choose-type" v-on:click="chooseTypeCondition('New')">
                                New
                            </div>
                        </h4>
                    </div>
                    <div class="panel-heading">
                        <h4 class="panel-title">
                            <div class="btn-choose-type" v-on:click="chooseTypeCondition('Sale')">
                                Sale
                            </div>
                        </h4>
                    </div>
                    <div class="panel-heading">
                        <h4 class="panel-title">
                            <div class="btn-choose-type" v-on:click="chooseTypeCondition('Normal')">
                                Normal
                            </div>
                        </h4>
                    </div>
                </div>
            </div><!--/category-products-->
        
            <div class="brands_products"><!--brands_products-->
                <h2>Brands</h2>
                <div class="brands-name">
                    <ul class="nav nav-pills nav-stacked">
                        <li><a href="#"> <span class="pull-right">(50)</span>Acne</a></li>
                        <li><a href="#"> <span class="pull-right">(56)</span>Grüne Erde</a></li>
                        <li><a href="#"> <span class="pull-right">(27)</span>Albiro</a></li>
                        <li><a href="#"> <span class="pull-right">(32)</span>Ronhill</a></li>
                        <li><a href="#"> <span class="pull-right">(5)</span>Oddmolly</a></li>
                        <li><a href="#"> <span class="pull-right">(9)</span>Boudestijn</a></li>
                        <li><a href="#"> <span class="pull-right">(4)</span>Rösch creative culture</a></li>
                    </ul>
                </div>
            </div><!--/brands_products-->
            

            
            <div class="shipping text-center"><!--shipping-->
                <img src="./../assets/images/home/shipping.jpg" alt="" />
            </div><!--/shipping-->
        
        </div>
        
    </div>
</template>

<script>
export default {
    data(){
        return {
            value: '150'
        }
    },
    created() {
        console.log("Component : LeftSideBar has been initialized !")
    },
    methods: {
        changeMaxPrice(){
            this.$emit('changeMaxPrice', this.value)
        },
        chooseTypeCondition(str){
            this.$emit('chooseTypeCondition', str)
        }
    },
}
</script>

<style scoped>
    a {
        text-align: left;
    }
    h4.panel-title{
        text-align: left;
    }
    span.value-range {
    font-size: 20px;
    vertical-align: top;
    margin: 10px;
}

.mt-2 {
    font-size: 22px;
    padding-bottom: 15px;
}
.btn-choose-type {
    z-index: 1000;
    border: 1px solid grey;
    color: black;
    padding: 10px;
    text-align: center;
    font-size: 20px;
}

</style>
