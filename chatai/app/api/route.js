// app/api/route.js
export async function POST(request) {
  const { message } = await request.json();
  
  const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      prompt: message,
      max_tokens: 150,
    }),
  });
  
  const data = await response.json();
  return NextResponse.json({ text: data.choices[0].text.trim() });
}
