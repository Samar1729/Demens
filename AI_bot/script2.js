const API_KEY = 'AIzaSyAKZ_JvmNNfn9fOVSlMTbyyNqagWmfW_vs'

const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent'

const chat_msg = document.getElementById("chat-msg")
const userInput = document.getElementById("user-input")
const sendButton = document.getElementById("send-button")

async function generateResponse(prompt) {
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            contents: [
                {
                    parts: [
                        {
                            text: prompt
                        }
                    ]
                }
            ]
        })
    })

    if (!response.ok) {
        throw new Error('Failed to give response')
    }

    const data = await response.json()

    return data.candidates[0].content.parts[0].text

}

function cleanMarkdown(text) {
    // Defines a function `cleanMarkdown` to remove any Markdown formatting (like headers, bold text, etc.) from the response.
    return text
        .replace(/#{1,6}\s?/g, '')
        // Removes any Markdown headers (e.g., #, ##, ###).

        .replace(/\*\*/g, '')
        // Removes bold formatting (ye wala sign : '**').

        .replace(/\n{3,}/g, '\n\n')
        // Limits excessive newlines to a maximum of two (replaces more than two newlines with two).

        .trim();
    // Removes any whitespace from the start and end of the string.
}


function addMessage(message, isUser) {
    const messageElement = document.createElement('div')
    messageElement.classList.add('message')

    messageElement.classList.add(isUser ? 'user-message' : 'bot-message')

    const profileImage = document.createElement('img')
    profileImage.classList.add('profile-image')

    profileImage.src = isUser ? 'user.jpg' : 'bot.jpg'

    profileImage.alt = isUser ? 'User' : 'Bot';

    const messageContent = document.createElement('div')
    messageContent.classList.add('message-content')

    messageContent.textContent = message

    messageElement.appendChild(profileImage)
    messageElement.appendChild(messageContent)
    chat_msg.appendChild(messageElement)


}


async function handleUserInput() {
    const userMessage = userInput.value.trim();

    if (userMessage) {
        addMessage(userMessage, true)

        userInput.value = ''

        sendButton.disabled = true

        userInput.disabled = true
    }

    try {
        const botMessage = await generateResponse
            (userMessage)
        addMessage(cleanMarkdown(botMessage), false)
    } catch (error) {
        console.error(error)
        addMessage('sorry i am unable to give your answer i am not capable of that as of now but we are working on it')
    }

    finally {
        sendButton.disabled = false
        userInput.disabled = false
        userInput.focus()
    }
}

sendButton.addEventListener('click', handleUserInput)
