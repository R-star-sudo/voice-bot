// export default async function handler(req, res) {
//   try {
//     const { message } = req.body;

//     const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
//         "HTTP-Referer": "https://voice-bot-orcin.vercel.app/",
//         "X-Title": "Voice Interview Bot"
//       },
//       body: JSON.stringify({
//         model: "openai/gpt-3.5-turbo",
//         messages: [
//           {
//             role: "system",
//             content: "You are a confident professional candidate answering interview questions clearly and naturally."
//           },
//           {
//             role: "user",
//             content: message
//           }
//         ]
//       })
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       return res.status(500).json({ error: data });
//     }

//     res.status(200).json({
//       reply: data.choices[0].message.content
//     });

//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }
export default async function handler(req, res) {
  try {
    const { message } = req.body;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a confident professional candidate." },
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();

    console.log("FULL API RESPONSE:", data); // 👈 IMPORTANT

    res.status(200).json({ reply: data });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}