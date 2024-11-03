require('dotenv').config();

const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');

//Backend Server Listening on Port 5000
const app = express();
const PORT = 5000;

//Middleware communicating to front end port 3000
app.use(cors({
    origin: 'http://127.0.0.1:3000'
}));


app.get('/api/questions', async (req, res) => {
    //Calling OpenAI api for questions
    const apiKey = process.env.OPENAI_API_KEY;
    const openai = new OpenAI({ apiKey: apiKey });

    //AI Model I am using
    const aiModel = "gpt-3.5-turbo-1106";

    //Message to AI
    const messages = [
        {
            role: "system",
            content: 'You are a pop quiz master for tv shows. Generate 10 random questions with 4 multiple choice answers. Also provide the answers separately. The response should be in the following JSON format: {"questions":[{"id":0,"question":"","options":[],"answer":""},...]}'
        }
    ];

    //Message sent
    const response = await openai.chat.completions.create({
        model: aiModel,
        response_format: { "type": "json_object" },
        messages
    });

    //Response from AI
    const aiResponse = response.choices[0].message.content

    //Parse and Return
    const json = JSON.parse(aiResponse);
    res.json(json);

})

app.listen(PORT, () => { console.log('Server running on PORT 5000') })