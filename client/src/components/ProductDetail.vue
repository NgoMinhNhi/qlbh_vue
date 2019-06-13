<template>
    <div>
        <div class="product-details"><!--product-details-->
            <div class="col-sm-5">
                <div class="view-product">
                    <img :src="product.imgSrc" alt="" />
                    <h3>ZOOM</h3>
                </div>
                <div id="similar-product" class="carousel slide" data-ride="carousel">
                    
                        <!-- Wrapper for slides -->
                        <div class="carousel-inner">
                            <div class="item active">
                                <a href=""><img src="./../assets/images/product-details/similar1.jpg" alt=""></a>
                                <a href=""><img src="./../assets/images/product-details/similar2.jpg" alt=""></a>
                                <a href=""><img src="./../assets/images/product-details/similar3.jpg" alt=""></a>
                            </div>
                            
                        </div>
                </div>

            </div>
            <div class="col-sm-7">
                <div class="product-information"><!--/product-information-->
                    <img src="" class="newarrival" alt="" />
                    <h2>{{product.name}}</h2>
                    <p>Web ID: 1089772</p>
                    <img src="./../assets/images/product-details/rating.png" alt="" />
                    <span>
                        <span>US ${{product.price}}</span>
                        <label>Quantity:</label>
                        <input type="text" value="1" />
                        <button type="button" class="btn btn-fefault cart">
                            <i class="fa fa-shopping-cart"></i>
                            Add to cart
                        </button>
                    </span>
                    <p><b>Availability:</b> In Stock</p>
                    <p><b>Condition:</b> {{product.condition}}</p>
                    <p><b>Brand:</b> {{product.brand}}</p>
                    <a href=""><img src="./../assets/images/product-details/share.png" class="share img-responsive"  alt="" /></a>
                </div><!--/product-information-->
            </div>
        </div><!--/product-details-->
        <div class="category-tab shop-details-tab"><!--category-tab-->
						<div class="col-sm-12">
							<ul class="nav nav-tabs">
								<li><a href="#details" data-toggle="tab">Details</a></li>
								<!-- <li><a href="#companyprofile" data-toggle="tab">Company Profile</a></li>
								<li><a href="#tag" data-toggle="tab">Tag</a></li>
								<li class="active"><a href="#reviews" data-toggle="tab">Reviews (5)</a></li> -->
							</ul>
						</div>
						<div class="tab-content">
							<div class="tab-pane fade active in" id="reviews" >
								<div class="col-sm-12">
									<ul>
										<li><a href=""><i class="fa fa-user"></i>EUGEN</a></li>
										<li><a href=""><i class="fa fa-clock-o"></i>12:41 PM</a></li>
										<li><a href=""><i class="fa fa-calendar-o"></i>31 DEC 2014</a></li>
									</ul>
									<p>{{product.description}}</p>
									<p><b>Write Your Review</b></p>
									
									<form action="#">
										<span>
											<input type="text" placeholder="Your Name"/>
											<input type="email" placeholder="Email Address"/>
										</span>
										<textarea name="" ></textarea>
										<b>Rating: </b> <img src="./../assets/images/product-details/rating.png" alt="" />
										<button type="button" class="btn btn-default pull-right">
											Submit
										</button>
									</form>
								</div>
							</div>
							
						</div>
					</div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return {
            product: []
        }
    },
    created() {
        console.log("Component : ProductDetail has been initialized !")
    },
    mounted() {
        this.fetchProduct();
    },
    methods: {
        async fetchProduct(){
            return axios({
                method: 'get',
                url: `http://localhost:3000/products/${this.$route.params.id}`
            }).then((response) => {
                this.product = response.data
            }).catch((error) => {
                console.log(error)
            })
        }
    },
}
</script>

<style scoped>
.col-sm-12 {
    text-align: left;
}
.product-information h2 {
    text-align: left;
    font-size: 33px !important;
    font-weight: bold;
}

.product-information p {
    text-align: left;
    font-size: 20px !important;
}

.product-information img {
    width: 109px;
}

img.share.img-responsive {
    width: 260px;
}
</style>
