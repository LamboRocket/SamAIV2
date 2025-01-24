const messageBar = document.querySelector(".input-container input");
const sendBtn = document.querySelector(".input-container button");
const messageBox = document.querySelector(".messages");

let API_URL = "https://gemini-api.google.dev/v1/text:generate"; // Updated to Gemini API
let API_KEY = ; // Replace with your Gemini API Key

sendBtn.onclick = function () {
    if (messageBar.value.length > 0) {
        let message = `
            <div class="message">
                <p class="user">${messageBar.value}</p>
            </div>`;
        messageBox.insertAdjacentHTML("beforeend", message);

        let response = `
            <div class="message">
                <p class="ai">...</p>
            </div>`;
        messageBox.insertAdjacentHTML("beforeend", response);

        setTimeout(() => {
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${API_KEY}`
                },
                body: JSON.stringify({
                    prompt: messageBar.value,
                    model: "gemini-1.5-bison", // Update to match the Gemini model
                    temperature: 0.7,
                    maxOutputTokens: 256
                })
            };

            fetch(API_URL, requestOptions)
                .then(res => res.json())
                .then(data => {
                    const ChatBotResponse = document.querySelector(".message .ai");
                    ChatBotResponse.innerHTML = data.candidates[0].output; // Adjusted for Gemini's response format
                    ChatBotResponse.classList.remove("new");
                })
                .catch(error => {
                    console.error("Error occurred:", error);
                    const ChatBotResponse = document.querySelector(".message .ai");
                    ChatBotResponse.innerHTML = "Sorry, an error occurred. Please try again.";
                });
        }, 100);
    }
};
