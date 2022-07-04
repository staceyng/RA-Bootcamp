import moment from "moment";

const onClick = (e) => {
  console.log("date submit clicked");
  const v = document.getElementById("date-input").value;
  const m = moment(v).format("MMM DDth,YYYY");
  console.log(m);
  document.getElementById("base").innerHTML = m;
};

document.getElementById("date-submit").onclick = onClick;
