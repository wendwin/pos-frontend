document.getElementById("myForm").onsubmit = function (event) {
  event.preventDefault(); // Mencegah pengiriman form secara otomatis

  Swal.fire({
    title: "Pesanan Berhasil",
    text: "Kembalian: Rp. 6.000",
    icon: "success",
  });
};

document.addEventListener("alpine:init", () => {
  Alpine.data("dataItems", () => ({
    itemsProduk: [],
    // fetch api 8000
    itemMakananList() {
      fetch("http://127.0.0.1:8000/items/makanan/")
        .then((resp) => resp.json())
        .then((data) => {
          this.itemsProduk = data;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    itemMinumanList() {
      fetch("http://127.0.0.1:8000/items/minuman/")
        .then((resp) => resp.json())
        .then((data) => {
          this.itemsProduk = data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  }));

  Alpine.store("cartData", {
    items: [],

    // total keseluran
    total: 0,
    quantity: 0,

    getListItem() {
      let getCart = JSON.parse(localStorage.getItem("cart"));
      this.items = getCart;
    },

    add(newItem) {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      let existingProduct = cart.find(
        (item) => item.id_item === newItem.id_item
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
        existingProduct.total += parseInt(existingProduct.harga);
        this.quantity++;
        this.total += parseInt(newItem.harga);
      } else {
        cart.push({
          id_item: newItem.id_item,
          nama_item: newItem.nama_item,
          nama_kategori: newItem.nama_kategori,
          harga: newItem.harga,
          gambar: newItem.gambar,
          quantity: 1,
          total: parseInt(newItem.harga),
        });
        this.quantity++;
        this.total += parseInt(newItem.harga);
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      let getCart = JSON.parse(localStorage.getItem("cart"));
      this.items = getCart;
    },

    kurang(itemKurang) {
      let cart = JSON.parse(localStorage.getItem("cart"));

      let existingProduct = cart.find(
        (item) => item.id_item === itemKurang.id_item
      );

      if (existingProduct) {
        if (existingProduct.quantity > 1) {
          existingProduct.quantity -= 1;
          existingProduct.total -= parseInt(itemKurang.harga);
          this.quantity--;
          this.total -= parseInt(itemKurang.harga);
        }
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      this.getListItem();
    },

    delete(itemDelete) {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      // let existingProduct = cart.filter(
      //   (item) => item.id_item !== itemDelete.id_item
      // );
      let existingProductIndex = cart.findIndex(
        (item) => item.id_item === itemDelete.id_item
      );

      if (existingProductIndex !== -1) {
        let existingProduct = cart[existingProductIndex];

        if (cart.length > 1) {
          if (existingProduct.quantity > 1) {
            this.total -= existingProduct.total;
            existingProduct.quantity -= 1;
            existingProduct.total =
              existingProduct.quantity * parseInt(itemDelete.harga);
            cart.splice(existingProductIndex, 1);
          } else {
            this.total -= parseInt(itemDelete.harga);
            cart.splice(existingProductIndex, 1);
          }
        } else {
          if (existingProduct.quantity > 1) {
            this.total -= existingProduct.total;
            existingProduct.quantity -= 1;
            existingProduct.total =
              existingProduct.quantity * parseInt(itemDelete.harga);
            cart.splice(existingProductIndex, 1);
          } else {
            this.total -= parseInt(itemDelete.harga);

            cart.splice(existingProductIndex, 1);
          }
        }
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      this.getListItem();
    },
  });
});
