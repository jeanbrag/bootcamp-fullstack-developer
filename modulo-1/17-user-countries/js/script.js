function start() {
  console.log("Dom Carregado");
  fetchUsers();
  fetchCountries();
  hideSpinner();
  mergeUsersAndCountries();
  render();
}

let url_users;

async function fetchUsers() {
  const res = await fetch(url_users);
  const json = await res.json();
}

async function fetchCountries() {}
