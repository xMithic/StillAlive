/* Lee la letra y los tiempos directamente de tu song.h (ponlo junto a index.html).
   No hay nada que copiar ni convertir. */
const lyricsReady = fetch("song.h").then(r => {
  if (!r.ok) throw new Error("song.h no encontrado");
  return r.text();
}).then(src => {
  const K = { note1_ms: 2000, note2_ms: 1000, note4_ms: 500, note8_ms: 250, note4dot_ms: 750, note16_ms: 125 };
  const dur = expr => new Function(...Object.keys(K), "return (" + expr + ");")(...Object.values(K));
  const unesc = s => s.replace(/\\(.)/g, (_, c) => c === "n" ? "\n" : c === "t" ? "\t" : c);

  src = src.replace(/\/\*[\s\S]*?\*\//g, "");
  const a = src.indexOf("std::list<Text> lyrics"), b = src.indexOf("std::list<Note> notes");
  const body = src.slice(a, b > a ? b : undefined);

  return body.split("Text(").slice(1).map(chunk => {
    let prefix = "";
    for (const m of chunk.matchAll(/static_cast<int>\((COMMAND|ASCII_IMAGES)::(\w+)\)/g)) {
      if (m[1] === "COMMAND" && m[2] === "CLEAR") prefix += "\u0003";
      if (m[1] === "ASCII_IMAGES") prefix += "\u0001" + m[2] + "\u0002";
    }
    const lits = [...chunk.matchAll(/"((?:[^"\\]|\\.)*)"/g)];
    const text = lits.map(m => unesc(m[1])).join("");
    let tail = chunk.slice(lits.length ? lits[lits.length - 1].index + lits[lits.length - 1][0].length : 0)
                    .trim().replace(/^,/, "");
    let depth = 0, end = tail.length;
    for (let i = 0; i < tail.length; i++) {
      depth += (tail[i] === "(") - (tail[i] === ")");
      if (depth < 0) { end = i; break; }
    }
    return { text: prefix + text, ms: dur(tail.slice(0, end).trim()) };
  });
});
