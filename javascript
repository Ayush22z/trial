async function generateEmail() {
  const command = document.getElementById("commandInput").value;
  const output = document.getElementById("output");
  const outputSection = document.getElementById("outputSection");

  if (!command.trim()) {
    output.innerText = "Please enter a command.";
    outputSection.style.display = "block";
    return;
  }

  output.innerText = "Generating email...";
  outputSection.style.display = "block";

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer YOUR_OPENAI_API_KEY",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant that writes formal, professional emails." },
          { role: "user", content: `Write a full professional email based on this instruction: "${command}"` }
        ],
        temperature: 0.7
      }),
    });

    const data = await response.json();
    output.innerText = data.choices[0].message.content;
  } catch (err) {
    output.innerText = "Error generating email. Please try again.";
    console.error(err);
  }
}
