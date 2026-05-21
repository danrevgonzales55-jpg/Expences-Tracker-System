"use strict";

/* ============================================================
   SECTION 1 – DATA STRUCTURES & STORAGE KEYS
   ============================================================ */
const KEY = {
    USERS: "ef_users",
    SESSION: "ef_session",
    EXPENSES: "ef_expenses",
    CATEGORIES: "ef_categories",
    BUDGET: "ef_budget",
    PREFERENCES: "ef_preferences",
};

/* Default categories seeded for new users */
const DEFAULT_CATEGORIES = [
    { id: "cat_food", name: "Food & Dining", icon: "🍽️", color: "#f59e0b", isDefault: true },
    { id: "cat_trans", name: "Transportation", icon: "🚌", color: "#3b82f6", isDefault: true },
    { id: "cat_util", name: "Utilities", icon: "💡", color: "#8b5cf6", isDefault: true },
    { id: "cat_shop", name: "Shopping", icon: "🛒", color: "#ec4899", isDefault: true },
    { id: "cat_health", name: "Health", icon: "💊", color: "#10b981", isDefault: true },
    { id: "cat_ent", name: "Entertainment", icon: "🎬", color: "#f97316", isDefault: true },
    { id: "cat_edu", name: "Education", icon: "📚", color: "#06b6d4", isDefault: true },
    { id: "cat_house", name: "Housing & Rent", icon: "🏠", color: "#84cc16", isDefault: true },
    { id: "cat_travel", name: "Travel", icon: "✈️", color: "#14b8a6", isDefault: true },
    { id: "cat_save", name: "Savings", icon: "🏦", color: "#a78bfa", isDefault: true },
    { id: "cat_cloth", name: "Clothing", icon: "👗", color: "#f472b6", isDefault: true },
    { id: "cat_care", name: "Personal Care", icon: "💆", color: "#fb923c", isDefault: true },
    { id: "cat_pets", name: "Pets", icon: "🐾", color: "#78716c", isDefault: true },
    { id: "cat_sub", name: "Subscriptions", icon: "📺", color: "#0ea5e9", isDefault: true },
    { id: "cat_gift", name: "Gifts & Donations", icon: "🎁", color: "#e879f9", isDefault: true },
    { id: "cat_others", name: "Others", icon: "📦", color: "#6b7280", isDefault: true },
];

/* ============================================================
   EMOJI PICKER DATA & LOGIC
   ============================================================ */
const EMOJI_CATS = [
    { label: "😊", name: "Faces", emojis: ["😊", "😂", "🥰", "😍", "🤩", "😎", "🥳", "😅", "😇", "🤔", "😴", "🙃", "🤑", "😤", "🥹", "🫡", "🤗", "😏", "🫠", "🤫"] },
    { label: "🍔", name: "Food", emojis: ["🍔", "🍕", "🍜", "🍣", "🍱", "🥗", "🍩", "🧁", "☕", "🥤", "🧃", "🍎", "🍇", "🥩", "🥘", "🍝", "🧆", "🥙", "🌮", "🫕"] },
    { label: "🚗", name: "Transport", emojis: ["🚗", "🚌", "🚂", "✈️", "🚢", "🛵", "🚕", "🏍️", "🚁", "🛺", "🚎", "🛴", "🚲", "⛵", "🚀", "🛻", "🚐", "🏎️", "🛥️", "🚑"] },
    { label: "🏠", name: "Home", emojis: ["🏠", "🏡", "🏢", "🏗️", "🛋️", "🛏️", "🪑", "🚿", "🛁", "🪴", "🔑", "🪟", "🚪", "🧹", "🪣", "🛒", "🔧", "⚙️", "🪜", "💡"] },
    { label: "💰", name: "Finance", emojis: ["💰", "💳", "🏦", "💵", "💴", "💶", "💷", "🪙", "📈", "📉", "💹", "🏧", "🤑", "💸", "🧾", "📊", "💼", "🗂️", "📋", "✅"] },
    { label: "⚽", name: "Activity", emojis: ["⚽", "🎮", "🎬", "🎵", "🏋️", "🎭", "🎨", "🏊", "🎲", "🎯", "🎸", "🎤", "🏃", "🧘", "🎻", "🏆", "🥇", "🎰", "🎳", "🎺"] },
    { label: "💊", name: "Health", emojis: ["💊", "🏥", "🩺", "🩹", "🧬", "🔬", "🧪", "💉", "🩻", "🫀", "🧠", "🦷", "👁️", "🏃", "🥦", "🥕", "🍏", "🧘", "🛌", "💆"] },
    { label: "📱", name: "Tech", emojis: ["📱", "💻", "🖥️", "⌨️", "🖨️", "🖱️", "📷", "📹", "📡", "🔋", "💾", "📀", "🎧", "📺", "📠", "☎️", "🔭", "🔬", "🕹️", "⌚"] },
    { label: "🎓", name: "Education", emojis: ["📚", "📖", "🎓", "✏️", "📝", "🖊️", "📐", "📏", "🗒️", "🗓️", "📌", "📎", "🖇️", "📂", "🗂️", "💡", "🏫", "🎒", "🔭", "🧮"] },
    { label: "🌿", name: "Nature", emojis: ["🌿", "🌸", "🌊", "⛰️", "🌞", "🌙", "⭐", "🌈", "🐾", "🦁", "🐶", "🐱", "🐧", "🌴", "🍀", "🌺", "🌻", "🦋", "🌍", "❄️"] },
    { label: "🎁", name: "Special", emojis: ["🎁", "🎉", "🎊", "🎂", "🎈", "❤️", "🔥", "⚡", "💫", "✨", "🎗️", "🔔", "🏅", "🥇", "🌟", "💎", "👑", "🎀", "🪩", "🫶"] },
];

let emojiActiveTab = 0;
let emojiSearchMode = false;

function renderEmojiPicker() {
    const tabBar = document.getElementById("emojiTabBar");
    const grid = document.getElementById("emojiGrid");
    if (!tabBar || !grid) return;

    // Render tab bar
    tabBar.innerHTML = EMOJI_CATS.map((cat, i) =>
        `<button class="emoji-tab${i === emojiActiveTab ? " active" : ""}" 
            title="${cat.name}" onclick="switchEmojiTab(${i})">${cat.label}</button>`
    ).join("");

    // Render grid for active tab
    renderEmojiGrid(EMOJI_CATS[emojiActiveTab].emojis);
}

function renderEmojiGrid(emojis) {
    const grid = document.getElementById("emojiGrid");
    if (!grid) return;
    const current = document.getElementById("catIcon").value;
    grid.innerHTML = emojis.map(e =>
        `<button class="emoji-btn${e === current ? " selected" : ""}" 
            onclick="selectEmoji('${e}')" title="${e}">${e}</button>`
    ).join("");
}

function switchEmojiTab(idx) {
    emojiActiveTab = idx;
    emojiSearchMode = false;
    document.getElementById("emojiSearch").value = "";
    const tabs = document.querySelectorAll(".emoji-tab");
    tabs.forEach((t, i) => t.classList.toggle("active", i === idx));
    renderEmojiGrid(EMOJI_CATS[idx].emojis);
}

function filterEmojis(query) {
    query = query.trim().toLowerCase();
    if (!query) {
        emojiSearchMode = false;
        renderEmojiGrid(EMOJI_CATS[emojiActiveTab].emojis);
        return;
    }
    emojiSearchMode = true;
    const all = EMOJI_CATS.flatMap(c => c.emojis);
    // simple filter: show all (can't search by name without a map, so show all on any input)
    const unique = [...new Set(all)];
    renderEmojiGrid(unique);
}

function selectEmoji(emoji) {
    document.getElementById("catIcon").value = emoji;
    document.getElementById("emojiDisplayIcon").textContent = emoji;
    // Update selected state in grid
    document.querySelectorAll(".emoji-btn").forEach(b => {
        b.classList.toggle("selected", b.textContent === emoji);
    });
    // Close picker after short delay for feedback
    setTimeout(closeEmojiPicker, 180);
}

function toggleEmojiPicker() {
    const panel = document.getElementById("emojiPickerPanel");
    const chevron = document.getElementById("emojiChevron");
    if (panel.classList.contains("d-none")) {
        panel.classList.remove("d-none");
        chevron.classList.add("rotated");
        renderEmojiPicker();
        document.getElementById("emojiSearch").focus();
    } else {
        closeEmojiPicker();
    }
}

function closeEmojiPicker() {
    const panel = document.getElementById("emojiPickerPanel");
    const chevron = document.getElementById("emojiChevron");
    if (panel) panel.classList.add("d-none");
    if (chevron) chevron.classList.remove("rotated");
}

// Close picker when clicking outside
document.addEventListener("click", function (e) {
    const wrapper = document.querySelector(".emoji-picker-wrapper");
    if (wrapper && !wrapper.contains(e.target)) closeEmojiPicker();
});

/* ============================================================
   SECTION 2 – STORAGE HELPERS
   ============================================================ */
function loadData(key) {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : null;
    } catch { return null; }
}

function saveData(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch { return false; }
}

/* ============================================================
   SECTION 3 – USER AUTH (Login / Register)
   ============================================================ */
function getUsers() { return loadData(KEY.USERS) || []; }
function getSession() { return loadData(KEY.SESSION); }
function setSession(email) { saveData(KEY.SESSION, email); }
function clearSession() { localStorage.removeItem(KEY.SESSION); }

/**
 * LINEAR SEARCH — find user by email
 * Time: O(n) — iterates through users array
 */
function linearSearchUser(email) {
    const users = getUsers();
    for (let i = 0; i < users.length; i++) {
        if (users[i].email.toLowerCase() === email.toLowerCase()) {
            return users[i];
        }
    }
    return null;
}

function handleLogin() {
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;
    const errEl = document.getElementById("loginError");

    // --- Input Validation ---
    if (!email) {
        showEl(errEl, "Email is required.", true); return;
    }
    if (!isValidEmail(email)) {
        showEl(errEl, "Please enter a valid email address.", true); return;
    }
    if (!password) {
        showEl(errEl, "Password is required.", true); return;
    }

    // --- Validate credentials via Linear Search ---
    const user = linearSearchUser(email);
    if (!user) {
        showEl(errEl, "No account found with that email.", true); return;
    }
    if (user.password !== password) {
        showEl(errEl, "Incorrect password.", true); return;
    }

    // --- Load user data & go to Dashboard ---
    errEl.classList.add("d-none");
    setSession(email);
    loadUserData();
    launchApp();
}

function handleRegister() {
    const name = document.getElementById("regName").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const password = document.getElementById("regPassword").value;
    const errEl = document.getElementById("registerError");

    // --- Input Validation ---
    if (!name) {
        showEl(errEl, "Full name is required.", true); return;
    }
    if (!email) {
        showEl(errEl, "Email is required.", true); return;
    }
    if (!isValidEmail(email)) {
        showEl(errEl, "Please enter a valid email address.", true); return;
    }
    if (!password || password.length < 6) {
        showEl(errEl, "Password must be at least 6 characters.", true); return;
    }

    // --- Duplicate prevention via Linear Search ---
    if (linearSearchUser(email)) {
        showEl(errEl, "An account with this email already exists.", true); return;
    }

    const users = getUsers();
    users.push({ name, email, password, createdAt: new Date().toISOString() });
    saveData(KEY.USERS, users);

    errEl.classList.add("d-none");
    setSession(email);

    // Seed default categories for new user
    const userCatKey = `${KEY.CATEGORIES}_${email}`;
    if (!loadData(userCatKey)) {
        saveData(userCatKey, JSON.parse(JSON.stringify(DEFAULT_CATEGORIES)));
    }

    loadUserData();
    launchApp();
}

function handleLogout() {
    clearSession();
    showLogin();
}

/* ============================================================
   SECTION 4 – APP BOOTSTRAP
   ============================================================ */
let currentUser = null;
let expensesArr = [];  // Primary array data structure
let categoriesArr = [];
let preferences = {};
let monthlyBudget = 0;

function loadUserData() {
    const email = getSession();
    if (!email) return;

    const user = linearSearchUser(email);
    currentUser = user;

    const catKey = `${KEY.CATEGORIES}_${email}`;
    const expKey = `${KEY.EXPENSES}_${email}`;
    const budKey = `${KEY.BUDGET}_${email}`;
    const prefKey = `${KEY.PREFERENCES}_${email}`;

    categoriesArr = loadData(catKey) || JSON.parse(JSON.stringify(DEFAULT_CATEGORIES));
    expensesArr = loadData(expKey) || [];
    monthlyBudget = loadData(budKey) || 0;
    preferences = loadData(prefKey) || {
        currency: "₱", dateFormat: "MM/DD/YYYY", theme: "dark", name: user ? user.name : "User"
    };

    applyPreferences();
}

function launchApp() {
    document.getElementById("loginPage").classList.remove("active");
    document.getElementById("loginPage").classList.add("d-none");
    document.getElementById("appPage").classList.remove("d-none");
    document.getElementById("appPage").classList.add("active");

    const displayName = preferences.name || (currentUser ? currentUser.name : "User");
    document.getElementById("sidebarName").textContent = displayName;
    document.getElementById("sidebarAvatar").textContent = displayName.charAt(0).toUpperCase();
    document.getElementById("topbarAvatar").textContent = displayName.charAt(0).toUpperCase();
    document.getElementById("dashGreeting").textContent = `Welcome back, ${displayName}!`;
    document.getElementById("topbarDate").textContent = new Date().toLocaleDateString("en-PH", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

    populateCategoryDropdowns();
    navigateTo("dashboard");
}

function showLogin() {
    document.getElementById("appPage").classList.add("d-none");
    document.getElementById("appPage").classList.remove("active");
    document.getElementById("loginPage").classList.remove("d-none");
    document.getElementById("loginPage").classList.add("active");
    document.getElementById("loginEmail").value = "";
    document.getElementById("loginPassword").value = "";
    document.getElementById("loginError").classList.add("d-none");
    currentUser = null; expensesArr = []; categoriesArr = [];
}

function applyPreferences() {
    document.documentElement.setAttribute("data-theme", preferences.theme || "dark");
    const sym = preferences.currency || "₱";
    ["currencySymbolAdd", "currencySymbolBudget", "currencySymbolEdit"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = sym;
    });
    // Populate settings form
    setSelectVal("settingCurrency", sym);
    setSelectVal("settingDateFormat", preferences.dateFormat || "MM/DD/YYYY");
    setSelectVal("settingTheme", preferences.theme || "dark");
    const n = document.getElementById("settingName");
    if (n) n.value = preferences.name || (currentUser ? currentUser.name : "");
}

window.addEventListener("DOMContentLoaded", () => {
    const email = getSession();
    if (email && linearSearchUser(email)) {
        loadUserData();
        launchApp();
    } else {
        document.getElementById("loginPage").classList.add("active");
    }
    // Set today's date as default for new expenses
    const today = new Date().toISOString().split("T")[0];
    document.getElementById("expDate").value = today;
});

/* ============================================================
   SECTION 5 – NAVIGATION
   ============================================================ */
function navigateTo(tab) {
    document.querySelectorAll(".ef-tab").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".nav-item").forEach(n => n.classList.remove("active"));

    document.getElementById(`tab-${tab}`).classList.add("active");
    document.querySelector(`.nav-item[data-tab="${tab}"]`)?.classList.add("active");

    const titles = {
        dashboard: "Dashboard", addExpense: "Add Expense",
        viewExpenses: "View Expenses", reports: "Reports",
        budget: "Budget Management", categories: "Manage Categories",
        settings: "Settings & Preferences"
    };
    document.getElementById("topbarTitle").textContent = titles[tab] || tab;

    // Refresh content per tab
    if (tab === "dashboard") renderDashboard();
    if (tab === "viewExpenses") { populateFilterCategories(); applyFilters(); }
    if (tab === "reports") renderReports();
    if (tab === "budget") renderBudgetStatus();
    if (tab === "categories") renderCategoryList();
    if (tab === "settings") applyPreferences();

    // Close mobile sidebar
    document.getElementById("sidebar").classList.remove("open");
    document.querySelector(".sidebar-overlay")?.classList.remove("show");
}

function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    let overlay = document.querySelector(".sidebar-overlay");
    if (!overlay) {
        overlay = document.createElement("div");
        overlay.className = "sidebar-overlay";
        overlay.onclick = toggleSidebar;
        document.body.appendChild(overlay);
    }
    sidebar.classList.toggle("open");
    overlay.classList.toggle("show");
}

/* ============================================================
   SECTION 6 – CATEGORY HELPERS
   ============================================================ */
function saveCategories() {
    const email = getSession();
    saveData(`${KEY.CATEGORIES}_${email}`, categoriesArr);
}

function getCategoryById(id) {
    /* Linear Search for category */
    for (let i = 0; i < categoriesArr.length; i++) {
        if (categoriesArr[i].id === id) return categoriesArr[i];
    }
    return null;
}

function populateCategoryDropdowns() {
    ["expCategory", "editCategory"].forEach(selId => {
        const sel = document.getElementById(selId);
        if (!sel) return;
        const curr = sel.value;
        sel.innerHTML = `<option value="">— Select Category —</option>`;
        categoriesArr.forEach(c => {
            sel.innerHTML += `<option value="${c.id}">${c.icon} ${c.name}</option>`;
        });
        if (curr) sel.value = curr;
    });
}

function populateFilterCategories() {
    const sel = document.getElementById("filterCategory");
    sel.innerHTML = `<option value="">All Categories</option>`;
    categoriesArr.forEach(c => {
        sel.innerHTML += `<option value="${c.id}">${c.icon} ${c.name}</option>`;
    });
}

/* ============================================================
   SECTION 7 – ADD EXPENSE (Section 2 of flowchart)
   ============================================================ */
function addExpense() {
    const amount = parseFloat(document.getElementById("expAmount").value);
    const catId = document.getElementById("expCategory").value;
    const date = document.getElementById("expDate").value;
    const payment = document.getElementById("expPayment").value;
    const notes = document.getElementById("expNotes").value.trim();

    clearFieldErrors(["errAmount", "errCategory", "errDate", "errPayment"]);
    let valid = true;

    // --- Validate expense details (Input Validation) ---
    if (isNaN(amount) || amount <= 0) {
        showFieldError("errAmount", "Amount must be a positive number."); valid = false;
    }
    if (amount > 10000000) {
        showFieldError("errAmount", "Amount seems too large. Please verify."); valid = false;
    }
    if (!catId) {
        showFieldError("errCategory", "Please select a category."); valid = false;
    }
    if (!date) {
        showFieldError("errDate", "Date is required."); valid = false;
    } else {
        const selectedDate = new Date(date);
        const today = new Date(); today.setHours(23, 59, 59, 999);
        if (selectedDate > today) {
            showFieldError("errDate", "Date cannot be in the future."); valid = false;
        }
    }
    if (!payment) {
        showFieldError("errPayment", "Please select a payment method."); valid = false;
    }

    if (!valid) return; // Is data valid? → No → Show validation error message

    // --- Is data valid? → Yes → Save expense to LocalStorage ---
    const expense = {
        id: `exp_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
        amount: parseFloat(amount.toFixed(2)),
        categoryId: catId,
        date,
        payment,
        notes,
        createdAt: new Date().toISOString()
    };

    expensesArr.push(expense);  // Add to primary array
    saveExpenses();             // Persist to LocalStorage

    // --- Show success message ---
    showToast(`Expense of ${formatCurrency(expense.amount)} added successfully!`);
    clearExpenseForm();
}

function saveExpenses() {
    const email = getSession();
    saveData(`${KEY.EXPENSES}_${email}`, expensesArr);
}

function clearExpenseForm() {
    document.getElementById("expAmount").value = "";
    document.getElementById("expCategory").value = "";
    document.getElementById("expDate").value = new Date().toISOString().split("T")[0];
    document.getElementById("expPayment").value = "";
    document.getElementById("expNotes").value = "";
    clearFieldErrors(["errAmount", "errCategory", "errDate", "errPayment"]);
}

/* ============================================================
   SECTION 8 – SEARCH ALGORITHM (Linear Search)
   ============================================================
   Algorithm: LINEAR SEARCH
   Purpose:   Find expenses matching a search query
   Steps:
     1. Start from index 0 of expensesArr
     2. For each element, check if description/category contains query
     3. If match → include in results array
     4. If not → move to next index
     5. Return all matched elements
   Complexity: O(n) — worst case visits all elements
   ============================================================ */
function linearSearchExpenses(query) {
    const q = query.toLowerCase().trim();
    if (!q) return expensesArr;

    const results = [];
    for (let i = 0; i < expensesArr.length; i++) {
        const exp = expensesArr[i];
        const cat = getCategoryById(exp.categoryId);
        const catName = cat ? cat.name.toLowerCase() : "";
        const notes = (exp.notes || "").toLowerCase();
        const payment = (exp.payment || "").toLowerCase();

        // Linear scan: check each field
        if (
            catName.includes(q) ||
            notes.includes(q) ||
            payment.includes(q) ||
            String(exp.amount).includes(q)
        ) {
            results.push(exp);  // Match found — add to results
        }
        // else: no match — continue to next element
    }
    return results;
}



/**
 * Bubble Sort — sorts by numeric amount
 * @param {Array} arr - array of expense objects
 * @param {boolean} ascending - sort order
 */
function bubbleSortExpenses(arr, ascending = true) {
    const a = [...arr];  // non-destructive copy
    const n = a.length;
    for (let i = 0; i < n - 1; i++) {
        let swapped = false;
        for (let j = 0; j < n - i - 1; j++) {
            const shouldSwap = ascending
                ? a[j].amount > a[j + 1].amount
                : a[j].amount < a[j + 1].amount;
            if (shouldSwap) {
                // Swap adjacent elements
                [a[j], a[j + 1]] = [a[j + 1], a[j]];
                swapped = true;
            }
        }
        if (!swapped) break;  // Optimized: early exit if already sorted
    }
    return a;
}

/**
 * Selection Sort — sorts by date string
 * @param {Array} arr - array of expense objects
 * @param {boolean} ascending - sort order
 */
function selectionSortByDate(arr, ascending = true) {
    const a = [...arr];
    const n = a.length;
    for (let i = 0; i < n - 1; i++) {
        let targetIdx = i;
        for (let j = i + 1; j < n; j++) {
            const dateA = a[j].date;
            const dateB = a[targetIdx].date;
            const shouldSelect = ascending ? dateA < dateB : dateA > dateB;
            if (shouldSelect) targetIdx = j;
        }
        // Swap: place found element at current boundary
        if (targetIdx !== i) {
            [a[i], a[targetIdx]] = [a[targetIdx], a[i]];
        }
    }
    return a;
}

/**
 * Sort by category name (A-Z) using Bubble Sort on strings
 */
function sortByCategoryAZ(arr) {
    const a = [...arr];
    const n = a.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            const nameA = (getCategoryById(a[j].categoryId)?.name || "").toLowerCase();
            const nameB = (getCategoryById(a[j + 1].categoryId)?.name || "").toLowerCase();
            if (nameA > nameB) {
                [a[j], a[j + 1]] = [a[j + 1], a[j]];
            }
        }
    }
    return a;
}

/* ============================================================
   SECTION 10 – VIEW / FILTER EXPENSES (Section 3 of flowchart)
   ============================================================ */
let filteredExpenses = [];

function applyFilters() {
    const query = document.getElementById("searchInput").value;
    const dateFrom = document.getElementById("filterDateFrom").value;
    const dateTo = document.getElementById("filterDateTo").value;
    const catFilter = document.getElementById("filterCategory").value;
    const payFilter = document.getElementById("filterPayment").value;
    const sortBy = document.getElementById("sortBy").value;

    // Step 1: Linear Search for text query
    let results = linearSearchExpenses(query);

    // Step 2: Filter by date range (Process & filter)
    if (dateFrom) {
        results = results.filter(e => e.date >= dateFrom);
    }
    if (dateTo) {
        results = results.filter(e => e.date <= dateTo);
    }

    // Step 3: Filter by category
    if (catFilter) {
        results = results.filter(e => e.categoryId === catFilter);
    }

    // Step 4: Filter by payment method
    if (payFilter) {
        results = results.filter(e => e.payment === payFilter);
    }

    // Step 5: Apply sorting algorithm
    if (sortBy === "amount-asc") results = bubbleSortExpenses(results, true);
    else if (sortBy === "amount-desc") results = bubbleSortExpenses(results, false);
    else if (sortBy === "date-asc") results = selectionSortByDate(results, true);
    else if (sortBy === "date-desc") results = selectionSortByDate(results, false);
    else if (sortBy === "category-asc") results = sortByCategoryAZ(results);

    filteredExpenses = results;

    // Display expense list (total, count, details)
    renderExpenseTable(results);

    // Results info
    const info = document.getElementById("resultsInfo");
    info.textContent = `Showing ${results.length} of ${expensesArr.length} record${expensesArr.length !== 1 ? "s" : ""}`;

    // Totals
    renderViewTotals(results);
}

function renderExpenseTable(arr) {
    const tbody = document.getElementById("expenseTableBody");
    const emptyEl = document.getElementById("noExpenses");
    tbody.innerHTML = "";

    if (!arr || arr.length === 0) {
        emptyEl.classList.remove("d-none");
        return;
    }
    emptyEl.classList.add("d-none");

    arr.forEach((exp, idx) => {
        const cat = getCategoryById(exp.categoryId);
        const catName = cat ? cat.name : "Unknown";
        const catIcon = cat ? cat.icon : "📦";
        const catColor = cat ? cat.color : "#6b7280";
        const dateStr = formatDate(exp.date);

        tbody.innerHTML += `
      <tr>
        <td class="text-muted">${idx + 1}</td>
        <td>${dateStr}</td>
        <td>
          <span class="cat-badge" style="background:${catColor}22;color:${catColor}">
            ${catIcon} ${catName}
          </span>
        </td>
        <td><span class="pay-badge"><i class="bi bi-credit-card-2-back"></i> ${exp.payment}</span></td>
        <td class="text-muted" style="max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">
          ${exp.notes || "—"}
        </td>
        <td class="text-end amount-cell">${formatCurrency(exp.amount)}</td>
        <td class="text-center">
          <button class="btn-edit me-1" onclick="openEditModal('${exp.id}')">
            <i class="bi bi-pencil"></i>
          </button>
          <button class="btn-del" onclick="openDeleteModal('${exp.id}')">
            <i class="bi bi-trash3"></i>
          </button>
        </td>
      </tr>`;
    });
}

function renderViewTotals(arr) {
    const total = arr.reduce((s, e) => s + e.amount, 0);
    const el = document.getElementById("viewTotals");
    el.innerHTML = `
    <div class="totals-item">Records: <span>${arr.length}</span></div>
    <div class="totals-item">Total: <span>${formatCurrency(total)}</span></div>
    <div class="totals-item">Average: <span>${arr.length ? formatCurrency(total / arr.length) : formatCurrency(0)}</span></div>
    <div class="totals-item">Highest: <span>${arr.length ? formatCurrency(Math.max(...arr.map(e => e.amount))) : formatCurrency(0)}</span></div>
    <div class="totals-item">Lowest: <span>${arr.length ? formatCurrency(Math.min(...arr.map(e => e.amount))) : formatCurrency(0)}</span></div>
  `;
}

function clearFilters() {
    document.getElementById("searchInput").value = "";
    document.getElementById("filterDateFrom").value = "";
    document.getElementById("filterDateTo").value = "";
    document.getElementById("filterCategory").value = "";
    document.getElementById("filterPayment").value = "";
    document.getElementById("sortBy").value = "date-desc";
    applyFilters();
}

/* ============================================================
   SECTION 11 – EDIT / DELETE EXPENSE (Section 7 of flowchart)
   ============================================================ */
function openEditModal(id) {
    // Linear Search to find expense by ID
    const exp = linearSearchById(expensesArr, id);
    if (!exp) return;

    document.getElementById("editId").value = id;
    document.getElementById("editAmount").value = exp.amount;
    document.getElementById("editDate").value = exp.date;
    document.getElementById("editPayment").value = exp.payment;
    document.getElementById("editNotes").value = exp.notes || "";
    populateCategoryDropdowns();
    document.getElementById("editCategory").value = exp.categoryId;

    clearFieldErrors(["errEditAmount", "errEditCategory", "errEditDate", "errEditPayment"]);
    document.getElementById("editMsg").classList.add("d-none");

    new bootstrap.Modal(document.getElementById("editModal")).show();
}

function confirmEdit() {
    const id = document.getElementById("editId").value;
    const amount = parseFloat(document.getElementById("editAmount").value);
    const catId = document.getElementById("editCategory").value;
    const date = document.getElementById("editDate").value;
    const payment = document.getElementById("editPayment").value;
    const notes = document.getElementById("editNotes").value.trim();

    clearFieldErrors(["errEditAmount", "errEditCategory", "errEditDate", "errEditPayment"]);
    let valid = true;

    if (isNaN(amount) || amount <= 0) {
        showFieldError("errEditAmount", "Amount must be a positive number."); valid = false;
    }
    if (!catId) {
        showFieldError("errEditCategory", "Please select a category."); valid = false;
    }
    if (!date) {
        showFieldError("errEditDate", "Date is required."); valid = false;
    }
    if (!payment) {
        showFieldError("errEditPayment", "Please select a payment method."); valid = false;
    }

    if (!valid) return;

    // Confirm action → Yes → Update LocalStorage
    const idx = expensesArr.findIndex(e => e.id === id);
    if (idx === -1) return;

    expensesArr[idx] = { ...expensesArr[idx], amount: parseFloat(amount.toFixed(2)), categoryId: catId, date, payment, notes, updatedAt: new Date().toISOString() };
    saveExpenses();

    bootstrap.Modal.getInstance(document.getElementById("editModal")).hide();
    applyFilters();
    showToast("Expense updated successfully!");
}

function openDeleteModal(id) {
    document.getElementById("deleteId").value = id;
    new bootstrap.Modal(document.getElementById("deleteModal")).show();
}

function confirmDelete() {
    const id = document.getElementById("deleteId").value;

    // Confirm action? → Yes → Update LocalStorage (remove)
    const idx = expensesArr.findIndex(e => e.id === id);
    if (idx !== -1) {
        expensesArr.splice(idx, 1);
        saveExpenses();
    }

    bootstrap.Modal.getInstance(document.getElementById("deleteModal")).hide();
    applyFilters();
    showToast("Expense deleted.", "warning");
}

/* ============================================================
   SECTION 12 – EXPENSE SUMMARY & REPORTS (Section 4 of flowchart)
   ============================================================ */
let reportChartInstance = null;

function renderReports() {
    const type = document.getElementById("reportType").value;

    // Retrieve expenses from LocalStorage (already loaded)
    const expenses = expensesArr;

    // Calculate summary & statistics
    const total = expenses.reduce((s, e) => s + e.amount, 0);
    const count = expenses.length;
    const avg = count ? total / count : 0;
    const highest = count ? Math.max(...expenses.map(e => e.amount)) : 0;

    // Report stats cards
    document.getElementById("reportStats").innerHTML = `
    <div class="col-sm-6 col-xl-3">
      <div class="stat-card stat-total"><div class="stat-icon"><i class="bi bi-cash-stack"></i></div>
        <div class="stat-info"><span class="stat-label">Total</span><span class="stat-value">${formatCurrency(total)}</span></div></div>
    </div>
    <div class="col-sm-6 col-xl-3">
      <div class="stat-card stat-count"><div class="stat-icon"><i class="bi bi-receipt"></i></div>
        <div class="stat-info"><span class="stat-label">Transactions</span><span class="stat-value">${count}</span></div></div>
    </div>
    <div class="col-sm-6 col-xl-3">
      <div class="stat-card stat-month"><div class="stat-icon"><i class="bi bi-calculator"></i></div>
        <div class="stat-info"><span class="stat-label">Average</span><span class="stat-value">${formatCurrency(avg)}</span></div></div>
    </div>
    <div class="col-sm-6 col-xl-3">
      <div class="stat-card stat-budget"><div class="stat-icon"><i class="bi bi-arrow-up-circle"></i></div>
        <div class="stat-info"><span class="stat-label">Highest</span><span class="stat-value">${formatCurrency(highest)}</span></div></div>
    </div>
  `;

    if (type === "summary" || type === "category") {
        renderCategoryReport(expenses);
    } else if (type === "monthly") {
        renderMonthlyReport(expenses);
    } else if (type === "payment") {
        renderPaymentReport(expenses);
    }
}

function renderCategoryReport(expenses) {
    document.getElementById("reportChartTitle").textContent = "Spending by Category";

    // Group by category
    const grouped = {};
    expenses.forEach(e => {
        grouped[e.categoryId] = (grouped[e.categoryId] || 0) + e.amount;
    });

    const total = Object.values(grouped).reduce((s, v) => s + v, 0);
    const labels = [], data = [], colors = [];
    Object.entries(grouped).forEach(([catId, amount]) => {
        const cat = getCategoryById(catId);
        labels.push(cat ? `${cat.icon} ${cat.name}` : "Unknown");
        data.push(parseFloat(amount.toFixed(2)));
        colors.push(cat ? cat.color : "#6b7280");
    });

    renderPieChart(labels, data, colors);

    // Breakdown list
    const sorted = labels.map((l, i) => ({ label: l, amount: data[i], color: colors[i] }))
        .sort((a, b) => b.amount - a.amount);

    document.getElementById("reportBreakdown").innerHTML = sorted.map(item => `
    <div class="breakdown-item">
      <span class="breakdown-label">${item.label}</span>
      <div class="breakdown-bar-wrap">
        <div class="breakdown-bar" style="width:${total ? (item.amount / total * 100).toFixed(1) : 0}%;background:${item.color}"></div>
      </div>
      <span class="breakdown-pct">${total ? (item.amount / total * 100).toFixed(1) : 0}%</span>
      <span class="breakdown-val">${formatCurrency(item.amount)}</span>
    </div>`).join("") || "<p class='text-muted'>No data.</p>";
}

function renderMonthlyReport(expenses) {
    document.getElementById("reportChartTitle").textContent = "Monthly Spending Trend";

    // Group by YYYY-MM
    const grouped = {};
    expenses.forEach(e => {
        const key = e.date.substr(0, 7);
        grouped[key] = (grouped[key] || 0) + e.amount;
    });

    // Selection sort on month keys (ascending)
    let keys = Object.keys(grouped);
    for (let i = 0; i < keys.length - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < keys.length; j++) {
            if (keys[j] < keys[minIdx]) minIdx = j;
        }
        if (minIdx !== i) [keys[i], keys[minIdx]] = [keys[minIdx], keys[i]];
    }

    const labels = keys.map(k => {
        const [y, m] = k.split("-");
        return new Date(y, m - 1).toLocaleString("default", { month: "short", year: "numeric" });
    });
    const data = keys.map(k => parseFloat(grouped[k].toFixed(2)));

    renderBarChart(labels, data);

    const total = data.reduce((s, v) => s + v, 0);
    document.getElementById("reportBreakdown").innerHTML = keys.map((k, i) => `
    <div class="breakdown-item">
      <span class="breakdown-label">${labels[i]}</span>
      <div class="breakdown-bar-wrap">
        <div class="breakdown-bar" style="width:${total ? (data[i] / total * 100).toFixed(1) : 0}%"></div>
      </div>
      <span class="breakdown-pct">${total ? (data[i] / total * 100).toFixed(1) : 0}%</span>
      <span class="breakdown-val">${formatCurrency(data[i])}</span>
    </div>`).join("") || "<p class='text-muted'>No data.</p>";
}

function renderPaymentReport(expenses) {
    document.getElementById("reportChartTitle").textContent = "Spending by Payment Method";

    const grouped = {};
    expenses.forEach(e => {
        grouped[e.payment] = (grouped[e.payment] || 0) + e.amount;
    });

    const payColors = {
        "Cash": "#10b981", "Credit Card": "#3b82f6", "Debit Card": "#8b5cf6",
        "GCash": "#06b6d4", "Maya": "#f59e0b", "Bank Transfer": "#ec4899"
    };

    const total = Object.values(grouped).reduce((s, v) => s + v, 0);
    const labels = Object.keys(grouped);
    const data = Object.values(grouped).map(v => parseFloat(v.toFixed(2)));
    const colors = labels.map(l => payColors[l] || "#6b7280");

    renderPieChart(labels, data, colors);

    const sorted = labels.map((l, i) => ({ label: l, amount: data[i], color: colors[i] }))
        .sort((a, b) => b.amount - a.amount);

    document.getElementById("reportBreakdown").innerHTML = sorted.map(item => `
    <div class="breakdown-item">
      <span class="breakdown-label">${item.label}</span>
      <div class="breakdown-bar-wrap">
        <div class="breakdown-bar" style="width:${total ? (item.amount / total * 100).toFixed(1) : 0}%;background:${item.color}"></div>
      </div>
      <span class="breakdown-pct">${total ? (item.amount / total * 100).toFixed(1) : 0}%</span>
      <span class="breakdown-val">${formatCurrency(item.amount)}</span>
    </div>`).join("") || "<p class='text-muted'>No data.</p>";
}

/* Chart helpers */
function renderPieChart(labels, data, colors) {
    if (reportChartInstance) reportChartInstance.destroy();

    // Corrected target to match the context variable below
    const chartElement = document.getElementById("reportMainChart");
    if (!chartElement) return; // Safety check in case the element isn't in the DOM

    const ctx = chartElement.getContext("2d");

    // Changed 'dashDoughnutChart' to 'reportMainChart'
    reportChartInstance = new Chart(chartElement, {
        type: "doughnut",
        data: {
            labels,
            datasets: [{
                data,
                backgroundColor: colors,
                borderWidth: 2,
                borderColor: getComputedStyle(document.documentElement).getPropertyValue("--bg-card").trim()
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: "bottom",
                    labels: {
                        color: getComputedStyle(document.documentElement).getPropertyValue("--text-secondary").trim(),
                        font: { family: "DM Sans", size: 12 },
                        padding: 14
                    }
                },
                tooltip: {
                    callbacks: {
                        label: context => ` ${formatCurrency(context.raw)}`
                    }
                }
            }
        }
    });
}


function renderBarChart(labels, data) {
    if (reportChartInstance) reportChartInstance.destroy();
    const ctx = document.getElementById("reportMainChart").getContext("2d");
    reportChartInstance = new Chart(ctx, {
        type: "bar",
        data: {
            labels,
            datasets: [{
                label: "Monthly Expenses",
                data,
                backgroundColor: "rgba(16,185,129,.7)",
                borderColor: "#10b981",
                borderWidth: 1.5,
                borderRadius: 6
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: true,
            scales: {
                x: { ticks: { color: "#8b95a9", font: { family: "DM Sans" } }, grid: { color: "#2a3347" } },
                y: { ticks: { color: "#8b95a9", font: { family: "DM Sans" }, callback: v => formatCurrency(v) }, grid: { color: "#2a3347" } }
            },
            plugins: {
                legend: { display: false },
                tooltip: { callbacks: { label: ctx => ` ${formatCurrency(ctx.raw)}` } }
            }
        }
    });
}

/* ============================================================
   SECTION 13 – BUDGET MANAGEMENT (Section 5 of flowchart)
   ============================================================ */
function saveBudget() {
    const val = parseFloat(document.getElementById("budgetInput").value);
    const errEl = document.getElementById("errBudget");

    // Validate
    if (isNaN(val) || val <= 0) {
        showFieldError("errBudget", "Please enter a valid budget amount."); return;
    }
    errEl.textContent = "";

    // Save budget to LocalStorage
    monthlyBudget = parseFloat(val.toFixed(2));
    const email = getSession();
    saveData(`${KEY.BUDGET}_${email}`, monthlyBudget);

    renderBudgetStatus();
    showToast(`Monthly budget set to ${formatCurrency(monthlyBudget)}!`);
}

function renderBudgetStatus() {
    document.getElementById("budgetInput").value = monthlyBudget || "";

    const content = document.getElementById("budgetStatusContent");
    if (!monthlyBudget) {
        content.innerHTML = `<p class="text-muted">No budget set. Enter a budget amount and click Save.</p>`;
        return;
    }

    // Compare expenses against budget (current month)
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const prefix = `${yyyy}-${mm}`;

    let monthTotal = 0;
    for (let i = 0; i < expensesArr.length; i++) {
        if (expensesArr[i].date.startsWith(prefix)) {
            monthTotal += expensesArr[i].amount;
        }
    }

    const remaining = monthlyBudget - monthTotal;
    const pct = Math.min((monthTotal / monthlyBudget) * 100, 100).toFixed(1);

    // Is budget exceeded? → Yes → Show over budget alert / No → Show within budget message
    const exceeded = monthTotal > monthlyBudget;
    const warning = !exceeded && pct >= 80;

    let alertClass, alertIcon, alertText;
    if (exceeded) {
        alertClass = "over"; alertIcon = "bi-exclamation-octagon-fill";
        alertText = `Over budget by ${formatCurrency(Math.abs(remaining))}!`;
    } else if (warning) {
        alertClass = "warn"; alertIcon = "bi-exclamation-triangle-fill";
        alertText = `Approaching limit — ${(100 - parseFloat(pct)).toFixed(1)}% of budget remaining`;
    } else {
        alertClass = "ok"; alertIcon = "bi-check-circle-fill";
        alertText = `You are within budget — ${formatCurrency(remaining)} remaining`;
    }

    let barClass = "";
    if (exceeded) barClass = "danger";
    else if (warning) barClass = "warning";

    content.innerHTML = `
    <div class="row g-3 mb-3">
      <div class="col-sm-4">
        <div class="stat-label">Budget</div>
        <div class="budget-big-number" style="color:var(--accent)">${formatCurrency(monthlyBudget)}</div>
      </div>
      <div class="col-sm-4">
        <div class="stat-label">Spent This Month</div>
        <div class="budget-big-number" style="color:${exceeded ? 'var(--danger)' : 'var(--text-primary)'}">${formatCurrency(monthTotal)}</div>
      </div>
      <div class="col-sm-4">
        <div class="stat-label">Remaining</div>
        <div class="budget-big-number" style="color:${remaining < 0 ? 'var(--danger)' : 'var(--accent-light)'}">${formatCurrency(Math.abs(remaining))}</div>
      </div>
    </div>
    <div class="budget-sub mb-2">Monthly Progress — ${pct}% used</div>
    <div class="progress ef-progress">
      <div class="progress-bar ${barClass}" style="width:${pct}%"></div>
    </div>
    <div class="budget-alert ${alertClass} mt-3">
      <i class="bi ${alertIcon} me-2"></i>${alertText}
    </div>
  `;
}

/* ============================================================
   SECTION 14 – MANAGE CATEGORIES (Section 6 of flowchart)
   ============================================================ */
function saveCategory() {
    const name = document.getElementById("catName").value.trim();
    const icon = document.getElementById("catIcon").value.trim() || "📦";
    const color = document.getElementById("catColor").value;
    const editId = document.getElementById("catEditId").value;
    const msgEl = document.getElementById("catMsg");

    // Validate category details
    if (!name) {
        showFieldError("catMsg", "Category name is required."); return;
    }
    if (name.length < 2) {
        showFieldError("catMsg", "Category name must be at least 2 characters."); return;
    }

    // Duplicate prevention via Linear Search
    for (let i = 0; i < categoriesArr.length; i++) {
        if (categoriesArr[i].name.toLowerCase() === name.toLowerCase() && categoriesArr[i].id !== editId) {
            showFieldError("catMsg", "A category with this name already exists."); return;
        }
    }

    if (editId) {
        // Edit existing
        const idx = categoriesArr.findIndex(c => c.id === editId);
        if (idx !== -1) {
            categoriesArr[idx] = { ...categoriesArr[idx], name, icon, color };
        }
        document.getElementById("catFormTitle").innerHTML = '<i class="bi bi-plus-circle me-2"></i>Add Category';
    } else {
        // Add new
        categoriesArr.push({
            id: `cat_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
            name, icon, color,
            isDefault: false
        });
    }

    // Save changes to LocalStorage
    saveCategories();
    populateCategoryDropdowns();
    renderCategoryList();
    cancelCatEdit();
    showToast("Category saved successfully!");
    msgEl.textContent = "";
}

function editCategory(id) {
    const cat = getCategoryById(id);
    if (!cat) return;
    document.getElementById("catName").value = cat.name;
    document.getElementById("catIcon").value = cat.icon;
    document.getElementById("emojiDisplayIcon").textContent = cat.icon;
    document.getElementById("catColor").value = cat.color;
    document.getElementById("catEditId").value = id;
    document.getElementById("catFormTitle").innerHTML = '<i class="bi bi-pencil me-2"></i>Edit Category';
    // Scroll form into view
    document.getElementById("catName").scrollIntoView({ behavior: "smooth", block: "center" });
}

function deleteCategory(id) {
    const cat = getCategoryById(id);
    if (cat && cat.isDefault) {
        showToast("Default categories cannot be deleted.", "error"); return;
    }
    // Check if in use via Linear Search
    for (let i = 0; i < expensesArr.length; i++) {
        if (expensesArr[i].categoryId === id) {
            showToast("Cannot delete — category is used in existing expenses.", "error"); return;
        }
    }
    const idx = categoriesArr.findIndex(c => c.id === id);
    if (idx !== -1) categoriesArr.splice(idx, 1);
    saveCategories();
    populateCategoryDropdowns();
    renderCategoryList();
    showToast("Category deleted.", "warning");
}

function cancelCatEdit() {
    document.getElementById("catName").value = "";
    document.getElementById("catIcon").value = "📦";
    const disp = document.getElementById("emojiDisplayIcon");
    if (disp) disp.textContent = "📦";
    document.getElementById("catColor").value = "#10b981";
    document.getElementById("catEditId").value = "";
    document.getElementById("catMsg").textContent = "";
    document.getElementById("catFormTitle").innerHTML = '<i class="bi bi-plus-circle me-2"></i>Add Category';
    clearFieldErrors(["catMsg"]);
    closeEmojiPicker();
}

function renderCategoryList() {
    const el = document.getElementById("categoryList");
    if (!categoriesArr.length) {
        el.innerHTML = `<p class="text-muted">No categories found.</p>`; return;
    }
    el.innerHTML = categoriesArr.map(cat => `
    <div class="cat-item">
      <div class="cat-swatch" style="background:${cat.color}22">${cat.icon}</div>
      <span class="cat-item-name">${cat.name}</span>
      ${cat.isDefault ? '<span class="cat-item-default">Default</span>' : ""}
      <button class="btn-cat-edit" onclick="editCategory('${cat.id}')"><i class="bi bi-pencil"></i></button>
      ${!cat.isDefault ? `<button class="btn-cat-del" onclick="deleteCategory('${cat.id}')"><i class="bi bi-trash3"></i></button>` : ""}
    </div>
  `).join("");
}

/* ============================================================
   SECTION 15 – SETTINGS & PREFERENCES (Section 8 of flowchart)
   ============================================================ */
function saveSettings() {
    const currency = document.getElementById("settingCurrency").value;
    const dateFormat = document.getElementById("settingDateFormat").value;
    const theme = document.getElementById("settingTheme").value;
    const name = document.getElementById("settingName").value.trim();

    if (!name) { showToast("Display name cannot be empty.", "error"); return; }

    // Update preferences object
    preferences = { currency, dateFormat, theme, name };

    // Save preferences to LocalStorage
    const email = getSession();
    saveData(`${KEY.PREFERENCES}_${email}`, preferences);

    // Apply changes
    applyPreferences();
    document.getElementById("sidebarName").textContent = name;
    document.getElementById("sidebarAvatar").textContent = name.charAt(0).toUpperCase();
    document.getElementById("topbarAvatar").textContent = name.charAt(0).toUpperCase();
    document.getElementById("dashGreeting").textContent = `Welcome back, ${name}!`;

    const msgEl = document.getElementById("settingsMsg");
    msgEl.className = "col-12 alert-msg alert-success";
    msgEl.textContent = "Settings applied successfully!";
    setTimeout(() => msgEl.classList.add("d-none"), 3000);

    showToast("Settings saved!");
}

function confirmClearData() {
    new bootstrap.Modal(document.getElementById("clearDataModal")).show();
}

function clearAllData() {
    const email = getSession();
    localStorage.removeItem(`${KEY.EXPENSES}_${email}`);
    localStorage.removeItem(`${KEY.BUDGET}_${email}`);
    localStorage.removeItem(`${KEY.CATEGORIES}_${email}`);

    expensesArr = [];
    monthlyBudget = 0;
    categoriesArr = JSON.parse(JSON.stringify(DEFAULT_CATEGORIES));
    saveCategories();

    bootstrap.Modal.getInstance(document.getElementById("clearDataModal")).hide();
    populateCategoryDropdowns();
    navigateTo("dashboard");
    showToast("All data cleared.", "warning");
}

/* ============================================================
   SECTION 16 – DASHBOARD (Section 1: Go to Dashboard)
   ============================================================ */
let dashLineInstance = null;
let dashDoughnutInstance = null;

function renderDashboard() {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const prefix = `${yyyy}-${mm}`;

    const total = expensesArr.reduce((s, e) => s + e.amount, 0);
    let monthTotal = 0;
    for (let i = 0; i < expensesArr.length; i++) {
        if (expensesArr[i].date.startsWith(prefix)) monthTotal += expensesArr[i].amount;
    }

    const budgetLeft = monthlyBudget ? monthlyBudget - monthTotal : 0;

    document.getElementById("dashTotal").textContent = formatCurrency(total);
    document.getElementById("dashMonth").textContent = formatCurrency(monthTotal);
    document.getElementById("dashBudget").textContent = monthlyBudget ? formatCurrency(Math.max(budgetLeft, 0)) : "—";
    document.getElementById("dashCount").textContent = expensesArr.length;

    // Budget progress bar
    if (monthlyBudget > 0) {
        const pct = Math.min((monthTotal / monthlyBudget) * 100, 100).toFixed(1);
        const bar = document.getElementById("dashBudgetProgress");
        bar.style.width = `${pct}%`;
        bar.className = "progress-bar" + (monthTotal > monthlyBudget ? " danger" : pct >= 80 ? " warning" : "");
        document.getElementById("dashBudgetLabel").textContent = `${pct}% used`;
        document.getElementById("dashBudgetSub").textContent = `${formatCurrency(monthTotal)} spent of ${formatCurrency(monthlyBudget)} budget`;
    } else {
        document.getElementById("dashBudgetLabel").textContent = "No budget set";
        document.getElementById("dashBudgetSub").textContent = "Go to Budget tab to set a monthly limit";
    }

    // Recent expenses (latest 5) — using Selection Sort on date
    const recent = selectionSortByDate(expensesArr, false).slice(0, 5);
    const listEl = document.getElementById("dashRecentList");
    if (!recent.length) {
        listEl.innerHTML = `<div class="expense-row"><span style="color:var(--text-muted);font-size:.85rem">No expenses recorded yet.</span></div>`;
    } else {
        listEl.innerHTML = recent.map(exp => {
            const cat = getCategoryById(exp.categoryId);
            return `<div class="expense-row">
        <div class="exp-cat-dot" style="background:${cat?.color || "#6b7280"}"></div>
        <div class="exp-details">
          <div class="exp-name">${cat ? `${cat.icon} ${cat.name}` : "Unknown"}</div>
          <div class="exp-meta">${formatDate(exp.date)} · ${exp.payment}</div>
        </div>
        <div class="exp-amount" style="color:var(--danger)">${formatCurrency(exp.amount)}</div>
      </div>`;
        }).join("");
    }

    // Mini doughnut
    const grouped = {};
    expensesArr.forEach(e => {
        grouped[e.categoryId] = (grouped[e.categoryId] || 0) + e.amount;
    });
    const dLabels = [], dData = [], dColors = [];
    Object.entries(grouped).forEach(([catId, amt]) => {
        const cat = getCategoryById(catId);
        dLabels.push(cat ? cat.name : "Unknown");
        dData.push(parseFloat(amt.toFixed(2)));
        dColors.push(cat ? cat.color : "#6b7280");
    });
    if (dashDoughnutInstance) dashDoughnutInstance.destroy();
    const dCtx = document.getElementById("dashDoughnutChart").getContext("2d");
    dashDoughnutInstance = new Chart(dCtx, {
        type: "doughnut",
        data: { labels: dLabels, datasets: [{ data: dData, backgroundColor: dColors, borderWidth: 2, borderColor: "#1c2230" }] },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: {
                legend: { position: "bottom", labels: { color: "#8b95a9", font: { family: "DM Sans", size: 11 }, padding: 10, boxWidth: 12 } },
                tooltip: { callbacks: { label: ctx => ` ${formatCurrency(ctx.raw)}` } }
            }
        }
    });

    // Line chart: last 6 months
    const months = [], monthData = [];
    for (let i = 5; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const p = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
        let sum = 0;
        for (let j = 0; j < expensesArr.length; j++) {
            if (expensesArr[j].date.startsWith(p)) sum += expensesArr[j].amount;
        }
        months.push(d.toLocaleString("default", { month: "short" }));
        monthData.push(parseFloat(sum.toFixed(2)));
    }
    if (dashLineInstance) dashLineInstance.destroy();
    const lCtx = document.getElementById("dashLineChart").getContext("2d");
    dashLineInstance = new Chart(lCtx, {
        type: "line",
        data: {
            labels: months,
            datasets: [{
                data: monthData, label: "Monthly",
                borderColor: "#10b981", backgroundColor: "rgba(16,185,129,.1)",
                borderWidth: 2, pointRadius: 4, pointBackgroundColor: "#10b981",
                fill: true, tension: .4
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: true,
            scales: {
                x: { ticks: { color: "#8b95a9", font: { family: "DM Sans" } }, grid: { color: "#2a3347" } },
                y: { ticks: { color: "#8b95a9", font: { family: "DM Sans" }, callback: v => formatCurrency(v) }, grid: { color: "#2a3347" } }
            },
            plugins: {
                legend: { display: false },
                tooltip: { callbacks: { label: ctx => ` ${formatCurrency(ctx.raw)}` } }
            }
        }
    });
}

/* ============================================================
   SECTION 17 – AUTH UI HELPERS
   ============================================================ */
function switchAuthTab(tab) {
    document.getElementById("signinForm").classList.toggle("d-none", tab !== "signin");
    document.getElementById("signupForm").classList.toggle("d-none", tab !== "signup");
    document.getElementById("signinTab").classList.toggle("active", tab === "signin");
    document.getElementById("signupTab").classList.toggle("active", tab === "signup");
}

function togglePass(id) {
    const el = document.getElementById(id);
    el.type = el.type === "password" ? "text" : "password";
}

/* ============================================================
   SECTION 18 – UTILITY FUNCTIONS
   ============================================================ */

/** Validate email with regex */
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** Format currency using preferences */
function formatCurrency(amount) {
    const sym = preferences.currency || "₱";
    return `${sym}${parseFloat(amount || 0).toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/** Format date according to preferences */
function formatDate(dateStr) {
    if (!dateStr) return "—";
    const fmt = preferences.dateFormat || "MM/DD/YYYY";
    const [y, m, d] = dateStr.split("-");
    if (fmt === "DD/MM/YYYY") return `${d}/${m}/${y}`;
    if (fmt === "YYYY-MM-DD") return `${y}-${m}-${d}`;
    return `${m}/${d}/${y}`;
}

/** Linear search by ID in any array */
function linearSearchById(arr, id) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === id) return arr[i];
    }
    return null;
}

/** Show inline field error */
function showFieldError(elId, msg) {
    const el = document.getElementById(elId);
    if (el) el.textContent = msg;
}

/** Clear multiple field errors */
function clearFieldErrors(ids) {
    ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = "";
    });
}

/** Show element with text (alert style) */
function showEl(el, msg, isError = false) {
    el.textContent = msg;
    el.classList.remove("d-none", "alert-success");
    if (!isError) el.classList.add("alert-success");
}

/** Set select value safely */
function setSelectVal(id, val) {
    const el = document.getElementById(id);
    if (el) el.value = val;
}

/** Toast notification system */
let toastTimer = null;
function showToast(msg, type = "success") {
    const el = document.getElementById("efToast");
    el.textContent = msg;
    el.className = `ef-toast show${type !== "success" ? " " + type : ""}`;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { el.classList.remove("show"); }, 3200);
}