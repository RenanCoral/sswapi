const personagensContador = document.getElementById("personagens");
const luasContador = document.getElementById("luas");
const planetasContador = document.getElementById("planetas");
const navesContador = document.getElementById("naves");

preencherContadores();

function preencherContadores() {
  Promise.all([
    swapiGet("people/"),
    swapiGet("vehicles/"),
    swapiGet("planets/"),
    swapiGet("starships/")
  ]).then(function (results) {
    personagensContador.innerHTML = results[0].data.count;
    luasContador.innerHTML = results[1].data.count;
    planetasContador.innerHTML = results[2].data.count;
    navesContador.innerHTML = results[3].data.count;
  });
}

function swapiGet(param) {
  return axios.get(`https://swapi.dev/api/${param}`);
}

function filterPerson() {
  var persons = [];
  var input = document.querySelector("#name");
  var name = input.value;

  // getFilterPersonsAPI(persons, 1);
  Promise.all([
    swapiGet("people/"),
    swapiGet("people/?page=2"),
    swapiGet("people/?page=3"),
    swapiGet("people/?page=4"),
    swapiGet("people/?page=5"),
    swapiGet("people/?page=6"),
    swapiGet("people/?page=7"),
    swapiGet("people/?page=8")
  ]).then(function (results) {
    console.log(results);
    persons = results[0].data.results
      .concat(results[1].data.results)
      .concat(results[2].data.results)
      .concat(results[3].data.results)
      .concat(results[4].data.results)
      .concat(results[5].data.results)
      .concat(results[6].data.results)
      .concat(results[7].data.results);

    //Atualizando lista do zero
    const div = document.querySelector("#listPerson");
    div.innerHTML = "";

    persons = persons.filter(
      (persons) => persons.name.toLowerCase().indexOf(name.toLowerCase()) >= 0
    );

    createListPersons(persons);
  });
}

/**
 * Cria lista de personagens com hiperlink
 * @param {} persons
 */
function createListPersons(persons) {
  persons.map((persons) => {
    let a = document.createElement("a");
    let anchorText = document.createTextNode(persons.name);

    a.appendChild(anchorText);
    a.title = "Person";
    a.href = "#";
    a.addEventListener("click", () => {
      getDetailsPerson(persons.url);
    });
    document.getElementById("listPerson").appendChild(a);

    var br = document.createElement("br");
    document.getElementById("listPerson").appendChild(br);
  });
}

function getDetailsPerson(url) {
  axios.get(url).then(function (result) {
    console.log(result);

    document.getElementById("detailsPerson").innerHTML = "";

    let textoDetailName = document.createElement("h3");
    textoDetailName.textContent = `Nome: ${result.data.name}`;
    document.getElementById("detailsPerson").appendChild(textoDetailName);

    let textoDetailHeight = document.createElement("h3");
    textoDetailHeight.textContent = `Altura: ${result.data.height} cm`;
    document.getElementById("detailsPerson").appendChild(textoDetailHeight);

    let textoDetailGender = document.createElement("h3");
    if (result.data.gender == "male")
      textoDetailGender.textContent += `Gênero: Masculino `;
    else textoDetailGender.textContent += `Gênero: Feminino `;
    document.getElementById("detailsPerson").appendChild(textoDetailGender);

    let textoDetailEyeColor = document.createElement("h3");
    textoDetailEyeColor.textContent += `Cor dos olhos: ${result.data.eye_color} `;
    document.getElementById("detailsPerson").appendChild(textoDetailEyeColor);

    let textoDetailBirthYear = document.createElement("h3");
    textoDetailBirthYear.textContent += `Ano de aniversario: ${result.data.birth_year} `;
    document.getElementById("detailsPerson").appendChild(textoDetailBirthYear);
  });
}