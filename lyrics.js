/* ====== LETRA ======
   Pega aquí, dentro de [ ], las líneas de tu song.h (la lista `lyrics`),
   haciendo en tu editor estos 3 reemplazos (Ctrl+H, modo regex):

   1)  std::string\{static_cast<int>\(COMMAND::CHANGE_IMAGE\)\} \+ std::string\{static_cast<int>\(ASCII_IMAGES::(\w+)\)\}   ->   IMG.$1
   2)  std::string\{static_cast<int>\(COMMAND::CLEAR\)\}   ->   CLEAR
   3)  Text\(   ->   T(

   Lo demás (note8_ms, 4 * note8_ms + note4_ms, comentarios, etc.) ya funciona igual. */

const note1_ms = 2000, note2_ms = 1000, note4_ms = 500,
      note8_ms = 250, note4dot_ms = 750, note16_ms = 125;
String T = "Text";
const IMG = {};
["APERTURE","RADIATION","ATOM","HEART","EXPLOSION","FIRE","CHECK","BLACKMESA","CAKE","GLADOS"]
  .forEach(n => IMG[n] = "\u0001" + n + "\u0002");
const CLEAR = "\u0003";
const T = (text, ms) => ({ text, ms });

const lyrics = [
   Text(" Forms FORM-29827281-12:\n", note2_ms),
    Text("Test Assessment Report\n\n", note2_ms),
    Text("This was a triumph.\n", 4 * note8_ms + note4_ms),
    Text("", note4_ms+ note2_ms + note4_ms + note8_ms),
    Text("I'm making a note here:\n", 6 * note8_ms + note4_ms),
    Text("", note8_ms),
    Text("\"HUGE SUCCESS.\"\n", note4_ms + 2 * note8_ms + note2_ms),
    Text("", note4dot_ms),
    Text("It's hard to overstate\n", 5 * note8_ms + 2 * note4_ms),
    Text("my satisfaction.\n", 4 * note8_ms + note4_ms + 2 * note4dot_ms),
    Text("", note1_ms),
    Text(std::string{static_cast<int>(COMMAND::CHANGE_IMAGE)} + std::string{static_cast<int>(ASCII_IMAGES::APERTURE)}
     + "Aperture Science:\n", 3 * note4_ms), /*aperture logo*/
    Text("", note1_ms + note8_ms),
    Text("We do what we must\n", 3 * note4_ms),
    Text("because we can.\n", 3 * note4_ms + note2_ms),
    Text("", note2_ms),
    Text("For the good of all of us.\n", 6 * note8_ms + 3 * note4_ms),
    Text("Except the ones who are dead.\n\n", 8 * note8_ms),
    Text("", note2_ms),
    Text("But there's no sense crying\n", 4 * note8_ms + 2 * note4_ms),
    Text("Over every mistake.\n", 2 * note8_ms + 2 *note4_ms),
    Text("You just keep on trying\n", 4 * note8_ms + 2 * note4_ms), 
    Text("'Til you run out of cake.\n", 4 * note8_ms + 2 * note4_ms),
    Text(std::string{static_cast<int>(COMMAND::CHANGE_IMAGE)} + std::string{static_cast<int>(ASCII_IMAGES::RADIATION)}
     + "And the science gets done.\n", 7 * note8_ms),  /*radiation*/
    Text("", note8_ms),
    Text("And you make a neat gun\n", 7 * note8_ms),
    Text("", note8_ms),
    Text(std::string{static_cast<int>(COMMAND::CHANGE_IMAGE)} + std::string{static_cast<int>(ASCII_IMAGES::APERTURE)}
     + "For the people who are\n", 6 * note8_ms),   /*aperture logo*/     
    Text("Still alive.\n", 4 * note8_ms),
    Text(std::string{static_cast<int>(COMMAND::CLEAR)} + "Forms FORM-55551-5:\n", note1_ms), /*clear the lyrics window*/
    Text("Personal File Addendum:\n\n", note1_ms),
    Text("Dear <<Subject Name Here>>,\n\n", note1_ms),
    Text("", 3 * note4_ms),
    Text("I'm not even angry...\n", 4 * note8_ms + note4_ms),
    Text("", 5 * note4_ms),
    Text("I'm being so sincere right now.\n", note2_ms + note1_ms),
    Text("", 4 * note4_ms),
    Text(std::string{static_cast<int>(COMMAND::CHANGE_IMAGE)} + std::string{static_cast<int>(ASCII_IMAGES::HEART)}
     + "Even though you broke my heart,\n", 1 * note1_ms + 1 * note2_ms), /*heart*/
    Text("", 1 * note4_ms),
    Text("And killed me.\n", 2 * note4_ms),
    Text("", note4_ms + note2_ms + note4dot_ms),
    Text(std::string{static_cast<int>(COMMAND::CHANGE_IMAGE)} + std::string{static_cast<int>(ASCII_IMAGES::EXPLOSION)}
     + "And tore me to pieces.\n", 3 * note4_ms),  /*explosion*/
    Text("", 1 * note1_ms + note4dot_ms),
    Text("And threw every piece ", 2 * note8_ms + 2 * note4_ms),
    Text("", note8_ms),
    Text(" into ", note4dot_ms),
    Text("", note8_ms),
    Text(std::string{static_cast<int>(COMMAND::CHANGE_IMAGE)} + std::string{static_cast<int>(ASCII_IMAGES::FIRE)}
     + " a fire.\n", note4dot_ms), /*fire*/
    Text("", 3 * note4_ms),
    Text("As they burned it hurt because\n", note1_ms + note2_ms),
    Text(std::string{static_cast<int>(COMMAND::CHANGE_IMAGE)} + std::string{static_cast<int>(ASCII_IMAGES::CHECK)}
     + "I felt so happy for you!\n", note1_ms + note8_ms), /*check*/
    Text("Now, these points of data\n", 4 * note4_ms),
    Text("Make a beautiful line.\n", 4 * note4_ms),
    Text("And we're out of beta.\n", 4 * note4_ms),
    Text("We're releasing on time!\n", 4 * note4_ms),
    Text(std::string{static_cast<int>(COMMAND::CHANGE_IMAGE)} + std::string{static_cast<int>(ASCII_IMAGES::EXPLOSION)}
     + "So I'm GLaD I got burned!\n", 4 * note4_ms),   /*explosion*/
    Text(std::string{static_cast<int>(COMMAND::CHANGE_IMAGE)} + std::string{static_cast<int>(ASCII_IMAGES::ATOM)}
     + "Think of all the things we learned!\n", 4 * note4_ms), /*atom*/
    Text(std::string{static_cast<int>(COMMAND::CHANGE_IMAGE)} + std::string{static_cast<int>(ASCII_IMAGES::APERTURE)}
     + "For the people who are\n", 3 * note4_ms),  /*aperture*/
    Text("", note4_ms),
    Text("Still alive.\n", 2 * note4_ms),
    Text(std::string{static_cast<int>(COMMAND::CLEAR)} + "Forms FORM-55551-6:\n", note1_ms), /*clear the lyrics window*/
    Text("Personal File Addendum Addendum:\n\n", note1_ms),
    Text("One last thing:\n\n", note1_ms + note4dot_ms),
    Text("Go ahead and leave me...\n", 8 * note8_ms),
    Text("", note1_ms),
    Text("I think I'd prefer ", 3 * note4_ms),
    Text("", note8_ms),
    Text(" to stay ", 3 * note8_ms),
    Text("", note8_ms),
    Text(" inside...\n", note2_ms),
    Text("", 6 * note8_ms),
    Text("Maybe you'll find someone else\n", note1_ms + note2_ms + note8_ms),
    Text("", note8_ms),
    Text("To help you.\n", 2 * note4_ms),
    Text("", 5 * note4_ms),
    Text(std::string{static_cast<int>(COMMAND::CHANGE_IMAGE)} + std::string{static_cast<int>(ASCII_IMAGES::BLACKMESA)}
     + "Maybe Black Mesa?\n", 3 * note4_ms),   /*black mesa*/
    Text("", note1_ms + note4_ms),
    Text("THAT WAS A JOKE. ", 2 * note4_ms + note8_ms),
    Text("", 5 * note8_ms),
    Text(" FAT CHANCE.\n", note4_ms + note2_ms),
    Text("", note2_ms),
    Text(std::string{static_cast<int>(COMMAND::CHANGE_IMAGE)} + std::string{static_cast<int>(ASCII_IMAGES::CAKE)}
     + "Anyway this cake is great!\n", note1_ms + note2_ms + note8_ms),  /*cake*/
    Text("It's so delicious and moist!\n", note1_ms),
    Text("", note8_ms),
    Text(std::string{static_cast<int>(COMMAND::CHANGE_IMAGE)} + std::string{static_cast<int>(ASCII_IMAGES::GLADOS)}
     + "Look at me: still talking\n", note1_ms),   /*glados*/
    Text(std::string{static_cast<int>(COMMAND::CHANGE_IMAGE)} + std::string{static_cast<int>(ASCII_IMAGES::RADIATION)}
     + "When there's science to do!\n", note1_ms), /*radiation*/
    Text(std::string{static_cast<int>(COMMAND::CHANGE_IMAGE)} + std::string{static_cast<int>(ASCII_IMAGES::APERTURE)}
     + "When I look out there,\n", 3 * note4_ms),      /*aperure*/
    Text("It makes me glad I'm not you.\n", note1_ms),
    Text(std::string{static_cast<int>(COMMAND::CHANGE_IMAGE)} + std::string{static_cast<int>(ASCII_IMAGES::ATOM)}
     + "I've experiments to run.\n", note1_ms),    /*atom*/
    Text(std::string{static_cast<int>(COMMAND::CHANGE_IMAGE)} + std::string{static_cast<int>(ASCII_IMAGES::EXPLOSION)}
     + "There is research to be done.\n", note1_ms),   /*explosion*/
    Text(std::string{static_cast<int>(COMMAND::CHANGE_IMAGE)} + std::string{static_cast<int>(ASCII_IMAGES::APERTURE)}
     + "On the people who are\n", note1_ms),   /*aperture*/
    Text("", note4_ms),
    Text("Still alive.\n", 2 * note4_ms),
    Text("", note2_ms),
    Text(std::string{static_cast<int>(COMMAND::CLEAR)} + "PS: ", 1 * note4_ms),
    Text(" And believe me I am\n", 3 * note4_ms), /*clear the lyrics window*/
    Text("Still alive.\n", 2 * note4_ms),
    Text("PPS: ", 2 * note4_ms),
    Text(" I'm doing science and I'm\n", note1_ms),
    Text("Still alive.\n", 2 * note4_ms),
    Text("PPPS: ", 2 * note4_ms),
    Text(" I feel FANTASTIC and I'm\n", note1_ms),
    Text("Still alive.\n\n", 2 * note4_ms),
    Text("FINAL THOUGHT:\n", note2_ms + note4_ms),
    Text("While you're dying I'll be\n", 3 * note4_ms),
    Text("Still alive.\n\n", 2 * note4_ms),
    Text("FINAL THOUGHT PS:\n", note2_ms),
    Text("And when you're dead I will be\n", note1_ms),
    Text("Still alive\n\n", 2 * note4_ms),
    Text("", 5 * note8_ms),
    Text("Still alive\n\n", 3 * note8_ms),
    Text("", 5 * note8_ms),
    Text("STILL ALIVE\n", 3 * note8_ms),
    Text("", 0)
  // Ejemplo del formato (bórralo y pega tus líneas):
  T(IMG.APERTURE + "Tu texto aquí\n", 3 * note4_ms),
  T("", note1_ms),                       // texto vacío = pausa
  T(CLEAR + "Otra pantalla\n", note1_ms), // CLEAR limpia el cuadro de letra
];
