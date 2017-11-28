var test = {}
var orders = new Vue({
  el: '#hello-world-app',
  data () {
    return {
      items: []
    }
  },
  methods: {
    greet: function () {
      orders.$http.get('https://floating-peak-67345.herokuapp.com/orders')
      .then(response => {
        this.items = response.data.orders
      },
      response => {
        console.log(response)
      })
    }
  }
})

orders.greet()

// Vue.component('order-list')
