	let button = document.getElementById("submit");
let input = document.getElementById("zip");
button.addEventListener("click", () => {
  let zip = input.value;
  let url = `/data?zip=${zip}`;
  fetch(url).then(response => {
    console.log("Received response headers"); // #6
    return response.json();
  }).then(body => {
    console.log("Received response body"); // #7
    console.log(body); // #8
  }).catch(error => {
    console.log(error); // #9
  });
  console.log("Sent request GET /data"); // #10
});