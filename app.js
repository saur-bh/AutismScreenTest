const app = document.getElementById("app");
const questions = [
    { id: 1, text: "Does your child often fail to pay close attention to details?", img: "./img/placeholder1.png" },
    { id: 2, text: "Does your child often have difficulty staying focused?", img: "./img/placeholder2.png" },
    { id: 3, text: "Does your child often seem not to listen when spoken to directly?", img: "./img/placeholder3.png" },
    { id: 4, text: "Does your child often start tasks but fail to complete them?", img: "./img/placeholder4.png" },
    { id: 5, text: "Does your child often lose things necessary for tasks?", img: "./img/placeholder5.png" },
    { id: 6, text: "Is your child often easily distracted by noises or other things happening around them?", img: "./img/placeholder6.png" },
    { id: 7, text: "Does your child frequently fidget with their hands, feet, or squirm in their seat?", img: "./img/placeholder7.png" },
    { id: 8, text: "Does your child often leave their seat when expected to stay seated?", img: "./img/placeholder8.png" },
    { id: 9, text: "Does your child often run, climb, or act overly restless in inappropriate situations?", img: "./img/placeholder9.png" },
    { id: 10, text: "Does your child often seem 'on the go' as if driven by a motor?", img: "./img/placeholder10.png" },
    { id: 11, text: "Does your child frequently talk excessively?", img: "./img/placeholder11.png" },
    { id: 12, text: "Does your child often blurt out answers before the question is completed?", img: "./img/placeholder12.png" },
    { id: 13, text: "Does your child have difficulty waiting their turn in games or group activities?", img: "./img/placeholder13.png" },
    { id: 14, text: "Does your child interrupt or intrude on others frequently?", img: "./img/placeholder14.png" },
    { id: 15, text: "Does your child often act without thinking, leading to risky or inappropriate behavior?", img: "./img/placeholder15.png" },
];

let currentQuestion = 0;
let yesCount = 0;

const renderQuestion = () => {
    const question = questions[currentQuestion];
    app.innerHTML = `
        <div class="text-center">
            <img src="${question.img}" alt="Question" class="w-full h-64 object-cover rounded-lg">
            <h2 class="text-lg font-semibold mt-4">${question.text}</h2>
            <div class="flex justify-center mt-6">
                <button onclick="answer(true)" class="bg-green-500 text-white px-6 py-2 rounded-lg mr-4">Yes</button>
                <button onclick="answer(false)" class="bg-red-500 text-white px-6 py-2 rounded-lg">No</button>
            </div>
            <div class="text-center mt-6">
                <button onclick="retryQuiz()" class="bg-gray-500 text-white px-6 py-2 rounded-lg">Retry Quiz</button>
            </div>
        </div>
    `;
};

const answer = (yes) => {
    if (yes) yesCount++;
    currentQuestion++;
    if (currentQuestion < questions.length) {
        renderQuestion();
    } else {
        renderResultForm();
    }
};

const renderResultForm = () => {
    app.innerHTML = `
        <form id="resultForm" class="space-y-4">
            <h2 class="text-xl font-bold text-center">Your Details</h2>
            <input type="text" id="name" placeholder="Your Name" class="w-full border p-2 rounded">
            <input type="text" id="childName" placeholder="Child's Name" class="w-full border p-2 rounded">
            <input type="number" id="age" placeholder="Child's Age" class="w-full border p-2 rounded">
            <select id="gender" class="w-full border p-2 rounded">
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
            <input type="email" id="email" placeholder="Email" class="w-full border p-2 rounded">
            <input type="tel" id="phone" placeholder="Phone Number" class="w-full border p-2 rounded">
            <button type="submit" class="bg-blue-500 text-white px-6 py-2 rounded-lg w-full">Submit</button>
        </form>
        <div class="text-center mt-6">
            <button onclick="retryQuiz()" class="bg-gray-500 text-white px-6 py-2 rounded-lg">Retry Quiz</button>
        </div>
    `;
    document.getElementById("resultForm").addEventListener("submit", calculateResult);
};

const calculateResult = (e) => {
    e.preventDefault();
    let resultImage, feedbackMessage, feedbackColor;

    if (yesCount <= 4) {
        resultImage = "./img/parent_with_child.png";
        feedbackMessage = "Likely typical behavior; no immediate concerns.";
        feedbackColor = "green";
    } else if (yesCount <= 9) {
        resultImage = "./img/female_child.png";
        feedbackMessage = "Some signs of ADHD; consider monitoring and seeking professional advice.";
        feedbackColor = "orange";
    } else {
        resultImage = "./img/male_child.png";
        feedbackMessage = "Strong signs of ADHD; consult a pediatrician, psychologist, or psychiatrist for a detailed evaluation.";
        feedbackColor = "red";
    }

    app.innerHTML = `
        <div class="text-center">
            <img src="${resultImage}" alt="Result" class="w-full h-64 object-cover rounded-lg">
            <h2 class="text-xl font-bold mt-4 text-${feedbackColor}-500">${feedbackMessage}</h2>
            <div class="text-center mt-6">
                <button onclick="retryQuiz()" class="bg-gray-500 text-white px-6 py-2 rounded-lg">Retry Quiz</button>
            </div>
        </div>
    `;
};

const retryQuiz = () => {
    currentQuestion = 0;
    yesCount = 0;
    renderQuestion();
};

// Start the quiz
renderQuestion();