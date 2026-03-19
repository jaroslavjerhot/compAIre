const textarea = document.getElementById("userInput");
const micBtn = document.getElementById("micBtn");

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {

  const recognition = new SpeechRecognition();

  recognition.lang = "cs-CZ";
  recognition.continuous = true;
  recognition.interimResults = true;

  let finalText = "";

  micBtn.onclick = () => {
    finalText = textarea.value;
    recognition.start();
  };

  recognition.onstart = () => {
    micBtn.innerHTML = "🔴";
    micBtn.classList.add("btn-danger");
  };

  recognition.onend = () => {
    micBtn.innerHTML = "🎤";
    micBtn.classList.remove("btn-danger");
  };

  recognition.onresult = (event) => {

    let interim = "";

    for (let i = event.resultIndex; i < event.results.length; i++) {

      const transcript = event.results[i][0].transcript;

      if (event.results[i].isFinal) {
        finalText += transcript + " ";
      } else {
        interim += transcript;
      }
    }

    textarea.value = finalText + interim;
  };

  recognition.onerror = (event) => {
    console.log("Speech error:", event.error);
  };

} else {

  micBtn.disabled = true;
  micBtn.innerHTML = "Speech not supported";

}