const $ = document.querySelector.bind(document);
// __________________________Variable QuerySelector Input & Progress_________________________//
const dvp = $("#loan") /*default value progress*/,
  ip = $(".progress-interest") /* interest progress */,
  tp = $(".progress-time") /* time progress */,
  dv = $(".loan-price") /*default value*/,
  tl = $(".loan-money") /* total loan */,
  tlp = $(".loan-percent-item") /* % total loan */,
  interest = $("#interest") /* interest */,
  time = $("#time"); /* total loan time*/
// __________________________Function Handle Number_________________________//
const formatOutput = (a) => {
  return a
    .toFixed()
    .replace(/\D/g, "")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
const formatInput = (n) => {
  return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
const toNum = (p) => {
  return (p = +p.replaceAll(",", ""));
};
// __________________________Format & Handle Input Value_________________________//
let loanAPercent = 0;
dv.oninput = () => {
  dv.value = formatInput(dv.value);
  tl.value = 0;
  loanAPercent = toNum(dv.value) / 100;
  return loanAPercent;
};
ip.oninput = () => {
  if (toNum(ip.value) > 20) {
    return (ip.value = 0);
  }
  interest.value = ip.value;
};
tp.oninput = () => {
  time.value = tp.value;
  if (toNum(tp.value) > 500) {
    return (tp.value = 0);
  }
};
tlp.innerText = loan.value + "%";
dvp.oninput = () => {
  tlp.innerText = dvp.value + "%";
  tl.value = formatOutput(loanAPercent * dvp.value);
};
tl.oninput = () => {
  tl.value = formatInput(tl.value);
  let a = ((toNum(tl.value) / toNum(dv.value)) * 100).toFixed(2);
  if (a <= 100) {
    dvp.value = a;
    tlp.innerText = a.replace(".0", "") + "%";
  } else {
    tl.value = dv.value;
    tlp.innerText = 100 + "%";
    dvp.value = 100;
  }
};
ip.value = interest.value;
interest.oninput = () => {
  ip.value = interest.value;
};
time.oninput = () => {
  tp.value = time.value;
};
// __________________________Math On CLICK _________________________
$(".loan-btn").addEventListener("click", () => {
  const i = ip.value / 12,
    totalLoan = toNum(tl.value),
    t = toNum(tp.value),
    totalPrice = toNum(dv.value),
    prepay = totalPrice - totalLoan,
    firstMonth = totalLoan / t + (totalLoan - (totalLoan / t) * 0) * (i / 100),
    lastMonth =
      totalLoan / t + (totalLoan - (totalLoan / t) * (t - 1)) * (i / 100);
  if (i > 0 && totalLoan > 0 && t > 0 && totalPrice > 0) {
    let tableResults,
      tbodyHTML = "";
    $(".loan-table").style.display = "block";
    $(".loan-information").style.display = "flex";
    const tbody = $("tbody");
    tbody.innerHTML = "";
    let totalInterest = (gop = loanAll = goc = lai = 0);
    for (let index = 1; index < t + 1; index++) {
      goc = totalLoan - (totalLoan / t) * index;
      lai = (totalLoan - (totalLoan / t) * (index - 1)) * (i / 100);
      gop = totalLoan / t + lai;
      totalInterest += lai;
      loanAll += gop;
      tbodyHTML = `<tr>
               <th>Tháng thứ ${index}</th>
               <th>${formatOutput(goc)}</th>
               <th>${formatOutput(totalLoan / t)}</th>
               <th>${formatOutput(lai)}</th>
               <th>${formatOutput(gop)}</th>
                      </tr>`;
      tableResults += tbodyHTML;
    }
    tbody.innerHTML = tableResults;
    /*Tổng lãi */ $(".loan-interestall").innerHTML = $(
      ".loan-interest-sum"
    ).innerHTML = formatOutput(totalInterest) + " đ̲";
    /* Tổng trả */ $(".loan-all").innerHTML = formatOutput(loanAll) + " đ̲";
    /* Trả trước */ $(".loan-prepay").innerHTML =
      ` (${100 - dvp.value * 1}%)       ` + formatOutput(prepay) + " đ̲";
    $(".loan-pay").innerHTML = formatOutput(loanAll + prepay) + " đ̲";
    $(".loan-firstmonth").innerHTML = formatOutput(firstMonth) + " đ̲";
    $(".loan-lastmonth").innerHTML = formatOutput(lastMonth) + " đ̲";
  } else {
    alert("Vui lòng nhập đủ thông tin dự toán");
  }
});
