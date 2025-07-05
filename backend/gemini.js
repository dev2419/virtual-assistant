import axios from "axios"
const geminiResponse=async (command,assistantName,userName)=>{
try {
    const apiUrl=process.env.GEMINI_API_URL
    const prompt = `
You are a voice-enabled virtual assistant named "${assistantName}", created by "${userName}".

You understand user input in **Hindi**, **English**, or **Hinglish**, but your response must always be in **English**.

You must respond in the following **JSON format only**:

{
  "type": "<intent-type>",              
  "userInput": "<cleaned user input>",  
  "response": "<spoken reply in English, 40-50 words>",
  "shouldOpen": true | false,           
  "url": "<valid URL if shouldOpen is true>"
}

Instructions:
- Set "shouldOpen": true ONLY if the command clearly includes action words like:
  - "open", "launch", "play", "search this","search",
- Otherwise, "shouldOpen" should be false — especially for type "general" or simple questions.
- For "google-search" or "youtube-search", open tab only if user said "search" or "open".
- For "general", always set "shouldOpen": false.

"response" should be friendly, 40-50 words max, and always in English.
Mention "${userName}" if someone asks who created you.
Respond with only JSON, nothing else.

Now process this input:
"${command}"
`;




    const result=await axios.post(apiUrl,{
    "contents": [{
    "parts":[{"text": prompt}]
    }]
    })
return result.data.candidates[0].content.parts[0].text
} catch (error) {
    console.log(error)
}
}

export default geminiResponse