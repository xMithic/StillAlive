#!/usr/bin/env python3
"""Genera song.json a partir de song.h, notes_defenitions.h y ASCII_images.h
del proyecto C++ still-alive.  Uso:  python3 convert.py ruta/al/repo-cpp
"""
import re, sys, json, os

src = sys.argv[1] if len(sys.argv) > 1 else "."
rd = lambda n: open(os.path.join(src, n), encoding="utf-8", errors="replace").read()
nocomment = lambda s: re.sub(r"/\*.*?\*/", "", s, flags=re.S)

# --- constantes (notas y duraciones, BPM=120 como en el original)
env = {"note4_ms": 500}
env.update(note1_ms=2000, note2_ms=1000, note8_ms=250, note4dot_ms=750, note16_ms=125)
for name, val in re.findall(r"constexpr int (\w+)\s*=\s*(\d+);", nocomment(rd("notes_defenitions.h"))):
    env.setdefault(name, int(val))

def ev(expr):
    return int(eval(expr, {"__builtins__": {}}, env))

song = nocomment(rd("song.h"))
images = ["APERTURE","RADIATION","ATOM","HEART","EXPLOSION","FIRE","CHECK","BLACKMESA","CAKE","GLADOS"]

def unesc(s):
    return re.sub(r"\\(.)", lambda m: {"n": "\n", "t": "\t"}.get(m.group(1), m.group(1)), s)

# --- notas
nb = song[song.index("std::list<Note> notes"):]
notes = [[ev(f), ev(d)] for f, d in re.findall(r"Note\(\s*(\w+)\s*,\s*([^)]+)\)", nb)]

# --- letra
lb = song[song.index("std::list<Text> lyrics"):song.index("std::list<Note> notes")]
lyrics = []
for chunk in lb.split("Text(")[1:]:
    ev_ = {"text": "", "image": None, "clear": False}
    for kind, val in re.findall(r"static_cast<int>\((COMMAND|ASCII_IMAGES)::(\w+)\)", chunk):
        if kind == "COMMAND" and val == "CLEAR": ev_["clear"] = True
        if kind == "ASCII_IMAGES": ev_["image"] = val.lower() if val != "BLACKMESA" else "blackMesa"
    lits = list(re.finditer(r'"((?:[^"\\]|\\.)*)"', chunk))
    ev_["text"] = "".join(unesc(m.group(1)) for m in lits)
    tail = chunk[lits[-1].end():]
    tail = re.sub(r"^\s*,", "", tail.strip())
    depth, end = 0, len(tail)
    for i, ch in enumerate(tail):
        depth += (ch == "(") - (ch == ")")
        if depth < 0: end = i; break
    tail = tail[:end].strip()
    ev_["duration"] = ev(tail)
    lyrics.append(ev_)

# --- ASCII art
art = {}
for name, body in re.findall(r"const std::string (\w+)\[\]\s*\{(.*?)\};", rd("ASCII_images.h"), flags=re.S):
    art[name.lower() if name != "blackMesa" else name] = [unesc(m).rstrip("\n") for m in re.findall(r'"((?:[^"\\]|\\.)*)"', body)]
for l in lyrics:
    if l["image"] == "glados": l["image"] = "glados"

json.dump({"notes": notes, "lyrics": lyrics, "art": art}, open("song.json", "w"), ensure_ascii=False)
print(f"OK: {len(notes)} notas, {len(lyrics)} eventos de letra, {len(art)} imágenes -> song.json")
