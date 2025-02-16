// Sample stock data for testing
const stockDatabase = {
    AAPL: { price: 180, marketCap: "2.8T", high52: 200, low52: 130 },
    TSLA: { price: 700, marketCap: "800B", high52: 900, low52: 500 },
    MSFT: { price: 350, marketCap: "2.5T", high52: 400, low52: 290 }
};

// Function to fetch stock data
function fetchStockData() {
    let symbol = document.getElementById("stockSymbol").value.toUpperCase();
    let stockInfo = document.getElementById("stockInfo");
    
    if (stockDatabase[symbol]) {
        let stock = stockDatabase[symbol];

        // Display stock details
        document.getElementById("companyName").innerText = symbol;
        document.getElementById("stockPrice").innerText = `$${stock.price}`;
        document.getElementById("marketCap").innerText = stock.marketCap;
        document.getElementById("high52").innerText = `$${stock.high52}`;
        document.getElementById("low52").innerText = `$${stock.low52}`;
        
        // Generate recommendation
        let recommendation = getStockRecommendation(stock.price, stock.high52, stock.low52);
        document.getElementById("recommendation").innerText = recommendation;
        document.getElementById("recommendation").style.color = recommendation === "Buy" ? "green" : recommendation === "Sell" ? "red" : "orange";

        stockInfo.classList.remove("hidden");
    } else {
        alert("Stock not found. Try AAPL, TSLA, or MSFT.");
    }
}

// Simple Recommendation Logic
function getStockRecommendation(price, high52, low52) {
    if (price < (low52 + (high52 - low52) * 0.2)) {
        return "Buy";  // Near the low, good entry point
    } else if (price > (high52 - (high52 - low52) * 0.2)) {
        return "Sell";  // Near the high, might be overpriced
    } else {
        return "Hold";  // In the middle range
    }
}

