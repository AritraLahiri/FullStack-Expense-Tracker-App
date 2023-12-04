const form = document.getElementById("expenseForm");
const itemList = document.getElementById("showExpenses");
const showAllUserExpenses = document.getElementById("showAllUserExpenses");
const btnBuyPremium = document.getElementById("btnBuyPremimum");
const btnDownloadReport = document.getElementById("btnDownloadReport");
const premiumUserText = document.getElementById("premiumUserTxt");
const btnLeaderBoard = document.getElementById("btnshowLeaderBoard");
const divLeaderBoard = document.getElementById("leaderBoard");
const divReport = document.getElementById("reportSection");
loadPremiumFeatures();

btnBuyPremium.addEventListener("click", async function (e) {
  const token = localStorage.getItem("userId");
  const response = await axios.get("http://localhost:3000/order/buypremium", {
    headers: { Authorization: token },
  });
  var options = {
    key: response.data.key_id,
    order_id: response.data.order.id,
    handler: async function (response) {
      await axios.post(
        "http://localhost:3000/order/updatetransactionstatus",
        {
          order_id: options.order_id,
          payment_id: response.razorpay_payment_id,
        },
        { headers: { Authorization: token } }
      );
      localStorage.setItem("isPremiumUser", true);
      alert("Premium purchased");
      btnBuyPremium.style.visibility = "hidden";
      loadPremiumFeatures();
    },
  };
  var rzp1 = new Razorpay(options);
  rzp1.open();
  e.preventDefault();
});

btnLeaderBoard.addEventListener("click", (e) => {
  divLeaderBoard.hidden = false;
  axios
    .get("http://localhost:3000/expense/getalluserexpenses", {
      headers: { Authorization: localStorage.getItem("userId") },
    })
    .then((expense) => {
      for (const exp of expense.data) {
        let expenseAmount = exp.totalExpense;
        let userName = exp.name;
        let li = document.createElement("li");
        li.className = "list-group-item";
        li.appendChild(
          document.createTextNode(
            `Name - ${userName} Total-Expense : ${expenseAmount}`
          )
        );
        showAllUserExpenses.appendChild(li);
      }
    })
    .catch((err) => console.log(err));
});

form.addEventListener("submit", addExpense);
getAllExpensesFromAPI();

function addExpense(e) {
  e.preventDefault();
  const amount = document.getElementById("expenseAmount").value;
  const description = document.getElementById("expenseDesc").value;
  const category = document.getElementById("expenseCategory").value;
  const expenseObj = { amount, description, category };
  axios
    .post("http://localhost:3000/expense/addexpense", expenseObj, {
      headers: { Authorization: localStorage.getItem("userId") },
    })
    .then((response) => {
      if (response.data.success) {
        let newItem = amount;
        let newItemDesc = description;
        let newItemCategory = category;
        let li = document.createElement("li");
        li.className = "list-group-item";
        li.appendChild(document.createTextNode(newItem));
        li.appendChild(document.createTextNode(" " + newItemDesc));
        li.appendChild(document.createTextNode(" " + newItemCategory + "  "));
        let deleteBtn = document.createElement("button");
        deleteBtn.className = "btn btn-danger btn-sm";
        deleteBtn.appendChild(document.createTextNode("Delete"));
        deleteBtn.addEventListener("click", function () {
          if (confirm("Do you want to delete expense?")) {
            axios
              .delete(`http://localhost:3000/expense/${response.data.id}`)
              .then((response) => {
                console.log(response);
                itemList.removeChild(this.parentElement);
              })
              .catch((err) => console.log(err));
          }
        });
        li.appendChild(deleteBtn);
        itemList.appendChild(li);
      }
    })
    .catch((err) => console.log(err));
}

function getAllExpensesFromAPI() {
  axios
    .get("http://localhost:3000/expense/getexpense", {
      headers: { Authorization: localStorage.getItem("userId") },
    })
    .then((expense) => {
      for (const exp of expense.data) {
        let newItem = exp.amount;
        let newItemDesc = exp.description;
        let newItemCategory = exp.category;
        let li = document.createElement("li");
        li.className = "list-group-item";
        li.appendChild(document.createTextNode(newItem));
        li.appendChild(document.createTextNode(" " + newItemDesc));
        li.appendChild(document.createTextNode(" " + newItemCategory + "  "));
        let deleteBtn = document.createElement("button");
        deleteBtn.className = "btn btn-danger btn-sm";
        deleteBtn.appendChild(document.createTextNode("Delete"));
        deleteBtn.addEventListener("click", function () {
          if (confirm("Do you want to delete expense?")) {
            axios
              .delete(`http://localhost:3000/expense/${exp.id}`, {
                headers: { Authorization: localStorage.getItem("userId") },
              })
              .then((response) => {
                console.log(response);
                itemList.removeChild(this.parentElement);
              })
              .catch((err) => console.log(err));
          }
        });
        li.appendChild(deleteBtn);
        itemList.appendChild(li);
      }
    })
    .catch((err) => console.log(err));
}

function loadPremiumFeatures() {
  if (localStorage.getItem("isPremiumUser") != "null") {
    premiumUserText.hidden = false;
    btnLeaderBoard.hidden = false;
    btnDownloadReport.hidden = false;
    divReport.hidden = false;
    btnBuyPremium.hidden = true;
  }
}
