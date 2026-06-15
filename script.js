const filterButtons = document.querySelectorAll(".tab-btn");
const galleryItems = document.querySelectorAll(".gallery-item");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        // hapus active lama
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        // kasih active baru
        button.classList.add("active");

        const filter = button.dataset.filter;

        galleryItems.forEach(item => {

            if (
                filter === "all" ||
                item.dataset.type === filter
            ) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }

        });

    });

});
function showGallery(type){

  const items =
  document.querySelectorAll('.gallery-item');

  items.forEach(item => {

    if(item.dataset.type === type){
      item.style.display = "block";
    }else{
      item.style.display = "none";
    }

  });

}