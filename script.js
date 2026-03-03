const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = "en-US";

function startListening() {
  const btn = document.querySelector(".talk-btn");
  btn.classList.add("listening");
  document.getElementById("btnText").innerText = "Listening...";
  document.getElementById("wave").classList.remove("hidden");
  recognition.start();
}

recognition.onresult = async function(event) {

  const btn = document.querySelector(".talk-btn");
  btn.classList.remove("listening");
  document.getElementById("btnText").innerText = "Start Talking";
  document.getElementById("wave").classList.add("hidden");

  const userSpeech = event.results[0][0].transcript;

  addMessage(userSpeech, "user");

  document.getElementById("typing").classList.remove("hidden");

  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userSpeech })
  });

  const data = await response.json();

  document.getElementById("typing").classList.add("hidden");

  addMessage(data.reply, "bot");

  const speech = new SpeechSynthesisUtterance(data.reply);
  speechSynthesis.speak(speech);
};

function addMessage(text, sender) {
  const chatBox = document.getElementById("chatBox");

  const div = document.createElement("div");
  div.classList.add("chat", sender);

  div.innerText = text;

  chatBox.appendChild(div);

  chatBox.scrollTop = chatBox.scrollHeight;
}