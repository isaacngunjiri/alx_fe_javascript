document.addEventListener('DOMContentLoaded', function() {
    // Step 1: Array to hold quotes and categories
    const quotes = [
        { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
        { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" },
        { text: "The best way to predict the future is to create it.", category: "Inspiration" }
    ];

    // Step 2: DOM elements
    const quoteDisplay = document.getElementById('quoteDisplay');
    const newQuoteBtn = document.getElementById('newQuote');

    // Step 3: Function to show a random quote
    function showRandomQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];
        quoteDisplay.innerHTML = `<p>"${randomQuote.text}" - <em>${randomQuote.category}</em></p>`;
    }

    // Step 4: Function to add a new quote
    function addQuote(quoteText, quoteCategory) {
        if (quoteText === "" || quoteCategory === "") {
            alert("Please enter both a quote and a category.");
            return;
        }

        // Add new quote to quotes array
        quotes.push({ text: quoteText, category: quoteCategory });

        // Optionally display the new quote right away
        showRandomQuote();
    }

    // Step 5: Create the form for adding new quotes dynamically
    function createAddQuoteForm() {
        // Create form elements
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
        
        // Append form elements to the container
        formContainer.appendChild(inputQuoteText);
        formContainer.appendChild(inputQuoteCategory);
        formContainer.appendChild(addQuoteBtn);
        
        // Append form to the body
        document.body.appendChild(formContainer);

        // Attach event listener to the Add Quote button
        addQuoteBtn.addEventListener('click', function() {
            const newQuoteText = document.getElementById('newQuoteText').value.trim();
            const newQuoteCategory = document.getElementById('newQuoteCategory').value.trim();
            addQuote(newQuoteText, newQuoteCategory);
        });
    }

    // Step 6: Attach event listeners
    newQuoteBtn.addEventListener('click', showRandomQuote);

    // Step 7: Initialize form creation and load page
    createAddQuoteForm();
});
