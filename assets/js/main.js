Vue.component('modaltoggle', {
  props: ['order'],
  template: `
  <div>
    <button @click="onShowModal();fooditem()"> Submit Feedback {{order.order_id}} </button>
     <modal :order='order' :orderitems='orderitems' v-if="showModal" @close="showModal = false">
     </modal>
  </div>
  `,
  data () {
    return {
      showModal: false,
      orderitems: []
    }
  },
  methods: {
    onShowModal: function () {
      this.showModal = true
    },
    fooditem: function () {
      var orderId = this.order.order_id
      console.log('this is the one')
      this.$http.get(`http://localhost:4000/orders/${orderId}`)
      .then(response => {
        // this.items = response.data.orders
        this.orderitems = response.data.order[0].order_items
        console.log('response from fooditem', response.data.order[0].order_items)
      },
      response => {
        console.log(response)
      })
    }
  }
})

var orders = new Vue({
  el: '#order-display',
  data () {
    return {
      items: []
    }
  },
  methods: {
    load: function () {
      this.$http.get('https://floating-peak-67345.herokuapp.com/orders')
      .then(response => {
        this.items = response.data.orders
        console.log('order list', response.data.orders)
      },
      response => {
        console.log(response)
      })
    }
  }
})
orders.load()

Vue.component('modal', {
  props: ['order', 'orderitems'],
  data () {
    return {
      comment: [],
      rating: [],
      ratable_id: []
    }
  },
  template: `<transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              <h3> Hi Prima! How was your order {{ order.order_id }} between {{ order.delivery_time}} on {{order.delivery_date}}? </h3>
              <p> Your feedback will help us improve and design exciting new meals in the future. <br> Need help urgently? Send us an email or call us at +65 3163 5335.</p>
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              <div id="formSubmit">
                <form v-on:submit.prevent="getFormValues">
              <div v-for="(orderitem,index) in orderitems">
                <p> {{orderitem.name}} {{orderitem.order_item_id}}</p>
                  <input type="hidden" v-model='ratable_id[index]' v-bind:value='orderitem.order_item_id'>
                  <input type="radio" v-model='rating[index]' value=1>
                  <label for="ratingChoice1">&#128077;</label>
                  <input type="radio" v-model='rating[index]' value=-1>
                  <label for="ratingChoice2">&#128078; </label>
                  <input type='text' v-model='comment[index]' name='feedback' size='45' placeholder='Feel free to leave us feedback'>
              </div><br>
              <button>Submit</button>
            </form>
              </div>
            </slot>
            {{comment}}
            {{rating}}
            {{ratable_id}}
          </div>

          <div class="modal-footer">
            <slot name="footer">
              default footer
              <button class="modal-default-button" @click="$emit('close')">
                X
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
  `,
  methods: {
    getFormValues: function () {
      console.log('comment', this.comment)
      console.log('rating', this.rating)
      var orderId = this.order.order_id
      console.log('order_id', orderId)
      this.$http.post(`http://localhost:4000/orders/${orderId}/feedbacks`, [this.comment, this.rating]).then(response => {
        // get status
        response.status
        // get status text
        response.statusText
        // get 'Expires' header
        response.headers.get('Expires')
        // get body data
        this.someData = response.body
      }, response => {
        // error callback
      });
    }
  }
})
