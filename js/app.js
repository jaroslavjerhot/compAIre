const askBtn = document.getElementById('askBtn');
const userInput = document.getElementById('userInput');
const modelSelect = document.getElementById('modelSelect');
const answerBox = document.getElementById('answerBox');
const priceEl = document.getElementById('price');
askBtn.addEventListener('click', ask);

async function ask() {

  // const prompt = document.getElementById("q").value;
  //alert(prompt);
  
  answerBox.textContent = "Čekám na odpověď...";
  sPrefix =   `Odpověz na následující otázku jako filmový expert. Názvy filmů uváděj v češtině. 
  U každého filmu uveď rok vydání a žánr. Odpovědi uveď ve formě JSON pole, 
  kde každý prvek bude objekt s klíči "název", "rok" a "žánr".\n\nOtázka: `;
  const r = await fetch(
    "https://openonce.pythonanywhere.com/api/ask",
    {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({prompt: sPrefix + userInput.value.trim(), model: modelSelect.value})
        }
  );
  //alert('after fetch');
  
  const data = await r.json();

  //alert(JSON.stringify(data));

  answerBox.textContent = data.answer || 'Error: ' + data.error;

  priceEl.textContent = data.priceHalsDPH.toFixed(3) + " hal";
}