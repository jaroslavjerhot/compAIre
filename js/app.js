const askBtn = document.getElementById('askBtn');
const userInput = document.getElementById('userInput');
const modelSelect = document.getElementById('modelSelect');
const answerBox = document.getElementById('answerBox');
const priceEl = document.getElementById('price');
askBtn.addEventListener('click', ask);

    // askBtn.addEventListener('click', () => {
    //   const question = userInput.value.trim();
    //   const model = modelSelect.value;

    //   if(!question) {
    //     alert("Please enter a question!");
    //     return;
    //   }

      
    //   // For demo: fake API response
    //   answerBox.textContent = "Thinking...";
    //   priceEl.textContent = "0.00";

    //   setTimeout(() => {
    //     const answer = `This is a demo answer from ${model} for: "${question}"`;
    //     const price = (Math.random() * 0.05).toFixed(4); // fake price
    //     answerBox.textContent = answer;
    //     priceEl.textContent = price;
    //   }, 1000);
    // });

async function ask() {

  // const prompt = document.getElementById("q").value;
  //alert(prompt);
  
  answerBox.textContent = "Čekám na odpověď...";
  const r = await fetch(
    "https://openonce.pythonanywhere.com/api/ask",
    {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({prompt: userInput.value.trim(), model: modelSelect.value})
        }
  );
  //alert('after fetch');
  
  const data = await r.json();

  //alert(JSON.stringify(data));

  answerBox.textContent = data.answer || 'Error: ' + data.error;

  priceEl.textContent = data.priceHalsDPH.toFixed(3) + " hal";
}