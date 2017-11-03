using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using FreedomCalculator2.Models;
using Microsoft.Extensions.Options;

namespace FreedomCalculator2
{
    public class FinanceClient : IFinanceClient
    {
        static readonly string _financeUrlFormat = @"https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol={0}&apikey={1}&datatype=csv";
        private readonly FreedomCalculatorConfig _optionsAccessor;
        private string _alphaVantageApiKey;

        public FinanceClient(IOptions<FreedomCalculatorConfig> optionsAccessor)
        {
            _optionsAccessor = optionsAccessor.Value;
            _alphaVantageApiKey = _optionsAccessor.AlphaVantageApiKey;
        }

        public async Task<AssetQuote> GetQuote(string symbol)
        {
            string requestUrl = string.Format(_financeUrlFormat, symbol, _alphaVantageApiKey);
            HttpWebRequest request = WebRequest.CreateHttp(requestUrl);
            string responseString = string.Empty;

            using (WebResponse response = await request.GetResponseAsync())
            {
                using (StreamReader stream = new StreamReader(response.GetResponseStream(), Encoding.ASCII))
                {
                    // read first line to get past column headers
                    await stream.ReadLineAsync();
                    // second line is the latest daily quote (not getting realtime quote since it isn't supported for mutual funds)
                    responseString = await stream.ReadLineAsync();
                }
            }

            string[] contents = responseString.Split(',');
            AssetQuote quote = BuildQuoteFromResponse(symbol, contents);
            return quote;
        }

        public async Task<List<AssetQuote>> GetQuotes(List<string> symbols)
        {
            List<AssetQuote> retVal = new List<AssetQuote>();

            foreach (string symbol in symbols)
            {
                AssetQuote quote = await GetQuote(symbol);
                retVal.Add(quote);
            }

            return retVal;
        }

        AssetQuote BuildQuoteFromResponse(string symbol, string[] contents)
        {
            AssetQuote quote = new AssetQuote();
            quote.Symbol = symbol;
            quote.SharePrice = Convert.ToDecimal(contents[4]);
            //quote.PercentChange = // TODO
            //quote.Name = // TODO
            return quote;
        }
    }
}