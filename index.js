const $ = document.querySelector.bind(document),
  dvp = $("#loan"),
  ip = $(".progress-interest"),
  tp = $(".progress-time"),
  dv = $(".loan-price"),
  tl = $(".loan-money"),
  tlp = $(".loan-percent-item"),
  interest = $("#interest"),
  time = $("#time"),
  formatOutput = (b) =>
    b
      .toFixed()
      .replace(/\D/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
  formatInput = (a) =>
    a.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ","),
  toNum = (a) => (a = +a.replaceAll(",", ""));
let loanAPercent = 0;
(dv.oninput = () => (
  (dv.value = formatInput(dv.value)),
  (tl.value = 0),
  (loanAPercent = toNum(dv.value) / 100),
  loanAPercent
)),
  (ip.oninput = () =>
    20 < toNum(ip.value) ? (ip.value = 0) : void (interest.value = ip.value)),
  (tp.oninput = () => {
    if (((time.value = tp.value), 500 < toNum(tp.value))) return (tp.value = 0);
  }),
  (tlp.innerText = loan.value + "%"),
  (dvp.oninput = () => {
    (tlp.innerText = dvp.value + "%"),
      (tl.value = formatOutput(loanAPercent * dvp.value));
  }),
  (tl.oninput = () => {
    tl.value = formatInput(tl.value);
    let b = (100 * (toNum(tl.value) / toNum(dv.value))).toFixed(2);
    100 >= b
      ? ((dvp.value = b), (tlp.innerText = b.replace(".0", "") + "%"))
      : ((tl.value = dv.value), (tlp.innerText = "100%"), (dvp.value = 100));
  }),
  (ip.value = interest.value),
  (interest.oninput = () => {
    ip.value = interest.value;
  }),
  (time.oninput = () => {
    tp.value = time.value;
  }),
  $(".loan_btn").addEventListener("click", () => {
    const a = ip.value / 12,
      b = toNum(tl.value),
      c = toNum(tp.value),
      d = toNum(dv.value),
      e = d - b;
    if (0 < a && 0 < b && 0 < c && 0 < d) {
      (tbodyHTML = ""),
        ($(".loan_table").style.display = "block"),
        ($(".loan_information").style.display = "flex");
      const d = $("tbody");
      d.innerHTML = "";
      let f = (gop = loanAll = goc = lai = 0),
        g = "";
      for (let d = 1; d < c + 1; d++)
        (goc = b - (b / c) * d),
          (lai = (b - (b / c) * (d - 1)) * (a / 100)),
          (gop = b / c + lai),
          (f += lai),
          (loanAll += gop),
          (tbodyHTML = `<tr>
               <th>Tháng thứ ${d}</th>
               <th>${formatOutput(goc)}</th>
               <th>${formatOutput(b / c)}</th>
               <th>${formatOutput(lai)}</th>
               <th>${formatOutput(gop)}</th>
                      </tr>`),
          (g += tbodyHTML);
      (d.innerHTML = g),
        ($(".loan-interestall").innerHTML = $(".loan-interest-sum").innerHTML =
          formatOutput(f) + " đ"),
        ($(".loan-all").innerHTML = formatOutput(loanAll) + " đ"),
        ($(".loan-prepay").innerHTML =
          ` (${100 - 1 * dvp.value}%)       ` + formatOutput(e) + " đ"),
        ($(".loan-pay").innerHTML = formatOutput(loanAll + e) + " đ"),
        ($(".loan-firstmonth").innerHTML =
          formatOutput(b / c + (b - 0 * (b / c)) * (a / 100)) + " đ"),
        ($(".loan-lastmonth").innerHTML =
          formatOutput(b / c + (b - (b / c) * (c - 1)) * (a / 100)) + " đ");
    } else alert("Vui lòng nhập dủ thông tin dự toán");
  });
