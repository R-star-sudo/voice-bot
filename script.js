const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = "en-US";

function startListening() {
  recognition.start();
}

recognition.onresult = async function(event) {
  const userSpeech = event.results[0][0].transcript;
  document.getElementById("userText").innerText = userSpeech;

  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userSpeech })
  });

  const data = await response.json();
  const botReply = data.reply;

  document.getElementById("botText").innerText = botReply;

  const speech = new SpeechSynthesisUtterance(botReply);
  speechSynthesis.speak(speech);
};