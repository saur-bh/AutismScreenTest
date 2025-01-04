document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const quizContainer = document.getElementById("quiz");
  const progressBar = document.getElementById("progress");
  const resultContainer = document.getElementById("resultContainer");
  const resultText = document.getElementById("resultText");
  const resetButton = document.getElementById("resetButton");
  const retryButton = document.getElementById("retryButton");
  const controls = document.querySelector(".controls");
  const yesButton = document.getElementById("yesButton");
  const noButton = document.getElementById("noButton");
  // Swipe functionality
  let startX;

  function handleTouchStart(event) {
    startX = event.touches[0].clientX;
  }

  function handleTouchMove(event) {
    if (!startX) return;

    const currentX = event.touches[0].clientX;
    const diffX = startX - currentX;

    if (diffX > 50) {
      // Swipe left
      quizContainer.children[0].classList.add("swipe-left");
      handleAnswer("no");
    } else if (diffX < -50) {
      // Swipe right
      quizContainer.children[0].classList.add("swipe-right");
      handleAnswer("yes");
    }

    startX = null;
  }

  quizContainer.addEventListener("touchstart", handleTouchStart, false);
  quizContainer.addEventListener("touchmove", handleTouchMove, false);

  // State variables
  let currentQuestion = 0;
  let yesCount = 0;

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

  // Initialize Quiz
  function loadQuiz() {
    quizContainer.innerHTML = questions
      .map(
        (q, index) => `
          <div class="card" style="z-index: ${questions.length - index};">
              <img src="${q.img}" alt="Question Image">
              <p>${q.text}</p>
          </div>`
      )
      .join("");
    controls.classList.remove("hidden");
  }

  // Update Progress
  function updateProgress() {
    progressBar.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
  }

  // Handle Answer
  function handleAnswer(answer) {
    if (answer === "yes") yesCount++;
    currentQuestion++;

    if (currentQuestion < questions.length) {
      quizContainer.children[0].remove();
      updateProgress();
    } else {
      showForm();
    }
  }

  // Show Form to Collect Data
  function showForm() {
    quizContainer.classList.add("hidden");
    controls.classList.add("hidden"); // Hide Yes/No buttons
    if (resultContainer) {
      resultContainer.classList.remove("hidden");
    }

    resultText.innerHTML = `
      <h2>Thank you for completing the quiz!</h2>
      <p>Please provide your details to see the results.</p>
    `;

    document.getElementById("userForm").classList.remove("hidden");

    // Attach event listener to the form
    const userForm = document.getElementById("userForm");
    if (userForm) {
      userForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent default form submission

        // Get the form data
        const formData = getFormData();

        // Show the result after collecting form data
        showResult(formData);
      });
    }
  }

  // Show Result After Form Submission
  function showResult(formData) {
    // Hide Yes and No Buttons
    controls.classList.add("hidden");

    let resultImage;
    let feedbackMessage;
    let feedbackColor;

    // Determine the result based on the yesCount
    if (yesCount <= 4) {
        resultImage = "./img/parent_with_child.png";
        feedbackMessage = "Likely typical behavior; no immediate concerns.";
        feedbackColor = "green";
    } else if (yesCount <= 9) {
        resultImage = "./img/female_child.png"; // Adjust based on context
        feedbackMessage = "Some signs of ADHD; consider monitoring and seeking professional advice.";
        feedbackColor = "orange";
    } else if (yesCount <= 15) {
        resultImage = "./img/male_child.png"; // Adjust based on context
        feedbackMessage = "Strong signs of ADHD; consult a pediatrician, psychologist, or psychiatrist for a detailed evaluation.";
        feedbackColor = "red";
    } else {
        resultImage = "./img/retry.png";
        feedbackMessage = "Invalid quiz result. Please try again.";
        feedbackColor = "gray";
    }

    // Display the result with styling
    resultText.innerHTML = `
        <div style="text-align: center; padding: 20px; border: 2px solid ${feedbackColor}; border-radius: 10px;">
            <img src="${resultImage}" alt="Result Image" style="width: 100%; max-width: 300px; margin-bottom: 20px;">
            <p style="color: ${feedbackColor}; font-weight: bold;">${feedbackMessage}</p>
            <p><strong>Child Name:</strong> ${formData.childName}</p>
            <p><strong>Age:</strong> ${formData.childAge}</p>
            <p><strong>City:</strong> ${formData.city}</p>
        </div>
    `;
    resetButton.classList.remove("hidden"); // Show Reset button after result
    retryButton.classList.remove("hidden"); // Show Retry button after result
    resetButton.style.position = "fixed"; // Ensure reset button is at the bottom
    resetButton.style.bottom = "20px";
    resetButton.style.left = "50%";
    resetButton.style.transform = "translateX(-50%)";

    // Add glitter effect
    if (resultContainer) {
      resultContainer.classList.add("glitter-effect");
    }

    // Remove form from the page
    document.getElementById("userForm").remove();
  }

  // Collect Form Data
  function getFormData() {
    const childName = document.getElementById("childName").value;
    const childAge = document.getElementById("childAge").value;
    const childGender = document.getElementById("childGender").value;
    const parentPhone = document.getElementById("parentPhone").value;
    const parentEmail = document.getElementById("parentEmail").value;
    const city = document.getElementById("city").value;

    return {
      childName,
      childAge,
      childGender,
      parentPhone,
      parentEmail,
      city,
    };
  }

  // Reset Quiz
  resetButton.addEventListener("click", () => {
    currentQuestion = 0;
    yesCount = 0;
    loadQuiz();
    updateProgress();
    resultContainer.classList.add("hidden");
    quizContainer.classList.remove("hidden");
    resetButton.classList.add("hidden");
    controls.classList.remove("hidden"); // Show Yes/No buttons again
    const userForm = document.getElementById("userForm");
    if (userForm) {
      userForm.classList.remove("hidden"); // Show form again
    }
  });

  // Retry Quiz
  retryButton.addEventListener("click", () => {
    currentQuestion = 0;
    yesCount = 0;
    loadQuiz();
    updateProgress();
    resultContainer.classList.add("hidden");
    quizContainer.classList.remove("hidden");
    controls.classList.remove("hidden"); // Show Yes/No buttons again
    const userForm = document.getElementById("userForm");
    if (userForm) {
      userForm.classList.remove("hidden"); // Show form again
    }
  });

  // Event listeners for Yes and No buttons
  yesButton.addEventListener("click", () => handleAnswer("yes"));
  noButton.addEventListener("click", () => handleAnswer("no"));

  // Load Quiz and Initialize Progress Bar
  loadQuiz();
  updateProgress();

  const targetElement = document.querySelector('.retry-btn');
  if (targetElement) {
    targetElement.addEventListener('click', function() {
      // ...existing code...
    });
  }

  
});