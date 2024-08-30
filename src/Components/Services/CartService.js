let uniqueItems = [];
let duplicates = [];
let currentCart = [];

const CartService = {
    calculateTotal: function(cart) {
        let total = 0;
        cart.map((item) => (total += item.price));
        return total;
    },
    processDuplicates: function(cart) {
        uniqueItems = [];
        duplicates = [];
        cart.sort((a, b) => {
          if (a.id > b.id) return 1;
          else if (b.id > a.id) return -1;
          return 0;
        });
    
        let counter = 1;
        let index = 0;
    
        for (let i = 0; i < cart.length; i++) {
          if (!contains(uniqueItems, cart[i]))
            uniqueItems.push(cart[i]);
          for (let j = i + 1; j < cart.length; j++) {
            if (cart[i].id !== cart[j].id) {
              duplicates[index++] = counter;
              i = j - 1;
              counter = 1;
              break;
            }
            duplicates[index] = ++counter;
          }
          if (duplicates[index] === cart.length) {
            break;
          }
          if (i === cart.length - 1) duplicates[index] = counter;
        }
        return this.mapQuantities();
      },
      mapQuantities: function mapQuantities() {
        currentCart = [];
        for (let i = 0; i < uniqueItems.length; i++) {
          currentCart[i] = {
            item: uniqueItems[i],
            quantity: duplicates[i],
          };
        }
        return currentCart;
      }
}

function contains(cart, item) {
    
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id === item.id) {
        return true;
      }
    }
    return false;
  }

export default CartService;