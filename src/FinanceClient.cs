using FreedomCalculator2.Models;
using Microsoft.Extensions.Options;
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
        static readonly string _financeUrlFormat = @"https://www.alphavantage.co/query?function=BATCH_STOCK_QUOTES&symbols={0}&apikey={1}&datatype=csv";
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
            List<AssetQuote> retVal = new List<AssetQuote>();
            string requestUrl = string.Format(_financeUrlFormat, string.Join(",", symbols), _alphaVantageApiKey);
            string responseString = string.Empty;

            HttpWebRequest request = WebRequest.CreateHttp(requestUrl);
            using (WebResponse response = await request.GetResponseAsync())
            {
                using (StreamReader stream = new StreamReader(response.GetResponseStream(), Encoding.ASCII))
                {
                    // read first line to get past column headers
                    await stream.ReadLineAsync();
                    // remaining lines are the quotes
                    while ((responseString = await stream.ReadLineAsync()) != null)
                    {
                        string[] contents = responseString.Split(',');
                        AssetQuote quote = new AssetQuote { Symbol = contents?[0], SharePrice = Convert.ToDecimal(contents?[1] ?? "0") };
                        retVal.Add(quote);
                    }
                }
            }
            return retVal;
        }
    }
}