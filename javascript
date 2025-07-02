async function generateEmail() {
  const command = document.getElementById("commandInput").value;
  const output = document.getElementById("output");
  const outputSection = document.getElementById("outputSection");

  if (!command.trim()) {
    output.innerText = "Please enter a command.";
    outputSection.style.display = "block";
    return;
  }

  output.innerText = "✍️ Generating email...";
  outputSection.style.display = "block";

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
       "Authorization": ""Authorization": "Bearer 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",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a professional email writing assistant. You take short natural commands and generate full, formal, polite emails. Include greeting, subject line, body, and closing."
          },
          {
            role: "user",
            content: `Write an email based on this instruction:\n\n"${command}".`
          }
        ],
        temperature: 0.7
      }),
    });

    const data = await response.json();
    output.innerText = data.choices[0].message.content.trim();
  } catch (err) {
    output.innerText = "❌ Error generating email. Please try again.";
    console.error(err);
  }
}
