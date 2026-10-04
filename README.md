# 💰 Interactive Expense Tracker

A responsive and user-friendly expense tracker web application built using **HTML, CSS, and JavaScript**. This application helps users manage their daily expenses, track spending, organize transactions by category, and view expense summaries.

## 🚀 Features

* **Add Expenses:** Add expenses with a name, amount, category, and date.
* **Edit Expenses:** Update existing expense details.
* **Delete Expenses:** Remove unwanted expense records.
* **Category Filtering:** Filter expenses by category, such as Food, Transport, Shopping, Bills, and more.
* **Date Filtering:** View expenses within a selected date range.
* **Sorting:** Sort expenses by date or amount.
* **Expense Summary:** Calculate total expenses, transaction count, and top spending category.
* **Local Storage:** Automatically save expenses in the browser using LocalStorage.
* **Form Validation:** Prevent empty or invalid expense entries.
* **Responsive Design:** Access the application on desktops, tablets, and mobile devices.

## 🛠️ Technologies Used

* **HTML5** – Structure of the application
* **CSS3** – Styling and responsive design
* **JavaScript** – Application logic, DOM manipulation, and event handling
* **LocalStorage** – Persistent browser-side data storage
* **Git & GitHub** – Version control and project hosting

## 📂 Project Structure
expense-tracker/
│
├── index.html
├── style.css
├── script.js
├── README.md
└── PROJECT_REPORT.md

## ⚙️ How It Works

* Expenses are represented as JavaScript objects containing an ID, title, amount, category, and date.
* These objects are stored in an array.
* JavaScript event listeners handle form submissions, editing, deleting, and filtering.
* Array methods such as `filter()`, `sort()`, and `reduce()` help manage and calculate expense data.
* LocalStorage saves the expense array as JSON.
* The application dynamically updates the interface without refreshing the page.

## 📊 Key Learning Outcomes

This project demonstrates practical usage of:

* JavaScript DOM manipulation
* Event handling
* Arrays and objects
* Array methods
* Form handling and validation
* LocalStorage and JSON
* Dynamic UI rendering
* Responsive web design
* Git and GitHub

## 🔮 Future Improvements

* Add monthly spending charts.
* Export expenses to CSV.
* Introduce budget planning and spending limits.
* Add a search feature for transactions.
* Support recurring expenses.
* Implement cloud storage and user authentication.

