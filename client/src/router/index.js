import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/ContentHome'
import ProductDetail from '@/components/ProductDetail'
import ShoppingCart from '@/components/ShoppingCart'
import EditProduct from '@/components/EditProduct'
import CreateProduct from '@/components/CreateProduct'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/products/:id',
      name: 'Product',
      component: ProductDetail
    },
    {
      path: '/cart',
      name: 'Cart',
      component: ShoppingCart
    },
    {
      path: '/products/:id/edit',
      name: 'Edit',
      component: EditProduct
    },
    {
      path: '/product/create-product',
      name: 'CreateProduct',
      component: CreateProduct
    }
  ],
  mode: 'history',
})
