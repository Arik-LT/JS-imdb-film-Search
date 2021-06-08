//omdb KEy: 295901c5
// request http for humans -Resource
var folio = document.querySelector("#folio");

function gestionaRespuestaAsincrona() {
  if (this.readyState === 4 && this.status === 200) {
    console.log(this.responseText);
    const respuesta = JSON.parse(this.responseText);

    if (respuesta.Response === "False") {
      alert("No se han encontrado resultados");
      return;
    }

    elfolio = document.querySelector("#folio"); // Esto funciona por que esta dentro de la clase, y se ejecuta al principio, antes de escribir en el form
    elfolio.innerHTML = "";

    //respuesta.Search.foreach
    //else
    for (let i = 0; i < respuesta.Search.length; i++) {
      const pelicula = respuesta.Search[i];

      const div = document.createElement("div");
      div.className = "pelicula";
      const img = document.createElement("img");
      img.setAttribute("src", pelicula.Poster);
      img.setAttribute("alt", "Caratula de la pelicula"); // si imagen no carga, manda esto

      const p = document.createElement("p");
      p.classList = "parrafo";
      const textoP = `${pelicula.Title} (${pelicula.Year})`;
      p.innerHTML = textoP;

      const btn = document.createElement("a");
      btn.setAttribute(
        "href",
        `https://www.imdb.com/title/${pelicula.imdbID}/`
      );
      btn.setAttribute("target", "_blank"); // crea nueva pestaña en vez de reemplazar actual
      btn.className = "button";
      btn.classList.add("info");
      btn.innerHTML = "Mas INFO...";

      p.appendChild(btn);

      div.appendChild(img);
      div.appendChild(p);

      folio.appendChild(div);
    }
  }
}

const xhr = new XMLHttpRequest(); //manejador de peticiones, lanza peticiones de forma asincrona
xhr.onload = gestionaRespuestaAsincrona;

document.querySelector("#buscar").addEventListener("click", () => {
  const palabras = document.querySelector("#entrada").value;
  xhr.open(
    "GET",
    `http://www.omdbapi.com/?apikey=295901c5&s=${palabras}`,
    true
  );
  xhr.send();
});
