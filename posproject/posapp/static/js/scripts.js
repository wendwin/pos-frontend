document.getElementById("myForm").onsubmit = function (event) {
  event.preventDefault(); // Mencegah pengiriman form secara otomatis

  Swal.fire({
    title: "Pesanan Berhasil",
    text: "Kembalian: Rp. 6.000",
    icon: "success",
  });
};
