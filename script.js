// Get HTML elements
const form = document.getElementById("expenseForm");
const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const dateInput = document.getElementById("date");

const expenseList = document.getElementById("expenseList");
const totalAmount = document.getElementById("totalAmount");
const expenseCount = document.getElementById("expenseCount");
const topCategory = document.getElementById("topCategory");

const categoryFilter = document.getElementById("categoryFilter");
const sortBy = document.getElementById("sortBy");
const startDate = document.getElementById("startDate");
const endDate = document.getElementById("endDate");

const submitBtn = document.getElementById("submitBtn");
const cancelEdit = document.getElementById("cancelEdit");
const message = document.getElementById("message");

// Load saved expenses
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let editingId = null;

// Category icons
const icons = {
    Food: "🍜",
    Transport: "🚕",
    Shopping: "🛍️",
    Bills: "🧾",
    Entertainment: "🎬",
    Health: "💊",
    Education: "📚",
    Other: "✦"
};

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR"
    }).format(amount);
}

// Save expenses to LocalStorage
function saveExpenses() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

// Display a message
function showMessage(text, error = false) {
    message.textContent = text;
    message.classList.toggle("error", error);
}

// Reset the form
function resetForm() {
    form.reset();
    dateInput.value = new Date().toLocaleDateString("en-CA");
    editingId = null;
    submitBtn.textContent = "Add Expense";
    document.getElementById("formTitle").textContent = "Add Expense";
    cancelEdit.classList.add("hidden");
    showMessage("");
}

// Add or update expense
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const title = titleInput.value.trim();
    const amount = Number(amountInput.value);
    const category = categoryInput.value;
    const date = dateInput.value;

    // Validate inputs
    if (!title || !date || !Number.isFinite(amount) || amount <= 0) {
        showMessage("Please enter valid expense details.", true);
        return;
    }

    if (editingId !== null) {
        // Update existing expense
        expenses = expenses.map(function(expense) {
            if (expense.id === editingId) {
                return {
                    ...expense,
                    title: title,
                    amount: amount,
                    category: category,
                    date: date
                };
            }
            return expense;
        });

        showMessage("Expense updated!");
    } else {
        // Create a new expense
        const expense = {
            id: Date.now().toString(),
            title: title,
            amount: amount,
            category: category,
            date: date
        };

        expenses.push(expense);
        showMessage("Expense added!");
    }

    saveExpenses();
    renderExpenses();
    resetForm();
});

// Edit expense
function editExpense(id) {
    const expense = expenses.find(function(item) {
        return item.id === id;
    });

    if (!expense) return;

    editingId = id;

    titleInput.value = expense.title;
    amountInput.value = expense.amount;
    categoryInput.value = expense.category;
    dateInput.value = expense.date;

    submitBtn.textContent = "Save Changes";
    document.getElementById("formTitle").textContent = "Edit Expense";
    cancelEdit.classList.remove("hidden");

    document.querySelector(".form-section").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

// Delete expense
function deleteExpense(id) {
    const expense = expenses.find(item => item.id === id);

    if (!expense) return;

    const confirmed = confirm(
        `Are you sure you want to delete "${expense.title}"?`
    );

    if (!confirmed) return;

    expenses = expenses.filter(function(item) {
        return item.id !== id;
    });

    if (editingId === id) {
        resetForm();
    }

    saveExpenses();
    renderExpenses();
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString + "T00:00:00");

    return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });
}

// Filter and sort expenses
function getFilteredExpenses() {
    let result = [...expenses];

    // Category filter
    if (categoryFilter.value !== "All") {
        result = result.filter(function(expense) {
            return expense.category === categoryFilter.value;
        });
    }

    // Date filters
    if (startDate.value) {
        result = result.filter(function(expense) {
            return expense.date >= startDate.value;
        });
    }

    if (endDate.value) {
        result = result.filter(function(expense) {
            return expense.date <= endDate.value;
        });
    }

    // Sorting
    switch (sortBy.value) {
        case "oldest":
            result.sort((a, b) => a.date.localeCompare(b.date));
            break;

        case "high":
            result.sort((a, b) => b.amount - a.amount);
            break;

        case "low":
            result.sort((a, b) => a.amount - b.amount);
            break;

        default:
            result.sort((a, b) => b.date.localeCompare(a.date));
    }

    return result;
}

// Update summary cards
function updateSummary() {
    // Calculate total
    const total = expenses.reduce(function(sum, expense) {
        return sum + expense.amount;
    }, 0);

    totalAmount.textContent = formatCurrency(total);

    // Count transactions
    expenseCount.textContent = expenses.length;

    // Find top category by spending
    const categoryTotals = {};

    expenses.forEach(function(expense) {
        categoryTotals[expense.category] =
            (categoryTotals[expense.category] || 0) + expense.amount;
    });

    const top = Object.entries(categoryTotals)
        .sort((a, b) => b[1] - a[1])[0];

    topCategory.textContent = top ? top[0] : "—";
}

// Render expense list
function renderExpenses() {
    const filteredExpenses = getFilteredExpenses();

    updateSummary();
    expenseList.innerHTML = "";

    if (filteredExpenses.length === 0) {
        expenseList.innerHTML = `
            <div class="empty">
                No expenses found. Add an expense or change your filters.
            </div>
        `;
        return;
    }

    filteredExpenses.forEach(function(expense) {
        const item = document.createElement("div");
        item.className = "expense-item";

        const icon = document.createElement("div");
        icon.className = "expense-icon";
        icon.textContent = icons[expense.category] || "✦";

        const info = document.createElement("div");
        info.className = "expense-info";

        const name = document.createElement("h3");
        name.textContent = expense.title;

        const details = document.createElement("p");
        details.textContent =
            `${expense.category} · ${formatDate(expense.date)}`;

        info.append(name, details);

        const right = document.createElement("div");
        right.className = "expense-right";

        const amount = document.createElement("p");
        amount.className = "expense-amount";
        amount.textContent = formatCurrency(expense.amount);

        const actions = document.createElement("div");
        actions.className = "actions";

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.type = "button";
        editButton.addEventListener("click", function() {
            editExpense(expense.id);
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.type = "button";
        deleteButton.className = "delete";
        deleteButton.addEventListener("click", function() {
            deleteExpense(expense.id);
        });

        actions.append(editButton, deleteButton);
        right.append(amount, actions);

        item.append(icon, info, right);
        expenseList.appendChild(item);
    });
}

// Cancel editing
cancelEdit.addEventListener("click", resetForm);

// Listen for filter changes
categoryFilter.addEventListener("change", renderExpenses);
sortBy.addEventListener("change", renderExpenses);
startDate.addEventListener("change", renderExpenses);
endDate.addEventListener("change", renderExpenses);

// Clear filters
document.getElementById("clearFilters").addEventListener("click", function() {
    categoryFilter.value = "All";
    sortBy.value = "newest";
    startDate.value = "";
    endDate.value = "";

    renderExpenses();
});

// Initial setup
dateInput.value = new Date().toLocaleDateString("en-CA");
renderExpenses();