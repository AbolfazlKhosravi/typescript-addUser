import "./index.css";

type User = {
  id: number;
  username: string;
  email: string;
};
type Users = Array<User>;

const form = document.querySelector<HTMLFormElement>("#form");
const username = document.querySelector<HTMLInputElement>("#username");
const email = document.querySelector<HTMLInputElement>("#email");
const userList = document.querySelector<HTMLDivElement>("#userList");

let users: Users = [];
document.addEventListener("DOMContentLoaded", () => {
  const result = localStorage.getItem("users");

  if (!result) return;
  users = JSON.parse(result);
  users.map((user) => createUser(user));
});

form?.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!username?.value || !email?.value)
    return alert("please write your data in inputs ");

  const user: User = {
    id: Date.now(),
    username: username.value,
    email: email.value,
  };
  createUser(user);
  users.push(user);
  saveUsers(users);
  username.value = "";
  email.value = "";
});

function createUser(user: User) {
  const htmlUser = ` <div
          class="flex flex-col items-start justify-center bg-white shadow-md rounded w-64 h-16 p-2"
        >
          <p class="text-slate-800 font-bold">
            UserName : <span class="text-blue-500 font-medium">${
              user.username
            }</span>
          </p>
          <p class="text-slate-800 font-bold">
            Email : <span class="text-blue-500 font-medium">${user.email.slice(
              0,
              20
            )}...</span>
          </p>
        </div>`;
  const div = document.createElement("div");
  div.innerHTML = htmlUser;
  userList?.append(div);
}

function saveUsers(users: Users) {
  localStorage.setItem("users", JSON.stringify(users));
}
