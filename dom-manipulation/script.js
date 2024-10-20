document.addEventListener('DOMContentLoaded', function() {
    // Step 1: Initialize quotes array from Local Storage or set default quotes
    let quotes = JSON.parse(localStorage.getItem('quotes')) || [
        { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
        { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" },
        { text: "The best way to predict the future is to create it.", category: "Inspiration" }
    ];

    const quoteDisplay = document.getElementById('quoteDisplay');
    const newQuoteBtn = document.getElementById('newQuote');
    
    // Function to save quotes to Local Storage
    function saveQuotes() {
        localStorage.setItem('quotes', JSON.stringify(quotes));
    }

    // Function to show a random quote
    function showRandomQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];
        quoteDisplay.innerHTML = `<p>"${randomQuote.text}" - <em>${randomQuote.category}</em></p>`;
        sessionStorage.setItem('lastViewedQuote', JSON.stringify(randomQuote)); // Optional: Save the last viewed quote in session storage
    }

    // Function to add a new quote
    function addQuote(quoteText, quoteCategory) {
        if (quoteText === "" || quoteCategory === "") {
            alert("Please enter both a quote and a category.");
            return;
        }
        quotes.push({ text: quoteText, category: quoteCategory });
        saveQuotes(); // Save updated quotes to Local Storage
        showRandomQuote(); // Optionally display the newly added quote
    }

    // Create form for adding new quotes dynamically
    function createAddQuoteForm() {
        const addQuoteBtn = document.getElementById('addQuoteBtn');
        
        addQuoteBtn.addEventListener('click', function() {
            const newQuoteText = document.getElementById('newQuoteText').value.trim();
            const newQuoteCategory = document.getElementById('newQuoteCategory').value.trim();
            addQuote(newQuoteText, newQuoteCategory);
        });
    }

    // Load the last viewed quote from session storage (Optional)
    const lastViewedQuote = JSON.parse(sessionStorage.getItem('lastViewedQuote'));
    if (lastViewedQuote) {
        quoteDisplay.innerHTML = `<p>"${lastViewedQuote.text}" - <em>${lastViewedQuote.category}</em></p>`;
    }

    // Export quotes to a JSON file
    function exportToJsonFile() {
        const dataStr = JSON.stringify(quotes);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const exportBtn = document.createElement('a');
        exportBtn.href = url;
        exportBtn.download = 'quotes.json';
        exportBtn.click();
        URL.revokeObjectURL(url);
    }

    // Import quotes from a JSON file
    function importFromJsonFile(event) {
        const fileReader = new FileReader();
        fileReader.onload = function(e) {
            const importedQuotes = JSON.parse(e.target.result);
            quotes.push(...importedQuotes);
            saveQuotes(); // Save updated quotes to Local Storage
            alert('Quotes imported successfully!');
        };
        fileReader.readAsText(event.target.files[0]);
    }

    // Attach event listeners
    newQuoteBtn.addEventListener('click', showRandomQuote);
    document.getElementById('exportQuotesBtn').addEventListener('click', exportToJsonFile);
    document.getElementById('importFile').addEventListener('change', importFromJsonFile);

    // Initialize form creation and load page
    createAddQuoteForm();
});
