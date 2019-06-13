<template>
    <div class="wrap-form">
    <v-form v-model="valid" ref="form" lazy-validation enctype="multipart/form-data">
        <h1>Edit Product</h1>
        <v-text-field
            label="Name Product"
            v-model="product.name"
            required
        ></v-text-field>
        <v-text-field
            label="Price"
            v-model="product.price"
            required
        ></v-text-field>
        <v-text-field
            label="Brand"
            v-model="product.brand"
            required
        ></v-text-field>
        <v-radio-group v-model="product.condition" label="Condition">
            <v-radio
                v-for="n in condition_choose"
                :key="n"
                :label="`${n}`"
                :value="n"
            ></v-radio>
        </v-radio-group>
        <v-textarea
            name="input-7-1"
            label="Description"
            v-model="product.description"
            hint="Hint text"
        ></v-textarea>
        <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
            <img :src="imageUrl" height="150" v-if="imageUrl"/>
            <v-text-field label="Select Image" @click='pickFile' v-model='imageName' prepend-icon='attach_file'></v-text-field>
            <input
                type="file"
                style="display: none"
                ref="image"
                accept="image/*"
                @change="onFilePicked"
            >
        </v-flex>
        <v-btn
            @click="submit"
            :disabled="!valid"
        >
            Submit
        </v-btn>
        <v-btn @click="clear">Clear</v-btn>
        <v-btn @click="deleteProduct">Delete Product</v-btn>
    </v-form>
</div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            valid:true,
            product: [],
            condition_choose : ['Normal', 'New', 'Sale'],
            imageName: '',
            imageFile: '',
            imageUrl: '',
            preImg: '',
        }
    },
    created() {
        console.log("Component : EditProduct has been initialized !")
    },
    mounted() {
        this.fetchProduct();
    },
    methods: {
        async fetchProduct(){
            return axios({
                method: 'get',
                url:`http://localhost:3000/products/${this.$route.params.id}`
            }).then((response) => {
                this.product = response.data;
                this.imageUrl= this.product.imgSrc
                this.preImg= this.product.imgSrc 
            }).catch((error) => {
                console.log(error)
            })
        },
        async getUrlImg(){
            return this.product.imgSrc
        },
        pickFile () {
            this.$refs.image.click ()
        },
		
		onFilePicked (e) {
            this.selectFile = e.target.files[0];
            const files = e.target.files
            if(files[0] !== undefined) {
				this.imageName = files[0].name
				if(this.imageName.lastIndexOf('.') <= 0) {
					return
				}
				const fr = new FileReader ()
				fr.readAsDataURL(files[0])
				fr.addEventListener('load', () => {
					this.imageUrl = fr.result
					this.imageFile = files[0] // this is an image file that can be sent to server...
				})
			} else {
				this.imageName = ''
				this.imageFile = ''
				this.imageUrl = ''
			}
        },
        async submit() {
            if (this.$refs.form.validate()) {
                let fd = await new FormData();
                fd.append('name', this.product.name)
                fd.append('price', this.product.price)
                fd.append('description', this.product.description)
                fd.append('brand', this.product.brand)
                fd.append('condition', this.product.condition)
                fd.append('preImg', this.preImg)
                if(this.imageFile !== ''){
                    fd.append('noChangeImg', '-1')
                    fd.append('file', this.selectFile);
                } else {
                    fd.append('noChangeImg', '1')
                    fd.append('file', this.selectFile);
                }
                
                const config = { headers: { 'Content-Type': 'multipart/form-data' } };
                return await axios.put(`http://localhost:3000/products/${this.$route.params.id}`,fd, config)
                            .then(() => {
                                this.$router.go(-1)
                            })
            }
            return true;
        },
        clear() {
            this.$refs.form.reset();
        },
        deleteProduct(){
            return axios.delete(`http://localhost:3000/products/${this.$route.params.id}`)
                            .then(() => {
                                this.$router.go(-1)
                            })
        }
    },
}
</script>

<style scoped>
    .col-sm-12 {
    text-align: left;
}
</style>
