document.addEventListener('DOMContentLoaded', function() {
    // Step 1: Initialize quotes array from Local Storage or set default quotes
    let quotes = JSON.parse(localStorage.getItem('quotes')) || [
        { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
        { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" },
        { text: "The best way to predict the future is to create it.", category: "Inspiration" }
    ];

    const quoteDisplay = document.getElementById('quoteDisplay');
    const newQuoteBtn = document.getElementById('addQuoteBtn');
    const categoryFilter = document.getElementById('categoryFilter');

    // Step 2: Function to save quotes to Local Storage
    function saveQuotes() {
        localStorage.setItem('quotes', JSON.stringify(quotes));
    }

    // Function to populate categories dynamically
    function populateCategories() {
        const categories = [...new Set(quotes.map(quote => quote.category))]; // Get unique categories
        categoryFilter.innerHTML = '<option value="all">All Categories</option>'; // Reset dropdown

        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });

        // Remember the last selected filter
        const lastSelectedCategory = localStorage.getItem('selectedCategory');
        if (lastSelectedCategory) {
            categoryFilter.value = lastSelectedCategory;
            filterQuotes(); // Apply the filter based on saved category
        }
    }

    // Function to show filtered quotes based on selected category
    function filterQuotes() {
        const selectedCategory = categoryFilter.value;
        localStorage.setItem('selectedCategory', selectedCategory); // Save the filter selection
        quoteDisplay.innerHTML = ''; // Clear current display

        const filteredQuotes = selectedCategory === 'all' ? quotes : quotes.filter(quote => quote.category === selectedCategory);

        if (filteredQuotes.length === 0) {
            quoteDisplay.innerHTML = '<p>No quotes available for this category.</p>';
        } else {
            filteredQuotes.forEach(quote => {
                quoteDisplay.innerHTML += `<p>"${quote.text}" - <em>${quote.category}</em></p>`;
            });
        }
    }

    // Function to add a new quote
    function addQuote() {
        const newQuoteText = document.getElementById('newQuoteText').value.trim();
        const newQuoteCategory = document.getElementById('newQuoteCategory').value.trim();

        if (newQuoteText === "" || newQuoteCategory === "") {
            alert("Please enter both a quote and a category.");
            return;
        }

        quotes.push({ text: newQuoteText, category: newQuoteCategory });
        saveQuotes(); // Save updated quotes to Local Storage
        populateCategories(); // Update the category dropdown
        filterQuotes(); // Re-apply filter with the new quote added
    }

    // Function to export quotes as a JSON file
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

    // Function to import quotes from a JSON file
    function importFromJsonFile(event) {
        const fileReader = new FileReader();
        fileReader.onload = function(e) {
            const importedQuotes = JSON.parse(e.target.result);
            quotes.push(...importedQ
