import React, { useEffect, useRef } from "react";

export const Yandexmap = ({ lang }) => {
  const mapRef = useRef(null);
  const scriptId = "yandex-map-script";

  const urls = {
    RU: "https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A99e999c42a004607a03f485f351b674780cb8b315986040157744c6ed87dc765&amp;width=689&amp;height=400&amp;lang=ru_RU&amp;scroll=true",
    EN: "https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3Aaa50dbe4525c622e3a56bddfa7da3bb95f92ba405d9dee32cb45e16780de0288&amp;width=1008&amp;height=720&amp;lang=en_FR&amp;scroll=true"
  };

  useEffect(() => {

    const existingScript = document.getElementById(scriptId);
    if (existingScript) {
      existingScript.remove();
    }

    if (mapRef.current) {
      mapRef.current.innerHTML = '';
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = urls[lang] || urls.EN;
    script.async = true;

    if (mapRef.current) {
      mapRef.current.appendChild(script);
    }

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [lang]);

  return <div ref={mapRef} style={{ width: "100%", height: "700px", margin: "10px auto" }} alt='map hasnt loaded'/>;
};