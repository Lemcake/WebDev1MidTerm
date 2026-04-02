const userRole = document.body.dataset.protectedRole;
const authNameElem = document.querySelector("[data-auth-name]");
const authRoleElem = document.querySelector("[data-auth-role]");
const authUsernameElem = document.querySelector("[data-auth-username]");
const logoutBtn = document.querySelector("[data-logout]");

const mockUser = {
  name: "Jordan Green",
  role: "user",
  username: "jgreen123"
};

function renderAuth() {
  if (authNameElem) authNameElem.textContent = mockUser.name;
  if (authRoleElem) authRoleElem.textContent = mockUser.role;
  if (authUsernameElem) authUsernameElem.textContent = mockUser.username;
}

function handleLogout() {
  console.log("Logging out...");
  window.location.href = "natural-login.html";
}

logoutBtn?.addEventListener("click", handleLogout);

renderAuth();