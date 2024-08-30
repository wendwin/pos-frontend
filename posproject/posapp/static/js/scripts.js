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
          console.log(data);
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
          console.log(data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  }));
});
