using System;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Xml.Linq;
using Microsoft.Extensions.Options;

namespace FreedomCalculator2
{
    public class ZillowClient : IZillowClient
    {
        private readonly FreedomCalculatorConfig _optionsAccessor;
        private string zwsid;

        public ZillowClient(IOptions<FreedomCalculatorConfig> optionsAccessor)
        {
            _optionsAccessor = optionsAccessor.Value;
            zwsid = _optionsAccessor.ZillowClientId;
        }

        public async Task<XDocument> GetSearchResults(string address, string cityStateZip)
        {
            string url = String.Format(
                "https://www.zillow.com/webservice/GetSearchResults.htm?zws-id={0}&address={1}&citystatezip={2}",
                zwsid,
                WebUtility.UrlEncode(address),
                WebUtility.UrlEncode(cityStateZip));

            HttpClient client = new HttpClient();
            Stream stream = await client.GetStreamAsync(url);

            return XDocument.Load(stream);
        }

        public async Task<XDocument> GetZestimate(string zpid)
        {
            string url = String.Format("https://www.zillow.com/webservice/GetZestimate.htm?zws-id={0}&zpid={1}", zwsid, zpid);
            HttpClient client = new HttpClient();
            Stream stream = await client.GetStreamAsync(url);
            return XDocument.Load(stream);
        }
    }
}