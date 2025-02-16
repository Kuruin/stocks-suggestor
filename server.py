from flask import Flask, request, jsonify
import yfinance as yf
from flask_cors import CORS  # To allow frontend requests

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests


@app.route('/getStock', methods=['GET'])
def get_stock():
    symbol = request.args.get('symbol', '').upper()
    if not symbol:
        return jsonify({"error": "Stock symbol is required"}), 400

    try:
        stock = yf.Ticker(symbol)
        data = stock.history(period="1d")

        if data.empty:
            return jsonify({"error": "Invalid stock symbol or no data available"}), 404

        latest_price = data['Close'].iloc[-1]
        market_cap = stock.info.get("marketCap", "N/A")
        high52 = stock.info.get("fiftyTwoWeekHigh", "N/A")
        low52 = stock.info.get("fiftyTwoWeekLow", "N/A")

        return jsonify({
            "symbol": symbol,
            "price": latest_price,
            "marketCap": market_cap,
            "high52": high52,
            "low52": low52
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
