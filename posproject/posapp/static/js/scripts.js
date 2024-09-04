document.getElementById("myForm").onsubmit = function (event) {
  event.preventDefault();

  Swal.fire({
    title: "Pesanan Berhasil",
    text: "Kembalian: Rp. 6.000",
    icon: "success",
  });
};

const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
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
    customer: "",
    nominal: "",
    message: "",

    // total keseluran
    total: 0,
    quantity: 0,

    getMessage() {
      let message = sessionStorage.getItem("flashMessage");
      if (message) {
        this.message = message;
      } else {
        return false;
      }
    },

    getListItem() {
      let getCart = JSON.parse(localStorage.getItem("cart"));
      this.items = getCart;
    },

    getTotalPay() {
      let getTotalPay = JSON.parse(localStorage.getItem("totalPay"));
      this.total = getTotalPay;
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

      let totalPay = cart.reduce(
        (sum, item) => sum + parseFloat(item.total),
        0
      );

      localStorage.setItem("cart", JSON.stringify(cart));
      localStorage.setItem("totalPay", totalPay);

      let getCart = JSON.parse(localStorage.getItem("cart"));
      this.items = getCart;
      let getTotalPay = JSON.parse(localStorage.getItem("totalPay"));
      this.total = getTotalPay;
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

      let totalPay = cart.reduce(
        (sum, item) => sum + parseFloat(item.total),
        0
      );

      localStorage.setItem("cart", JSON.stringify(cart));
      localStorage.setItem("totalPay", totalPay);
      let getTotalPay = JSON.parse(localStorage.getItem("totalPay"));
      this.total = getTotalPay;
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

      let totalPay = cart.reduce(
        (sum, item) => sum + parseFloat(item.total),
        0
      );

      localStorage.setItem("cart", JSON.stringify(cart));
      localStorage.setItem("totalPay", totalPay);
      let getTotalPay = JSON.parse(localStorage.getItem("totalPay"));
      this.total = getTotalPay;
      this.getListItem();
    },

    order() {
      const now = new Date().toISOString();
      const storedData = JSON.parse(localStorage.getItem("cart"));
      const storedPay = JSON.parse(localStorage.getItem("totalPay"));

      if (this.nominal >= storedPay) {
        const data = {
          tgl_pesanan: now,
          sub_total: "0",
          pajak: "0",
          total: storedPay,
          status: "baru",
          customer: this.customer,
          pesanan_items: storedData.map((item) => ({
            id_item: item.id_item,
            quantity: item.quantity,
            harga_item: item.harga,
            total_harga: item.total,
          })),
        };

        fetch("http://127.0.0.1:8000/create-pesanan/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((data) => console.log("Success:", data))
          .catch((error) => console.error("Error:", error));
      } else {
        message = "Nominal tidak sesuai!";
        sessionStorage.setItem("flashMessage", message);
        window.location.reload();
      }
      // items = storedData.map((item) => {
      //   if (this.nominal >= item.total) {

      // } else {
      //   message = "Nominal tidak sesuai!";
      //   sessionStorage.setItem("flashMessage", message);
      //   window.location.reload();
      // }
      // });
    },
  });
});
