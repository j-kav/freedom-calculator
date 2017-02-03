using System;
using System.Net;
using System.Xml.Linq;
using Microsoft.Extensions.Options;

namespace FreedomCalculator2
{
    public class ZillowClient
    {
        private readonly FreedomCalculatorConfig _optionsAccessor;
        private string zwsid;

        public ZillowClient(IOptions<FreedomCalculatorConfig> optionsAccessor)
        {
            _optionsAccessor = optionsAccessor.Value;
            zwsid = _optionsAccessor.ZillowClientId;
        }

        public XDocument GetSearchResults(string address, string cityStateZip)
        {
            string url = String.Format(
                "https://www.zillow.com/webservice/GetSearchResults.htm?zws-id={0}&address={1}&citystatezip={2}", 
                zwsid,
                WebUtility.UrlEncode(address),
                WebUtility.UrlEncode(cityStateZip));

            return XDocument.Load(url);
        }

        public XDocument GetZestimate(string zpid)
        {
            string url = String.Format("https://www.zillow.com/webservice/GetZestimate.htm?zws-id={0}&zpid={1}", zwsid, zpid);
            return XDocument.Load(url);
        }
    }
}