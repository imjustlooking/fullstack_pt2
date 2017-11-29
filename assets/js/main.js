var modTog = Vue.component('modaltoggle', {
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
      this.$http.get(`https://floating-peak-67345.herokuapp.com/orders/${orderId}`)
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
        console.log(response.data.orders)
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
      fooditems: []
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
              <form>
              <div v-for="orderitem in orderitems">
                <p> {{orderitem.name}} </p>
                <input type="radio" id="ratingChoice1" name="rating" value="1">
                <label for="ratingChoice1">&#128077; </label>
                <input type="radio" id="ratingChoice2" name="rating" value="-1">
                <label for="ratingChoice2">&#128078; </label>
                <input type='text' name='feedback' size='45' placeholder='Feel free to leave us feedback'>
              </div><br>
              <input type="submit" value="Submit">
              </form>
            </slot>
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
    fooditem: function () {
      console.log('this order id', this.order_id)
      this.$http.get('https://floating-peak-67345.herokuapp.com/orders')
      .then(response => {
        this.items = response.data.orders
        console.log('response from fooditem', response.data.orders)
      },
      response => {
        console.log(response)
      })
    }
  }
})
