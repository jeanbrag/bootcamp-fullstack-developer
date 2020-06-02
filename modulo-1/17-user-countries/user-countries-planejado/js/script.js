let globalUsers = [];
let globalCountries = [];
let globalUserCountries = [];

async function start() {
  // Mundo ideal
  await fetchUsers();
  await fetchCountries();

  // Forçando promises demoradas
  // console.time('promises');
  // await promiseUsers();
  // await promiseCountries();
  // console.timeEnd('promises');

  // Promises demoradas com Promise.all
  // const p1 = promiseUsers();
  // const p2 = promiseCountries();

  // console.log('Promise.all...');
  // console.time('Promise.all');
  // await Promise.all([p1, p2]);
  // console.timeEnd('Promise.all');

  hideSpinner();
  mergeUsersAndCountries();
  render();
}

function hideSpinner() {
  const spinner = document.querySelector('#spinner');
  
  // A class hide faz parte do Materialize
  spinner.classList.add('hide');
}

function promiseUsers() {
  return new Promise(async (resolve, reject) => {
    const users = await fetchUsers();

    window.setTimeout(() => {
      console.log('promiseUsers');
      resolve(users);
    }, 5000);
  });
}

function promiseCountries() {
  return new Promise(async (resolve, reject) => {
    const countries = await fetchCountries();

    window.setTimeout(() => {
      console.log('promiseCountries');
      resolve(countries);
    }, 6000);
  });
}

async function fetchUsers() {
  // prettier-ignore
  const res = await 
    fetch('https://randomuser.me/api/?results=100&seed=promise&nat=us,fr,au,br');

  const json = await res.json();

  globalUsers = json.results.map(({ nat, name, picture, login }) => {
    return {
      userId: login.uuid,
      userCountry: nat,
      userName: name.first,
      userPicture: picture.large,
    };
  });
}

async function fetchCountries() {
  const res = await fetch('https://restcountries.eu/rest/v2/all');

  const json = await res.json();

  globalCountries = json.map(({ name, flag, alpha2Code }) => {
    return {
      countryId: alpha2Code,
      countryName: name,
      countryPicture: flag,
    };
  });
}

function mergeUsersAndCountries() {
  globalUserCountries = [];

  globalUsers.forEach((user) => {
    const country = globalCountries.find(
      (country) => country.countryId === user.userCountry
    );

    globalUserCountries.push({ ...user, ...country });
  });
}

function render() {
  const divUsers = document.querySelector('#divUsers');

  divUsers.innerHTML = `
    <div class='row'>
      ${globalUserCountries
        .map(({ countryPicture, countryName, userPicture, userName }) => {
          return `
          <div class='col s6 m4 l3'>
            <div class='flex-row bordered'>
              <img class='avatar' src='${userPicture}' alt='${userName}' />
              <div class='flex-column'>
                <span>${userName}</span>
                <img class='flag' src='${countryPicture}' alt='${countryName}' />
              </div>
            </div>
          </div>
        `;
        })
        .join('')}
    </div>
  `;
}

start();
