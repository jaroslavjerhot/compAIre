const askBtn = document.getElementById('askBtn');
const userInput = document.getElementById('userInput');
const modelSelect = document.getElementById('modelSelect');
const answerBox = document.getElementById('answerBox');
const priceEl = document.getElementById('price');
askBtn.addEventListener('click', ask);
userInput.textContent = "Francouzská černobílá komedie ze 70. let";
userInput.textContent = "Návštěva Borise Johnsona na Ukrajině po začátku války";
userInput.textContent = "Grónsko referendum o nezávislosti";
async function ask() {

  // const prompt = document.getElementById("q").value;
  //alert(prompt);
  
  answerBox.textContent = "Čekám na odpověď...";
  sMoviePrefix = `Zpracuj následující dotaz jako filmový expert. Zjisti, zda se dotaz týká osoby známé ve filmu.
  Nebo zda se jedná o téma filmu, zemi původu, žánr, charakteristika (černobílý, animovaný..) nebo období vydání filmu. 
  Země původu může být uvedena přídavným jménem. V tom případě odpověz názvem země.
  Odpověz pouze ve formě JSON pole, kde 
  jednotlivé klíče budou herec, režisér, hudební_skladatel, žánr, země_původu, charakteristika,
  téma, rok_od, rok_do. 
  \n\nDotaz: `

  sGooglePrefix = `Zpracuj následující dotaz jako expert na vyhledávání informací na internetu. 
  Zjisti zda se dotaz týká vyhledávání článku, obrázku, obrázku k tisku, videa, podcastu, ppt nebo pdf. 
  Zjisti, které země a jazyka se dotaz týká.
  Zjisti, zda je hledání vhodné omezit pouze na určité webové stránky nebo jejich části.
  Jazyk by měl odpovídat zemi.
  Odpověz pouze ve formě JSON pole, kde jednotlivé klíče budou 
  dotaz, země, jazyk, datum_od, datum_do, file_type, site, inurl.
  Jazyk uveď ve ISO 639-1, zemi ve formátu ISO 3166-1 alpha-2, datum ve formátu YYYY-MM-DD.
  \n\nDotaz: `

  sPrefix = sGooglePrefix
  sPrefix = sPrefix.replaceAll(/[\u0000-\u001F]/g, "");
  sPrefix = sPrefix.replaceAll('   ',' ').replaceAll('  ',' ');
  
  dctBody = { prefix: sPrefix,
                prompt: userInput.value.trim(), 
                model: modelSelect.value}
  
  // dctBody = {    prompt: sPrefix + userInput.value.trim(), 
  //             model: modelSelect.value}

  jsonBody = JSON.stringify(dctBody);
  const r = await fetch(
    "https://openonce.pythonanywhere.com/openAI",
    {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: jsonBody
        }
  );
  //alert('after fetch');
  
  // const data = await r.json();
  if (!r.ok) {
    answerBox.textContent = 'Error: ' + r.status + ' ' + r.statusText;
    priceEl.textContent = '-- hal';
    return;
  }
  const data = await r.json();

  //alert(JSON.stringify(data));
  if ("priceHalsDPH" in data) {
    priceEl.textContent = data.priceHalsDPH.toFixed(3) + " hal";
    answerBox.textContent = data.answer
  } else {
    priceEl.textContent = '-- hal';
    answerBox.textContent = 'Error: ' + (data.answer || 'unknown')
  }

x=0
  
}