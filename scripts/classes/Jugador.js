class Jugador {
    nombre;
    mano;
    puntos;
    puntaje_mano;
    esHumano;
    manosGanadas;
    manosEmpatadas;
    partidosGanados;
    partidosEmpatados;
  
    constructor(nombre, esHumano) {
      this.nombre = nombre;
      this.puntos = 0;
      this.esHumano = esHumano;
      this.manosGanadas = 0;
      this.manosEmpatadas = 0;
      this.partidosGanados = 0;
      this.partidosEmpatados = 0;
    }
  
    recibirCartas() {
      getHand().then(mano => {
        this.mano = mano;
      });
    }
  
    mostrarCartas() {
      this.esHumano ? dibujarCartas(this.mano) : null;
    }
  
    get NombrePuntos() {
      return this.nombre + this.puntos;
    }
  
    set NombrePuntos(cambio) {
      [this.nombre, this.puntos] = cambio.split(" ");
    }
  
    calcularPuntos() {
      this.puntaje_mano = addScore(this.mano);
      this.puntos += this.puntaje_mano;
    }
  
    mostrarCartasPCTapadas() {
      dibujarCartasPC(cartasReverso);
    }
  
    mostrarCartasPC() {
      dibujarCartasPC(this.mano);
    }
  
    limpiar() {
      this.mano = [];
      this.puntaje_mano = 0;
    }
  
    consultarPuntajeMano() {
      return this.puntaje_mano;
    }
  
    consultarPuntos() {
      return this.puntos;
    }
  
    consultarNombre() {
      return this.nombre;
    }
  }