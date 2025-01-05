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

            <!-- Parent Name -->
            <div>
                <input type="text" id="name" placeholder="Your Name" class="w-full border p-2 rounded">
                <p id="nameError" class="text-red-500 text-sm mt-1 hidden">This field is required.</p>
            </div>

            <!-- Child Name -->
            <div>
                <input type="text" id="childName" placeholder="Child's Name" class="w-full border p-2 rounded">
                <p id="childNameError" class="text-red-500 text-sm mt-1 hidden">This field is required.</p>
            </div>

            <!-- Child Age -->
            <div>
                <input type="number" id="age" placeholder="Child's Age" class="w-full border p-2 rounded">
                <p id="ageError" class="text-red-500 text-sm mt-1 hidden">This field is required.</p>
            </div>

            <!-- Gender -->
            <div>
                <select id="gender" class="w-full border p-2 rounded">
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                <p id="genderError" class="text-red-500 text-sm mt-1 hidden">Please select a gender.</p>
            </div>

            <!-- Email -->
            <div>
                <input type="email" id="email" placeholder="Email" class="w-full border p-2 rounded">
                <p id="emailError" class="text-red-500 text-sm mt-1 hidden">Please provide a valid email address.</p>
            </div>

            <!-- Phone -->
            <div>
                <input type="tel" id="phone" placeholder="Phone Number" class="w-full border p-2 rounded">
                <p id="phoneError" class="text-red-500 text-sm mt-1 hidden">Please input phone number without +91 or 0 in start.</p>
            </div>

            <!-- Submit Button -->
            <button type="submit" class="bg-blue-500 text-white px-6 py-2 rounded-lg w-full">Submit</button>
        </form>
        <div class="text-center mt-6">
            <button onclick="retryQuiz()" class="bg-gray-500 text-white px-6 py-2 rounded-lg">Retry Quiz</button>
        </div>
    `;

    // Add event listener for form submission
    document.getElementById("resultForm").addEventListener("submit", validateAndCalculateResult);
};

const calculateResult = (e) => {
    e.preventDefault();
     // Collect form data
     const parentName = document.getElementById("name").value || "Parent";
     const childName = document.getElementById("childName").value || "Child";

    let resultImage, feedbackMessage, feedbackColor;

    if (yesCount <= 4) {
        resultImage = "./img/parent_with_child.png";
        feedbackMessage = `Hello ${parentName} <p> This is  typical behavior :). </p><p>No immediate concerns. ${childName} is doing great!</p>`;
        feedbackColor = "green";
    } else if (yesCount <= 9) {
        resultImage = "./img/female_child.png";
        feedbackMessage = `Hello ${parentName}. <p>There are some signs of ADHD in ${childName}; </p><p>Consider seeking professional advice once.</p>`;
        feedbackColor = "orange";
    } else {
        resultImage = "./img/male_child.png";
        feedbackMessage = ` Hello ${parentName} <p> Strong signs of ADHD is seen in ${childName}.</p> <p>Seek professional advice immediately.</p>`;
        feedbackColor = "red";
    }

    // HTML for result page
    app.innerHTML = `
        <div class="text-center">
            <img src="${resultImage}" alt="Result" class="w-full h-64 object-cover rounded-lg">
              <h2 class="text-xl font-bold mt-4 text-${feedbackColor}-500">${feedbackMessage}</h2>
           
                ${yesCount <= 4
                    ? ` <p class="mt-6 text-2xl font-bold text-gray-800">Thanks for taking the quiz!</p>
            <p class="mt-2 text-lg text-gray-600">Follow us on Instagram for more resources and updates.</p>
            <div class="flex flex-col sm:flex-row justify-between items-center mt-6 space-y-4 sm:space-y-0 sm:space-x-4">
                <button onclick="retryQuiz()" class="w-full sm:w-auto bg-gray-500 text-white px-6 py-2 rounded-lg">Retry Quiz</button>
                    <a href="https://www.instagram.com/aaryavartcenterforautism/" target="_blank" class="w-full sm:w-auto bg-pink-500 text-white px-6 py-2 rounded-lg">Instagram</a>`
                    : `
                     <p class="mt-6 text-2xl font-bold text-gray-800">🌟 Get a Detailed Evaluation for  ${childName}🌟</p>
            <p class="mt-2 text-lg text-gray-600">Click WhatsApp to begin your journey with us. \n Let’s make a difference together!.</p>
            <div class="flex flex-col sm:flex-row justify-between items-center mt-6 space-y-4 sm:space-y-0 sm:space-x-4">
                <button onclick="retryQuiz()" class="w-full sm:w-auto bg-gray-500 text-white px-6 py-2 rounded-lg">Retry Quiz</button>
                        <a href="https://wa.me/917607293336" target="_blank" class="w-full sm:w-auto bg-green-500 text-white px-6 py-2 rounded-lg">WhatsApp</a>

                    `}
            </div>
        </div>
    `;
};

const retryQuiz = () => {
    currentQuestion = 0;
    yesCount = 0;
    renderQuestion();
};

const validateAndCalculateResult = (e) => {
    e.preventDefault();

    // Collect input values
    const parentName = document.getElementById("name").value.trim();
    const childName = document.getElementById("childName").value.trim();
    const childAge = document.getElementById("age").value.trim();
    const childGender = document.getElementById("gender").value;
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();

    // Validation flags
    let isValid = true;

    // Clear previous error messages
    document.querySelectorAll(".text-red-500").forEach((error) => error.classList.add("hidden"));

    // Validate each field and show error if invalid
    if (!parentName) {
        document.getElementById("nameError").classList.remove("hidden");
        isValid = false;
    }
    if (!childName) {
        document.getElementById("childNameError").classList.remove("hidden");
        isValid = false;
    }
    if (!childAge || isNaN(childAge) || childAge <= 0) {
        document.getElementById("ageError").classList.remove("hidden");
        isValid = false;
    }
    if (!childGender) {
        document.getElementById("genderError").classList.remove("hidden");
        isValid = false;
    }
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        document.getElementById("emailError").classList.remove("hidden");
        isValid = false;
    }
    if (!phone || !/^\d{10}$/.test(phone)) {
        document.getElementById("phoneError").classList.remove("hidden");
        isValid = false;
    }

    // If any validation failed, stop here
    if (!isValid) return;

    // Proceed to calculate the result if all fields are valid
    calculateResult(e);
};
// Start the quiz
renderQuestion();