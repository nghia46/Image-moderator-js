function testImage() {
  var input = document.getElementById("imageInput");
  var file = input.files[0];

  if (!file) {
    alert("Please select an image file.");
    return;
  }

  var formData = new FormData();
  formData.append("file", file);
  formData.append("key", "c594caf54c87c054ced68b7490684287");

  $.ajax({
    url: "https://api.moderatecontent.com/moderate/",
    type: "POST",
    data: formData,
    contentType: false,
    processData: false,
    success: function (response) {
      displayResults(response);
    },
    error: function (xhr, status, error) {
      console.error("Error:", error);
    },
  });

  var reader = new FileReader();
  reader.onload = function (event) {
    var img = document.getElementById("selectedImage");
    img.src = event.target.result;
    img.style.display = "block";
  };
  reader.readAsDataURL(file);
}
function displayResults(response) {
  console.log(response.predictions);

  var adult = document.getElementById("adult");
  var teen = document.getElementById("teen");
  var everyone = document.getElementById("everyone");

  adult.textContent = "Adult: " + response.predictions.adult.toFixed(2) + "%";
  teen.textContent = "Teen: " + response.predictions.teen.toFixed(2) + "%";
  everyone.textContent =
    "Everyone: " + response.predictions.everyone.toFixed(2) + "%";
}
