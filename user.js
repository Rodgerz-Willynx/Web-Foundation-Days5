
const loadButton = document.getElementById("load-users");
const filterInput = document.getElementById("filter-input");
const statusMessage = document.getElementById("status");
const usersList = document.getElementById("users-list");

const USERS_URL = "https://jsonplaceholder.typicode.com/users";

let users = [];

// Fetch users from the API.
async function loadUsers() {
  loadButton.disabled = true;
  statusMessage.textContent = "Loading users...";
  usersList.replaceChildren();

  try {
    const response = await fetch(USERS_URL);

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    const data = await response.json();

    users = data;

    renderUsers(filterUsers());

    statusMessage.textContent =
      `Successfully loaded ${users.length} users.`;
  } catch (error) {
    users = [];
    usersList.replaceChildren();

    statusMessage.textContent =
      "Unable to load users. Please check your connection and try again.";

    console.error("Error loading users:", error);
  } finally {
    loadButton.disabled = false;
  }
}

// Display any array of users.
function renderUsers(list) {
  usersList.replaceChildren();

  if (list.length === 0) {
    statusMessage.textContent =
      "No users match your filter.";
    return;
  }

  list.forEach((user) => {
    const listItem = document.createElement("li");
    const name = document.createElement("h2");
    const email = document.createElement("p");
    const city = document.createElement("p");
    const company = document.createElement("p");

    name.textContent = user.name;
    email.textContent = `Email: ${user.email}`;
    city.textContent = `City: ${user.address.city}`;
    company.textContent = `Company: ${user.company.name}`;

    listItem.append(name, email, city, company);
    usersList.appendChild(listItem);
  });
}

// Filter the stored array without another API request.
function filterUsers() {
  const searchText = filterInput.value.trim().toLowerCase();

  return users.filter((user) =>
    user.name.toLowerCase().includes(searchText)
  );
}

// Load users when the button is clicked.
loadButton.addEventListener("click", loadUsers);

// Filter immediately whenever the input changes.
filterInput.addEventListener("input", () => {
  if (users.length === 0) {
    return;
  }

  const filteredUsers = filterUsers();
  renderUsers(filteredUsers);

  if (filteredUsers.length > 0) {
    statusMessage.textContent =
      `Showing ${filteredUsers.length} of ${users.length} users.`;
  }
});
