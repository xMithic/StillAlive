/* ====== LETRA ======
   Pega aquí, dentro de [ ], las líneas de tu song.h (la lista `lyrics`),
   haciendo en tu editor estos 3 reemplazos (Ctrl+H, modo regex):

   1)  std::string\{static_cast<int>\(COMMAND::CHANGE_IMAGE\)\} \+ std::string\{static_cast<int>\(ASCII_IMAGES::(\w+)\)\}   ->   IMG.$1
   2)  std::string\{static_cast<int>\(COMMAND::CLEAR\)\}   ->   CLEAR
   3)  Text\(   ->   T(

   Lo demás (note8_ms, 4 * note8_ms + note4_ms, comentarios, etc.) ya funciona igual. */

const note1_ms = 2000, note2_ms = 1000, note4_ms = 500,
      note8_ms = 250, note4dot_ms = 750, note16_ms = 125;

const IMG = {};
["APERTURE","RADIATION","ATOM","HEART","EXPLOSION","FIRE","CHECK","BLACKMESA","CAKE","GLADOS"]
  .forEach(n => IMG[n] = "\u0001" + n + "\u0002");
const CLEAR = "\u0003";
const T = (text, ms) => ({ text, ms });

const lyrics = [
  // Ejemplo del formato (bórralo y pega tus líneas):
  T(IMG.APERTURE + "Tu texto aquí\n", 3 * note4_ms),
  T("", note1_ms),                       // texto vacío = pausa
  T(CLEAR + "Otra pantalla\n", note1_ms), // CLEAR limpia el cuadro de letra
];
