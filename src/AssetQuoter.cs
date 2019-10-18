using FreedomCalculator2.Exceptions;
using FreedomCalculator2.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace FreedomCalculator2
{
    public class AssetQuoter
    {
        public struct PropertyValue
        {
            public string zillowPropertyId;
            public string amount;
        }

        IZillowClient _zillowClient;
        IFinanceClient financeClient;

        public AssetQuoter(IZillowClient zillowClient, IFinanceClient financeClient)
        {
            _zillowClient = zillowClient;
            this.financeClient = financeClient;
        }

        public async Task<string> GetPropertyId(string address, string city, string state, string zip)
        {
            XDocument zillowResponse = await _zillowClient.GetSearchResults(address, city + ", " + state + " " + zip);

            var codeQuery = from message in zillowResponse.Descendants("message")
                            select message.Element("code").Value;

            string code = codeQuery.First().ToString();

            int parsedCode;
            if (!Int32.TryParse(code, out parsedCode) || parsedCode >= 500)
                throw new ZillowPropertyNotFoundException();

            var zpIdQuery = from result in zillowResponse.Descendants("result")
                            select result.Element("zpid").Value;

            return zpIdQuery.FirstOrDefault<string>();
        }

        public async Task<PropertyValue> GetPropertyValue(string zillowPropertyId)
        {
            XDocument zillowResponse = await _zillowClient.GetZestimate(zillowPropertyId);

            var amountQuery = from zestimate in zillowResponse.Descendants("zestimate")
                              select zestimate.Element("amount").Value;

            return new PropertyValue { zillowPropertyId = zillowPropertyId, amount = amountQuery.FirstOrDefault<string>() };
        }

        public async Task<AssetQuote> GetQuote(string symbol)
        {
            if (string.IsNullOrWhiteSpace(symbol))
                throw new ArgumentException("symbol cannot be null or whitespace", "symbol");

            return await financeClient.GetQuote(symbol);
        }

        public async Task<List<AssetQuote>> GetQuotes(List<string> symbols)
        {
            if (symbols == null || symbols.Count == 0)
                throw new ArgumentException("symbols cannot be null or empty", "symbols");

            return await financeClient.GetQuotes(symbols);
        }
    }
}