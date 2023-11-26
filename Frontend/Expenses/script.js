const form = document.getElementById("expenseForm");
const itemList = document.getElementById("showExpenses");
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
              .delete(`http://localhost:3000/expense/${exp.id}`)
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
