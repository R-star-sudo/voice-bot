const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`
  },
  body: JSON.stringify({
    model: "openai/gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are a confident professional candidate answering interview questions clearly." },
      { role: "user", content: message }
    ]
  })
});