// Define isDev para saber si estamos en desarrollo o en producción
const isDev = window.location.hostname === "localhost"; 

const params = new URLSearchParams(window.location.search);
const letraSeleccionada = params.get('letra');
document.getElementById('letra').textContent = letraSeleccionada;

function cargarAudios() {
  const audiosDiv = document.getElementById('audio-cards');
  serverApp.use('/audios', express.static(path.join(__dirname, 'audios')));


  fetch(rutaAudios)
    .then(response => response.json())
    .then(audios => {
      audios.forEach(audio => {
        const cardHTML = `
          <div class="col">
            <div class="card h-100">
              <div class="card-body text-center">
                <h5 class="card-title">${audio.name}</h5>
                <audio controls>
                  <source src="${rutaAudios + audio.name}" type="audio/mp3">
                  Tu navegador no soporta el elemento de audio.
                </audio>
              </div>
            </div>
          </div>
        `;
        audiosDiv.innerHTML += cardHTML;
      });
    })
    .catch(error => console.log('Error al cargar los audios:', error));
}

window.onload = cargarAudios;
