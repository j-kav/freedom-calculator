using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using FreedomCalculator2.Models;

namespace FreedomCalculator2
{
    public class YahooFinanceClient
    {
        static readonly string yahooFinanceUrl = @"https://download.finance.yahoo.com/d/quotes.csv?s={0}&f=l1p2ns";

        public async Task<AssetQuote> GetQuote(string symbol)
        {
            string requestUrl = string.Format(yahooFinanceUrl, symbol);
            HttpWebRequest request = WebRequest.CreateHttp(requestUrl);
            string responseString = string.Empty;

            using (WebResponse response = await request.GetResponseAsync())
            {
                using (StreamReader stream = new StreamReader(response.GetResponseStream(), Encoding.ASCII))
                {
                    responseString = stream.ReadLine();
                }
            }

            string[] contents = responseString.Split(',');
            AssetQuote quote = BuildQuoteFromResponse(contents);
            return quote;
        }

        public async Task<List<AssetQuote>> GetQuotes(List<string> symbols)
        {
            List<AssetQuote> retVal = new List<AssetQuote>();

            string delimitedSymbols = string.Join(",", symbols);
            string requestUrl = string.Format(yahooFinanceUrl, delimitedSymbols);
            HttpWebRequest request = HttpWebRequest.CreateHttp(requestUrl);
            string sContentTemp = string.Empty;

            using (WebResponse response = await request.GetResponseAsync())
            {
                using (StreamReader stream = new StreamReader(response.GetResponseStream(), Encoding.ASCII))
                {
                    for (int i = 0; i < symbols.Count; i++)
                    {
                        sContentTemp = stream.ReadLine();
                        string[] contents = sContentTemp.Split(',');
                        AssetQuote quote = BuildQuoteFromResponse(contents);
                        retVal.Add(quote);
                    }
                }
            }

            return retVal;
        }

        AssetQuote BuildQuoteFromResponse(string[] contents)
        {
            AssetQuote quote = new AssetQuote();
            quote.SharePrice = Convert.ToDecimal(contents[0]);
            quote.PercentChange = contents[1].Replace("\"", string.Empty);
            quote.Name = contents[2].Replace("\"", string.Empty);
            quote.Symbol = contents[3].Replace("\"", string.Empty);
            return quote;
        }
    }
}