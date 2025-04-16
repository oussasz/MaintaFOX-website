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

    htmlEl.setAttribute("lang", lang);
    htmlEl.setAttribute("dir", langData.dir || "ltr");

    document.querySelectorAll("[data-translate]").forEach((el) => {
      const key = el.dataset.translate;
      if (langData[key] !== undefined) {
        let translatedText = langData[key];

        if (el.dataset.translateValue) {
          translatedText = translatedText.replace(
            "{value}",
            el.dataset.translateValue
          );
        }

        if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
          if (
            el.placeholder !== undefined &&
            el.hasAttribute("data-translate-placeholder")
          ) {
            const placeholderKey = el.dataset.translatePlaceholder;
            if (langData[placeholderKey]) {
              el.placeholder = langData[placeholderKey];
            }
          }
        } else if (el.tagName === "TITLE") {
          document.title = translatedText;
        } else if (el.tagName === "META" && el.name === "description") {
          el.content = translatedText;
        } else if (el.tagName === "OPTION" && el.value === "") {
          el.textContent = translatedText;
        } else {
          el.innerHTML = translatedText;
        }
      } else {
        console.warn(
          `Translation key "${key}" not found for language "${lang}".`
        );
      }
    });

    if (langSwitcher) {
      langSwitcher.querySelectorAll(".lang-button").forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.lang === lang);
      });
    }

    if (surveyForm) {
      updateRangeSliderStyles();
      checkConditions();
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
        localStorage.setItem("preferredLang", newLang);
      }
    });

    const preferredLang = localStorage.getItem("preferredLang");
    if (preferredLang && translations[preferredLang]) {
      applyTranslations(preferredLang);
    } else {
      applyTranslations(currentLang);
    }
  }

  // ===========================================
  // COMMON WEBSITE FUNCTIONS
  // ===========================================

  if (loader) {
    window.addEventListener("load", () => {
      loader.style.opacity = "0";
      setTimeout(() => {
        loader.style.display = "none";
      }, 500);
    });
  }

  if (scrollProgress) {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      scrollProgress.style.width = `${scrollPercent}%`;
    };
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    updateScrollProgress();
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isActive = navLinks.classList.toggle("active");
      menuToggle.setAttribute("aria-expanded", isActive);
      menuToggle.innerHTML = isActive
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
    });
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

  if (nav) {
    const handleScroll = () => {
      nav.classList.toggle("scrolled", window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
  }

  if (cursor) {
    let mouseX = 0,
      mouseY = 0;
    let cursorX = 0,
      cursorY = 0;
    const speed = 0.15;

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

    requestAnimationFrame(updateCursorPosition);

    const interactiveElements = document.querySelectorAll(
      "a, button, [data-tilt], input, textarea, select, label[for]"
    );
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", () => cursor.classList.add("hover"));
      el.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
    });
  }

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

    function checkConditions() {
      const conditionalSections = surveyForm.querySelectorAll(
        ".conditional-section"
      );
      const formData = new FormData(surveyForm);

      conditionalSections.forEach((section) => {
        const targetNames = section.dataset.conditionTarget.split(",");
        const requiredValues = section.dataset.conditionValue.split(",");
        let shouldShow = false;

        for (const targetName of targetNames) {
          const triggerValue = formData.get(targetName);
          const triggerValuesCheckbox = formData.getAll(targetName);

          if (triggerValue && requiredValues.includes(triggerValue)) {
            shouldShow = true;
            break;
          }
          if (
            triggerValuesCheckbox.length > 0 &&
            triggerValuesCheckbox.some((val) => requiredValues.includes(val))
          ) {
            shouldShow = true;
            break;
          }
        }

        const inputsInside = section.querySelectorAll(
          "input, select, textarea"
        );
        if (shouldShow) {
          section.classList.add("visible");
          section.style.maxHeight = section.scrollHeight + "px";

          inputsInside.forEach((input) => {
            if (section.id === "contact-info-section") {
              if (input.id === "contact_name" || input.id === "contact_email") {
                input.required = true;
                input.dataset.wasRequired = "true";
              }
            } else if (input.dataset.wasRequired === "true") {
              input.required = true;
            }
            input.disabled = false;
          });
        } else {
          section.classList.remove("visible");
          section.style.maxHeight = "0";

          inputsInside.forEach((input) => {
            if (input.required && !input.dataset.wasRequired) {
              input.dataset.wasRequired = "true";
            }
            input.required = false;
            input.disabled = true;
            clearFieldError(input);
          });
        }
      });

      updateProgressBar();
    }

    function updateProgressBar() {
      if (!progressBar || !progressText) return;

      let completedSteps = 0;
      totalVisibleSteps = 0;

      progressSteps.forEach((step, index) => {
        const field = step;
        const conditionalParent = field.closest(".conditional-section");
        const isVisible =
          !conditionalParent || conditionalParent.classList.contains("visible");

        if (isVisible) {
          totalVisibleSteps++;
          let isStepComplete = true; // Start assuming complete, then disprove

          // Gather all input types in the step
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

          // Check selects
          if (selects.length > 0) {
            isStepComplete =
              isStepComplete &&
              Array.from(selects).every((s) => s.value !== "");
          }

          // Check text inputs (including conditionals)
          if (texts.length > 0) {
            isStepComplete =
              isStepComplete &&
              Array.from(texts).every(
                (t) => !t.required || (t.required && t.value.trim() !== "")
              );
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
          }

          // Check range sliders (must be touched)
          if (ranges.length > 0) {
            isStepComplete =
              isStepComplete &&
              Array.from(ranges).every((r) => r.dataset.touched === "true");
          }

          // Check radio groups
          if (radios.length > 0) {
            const radioGroupName = radios[0].name;
            isStepComplete =
              isStepComplete &&
              surveyForm.querySelector(
                `input[name="${radioGroupName}"]:checked`
              ) !== null;
          }

          // Check checkbox groups
          if (checkboxes.length > 0) {
            const checkboxGroupName = checkboxes[0].name;
            const checkedCount = surveyForm.querySelectorAll(
              `input[name="${checkboxGroupName}"]:checked`
            ).length;
            isStepComplete = isStepComplete && checkedCount > 0;
          }

          // Log for debugging
          console.log(
            `Step ${
              index + 1
            }: Visible=${isVisible}, Complete=${isStepComplete}`
          );

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

      progressText.dataset.translateValue = percentage;
      const progressTextKey = progressText.dataset.translate;
      if (
        translations[currentLang] &&
        translations[currentLang][progressTextKey]
      ) {
        progressText.textContent = translations[currentLang][
          progressTextKey
        ].replace("{value}", percentage);
      } else {
        progressText.textContent = `${percentage}% Complete`;
      }

      console.log(
        `Progress: ${completedSteps}/${totalVisibleSteps} = ${percentage}%`
      );
    }

    function updateRangeSliderStyles(rangeInput) {
      const targetRanges = rangeInput
        ? [rangeInput]
        : surveyForm.querySelectorAll('input[type="range"]');
      targetRanges.forEach((range) => {
        const value = range.value;
        const min = range.min || 1;
        const max = range.max || 5;
        const percent = ((value - min) / (max - min)) * 100;
        range.style.setProperty("--value-percent", `${percent}%`);
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
        range.dataset.touched = "false"; // Explicitly not touched
        // Do not set range.value = 1; let it default to min="1"
        updateRangeSliderStyles(range);
        range.addEventListener("input", (event) => {
          event.target.dataset.touched = "true";
          updateRangeSliderStyles(event.target);
          updateProgressBar();
        });
        range.addEventListener("change", () => {
          updateProgressBar();
        });
      });
    }

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
        field.classList.remove("has-error");
      }
    }

    function showFieldError(inputElement, messageKey) {
      const field = inputElement.closest(".form-field");
      const errorMessage = translations[currentLang][messageKey] || messageKey;

      if (field) {
        const errorId = inputElement.getAttribute("aria-describedby");
        const errorContainer = errorId
          ? field.querySelector(`#${errorId}`)
          : field.querySelector(".error-message");

        if (errorContainer) {
          errorContainer.textContent = errorMessage;
          errorContainer.style.display = "block";
        }
        field.classList.add("has-error");
        return true;
      }
      return false;
    }

    function validateForm() {
      let isValid = true;
      clearFormErrors();

      const inputs = surveyForm.querySelectorAll(
        "input[required]:not(:disabled), textarea[required]:not(:disabled), select[required]:not(:disabled)"
      );

      inputs.forEach((input) => {
        const conditionalParent = input.closest(".conditional-section");
        if (
          conditionalParent &&
          !conditionalParent.classList.contains("visible")
        ) {
          return;
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
          if (input.required && input.value === "") {
            hasError = showFieldError(input, "validation_range");
          }
        } else {
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
        generalErrorContainer.focus();
      }

      return isValid;
    }

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
        formData.append("submitted_language", currentLang);

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
          headers: { Accept: "application/json" },
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
            successMessageContainer.focus();
          } else {
            alert(
              translations[currentLang].submission_success ||
                "Submission successful!"
            );
          }

          setTimeout(() => {
            surveyForm.reset();
            checkConditions();
            updateProgressBar();
            updateRangeSliderStyles();
            surveyForm
              .querySelectorAll(".floating-label-field input")
              .forEach((input) => input.dispatchEvent(new Event("blur")));
          }, 1500);

          setTimeout(() => {
            if (successMessageContainer) {
            }
            submitButton.classList.remove("success");
            submitButton.disabled = false;
            if (submitButtonText)
              submitButtonText.textContent =
                translations[currentLang].submit_button || "Submit Survey";
          }, 10000);
        } else {
          let errorMsg =
            translations[currentLang].submission_error_generic ||
            "Submission failed.";
          try {
            const errorData = await response.json();
            if (errorData && errorData.error) {
              errorMsg = errorData.error;
            } else {
              errorMsg = `${errorMsg} (Status: ${response.status})`;
            }
          } catch (parseError) {
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
        submitButton.classList.remove("submitting");
        if (submitButtonText)
          submitButtonText.textContent =
            translations[currentLang].submit_button || "Submit Survey";
        submitButton.disabled = false;
      }
    }

    checkConditions();
    setupRangeValueDisplay();
    updateProgressBar();

    surveyForm.addEventListener("change", (event) => {
      const target = event.target;
      if (
        target.matches('select, input[type="radio"], input[type="checkbox"]')
      ) {
        checkConditions();
      }
      updateProgressBar();
      if (target.matches("input, select, textarea")) {
        clearFieldError(target);
      }

      if (target.matches('select, input[type="radio"]')) {
        const field = target.closest(".form-field");
        if (field) {
          const conditionalInputs =
            field.querySelectorAll(".conditional-input");
          conditionalInputs.forEach((condInput) => {
            const conditionTarget = condInput.dataset.conditionTarget;
            const conditionValue = condInput.dataset.conditionValue;
            if (
              target.name === conditionTarget &&
              target.value === conditionValue
            ) {
              condInput.classList.add("visible");
              const textInput = condInput.querySelector('input[type="text"]');
              if (textInput) textInput.required = true;
            } else {
              const shouldHide =
                target.name === conditionTarget &&
                target.value !== conditionValue;
              const isDifferentRadioSelected =
                target.type === "radio" &&
                surveyForm.querySelector(`input[name="${target.name}"]:checked`)
                  ?.value !== conditionValue;

              if (shouldHide || isDifferentRadioSelected) {
                condInput.classList.remove("visible");
                const textInput = condInput.querySelector('input[type="text"]');
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

      if (target.matches('input[type="checkbox"]')) {
        const field = target.closest(".form-field");
        if (field) {
          const conditionalInputs =
            field.querySelectorAll(".conditional-input");
          conditionalInputs.forEach((condInput) => {
            const conditionTarget = condInput.dataset.conditionTarget;
            const conditionValue = condInput.dataset.conditionValue;

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
    });
    surveyForm.addEventListener("submit", handleFormSubmit);
  } else {
    console.log("Survey form not found on this page.");
  }

  setupLanguageSwitcher();
});
