// form-script.js - Maintafox Survey (Multilingual & Enhanced)

document.addEventListener("DOMContentLoaded", () => {
  console.log("Maintafox Survey Script Initialized");

  // ===========================================
  // GLOBAL ELEMENTS & STATE
  // ===========================================
  const body = document.body;
  const htmlEl = document.documentElement;
  const loader = document.querySelector(".loader");
  const scrollProgress = document.querySelector(".scroll-progress");
  const cursor = document.querySelector(".custom-cursor");
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const nav = document.querySelector(".futuristic-nav");
  const yearSpan = document.getElementById("current-year");
  const langSwitcher = document.getElementById("language-switcher");

  const surveyForm = document.getElementById("cmms-survey-form");
  const progressBar = document.getElementById("survey-progress-bar");
  const progressText = document.getElementById("survey-progress-text");
  let progressSteps = []; // Will be populated if form exists
  let totalVisibleSteps = 0; // Will be calculated dynamically
  let currentLang = "en"; // Default language

  // ===========================================
  // LANGUAGE SWITCHING FUNCTIONS
  // ===========================================
  function applyTranslations(lang) {
    if (!translations[lang]) {
      console.warn(`Language "${lang}" not found in translations.`);
      return;
    }

    currentLang = lang;
    const langData = translations[lang];

    // Set page direction
    htmlEl.setAttribute("lang", lang);
    htmlEl.setAttribute("dir", langData.dir || "ltr");

    document.querySelectorAll("[data-translate]").forEach((el) => {
      const key = el.dataset.translate;
      if (langData[key] !== undefined) {
        let translatedText = langData[key];

        // Handle dynamic values (like progress bar)
        if (el.dataset.translateValue) {
          translatedText = translatedText.replace(
            "{value}",
            el.dataset.translateValue
          );
        }

        // Update different element types
        if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
          if (
            el.placeholder !== undefined &&
            el.hasAttribute("data-translate-placeholder")
          ) {
            const placeholderKey = el.dataset.translatePlaceholder;
            if (langData[placeholderKey]) {
              el.placeholder = langData[placeholderKey];
            }
          } else {
            // Potentially update value if needed, but usually placeholders/labels
          }
        } else if (el.tagName === "TITLE") {
          document.title = translatedText;
        } else if (el.tagName === "META" && el.name === "description") {
          el.content = translatedText;
        } else if (el.tagName === "OPTION" && el.value === "") {
          // Handle default disabled options specifically
          el.textContent = translatedText;
        } else {
          el.innerHTML = translatedText; // Use innerHTML to allow embedded links (like demo button in success message)
        }
      } else {
        console.warn(
          `Translation key "${key}" not found for language "${lang}".`
        );
      }
    });

    // Update active button style
    if (langSwitcher) {
      langSwitcher.querySelectorAll(".lang-button").forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.lang === lang);
      });
    }

    // Re-initialize or update components that depend on text dimensions if necessary
    if (surveyForm) {
      updateRangeSliderStyles(); // Ensure sliders look right after potential label changes
      checkConditions(); // Re-run conditional logic as labels might affect layout
    }

    console.log(`Language switched to: ${lang}`);
  }

  function setupLanguageSwitcher() {
    if (!langSwitcher) return;

    langSwitcher.addEventListener("click", (e) => {
      if (
        e.target.matches(".lang-button") &&
        !e.target.classList.contains("active")
      ) {
        const newLang = e.target.dataset.lang;
        applyTranslations(newLang);
        localStorage.setItem("preferredLang", newLang); // Store preference
      }
    });

    // Load preferred language on startup
    const preferredLang = localStorage.getItem("preferredLang");
    if (preferredLang && translations[preferredLang]) {
      applyTranslations(preferredLang);
    } else {
      applyTranslations(currentLang); // Apply default English
    }
  }

  // ===========================================
  // COMMON WEBSITE FUNCTIONS (Loader, Scroll, Menu, Cursor, Footer)
  // ===========================================

  // --- Loader ---
  if (loader) {
    window.addEventListener("load", () => {
      loader.style.opacity = "0";
      setTimeout(() => {
        loader.style.display = "none";
      }, 500); // Match CSS transition duration
    });
  }

  // --- Scroll Progress ---
  if (scrollProgress) {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      scrollProgress.style.width = `${scrollPercent}%`;
    };
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    updateScrollProgress(); // Initial call
  }

  // --- Mobile Menu ---
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isActive = navLinks.classList.toggle("active");
      menuToggle.setAttribute("aria-expanded", isActive);
      menuToggle.innerHTML = isActive
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
    });
    // Close menu when a link is clicked
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (navLinks.classList.contains("active")) {
          navLinks.classList.remove("active");
          menuToggle.setAttribute("aria-expanded", "false");
          menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
      });
    });
  }

  // --- Header Scroll Effect ---
  if (nav) {
    const handleScroll = () => {
      nav.classList.toggle("scrolled", window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
  }

  // --- Custom Cursor ---
  if (cursor) {
    let mouseX = 0,
      mouseY = 0;
    let cursorX = 0,
      cursorY = 0;
    const speed = 0.15; // Smoothing factor

    const updateCursorPosition = () => {
      const dx = mouseX - cursorX;
      const dy = mouseY - cursorY;
      cursorX += dx * speed;
      cursorY += dy * speed;
      cursor.style.transform = `translate(${
        cursorX - cursor.offsetWidth / 2
      }px, ${cursorY - cursor.offsetHeight / 2}px)`;
      requestAnimationFrame(updateCursorPosition);
    };

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    requestAnimationFrame(updateCursorPosition); // Start the animation loop

    const interactiveElements = document.querySelectorAll(
      "a, button, [data-tilt], input, textarea, select, label[for]"
    );
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", () => cursor.classList.add("hover"));
      el.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
    });
  }

  // --- Update Footer Year ---
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // ===========================================
  // SURVEY FORM SPECIFIC FUNCTIONS
  // ===========================================
  if (surveyForm) {
    progressSteps = Array.from(
      surveyForm.querySelectorAll("[data-progress-step]")
    );
    const submitButton = surveyForm.querySelector("button[type='submit']");
    const submitButtonText = submitButton
      ? submitButton.querySelector("span:not(.spinner)")
      : null;
    const successMessageContainer = surveyForm.querySelector(
      "#form-success-message"
    );
    const generalErrorContainer = surveyForm.querySelector(
      "#form-general-error"
    );

    // --- Conditional Logic ---
    function checkConditions() {
      const conditionalSections = surveyForm.querySelectorAll(
        ".conditional-section"
      );
      const formData = new FormData(surveyForm); // Get current form data

      conditionalSections.forEach((section) => {
        const targetNames = section.dataset.conditionTarget.split(",");
        const requiredValues = section.dataset.conditionValue.split(",");
        let shouldShow = false;

        for (const targetName of targetNames) {
          const triggerValue = formData.get(targetName); // For select/radio
          const triggerValuesCheckbox = formData.getAll(targetName); // For checkboxes

          // Check if ANY of the required values match the trigger's value(s)
          if (triggerValue && requiredValues.includes(triggerValue)) {
            shouldShow = true;
            break; // One match is enough (OR logic for multiple targets)
          }
          // Check checkboxes
          if (triggerValuesCheckbox.length > 0) {
            if (
              triggerValuesCheckbox.some((val) => requiredValues.includes(val))
            ) {
              shouldShow = true;
              break;
            }
          }
        }

        // Show or hide the section and manage input states
        const inputsInside = section.querySelectorAll(
          "input, select, textarea"
        );
        if (shouldShow) {
          section.classList.add("visible");
          // Use scrollHeight for dynamic height calculation
          section.style.maxHeight = section.scrollHeight + "px";

          // Re-enable required attribute and clear disabled state
          inputsInside.forEach((input) => {
            // Enable contact fields ONLY IF their controlling condition is met AND they are inside the currently shown section
            if (section.id === "contact-info-section") {
              // Contact info fields are required ONLY if visible
              if (input.id === "contact_name" || input.id === "contact_email") {
                input.required = true;
                input.dataset.wasRequired = "true"; // Mark as intended to be required
              }
            } else {
              // For other conditional fields, restore original required status
              if (input.dataset.wasRequired === "true") {
                input.required = true;
              }
            }
            input.disabled = false;
          });
        } else {
          section.classList.remove("visible");
          section.style.maxHeight = "0";

          // Disable inputs and remove required attribute temporarily
          inputsInside.forEach((input) => {
            // Store original required state if not already stored
            if (input.required && !input.dataset.wasRequired) {
              input.dataset.wasRequired = "true";
            }
            input.required = false; // Temporarily remove required
            input.disabled = true;
            // Optional: Clear values of hidden fields
            // if (input.type === 'text' || input.type === 'email' || input.type === 'textarea') input.value = '';
            // else if (input.type === 'select-one') input.selectedIndex = 0;
            // else if (input.type === 'radio' || input.type === 'checkbox') input.checked = false;

            // Clear errors specific to hidden fields
            clearFieldError(input);
          });
        }
      });

      // Recalculate progress after conditions change visibility
      updateProgressBar();
    }

    // --- Progress Bar Update ---
    function updateProgressBar() {
      if (!progressBar || !progressText) return;

      let completedSteps = 0;
      totalVisibleSteps = 0; // Recalculate visible steps each time

      progressSteps.forEach((step) => {
        const field = step; // The div.form-field itself
        // Check if the step is currently visible
        const conditionalParent = field.closest(".conditional-section");
        const isVisible =
          !conditionalParent || conditionalParent.classList.contains("visible");

        if (isVisible) {
          totalVisibleSteps++;
          let isStepComplete = false;
          // Find primary interactive elements within the step
          const selects = field.querySelectorAll("select:not(:disabled)");
          const texts = field.querySelectorAll(
            'input[type="text"]:not(:disabled), input[type="email"]:not(:disabled), textarea:not(:disabled)'
          );
          const ranges = field.querySelectorAll(
            'input[type="range"]:not(:disabled)'
          );
          const radios = field.querySelectorAll(
            'input[type="radio"]:not(:disabled)'
          );
          const checkboxes = field.querySelectorAll(
            'input[type="checkbox"]:not(:disabled)'
          );

          if (selects.length > 0) {
            isStepComplete = Array.from(selects).every((s) => s.value !== "");
          } else if (texts.length > 0) {
            // Only consider required texts or those inside visible conditional inputs
            isStepComplete = Array.from(texts).every(
              (t) => !t.required || (t.required && t.value.trim() !== "")
            );
            // Also check conditional 'other' inputs linked to selects/radios
            const conditionalInput = field.querySelector(
              '.conditional-input.visible input[type="text"]'
            );
            if (
              conditionalInput &&
              conditionalInput.required &&
              conditionalInput.value.trim() === ""
            ) {
              isStepComplete = false;
            }
          } else if (ranges.length > 0) {
            // Ranges are usually required, check if a value exists (default is usually set)
            isStepComplete = Array.from(ranges).every((r) => r.value !== "");
          } else if (radios.length > 0) {
            const radioGroupName = radios[0].name;
            isStepComplete =
              surveyForm.querySelector(
                `input[name="${radioGroupName}"]:checked`
              ) !== null;
          } else if (checkboxes.length > 0) {
            // Checkboxes are complete if at least one is checked OR they are not required
            const isAnyRequired = Array.from(checkboxes).some(
              (cb) => cb.required
            );
            if (isAnyRequired) {
              const checkboxGroupName = checkboxes[0].name;
              isStepComplete =
                surveyForm.querySelectorAll(
                  `input[name="${checkboxGroupName}"]:checked`
                ).length > 0;
            } else {
              isStepComplete = true; // Not required, so considered complete by default
            }
          }

          if (isStepComplete) {
            completedSteps++;
          }
        }
      });

      const percentage =
        totalVisibleSteps > 0
          ? Math.round((completedSteps / totalVisibleSteps) * 100)
          : 0;
      progressBar.style.width = `${percentage}%`;

      // Update progress text using translation
      progressText.dataset.translateValue = percentage; // Store value for translation function
      const progressTextKey = progressText.dataset.translate;
      if (
        translations[currentLang] &&
        translations[currentLang][progressTextKey]
      ) {
        progressText.textContent = translations[currentLang][
          progressTextKey
        ].replace("{value}", percentage);
      } else {
        progressText.textContent = `${percentage}% Complete`; // Fallback
      }
    }

    // --- Range Slider Value Display & Style Update ---
    function updateRangeSliderStyles(rangeInput) {
      const targetRanges = rangeInput
        ? [rangeInput]
        : surveyForm.querySelectorAll('input[type="range"]');
      targetRanges.forEach((range) => {
        const value = range.value;
        const min = range.min || 1;
        const max = range.max || 5;
        const percent = ((value - min) / (max - min)) * 100;
        // Update background gradient dynamically
        range.style.setProperty("--value-percent", `${percent}%`);
        // Update the numeric display
        const valueSpan = range
          .closest(".rating-item")
          ?.querySelector(".range-value");
        if (valueSpan) {
          valueSpan.textContent = value;
        }
      });
    }

    function setupRangeValueDisplay() {
      surveyForm.querySelectorAll('input[type="range"]').forEach((range) => {
        // Initial display and style update
        updateRangeSliderStyles(range);
        // Update on input
        range.addEventListener("input", (event) => {
          updateRangeSliderStyles(event.target);
          updateProgressBar(); // Update progress on rating change
        });
        // Also update on 'change' for accessibility/keyboard interaction
        range.addEventListener("change", () => {
          updateProgressBar();
        });
      });
    }

    // --- Form Validation Logic ---
    function clearFormErrors() {
      surveyForm.querySelectorAll(".error-message").forEach((el) => {
        el.textContent = "";
        el.style.display = "none";
      });
      surveyForm
        .querySelectorAll(".has-error")
        .forEach((el) => el.classList.remove("has-error"));
      if (generalErrorContainer) {
        generalErrorContainer.textContent = "";
        generalErrorContainer.classList.remove("visible");
      }
    }

    function clearFieldError(inputElement) {
      const field = inputElement.closest(".form-field");
      if (field) {
        const errorContainer = field.querySelector(
          `#${inputElement.getAttribute("aria-describedby")}`
        );
        if (errorContainer) {
          errorContainer.textContent = "";
          errorContainer.style.display = "none";
        }
        // Also clear general field error class if needed
        field.classList.remove("has-error");
        // Check if other errors exist in the field before removing class entirely? Might be complex.
      }
    }

    function showFieldError(inputElement, messageKey) {
      const field = inputElement.closest(".form-field");
      const errorMessage = translations[currentLang][messageKey] || messageKey; // Get translated msg

      if (field) {
        // Find the corresponding error span using aria-describedby
        const errorId = inputElement.getAttribute("aria-describedby");
        const errorContainer = errorId
          ? field.querySelector(`#${errorId}`)
          : field.querySelector(".error-message"); // Fallback

        if (errorContainer) {
          errorContainer.textContent = errorMessage;
          errorContainer.style.display = "block";
        }
        field.classList.add("has-error");
        return true; // Indicate error was shown
      }
      return false; // Error couldn't be shown
    }

    function validateForm() {
      let isValid = true;
      clearFormErrors();

      // Select only VISIBLE required inputs within the form
      const inputs = surveyForm.querySelectorAll(
        "input[required]:not(:disabled), textarea[required]:not(:disabled), select[required]:not(:disabled)"
      );

      inputs.forEach((input) => {
        // Double check visibility (redundant but safe)
        const conditionalParent = input.closest(".conditional-section");
        if (
          conditionalParent &&
          !conditionalParent.classList.contains("visible")
        ) {
          return; // Skip validation for hidden required fields
        }

        let hasError = false;

        if (input.type === "radio") {
          const groupName = input.name;
          const groupChecked = surveyForm.querySelector(
            `input[name="${groupName}"]:checked`
          );
          if (!groupChecked) {
            hasError = showFieldError(input, "validation_select");
          }
        } else if (input.type === "checkbox") {
          // Checkboxes: Only validate if one in the group is 'required'
          const groupName = input.name;
          const groupCheckboxes = surveyForm.querySelectorAll(
            `input[name="${groupName}"]:not(:disabled)`
          );
          const isGroupRequired = Array.from(groupCheckboxes).some(
            (cb) => cb.required
          );
          const groupCheckedCount = surveyForm.querySelectorAll(
            `input[name="${groupName}"]:checked`
          ).length;

          if (isGroupRequired && groupCheckedCount === 0) {
            // Show error on the first checkbox in the group for simplicity
            hasError = showFieldError(
              groupCheckboxes[0],
              "validation_at_least_one"
            );
          }
        } else if (input.type === "email") {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (
            input.value.trim() !== "" &&
            !emailPattern.test(input.value.trim())
          ) {
            hasError = showFieldError(input, "validation_email");
          } else if (input.required && input.value.trim() === "") {
            hasError = showFieldError(input, "validation_required");
          }
        } else if (input.type === "range") {
          // Basic check: ensure value is not empty (assuming default is set)
          // More complex range validation could be added if needed
          if (input.required && input.value === "") {
            // Should have a default but check anyway
            hasError = showFieldError(input, "validation_range");
          }
        } else {
          // Handles text, textarea, select
          if (input.required && input.value.trim() === "") {
            const messageKey =
              input.tagName === "SELECT"
                ? "validation_select"
                : "validation_required";
            hasError = showFieldError(input, messageKey);
          }
        }

        if (hasError) {
          isValid = false;
        }
      });

      // Check conditional text inputs that become required
      surveyForm
        .querySelectorAll(
          ".conditional-input.visible input[required]:not(:disabled)"
        )
        .forEach((condInput) => {
          if (condInput.value.trim() === "") {
            if (showFieldError(condInput, "validation_required")) {
              isValid = false;
            }
          }
        });

      if (!isValid && generalErrorContainer) {
        generalErrorContainer.textContent =
          translations[currentLang].validation_generic_error ||
          "Please correct the errors above.";
        generalErrorContainer.classList.add("visible");
        generalErrorContainer.focus(); // Focus on the general error message
      }

      return isValid;
    }

    // --- Form Submission Handler ---
    async function handleFormSubmit(event) {
      event.preventDefault();
      clearFormErrors();

      if (!validateForm()) {
        console.log("Form validation failed.");
        return;
      }

      console.log("Form submission initiated.");
      submitButton.disabled = true;
      submitButton.classList.add("submitting");
      if (submitButtonText)
        submitButtonText.textContent =
          translations[currentLang].submitting_button || "Submitting...";

      try {
        const formData = new FormData(surveyForm);
        // Append language to form data
        formData.append("submitted_language", currentLang);

        // Optional: Filter out data from hidden conditional fields before sending
        surveyForm
          .querySelectorAll(
            ".conditional-section:not(.visible) input, .conditional-section:not(.visible) select, .conditional-section:not(.visible) textarea"
          )
          .forEach((hiddenInput) => {
            formData.delete(hiddenInput.name);
          });
        surveyForm
          .querySelectorAll(".conditional-input:not(.visible) input")
          .forEach((hiddenInput) => {
            formData.delete(hiddenInput.name);
          });

        const response = await fetch(surveyForm.action, {
          method: "POST",
          body: formData,
          headers: { Accept: "application/json" }, // Basin expects this
        });

        if (response.ok) {
          console.log("Form submission success!");
          submitButton.classList.remove("submitting");
          submitButton.classList.add("success");
          if (submitButtonText)
            submitButtonText.textContent =
              translations[currentLang].success_button || "Submitted!";

          if (successMessageContainer) {
            let successHTML =
              translations[currentLang].submission_success ||
              "Submission successful!";
            // Check if demo link should be added
            const interestDemo = formData.get("interest_demo");
            if (
              interestDemo === "Yes, absolutely" ||
              interestDemo === "Yes, keep me informed"
            ) {
              successHTML +=
                translations[currentLang].submission_success_demo_link || "";
            }
            successMessageContainer.innerHTML = successHTML;
            successMessageContainer.classList.add("visible");
            successMessageContainer.focus(); // Focus on success message
          } else {
            alert(
              translations[currentLang].submission_success ||
                "Submission successful!"
            );
          }

          // Reset form fields visually after a short delay to show success state
          setTimeout(() => {
            surveyForm.reset();
            // Manually reset conditional elements and progress bar
            checkConditions(); // This resets visibility and required attributes
            updateProgressBar();
            updateRangeSliderStyles(); // Reset range slider visuals
            // Reset floating labels if needed (though reset usually handles this)
            surveyForm
              .querySelectorAll(".floating-label-field input")
              .forEach((input) => input.dispatchEvent(new Event("blur"))); // Trigger blur to reset label
          }, 1500); // Keep success state for 1.5s

          // Optionally hide success message or form after longer delay
          setTimeout(() => {
            if (successMessageContainer) {
              // successMessageContainer.classList.remove("visible");
              // Or maybe hide the whole form: surveyForm.style.display = 'none';
            }
            submitButton.classList.remove("success"); // Ready for another submission? Unlikely for survey.
            submitButton.disabled = false; // Re-enable after full reset?
            if (submitButtonText)
              submitButtonText.textContent =
                translations[currentLang].submit_button || "Submit Survey";
          }, 10000); // 10 seconds
        } else {
          // Handle submission error (e.g., Basin error)
          let errorMsg =
            translations[currentLang].submission_error_generic ||
            "Submission failed.";
          try {
            const errorData = await response.json();
            // Basin might return { error: "message" }
            if (errorData && errorData.error) {
              errorMsg = errorData.error;
            } else {
              errorMsg = `${errorMsg} (Status: ${response.status})`;
            }
          } catch (parseError) {
            // Response wasn't JSON
            errorMsg = `${errorMsg} (Status: ${response.status})`;
          }
          console.error("Form submission error:", errorMsg);
          if (generalErrorContainer) {
            generalErrorContainer.textContent = errorMsg;
            generalErrorContainer.classList.add("visible");
            generalErrorContainer.focus();
          } else {
            alert(errorMsg);
          }
          // Reset button state from submitting
          submitButton.classList.remove("submitting");
          if (submitButtonText)
            submitButtonText.textContent =
              translations[currentLang].submit_button || "Submit Survey";
          submitButton.disabled = false;
        }
      } catch (error) {
        console.error("Network or fetch error:", error);
        const networkErrorMsg =
          translations[currentLang].submission_error_network ||
          "Network error.";
        if (generalErrorContainer) {
          generalErrorContainer.textContent = networkErrorMsg;
          generalErrorContainer.classList.add("visible");
          generalErrorContainer.focus();
        } else {
          alert(networkErrorMsg);
        }
        // Reset button state
        submitButton.classList.remove("submitting");
        if (submitButtonText)
          submitButtonText.textContent =
            translations[currentLang].submit_button || "Submit Survey";
        submitButton.disabled = false;
      }
    }

    // --- Initial Setup for Survey Form ---
    setupConditionalLogic(); // Sets initial visibility & required states
    setupRangeValueDisplay(); // Sets initial range values & styles
    updateProgressBar(); // Calculate initial progress

    // Add event listeners
    surveyForm.addEventListener("change", (event) => {
      // Handle changes in selects, radios, checkboxes immediately for conditional logic
      const target = event.target;
      if (
        target.matches('select, input[type="radio"], input[type="checkbox"]')
      ) {
        checkConditions(); // Re-evaluate visibility and required status
      }
      // Always update progress on any change
      updateProgressBar();
      // Clear error for the specific field that changed
      if (target.matches("input, select, textarea")) {
        clearFieldError(target);
      }

      // Handle 'Other' input visibility tied to specific options
      if (target.matches('select, input[type="radio"]')) {
        const field = target.closest(".form-field");
        if (field) {
          const conditionalInputs =
            field.querySelectorAll(".conditional-input");
          conditionalInputs.forEach((condInput) => {
            const conditionTarget = condInput.dataset.conditionTarget;
            const conditionValue = condInput.dataset.conditionValue;
            // Check if the triggering element matches the target name and value
            if (
              target.name === conditionTarget &&
              target.value === conditionValue
            ) {
              condInput.classList.add("visible");
              const textInput = condInput.querySelector('input[type="text"]');
              if (textInput) textInput.required = true; // Make 'other' text required
            } else {
              // Hide if the value doesn't match (or another radio in the group is selected)
              const shouldHide =
                target.name === conditionTarget &&
                target.value !== conditionValue;
              // Check if another radio in the *same group* was selected
              const isDifferentRadioSelected =
                target.type === "radio" &&
                surveyForm.querySelector(`input[name="${target.name}"]:checked`)
                  ?.value !== conditionValue;

              if (shouldHide || isDifferentRadioSelected) {
                condInput.classList.remove("visible");
                const textInput = condInput.querySelector('input[type="text"]');
                if (textInput) {
                  textInput.required = false; // No longer required
                  textInput.value = ""; // Clear value when hidden
                  clearFieldError(textInput); // Clear its specific error
                }
              }
            }
          });
        }
      }
      // Handle 'Other' input visibility for checkboxes
      if (target.matches('input[type="checkbox"]')) {
        const field = target.closest(".form-field");
        if (field) {
          const conditionalInputs =
            field.querySelectorAll(".conditional-input");
          conditionalInputs.forEach((condInput) => {
            const conditionTarget = condInput.dataset.conditionTarget; // Should be like "challenges[]"
            const conditionValue = condInput.dataset.conditionValue; // Should be like "Challenge_Other"

            if (
              target.name === conditionTarget &&
              target.value === conditionValue
            ) {
              const textInput = condInput.querySelector('input[type="text"]');
              if (target.checked) {
                condInput.classList.add("visible");
                if (textInput) textInput.required = true;
              } else {
                condInput.classList.remove("visible");
                if (textInput) {
                  textInput.required = false;
                  textInput.value = "";
                  clearFieldError(textInput);
                }
              }
            }
          });
        }
      }
    }); // Update progress on any form change
    surveyForm.addEventListener("submit", handleFormSubmit);
  } else {
    console.log("Survey form not found on this page.");
    // Add handlers for other forms (demo, contact) if they exist on the same script bundle
    // handleFormSubmit("demo-form");
    // handleFormSubmit("contact-form");
  }

  // --- Initialize Language ---
  setupLanguageSwitcher(); // Setup switcher and load initial language
}); // End DOMContentLoaded
