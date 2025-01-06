const app = document.getElementById("app");

const questions = [
    { id: 1, text: "Have you observed your child avoiding eye contact, even during familiar situations at home or with relatives?", img: "./img/placeholder1.png" },
    { id: 2, text: "Does your child often prefer being alone rather than playing with siblings, cousins, or friends in the neighborhood?", img: "./img/placeholder2.png" },
    { id: 3, text: "Does your child struggle to understand facial expressions or body language, such as a smile or a gesture like waving goodbye?", img: "./img/placeholder3.png" },
    { id: 4, text: "When you or others call out your child’s name, do they often not respond or seem distracted?", img: "./img/placeholder4.png" },
    { id: 5, text: "Have you noticed your child showing little interest in talking to or playing with children of their age group?", img: "./img/placeholder5.png" },
    { id: 6, text: "Does your child face difficulty starting or continuing a conversation, even with close family members?", img: "./img/placeholder6.png" },
    { id: 7, text: "Does your child repeat words or phrases they hear, such as lines from a favorite cartoon or song?", img: "./img/placeholder7.png" },
    { id: 8, text: "Does your child use gestures, like pointing to objects or waving, less often while trying to communicate?", img: "./img/placeholder8.png" },
    { id: 9, text: "Have you observed your child speaking in an unusual way, such as with a very flat, robotic, or high-pitched voice?", img: "./img/placeholder9.png" },
    { id: 10, text: "Does your child often repeat movements like hand-flapping, rocking, or spinning, even when sitting quietly?", img: "./img/placeholder10.png" },
    { id: 11, text: "Does your child seem deeply interested or focused on specific objects or topics, such as a particular toy or a favorite story?", img: "./img/placeholder11.png" },
    { id: 12, text: "When daily routines like meal times or outings are changed, does your child become upset or anxious?", img: "./img/placeholder12.png" },
    { id: 13, text: "Does your child insist on doing certain activities, such as arranging toys or eating snacks, in a very specific way?", img: "./img/placeholder13.png" },
    { id: 14, text: "Is your child highly sensitive to bright lights, loud sounds, certain fabrics, or strong smells, reacting strongly to them?", img: "./img/placeholder14.png" },
    { id: 15, text: "Does your child enjoy unusual activities like staring at spinning objects, smelling items, or watching moving patterns for a long time?", img: "./img/placeholder15.png" },
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
        <form id="resultForm" class="space-y-6 px-4 py-6 bg-white rounded-lg shadow-lg max-w-md mx-auto">
            <h2 class="text-2xl font-bold text-center text-gray-800">Your Details</h2>

            <!-- Parent Name -->
            <div>
                <label for="name" class="block text-sm font-medium text-gray-700">Your Name</label>
                <input type="text" id="name" placeholder="Enter your name" class="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <p id="nameError" class="text-red-500 text-sm mt-1 hidden">This field is required.</p>
            </div>

            <!-- Child Name -->
            <div>
                <label for="childName" class="block text-sm font-medium text-gray-700">Child's Name</label>
                <input type="text" id="childName" placeholder="Enter child's name" class="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <p id="childNameError" class="text-red-500 text-sm mt-1 hidden">This field is required.</p>
            </div>

            <!-- Child Age -->
            <div>
                <label for="age" class="block text-sm font-medium text-gray-700">Child's Age</label>
                <input type="number" id="age" placeholder="Enter child's age" class="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <p id="ageError" class="text-red-500 text-sm mt-1 hidden">This field is required.</p>
            </div>

            <!-- Gender -->
            <div>
                <label for="gender" class="block text-sm font-medium text-gray-700">Gender</label>
                <select id="gender" class="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                <p id="genderError" class="text-red-500 text-sm mt-1 hidden">Please select a gender.</p>
            </div>

            <!-- Email -->
            <div>
                <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" id="email" placeholder="Enter email address" class="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <p id="emailError" class="text-red-500 text-sm mt-1 hidden">Please provide a valid email address.</p>
            </div>

            <!-- Phone -->
            <div>
                <label for="phone" class="block text-sm font-medium text-gray-700">Phone Number</label>
                <input type="tel" id="phone" placeholder="Enter phone number" class="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <p id="phoneError" class="text-red-500 text-sm mt-1 hidden">Please provide  phone number without +91 or  0 in starting.</p>
            </div>
             <!-- City -->
            <div>
                <label for="city" class="block text-sm font-medium text-gray-700">City</label>
                <input type="text" id="cityName" placeholder="Enter city " class="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <p id="cityNameError" class="text-red-500 text-sm mt-1 hidden">This field is required.</p>
            </div>

            <!-- Submit Button -->
            <button type="submit" class="w-full bg-blue-500 text-white font-bold px-6 py-3 rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 focus:outline-none">Submit</button>
        </form>
        <div class="text-center mt-4">
            <button onclick="retryQuiz()" class="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 focus:ring-4 focus:ring-gray-300">Retry Quiz</button>
        </div>
    `;

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
        feedbackMessage = 
        ` <p style="font-size: 1.5rem; font-weight: bold; color: #4caf50; text-shadow: 0px 0px 10px #00ff00;">
            🌟 Hello ${parentName}! 🌟
        </p>
        <p style="font-size: 1.2rem; color: #4caf50; text-shadow: 0px 0px 5px #00ff00;">
            Likely typical behavior; no immediate concerns.
        </p>
        <p style="font-size: 1.2rem; color: #4caf50; text-shadow: 0px 0px 5px #00ff00;">
            ${childName} is doing wonderfully!
        </p>
        <p style="font-size: 1rem; color: #388e3c;">
            Enjoy your time with ${childName} and keep cherishing these moments.
        </p>
    `;
        feedbackColor = "green";
    } else if (yesCount <= 9) {
        resultImage = "./img/female_child.png";
        feedbackMessage = `  <p style="font-size: 1.5rem; font-weight: bold; color: #ff9800; text-shadow: 0px 0px 10px #ffc107;">
            🌼 Hello ${parentName}! 🌼
        </p>
        <p style="font-size: 1.2rem; color: #ff9800; text-shadow: 0px 0px 5px #ffc107;">
            Moderate signs have been observed in ${childName}.
        </p>
        <p style="font-size: 1.2rem; color: #ff9800; text-shadow: 0px 0px 5px #ffc107;">
            It’s important to monitor behavior closely and consider seeking advice for better support.
        </p>
        <p style="font-size: 1.2rem; color: #ff5722;">
            We’re here to help! Let us guide you with a personalized home plan.
        </p>
        `;
        feedbackColor = "orange";
    } else {
        resultImage = "./img/male_child.png";
        feedbackMessage = `   <p style="font-size: 1.5rem; font-weight: bold; color: #f44336; text-shadow: 0px 0px 10px #ff5252;">
            ⚠️ Hello ${parentName}, we understand your concern. ⚠️
        </p>
        <p style="font-size: 1.2rem; color: #f44336; text-shadow: 0px 0px 5px #ff5252;">
            Clear signs have been observed in ${childName}.
        </p>
        <p style="font-size: 1.2rem; color: #d32f2f;">
            We are here to support you with a detailed evaluation and tailored intervention plan.
        </p>
        `;
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
                    <a href="https://www.instagram.com/aaryavartcenterforautism/" target="_blank" class="w-full sm:w-auto bg-pink-500 text-white px-6 py-2 rounded-lg">Instagram</a> 
                 `
                    : `
                     <p class="mt-6 text-2xl font-bold text-blue-600">
    🌟 <span style="color: #ff5722;">Book Detailed Evaluation of ${childName}</span> 🌟
</p>
            <p class="mt-2 text-lg text-gray-600">Let’s make a difference together!. WhatsApp to begin his journey with us</p>
            <div class="flex flex-col sm:flex-row justify-between items-center mt-6 space-y-4 sm:space-y-0 sm:space-x-4">
                <button onclick="retryQuiz()" class="w-full sm:w-auto bg-gray-500 text-white px-6 py-2 rounded-lg">Retry Quiz</button>
                        <a href="https://wa.me/917607293336" target="_blank" class="w-full sm:w-auto bg-green-500 text-white px-6 py-2 rounded-lg">WhatsApp</a>
                
                    `}
            </div>
                  <p class="mt-6 text-sm text-gray-600">
                Disclaimer: This quiz is a general screening tool and not a substitute for professional diagnosis. 
                For a proper assessment, please consult a specialist.
            </p>
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
    const cityName = document.getElementById("cityName").value.trim();

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
    if (!cityName) {
        document.getElementById("cityNameError").classList.remove("hidden");
        isValid = false;
    }

    // If any validation failed, stop here
    if (!isValid) return;

  // Prepare data for submission
  const data = {
    parentName,
    childName,
    childAge,
    childGender,
    email,
    phone,
    cityName,
    yesCount,
};

// Send data to Google Sheet
sendDataToGoogleSheet(data);


    // Proceed to calculate the result if all fields are valid
    calculateResult(e);
};
const sendDataToGoogleSheet = async (data) => {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwLT_kkufOFq433F7ZiqTbT5NhjP4rcvu720ti06dhSbPTYloArSYIv8wciB2opXWfOcA/exec';
    try {
      const response = await fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const text = await response.text();
      console.log('Raw Response:', text);
  
      // Safely parse JSON
      let result;
      try {
        result = JSON.parse(text);
      } catch (error) {
        throw new Error('Invalid JSON response');
      }
  
      if (result.status === 'success') {
        console.log('Data saved successfully!');
      } else {
        console.error('Failed to save data:', result.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
// Start the quiz
renderQuestion();