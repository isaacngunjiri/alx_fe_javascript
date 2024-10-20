document.addEventListener('DOMContentLoaded', function() {
    // Step 1: Check Local Storage for existing quotes or initialize a default array
    let quotes = JSON.parse(localStorage.getItem('quotes')) || [
        { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
        { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" },
        { text: "The best way to predict the future is to create it.", category: "Inspiration" }
    ];

    const quoteDisplay = document.getElementById('quoteDisplay');
    const newQuoteBtn = document.getElementById('newQuote');
    
    // Step 2: Function to save quotes to Local Storage
    function saveQuotes() {
        localStorage.setItem('quotes', JSON.stringify(quotes));
    }

    // Step 3: Function to show a random quote
    function showRandomQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];
        quoteDisplay.innerHTML = `<p>"${randomQuote.text}" - <em>${randomQuote.category}</em></p>`;
        sessionStorage.setItem('lastViewedQuote', JSON.stringify(randomQuote)); // Optional session storage for last viewed quote
    }

    // Step 4: Add a new quote
    function addQuote(quoteText, quoteCategory) {
        if (quoteText === "" || quoteCategory === "") {
            alert("Please enter both a quote and a category.");
            return;
        }

        quotes.push({ text: quoteText, category: quoteCategory });
        saveQuotes(); // Save to Local Storage
        showRandomQuote(); // Optionally display the new quote
    }

    // Step 5: Create the form for adding new quotes dynamically
    function createAddQuoteForm() {
        const formContainer = document.createElement('div');
        
        const inputQuoteText = document.createElement('input');
        inputQuoteText.id = 'newQuoteText';
        inputQuoteText.placeholder = "Enter a new quote";
        
        const inputQuoteCategory = document.createElement('input');
        inputQuoteCategory.id = 'newQuoteCategory';
        inputQuoteCategory.placeholder = "Enter quote category";

        const addQuoteBtn = document.createElement('button');
        addQuoteBtn.textContent = 'Add Quote';
        addQuoteBtn.id = 'addQuoteBtn';
        
        formContainer.appendChild(inputQuoteText);
        formContainer.appendChild(inputQuoteCategory);
        formContainer.appendChild(addQuoteBtn);

        document.body.appendChild(formContainer);

        addQuoteBtn.addEventListener('click', function() {
            const newQuoteText = inputQuoteText.value.trim();
            const newQuoteCategory = inputQuoteCategory.value.trim();
            addQuote(newQuoteText, newQuoteCategory);
        });
    }

    // Step 6: Load the last viewed quote from Session Storage (Optional)
    const lastViewedQuote = JSON.parse(sessionStorage.getItem('lastViewedQuote'));
    if (lastViewedQuote) {
        quoteDisplay.innerHTML = `<p>"${lastViewedQuote.text}" - <em>${lastViewedQuote.category}</em></p>`;
    }

    // Step 7: Attach event listeners
    newQuoteBtn.addEventListener('click', showRandomQuote);

    // Step 8: Initialize form creation and load page
    createAddQuoteForm();
});
