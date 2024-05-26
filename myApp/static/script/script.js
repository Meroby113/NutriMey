// login.js
var LoginModule = (function () {
  function init() {
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();

      var email = document.getElementById("email").value;
      var password = document.getElementById("password").value;
      var userPageUrl = document.getElementById("userPageUrl").value;

      fetch("http://127.0.0.1:8000/api/users/")
        .then((response) => response.json())
        .then((users) => {
          var user = users.find(
            (user) => user.email === email && user.password === password
          );

          if (user) {
            alert("Login successful");
            sessionStorage.setItem("userId", user.id);
            const userId = sessionStorage.getItem("userId");

            if (userId) {
              window.location.href = userPageUrl;
            } else {
              console.error(
                "User ID not found in session storage. Please log in."
              );
              alert("User ID not found. Please log in to access this page.");
            }
          } else {
            alert("Invalid email or password");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
  }

  return {
    init: init,
  };
})();
// register.js
var RegisterModule = (function () {
  function init() {
    const registerForm = document.getElementById("registerForm");

    registerForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var loginUrl = document.getElementById("loginUrl").value;

      // Input Validation
      const email = registerForm.querySelector('input[name="email"]').value;
      const password = registerForm.querySelector(
        'input[name="password"]'
      ).value;

      if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      if (!validatePassword(password)) {
        alert("Password must be at least 8 characters long.");
        return;
      }

      const formData = new FormData(registerForm);
      const payload = Object.fromEntries(formData.entries());

      fetch("http://127.0.0.1:8000/api/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            alert("Registration successful: ");
            window.location.href = loginUrl;
          } else if (typeof data !== "undefined") {
            const parsedData = JSON.stringify(data.error);
            alert("Registration failed: " + (parsedData || ""));
          } else {
            alert("Registration failed. Please try again later.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
  }

  // Input Validation
  function validateEmail(email) {
    // Regular expression for email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function validatePassword(password) {
    // Example: Password should be at least 8 characters long
    return password.length >= 8;
  }

  return {
    init: init,
  };
})();

// user.js
var userPageModule = (function () {
  function init() {
    let userData = {};
    const userId = sessionStorage.getItem("userId");

    const signOutLink = document.getElementById("signoutLink");
    const contactForm = document.getElementById("contactForm");
    const BMILink = document.getElementById("BMILink");
    const BMIform = document.getElementById("BMIform");
    const displayCalendar = document.getElementById("calendar");
    const userMenuButton = document.getElementById("user-menu-button");
    const settingLink = document.getElementById("settingLink");
    const userSettingForm = document.getElementById("userSetting");

    window.addEventListener("click", function (event) {
      var listGroup = document.getElementById("listGroup");
      listGroup.style.display = "none";
    });

    fetch("http://127.0.0.1:8000/api/foods")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        const filteredData = data.filter(
          (item) => item.userId === Number(userId)
        );
        const totals = calculateTotals(filteredData);
        populateTable(totals);
      })
      .catch((error) => console.error("Error fetching food data:", error));

    function calculateTotals(data) {
      const dailyTotals = {};
      const weeklyTotals = {};
      const monthlyTotals = {};

      const now = new Date();
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay() + 1);
      console.log(startOfWeek);
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      console.log(startOfMonth);

      data.forEach((item) => {
        let itemDate;
        if (item.data.includes("/")) {
          const [month, day, year] = item.data.split("/");

          itemDate = new Date(year, month - 1, day);
        } else {
          const [day, month, year] = item.data.split(".");

          itemDate = new Date(year, month - 1, day);
        }
        console.log(itemDate);
        console.log("now" + now);
        if (
          new Date(itemDate.toISOString()).setHours(0, 0, 0, 0) ===
          new Date(now.toISOString()).setHours(0, 0, 0, 0)
        ) {
          accumulateTotals(dailyTotals, item);
        }
        if (itemDate >= startOfWeek) {
          accumulateTotals(weeklyTotals, item);
        }
        if (itemDate >= startOfMonth) {
          accumulateTotals(monthlyTotals, item);
        }
      });

      return {
        daily: dailyTotals,
        weekly: weeklyTotals,
        monthly: monthlyTotals,
      };
    }

    function accumulateTotals(totals, item) {
      totals.calories = (totals.calories || 0) + item.calories;
      totals.protein = (totals.protein || 0) + item.protein;
      totals.fiber = (totals.fiber || 0) + item.fiber;
      totals.vitaminA = (totals.vitaminA || 0) + item.vitaminA;
      totals.vitaminB = (totals.vitaminB || 0) + item.vitaminB;
      totals.vitaminC = (totals.vitaminC || 0) + item.vitaminC;
      totals.calcium = (totals.calcium || 0) + item.calcium;
      totals.iodine = (totals.iodine || 0) + item.iodine;
      totals.magnesium = (totals.magnesium || 0) + item.magnesium;
      totals.zinc = (totals.zinc || 0) + item.zinc;
    }

    function populateTable(totals) {
      const tableBody = document.getElementById("nutrition-table-body");
      tableBody.innerHTML = "";

      const nutrients = [
        "calories ",
        "protein",
        "fiber",
        "vitaminA",
        "vitaminB",
        "vitaminC",
        "calcium",
        "iodine",
        "magnesium",
        "zinc",
      ];

      nutrients.forEach((nutrient) => {
        const row = document.createElement("tr");
        row.classList.add(
          "bg-white",
          "border-b",
          "dark:bg-gray-800",
          "dark:border-gray-700"
        );

        row.innerHTML = `
      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        ${capitalizeFirstLetter(nutrient)}
      </th>
      <td class="px-6 py-4">${totals.daily[nutrient] || 0}</td>
      <td class="px-6 py-4">${totals.weekly[nutrient] || 0}</td>
      <td class="px-6 py-4">${totals.monthly[nutrient] || 0}</td>
    `;
        tableBody.appendChild(row);
      });
    }

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const email = document.getElementById("contactEmail").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;

      emailjs
        .send("service_k1mbqfv", "template_29bjijg", {
          email: email,
          subject: subject,
          message: message,
        })
        .then(
          function (response) {
            console.log("SUCCESS!", response.status, response.text);
            alert(
              "Your message has been successfully sent! Our team will promptly review it and get back to you at the earliest convenience. Thank you for reaching out."
            );
            location.reload();
          },
          function (error) {
            console.log("FAILED...", error);
            alert("Something went wrong. Please try again later.");
            location.reload();
          }
        );
    });

    signOutLink.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent the default click action

      var homeUrl = document.getElementById("homeUrl").value;

      if (confirm("Are you sure you want to log out?")) {
        sessionStorage.clear();
        window.location.href = homeUrl;
      }
    });

    BMILink.addEventListener("click", function (event) {
      event.preventDefault();

      const weightInput = document.getElementById("weight");
      const heightInput = document.getElementById("height");
      const ageInput = document.getElementById("age");
      if (userId) {
        fetch(`http://127.0.0.1:8000/api/users/${userId}/`)
          .then((response) => response.json())
          .then((data) => {
            if (
              data.weight !== null &&
              data.height !== null &&
              data.age !== null
            ) {
              weightInput.value = data.weight;
              heightInput.value = data.height;
              ageInput.value = data.age;
            }
          })
          .catch((error) => console.error("Error fetching user data:", error));
      }
    });

    BMIform.addEventListener("submit", async (event) => {
      event.preventDefault();

      const formData = new FormData(BMIform);
      const data = Object.fromEntries(formData.entries());

      const weight = parseFloat(data.weight);
      const height = parseFloat(data.height);
      const heightInMeter = height / 100;
      const bmi = weight / (heightInMeter * heightInMeter);

      // Determine BMI range
      let bmiRange;
      if (bmi < 18.5) {
        bmiRange = "Underweight";
      } else if (bmi >= 18.5 && bmi < 24.9) {
        bmiRange = "Normal weight";
      } else if (bmi >= 25 && bmi < 29.9) {
        bmiRange = "Overweight";
      } else {
        bmiRange = "Obesity";
      }

      // Calculate ideal weight
      const idealWeight = Math.round(22 * (heightInMeter * heightInMeter));
      const formattedBmi = bmi.toFixed(2);
      document.getElementById(
        "bmiRangeLabel"
      ).textContent = `BMI Range: ${formattedBmi} - ${bmiRange}`;
      document.getElementById(
        "idealWeightLabel"
      ).textContent = `Ideal Weight: ${idealWeight} Kg`;

      // Show result container
      document.getElementById("resultContainer").classList.remove("hidden");

      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/users/${userId}/`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        if (response.ok) {
          alert("User information updated successfully!");
        } else {
          const errorData = await response.json();
          alert(`Error: ${JSON.stringify(errorData.errors)}`);
        }
      } catch (error) {
        alert(`Network error: ${error.message}`);
      }
    });

    displayCalendar.addEventListener("click", function (event) {
      event.preventDefault();

      var datepicker = document.getElementById("myCalendar1");

      if (
        datepicker.style.display === "none" ||
        datepicker.style.display === ""
      ) {
        datepicker.style.display = "block";
      } else {
        datepicker.style.display = "none";
      }
    });

    let formattedDate;
    const calendarOptions = document.getElementById("myCalendar1");
    calendarOptions.addEventListener("click", function (event) {
      if (event.target.tagName.toLowerCase() === "span") {
        const dataDateValue = event.target.getAttribute("data-date");
        const timestamp = parseInt(dataDateValue);
        const date = new Date(timestamp);
        formattedDate = date.toLocaleDateString("en-US"); // Assign value to formattedDate variable

        console.log(formattedDate);

        var listGroup = document.getElementById("listGroup");

        var rect = event.target.getBoundingClientRect();

        listGroup.style.left = rect.right + "px";
        listGroup.style.top = rect.top + "px";

        listGroup.style.display = "block";
        event.stopPropagation();
      }
    });

    const foodForm = document.getElementById("foodForm");

    foodForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const formData = new FormData(foodForm);
      const payload = Object.fromEntries(formData.entries());
      const userId = sessionStorage.getItem("userId");
      payload.userId = userId;
      payload.data = formattedDate;

      fetch("http://127.0.0.1:8000/api/foods/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            alert("Your food has been successfully added!");
            console.log(payload);
            location.reload();
          } else {
            alert("Something went wrong. Please try again later.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });

    const showFoodList = document.getElementById("showFoodList");
    showFoodList.addEventListener("click", function () {
      const Id = sessionStorage.getItem("userId");
      console.log(Id);
      const userId = Number(Id);

      // Get today's date in the format YYYY-MM-DD
      const today = formattedDate;
      console.log(today);

      fetch("http://127.0.0.1:8000/api/foods")
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              "Network response was not ok " + response.statusText
            );
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          const filteredData = data.filter(
            (item) => item.userId === userId && item.data === today
          );
          populateFoodTable(filteredData);
        })
        .catch((error) => {
          console.error("Error fetching food data:", error);
        });
    });

    function populateFoodTable(data) {
      console.log(data);
      const tableBody = document.getElementById("food-table-body");

      tableBody.innerHTML = "";

      data.forEach((item) => {
        const row = document.createElement("tr");
        row.classList.add(
          "bg-white",
          "border-b",
          "dark:bg-gray-800",
          "dark:border-gray-700"
        );

        row.innerHTML = `
      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">${item.name}</th>
      <td class="px-6 py-4">${item.calories} Cal</td>
      <td class="px-6 py-4">${item.protein} gr</td>
      <td class="px-6 py-4">${item.fiber} gr</td>
    `;
        tableBody.appendChild(row);
      });
    }

    userMenuButton.addEventListener("click", function (event) {
      event.preventDefault();

      const userName = document.getElementById("userName");
      const userEmail = document.getElementById("userEmail");
      const userPotho = document.getElementById("userPhoto");

      if (userId) {
        fetch(`http://127.0.0.1:8000/api/users/${userId}/`)
          .then((response) => response.json())
          .then((data) => {
            userName.textContent = data.username || "User Name";
            userEmail.textContent = data.email || "user@example.com";
            userPotho.src = data.photoFileName || "../static/image/userpic.jpg";
          })
          .catch((error) => console.error("Error fetching user data:", error));
      }
    });
    settingLink.addEventListener("click", function (event) {
      event.preventDefault();

      if (userId) {
        fetch(`http://127.0.0.1:8000/api/users/${userId}/`)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            document.getElementById("usernameSetting").value = data.username;
            document.getElementById("emailSetting").value = data.email;
            document.getElementById("passwordSetting").value = data.password;
            document.getElementById("genderSetting").value = data.gender;
            // if (data.photoFileName) {
            //   document.getElementById("profilePictureSetting").src =
            //     data.photoFileName;
            // }
          })
          .catch((error) => console.error("Error fetching user data:", error));
      }
    });

    userSettingForm.addEventListener("submit", async function (event) {
      event.preventDefault();

      const userId = sessionStorage.getItem("userId");

      const formData = new FormData(userSettingForm);

      const jsonData = {};
      formData.forEach(function (value, key) {
        jsonData[key] = value;
      });

      fetch(`http://127.0.0.1:8000/api/users/${userId}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          alert("Settings updated successfully!", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
  }

  return {
    init: init,
  };
})();
