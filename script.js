// Sample stock data for testing
const stockDatabase = {
    AAPL: { price: 180, marketCap: "2.8T", high52: 200, low52: 130 },
    TSLA: { price: 700, marketCap: "800B", high52: 900, low52: 500 },
    MSFT: { price: 350, marketCap: "2.5T", high52: 400, low52: 290 }
};

// Function to fetch stock data
async function fetchStockData() {
    let symbol = document.getElementById("stockSymbol").value.toUpperCase();
    let stockInfo = document.getElementById("stockInfo");

    try {
        let response = await fetch(`http://127.0.0.1:5000/getStock?symbol=${symbol}`);
        let data = await response.json();

        if (data.error) {
            alert(data.error);
            return;
        }

        // Display stock details
        document.getElementById("companyName").innerText = data.symbol;
        document.getElementById("stockPrice").innerText = `$${data.price.toFixed(2)}`;
        document.getElementById("marketCap").innerText = data.marketCap;
        document.getElementById("high52").innerText = `$${data.high52}`;
        document.getElementById("low52").innerText = `$${data.low52}`;

        // Generate recommendation
        let recommendation = getStockRecommendation(data.price, data.high52, data.low52);
        document.getElementById("recommendation").innerText = recommendation;
        document.getElementById("recommendation").style.color =
            recommendation === "Buy" ? "green" : recommendation === "Sell" ? "red" : "orange";

        stockInfo.classList.remove("hidden");

    } catch (error) {
        console.error("Error fetching stock data:", error);
        alert("Failed to fetch stock data. Make sure the backend is running.");
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
