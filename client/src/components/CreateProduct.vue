<template>
<div class="wrap-form">
    <v-form v-model="valid" ref="form" lazy-validation enctype="multipart/form-data">
        <h1>Insert Product</h1>
        <v-text-field
            label="Name Product"
            v-model="name"
            required
        ></v-text-field>
        <v-text-field
            label="Price"
            v-model="price"
            required
        ></v-text-field>
        <v-text-field
            label="Brand"
            v-model="brand"
            required
        ></v-text-field>
        <v-radio-group v-model="condition" label="Condition">
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
            v-model="description"
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
    </v-form>
</div>
    
</template>

<script>
import axios from 'axios';
import swal from 'sweetalert';
export default {
    data(){
        return {
            title: "Image Upload",
            dialog: false,
            imageName: '',
            imageUrl: '',
            imageFile: '',
            valid: true,
            name: '',
            price: '',
            description: '',
            condition: '',
            condition_choose : ['Normal', 'New', 'Sale'],
            brand: '',
            selectFile: null
        }
    },
    created() {
        console.log("Component : CreateProduct has been initialized !")
    },
    methods: {
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
                // add proccess here
                let fd = await new FormData();
                fd.append('name', this.name)
                fd.append('price', this.price)
                fd.append('description', this.description)
                fd.append('brand', this.brand)
                fd.append('condition', this.condition)
                fd.append('file', this.selectFile);
                const config = { headers: { 'Content-Type': 'multipart/form-data' } };
                return await axios.post("http://localhost:3000/products",fd, config)
                            .then(()=> {
                                swal( 
                                    'Great !',
                                    'Product added successfully!',
                                    'success',
                                )
                                this.$router.go(-1)
                            })
            }
            return true;
        },
        clear() {
            this.$refs.form.reset();
        },
    }
}
</script>

<style scoped>
.wrap-form {
    width: 75%;
    margin: auto;
}
</style>
