/* Registro silencioso de visitas (envía a Supabase). No muestra nada en pantalla. */
(function(){
  const SUPABASE_URL  = "https://swwvftyyzqeizxsznmqw.supabase.co";
  const SUPABASE_ANON = "sb_publishable_5nuHOPhaxlF7ipKpsY8Jrw_dWEkzJXd";
  const ua = navigator.userAgent || "";

  function dispositivo(){
    if (/iPad/i.test(ua) || (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1)) return ["Tablet", "iPadOS"];
    if (/iPhone|iPod/i.test(ua)) return ["Móvil", "iOS"];
    if (/Android/i.test(ua)) return [/Mobile/i.test(ua) ? "Móvil" : "Tablet", "Android"];
    if (/Windows/i.test(ua)) return ["PC", "Windows"];
    if (/Macintosh|Mac OS X/i.test(ua)) return ["PC", "macOS"];
    if (/CrOS/i.test(ua)) return ["PC", "ChromeOS"];
    if (/Linux/i.test(ua)) return ["PC", "Linux"];
    return ["Desconocido", "Desconocido"];
  }

  function app(){
    const reglas = [
      [/Instagram/i, "Instagram"], [/TikTok|musical_ly|BytedanceWebview|Bytedance/i, "TikTok"],
      [/Messenger/i, "Messenger"], [/FBAN|FBAV|FB_IAB|FBIOS/i, "Facebook"],
      [/WhatsApp/i, "WhatsApp"], [/Snapchat/i, "Snapchat"], [/Twitter|TwitterAndroid/i, "X (Twitter)"],
      [/LinkedInApp/i, "LinkedIn"], [/Pinterest/i, "Pinterest"], [/Line\//i, "LINE"],
      [/Telegram/i, "Telegram"], [/Discord/i, "Discord"], [/MicroMessenger/i, "WeChat"],
      [/EdgA|EdgiOS|Edg\//i, "Edge"], [/OPR\/|Opera/i, "Opera"], [/SamsungBrowser/i, "Samsung Internet"],
      [/Firefox|FxiOS/i, "Firefox"], [/CriOS|Chrome\//i, "Chrome"], [/Safari\//i, "Safari"]
    ];
    for (const [re, n] of reglas) if (re.test(ua)) return n;
    return "Desconocida";
  }

  function origen(){
    if (!document.referrer) return "Directo / desconocido";
    try { return new URL(document.referrer).hostname; } catch(e){ return "Desconocido"; }
  }

  async function ubicacion(){
    const fuentes = [
      async () => { const d = await (await fetch("https://ipwho.is/")).json(); if (!d.success) throw 0;
        return { ip:d.ip, pais:d.country, ciudad:d.city, isp:(d.connection&&(d.connection.isp||d.connection.org))||"", tz:(d.timezone&&d.timezone.id)||"" }; },
      async () => { const d = await (await fetch("https://ipapi.co/json/")).json(); if (d.error) throw 0;
        return { ip:d.ip, pais:d.country_name, ciudad:d.city, isp:d.org||"", tz:d.timezone||"" }; },
      async () => { const d = await (await fetch("https://get.geojs.io/v1/ip/geo.json")).json();
        return { ip:d.ip, pais:d.country, ciudad:d.city, isp:d.organization_name||"", tz:d.timezone||"" }; }
    ];
    for (const f of fuentes){ try { const r = await f(); if (r && r.ip) return r; } catch(e){} }
    return null;
  }

  function alertas(geo, tzNav){
    const a = [];
    if (navigator.webdriver) a.push("Posible bot (webdriver)");
    if (/bot|crawl|spider|headless|curl|wget|python|scrapy/i.test(ua)) a.push("User agent de bot");
    if (geo && geo.tz && tzNav && geo.tz !== tzNav) a.push("Zona horaria ≠ IP (posible VPN/proxy)");
    if (geo && /vpn|proxy|hosting|cloud|amazon|google llc|digitalocean|ovh|hetzner|datacenter|m247|nord|express/i.test(geo.isp || ""))
      a.push("ISP de hosting/VPN");
    if (!navigator.languages || !navigator.languages.length) a.push("Sin idioma declarado");
    if (!ua) a.push("Sin user agent");
    return a;
  }

  async function registrar(){
    try {
      const [disp, sis] = dispositivo();
      const tzNav = (Intl.DateTimeFormat().resolvedOptions().timeZone) || "";
      const c = navigator.connection || {};
      const red = c.effectiveType ? c.effectiveType + (c.downlink ? " · " + c.downlink + " Mbps" : "") : "No disponible";
      const geo = await ubicacion();
      await fetch(SUPABASE_URL + "/rest/v1/visitas", {
        method: "POST",
        keepalive: true,
        headers: { apikey: SUPABASE_ANON, "Content-Type": "application/json", Prefer: "return=minimal" },
        body: JSON.stringify({
          ip: geo ? geo.ip : null, pais: geo ? geo.pais : null, ciudad: geo ? geo.ciudad : null, isp: geo ? geo.isp : null,
          dispositivo: disp, sistema: sis, app: app(), origen: origen(),
          idioma: (navigator.languages && navigator.languages.join(", ")) || navigator.language || "",
          pantalla: screen.width + "x" + screen.height + " @" + (window.devicePixelRatio || 1) + "x",
          zona_horaria: tzNav, zona_horaria_ip: geo ? geo.tz : null,
          conexion: red, alertas: alertas(geo, tzNav)
        })
      });
    } catch(e){ /* silencioso */ }
  }

  registrar();
})();
