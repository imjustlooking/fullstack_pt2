var modTog = Vue.component('modaltoggle', {
  props: ['item'],
  template: `
  <div>
    <button @click="onShowModal"> Submit Feedback </button>
     <modal :item="item" v-if="showModal" @close="showModal = false">
       <h3 slot="header">Hi Prima! How was your order {{ item.order_id }} between {{ item.delivery_time}} on {{item.delivery_date}}?</h3>
       <p slot="header"> Your feedback will help us improve and design exciting new meals in the future. <br> Need help urgently? Send us an email or call us at +65 3163 5335.</p>
     </modal>
  </div>
  `,
  data () {
    return {
      showModal: false
    }
  },
  methods: {
    onShowModal: function () {
      console.log('pre button',this)
      console.log(this.showModal)
      this.showModal = true
      console.log('post button',this)
      console.log('testing component method')
      console.log(this.showModal)
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
      },
      response => {
        console.log(response)
      })
    }
  }
})
orders.load()

Vue.component('modal', {
  props: ['item'],
  template: `<transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              <h3> Hi Prima! How was your order {{ item.order_id }} between {{ item.delivery_time}} on {{item.delivery_date}}? </h3>
              <p> Your feedback will help us improve and design exciting new meals in the future. <br> Need help urgently? Send us an email or call us at +65 3163 5335.</p>
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              default body
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              default footer
              <button class="modal-default-button" @click="$emit('close')">
                OK
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>`
})
