let globalUsers = null;
let globalCountries = null;
let globalUserCountries = [];

async function start() {
  //await fetchUsers();
  //await fetchCountries();

  // console.time('promise normal');
  // await promiseUsers();
  // await promiseCountries();
  // console.timeEnd('promise normal');

  const p1 = promiseUsers();
  const p2 = promiseCountries();

  console.time('Promise.all');
  await Promise.all([p1, p2]);
  console.timeEnd('Promise.all');

  hideSpinner();
  mergeUsersAndCountries();

  render();

  testFilterArray();
}

function testFilterArray() {
  const array = ['Neil Peart', 'Alex Lifeson', 'Geddy Lee'];
  const filter = array.filter((item) => item.includes('n'));
  console.log(filter);
}

function promiseUsers() {
  return new Promise(async (resolve, reject) => {
    await fetchUsers();

    setTimeout(() => {
      resolve();
    }, 5000);
  });
}

function promiseCountries() {
  return new Promise(async (resolve, reject) => {
    await fetchCountries();

    setTimeout(() => {
      resolve();
    }, 6000);
  });
}

function render() {
  const divUsers = document.querySelector('#divUsers');

  divUsers.innerHTML = `
    <div class='row'>
      ${globalUserCountries
        .map((item) => {
          return `
            <div class='col s6 m4 l3'>
              <div class='bordered'>
                <div class='flex-row'>
                  <img class='avatar' src='${item.userPicture}' />
                  <div class='flex-column'> 
                    <span>${item.userName}</span>
                    <img class='flag' src='${item.countryPicture}' /> 
                  </div>
                </div>
              </div>
            </div>
            `;
        })
        .join('')}
    </div>
    `;
}

function mergeUsersAndCountries() {
  globalUsers.forEach((user) => {
    const country = globalCountries.find((country) => {
      return country.countryCode === user.userNationality;
    });

    globalUserCountries.push({ ...user, ...country });
  });

  console.log(globalUserCountries);
}

function hideSpinner() {
  const spinner = document.querySelector('#spinner');
  spinner.classList.add('hide');
}

async function fetchUsers() {
  const res = await fetch(
    'https://randomuser.me/api/?results=100&seed=promise&nat=us,fr,au,br'
  );
  const json = await res.json();

  globalUsers = json.results.map(({ login, name, picture, nat }) => {
    return {
      userId: login.uuid,
      userName: name.first,
      userPicture: picture.large,
      userNationality: nat,
    };
  });
}

async function fetchCountries() {
  const res = await fetch('https://restcountries.eu/rest/v2/all');
  const json = await res.json();

  globalCountries = json.map(({ numericCode, alpha2Code, flag, name }) => {
    return {
      countryId: numericCode,
      countryCode: alpha2Code,
      countryPicture: flag,
      countryName: name,
    };
  });
}

start();
