using FreedomCalculator2.Models;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace FreedomCalculator2
{
    public class FinanceClient : IFinanceClient
    {
        static readonly string _financeUrlFormat = @"https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol={0}&apikey={1}";
        private readonly FreedomCalculatorConfig _optionsAccessor;
        private string _alphaVantageApiKey;

        public FinanceClient(IOptions<FreedomCalculatorConfig> optionsAccessor)
        {
            _optionsAccessor = optionsAccessor.Value;
            _alphaVantageApiKey = _optionsAccessor.AlphaVantageApiKey;
        }

        public async Task<AssetQuote> GetQuote(string symbol)
        {
            List<AssetQuote> quotes = await GetQuotes(new List<string> { symbol });

            if (quotes.Count != 1)
                throw new ArgumentOutOfRangeException("symbol not found");

            return quotes[0];
        }

        public async Task<List<AssetQuote>> GetQuotes(List<string> symbols)
        {
            Dictionary<string, decimal> quoteCache = new Dictionary<string, decimal>();
            List<AssetQuote> retVal = new List<AssetQuote>();

            foreach (string symbol in symbols)
            {
                if (quoteCache.ContainsKey(symbol))
                {
                    AssetQuote quote = new AssetQuote { Symbol = symbol, SharePrice = quoteCache[symbol] };
                    retVal.Add(quote);
                    continue;
                }
                string requestUrl = string.Format(_financeUrlFormat, symbol, _alphaVantageApiKey);
                string responseString = string.Empty;
                HttpWebRequest request = WebRequest.CreateHttp(requestUrl);
                using (WebResponse response = await request.GetResponseAsync())
                {
                    using (StreamReader stream = new StreamReader(response.GetResponseStream(), Encoding.ASCII))
                    {
                        string content = await stream.ReadToEndAsync();
                        JObject jobj = JObject.Parse(content);
                        /* JSON is returned in this weird format:
                        {
                            "Global Quote": {
                                "01. symbol": "ADSK",
                                "02. open": "200.9200",
                                "03. high": "201.5700",
                                "04. low": "198.8600",
                                "05. price": "199.7400",
                                "06. volume": "837188",
                                "07. latest trading day": "2020-01-29",
                                "08. previous close": "200.0300",
                                "09. change": "-0.2900",
                                "10. change percent": "-0.1450%"
                            }
                        }
                        */
                        JToken quoteToken = jobj?["Global Quote"];
                        JToken priceToken = quoteToken?["05. price"];
                        string price = priceToken?.ToString();
                        Decimal priceDecimal = Convert.ToDecimal(price ?? "0");
                        AssetQuote quote = new AssetQuote { Symbol = symbol, SharePrice = priceDecimal };
                        retVal.Add(quote);
                        quoteCache.Add(symbol, priceDecimal);
                    }
                }
            }

            return retVal;
        }
    }
}