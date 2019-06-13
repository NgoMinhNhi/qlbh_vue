<template>
    <div>
         
        <div class="features_items"><!--features_items-->
            <h2 class="title text-center">Features Items</h2>

            <div class="row">
                <h2 class="type-filter">Filter : {{typeFilter(typeCondition)}}</h2>
            <div v-for="(product, index) in products" :key="index">
            <div v-if="(parseInt(product.price)<= parseInt(maxPrice)) && ((product.condition == typeCondition) ||typeCondition==true)" class="col-sm-4">
                <div class="product-image-wrapper">
                    <div class="single-products">
                            <div class="productinfo text-center">
                                <img :src="product.imgSrc" alt="" />
                                <h2>${{product.price}}</h2>
                                <p>{{product.name}}</p>
                                <a href="#" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Add to cart</a>
                            </div>
                            <div class="product-overlay">
                                <div class="overlay-content">
                                    <h2>${{product.price}}</h2>
                                    <p>{{product.name}}</p>
                                    <a href="#" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Add to cart</a>
                                </div>
                            </div>
                            <img v-if="product.condition== 'Sale'" src="./../assets/images/home/sale.png" class="new" alt="" />
                            <img v-if="product.condition== 'New'" src="./../assets/images/home/new.png" class="new" alt="" />
                    </div>
                    <div class="choose">
                        <ul class="nav nav-pills nav-justified">
                            <li><a href="#"><i class="fa fa-plus-square"></i><router-link :to="`/products/${product._id}`">View more details</router-link></a></li>
                            <li><a href="#"><i class="fa fa-plus-square"></i><router-link :to="`/products/${product._id}/edit`">Edit product</router-link></a></li>
                        </ul>
                    </div>
                </div>
            </div>
            </div>
            </div>
            <div class="row">
                <router-link :to="{ name: 'CreateProduct'}"><a href="" class="btn-insert"> Insert Product</a></router-link>
            </div>
            
        </div>
        
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            products: [],
        }
    },

    props: ['maxPrice','typeCondition'],
    created() {
        console.log("Component : ContentHome has been initialized !")
    },
    mounted() {
        this.fetchProducts();
    },
    methods: {
        async fetchProducts(){
            return axios({
                method: 'get',
                url: 'http://localhost:3000/products'
            }).then((response) => {
                this.products = response.data
            }).catch(()=> {

            })
        },
        typeFilter(typeCondition){
            return typeCondition===true?"All":typeCondition
        }
    }
}
</script>

<style>
.product-overlay {
    background: #fe980f66;
}
a.btn-insert {
    border: 1px solid;
    padding: 5px 10px;
    font-size: 20px;
}

.category-tab {
    margin-top: 8px;
}
h2.type-filter {
    text-align: left;
    margin-left: 22px;
    font-size: 22px;
    color: grey;
}
</style>
