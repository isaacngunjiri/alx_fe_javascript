document.addEventListener('DOMContentLoaded', function () {
    let quotes = JSON.parse(localStorage.getItem('quotes')) || [
        { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
        { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" },
        { text: "The best way to predict the future is to create it.", category: "Inspiration" }
    ];

    const quoteDisplay = document.getElementById('quoteDisplay');
    const newQuoteBtn = document.getElementById('addQuoteBtn');
    const categoryFilter = document.getElementById('categoryFilter');

    // Save quotes to Local Storage
    function saveQuotes() {
        localStorage.setItem('quotes', JSON.stringify(quotes));
    }

    // Populate categories dynamically
    function populateCategories() {
        const categories = [...new Set(quotes.map(quote => quote.category))];
        categoryFilter.innerHTML = '<option value="all">All Categories</option>';

        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });

        const lastSelectedCategory = localStorage.getItem('selectedCategory');
        if (lastSelectedCategory) {
            categoryFilter.value = lastSelectedCategory;
            filterQuotes();
        }
    }

    // Show a random quote from the filtered list
    function showRandomQuote(quoteList) {
        const randomIndex = Math.floor(Math.random() * quoteList.length);
        const randomQuote = quoteList[randomIndex];
        quoteDisplay.innerHTML = `<p>"${randomQuote.text}" - <em>${randomQuote.category}</em></p>`;
    }

    // Filter quotes based on selected category
    function filterQuotes() {
        const selectedCategory = categoryFilter.value;
        localStorage.setItem('selectedCategory', selectedCategory);
        quoteDisplay.innerHTML = '';

        const filteredQuotes = selectedCategory === 'all' ? quotes : quotes.filter(quote => quote.category === selectedCategory);
        showRandomQuote(filteredQuotes);
    }

    // Add a new quote
    function addQuote() {
        const newQuoteText = document.getElementById('newQuoteText').value.trim();
        const newQuoteCategory = document.getElementById('newQuoteCategory').value.trim();

        if (newQuoteText === "" || newQuoteCategory === "") {
            alert("Please enter both a quote and a category.");
            return;
        }

        const newQuote = { text: newQuoteText, category: newQuoteCategory };
        quotes.push(newQuote);
        saveQuotes();
        syncNewQuotesToServer(newQuote);
        populateCategories();
        filterQuotes();
    }

    // Fetch and merge quotes from the server
    function fetchServerQuotes() {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(serverQuotes => {
                const storedQuotes = JSON.parse(localStorage.getItem('quotes')) || [];
                const mergedQuotes = mergeServerData(storedQuotes, serverQuotes);
                localStorage.setItem('quotes', JSON.stringify(mergedQuotes));
                populateCategories();
                filterQuotes();
                notifyUser('Data has been synced with the server.');
            })
            .catch(error => console.error('Error fetching server data:', error));
    }

    // Merge server data with local data
    function mergeServerData(localQuotes, serverQuotes) {
        const updatedQuotes = localQuotes.slice();

        serverQuotes.forEach(serverQuote => {
            const exists = updatedQuotes.some(quote => quote.text === serverQuote.title);
            if (!exists) {
                updatedQuotes.push({ text: serverQuote.title, category: "Server" });
            }
        });

        return updatedQuotes;
    }

    // Sync new quotes to the server
    function syncNewQuotesToServer(newQuote) {
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: newQuote.text,
                body: newQuote.category,
                userId: 1
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log('New quote synced to server:', data);
            })
            .catch(error => console.error('Error syncing quote:', error));
    }

    // Notify the user about data syncs
    function notifyUser(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Event listeners
    newQuoteBtn.addEventListener('click', addQuote);

    // Periodically sync with the server
    setInterval(fetchServerQuotes, 30000);

    // Initial app setup
    populateCategories();
    filterQuotes();
});
