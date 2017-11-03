using FreedomCalculator2.Exceptions;
using FreedomCalculator2.Models;
using Moq;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Xml.Linq;
using Xunit;

namespace FreedomCalculator2.Tests
{
    public class AssetQuoterTest
    {
        const string fakeAddress = "2114 Bigelow Ave";
        const string fakeCity = "Seattle";
        const string fakeState = "WA";
        const string fakeZip = "55555";
        const string fakeCityStateZip = "Seattle, WA 55555";
        const string fakeZpId = "48749425";
        const string fakeZestimateAmount = "1219500";

        XDocument fakeNotFoundZillowSearchResult = XDocument.Parse(
            @"<SearchResults>
                <request>
                    <address>" + fakeAddress + @"</address>
                    <citystatezip>" + fakeCityStateZip + @"</citystatezip>
                </request>
                <message>
                    <code>502</code>
                </message>
                <response>
                </response>
              </SearchResults>");

        XDocument fakeFoundZillowSearchResult = XDocument.Parse(
            @"<SearchResults>
                <request>
                    <address>" + fakeAddress + @"</address>
                    <citystatezip>" + fakeCityStateZip + @"</citystatezip>
                </request>
                <message>
                    <code>0</code>
                </message>
                <response>
                    <results>
                        <result>
                            <zpid>" + fakeZpId + @"</zpid>
                            <zestimate>
                                <amount currency=""USD"">" + fakeZestimateAmount + @"</amount>
                                <last-updated>11/03/2009</last-updated>
                            </zestimate>
                        </result>
                    </results>
                </response>
            </SearchResults>");

        XDocument fakeZestimateSearchResult = XDocument.Parse(
            @"<Zestimate>
                <message>
                    <text>Request successfully processed</text>
                    <code>0</code>
                </message>
                <response>
                    <zpid>" + fakeZpId + @"</zpid>
                    <zestimate>
                        <amount currency=""USD"">" + fakeZestimateAmount + @"</amount>
                        <last-updated>11/03/2009</last-updated>
                        <oneWeekChange deprecated=""true""/>
                        <valueChange duration=""30"" currency=""USD"">-41500</valueChange>
                    </zestimate>
                </response>
              </Zestimate>");

        Mock<IZillowClient> zillowClient;
        Mock<IFinanceClient> financeClient;

        public AssetQuoterTest()
        {
            zillowClient = new Mock<IZillowClient>();
            financeClient = new Mock<IFinanceClient>();
        }

        [Fact]
        public void GetPropertyId_PropertyNotFound_ExceptionThrown()
        {
            zillowClient.Setup<Task<XDocument>>(z => z.GetSearchResults(fakeAddress, fakeCityStateZip)).ReturnsAsync(fakeNotFoundZillowSearchResult);
            AssetQuoter assetQuoter = new AssetQuoter(zillowClient.Object, financeClient.Object);
            Assert.ThrowsAsync<ZillowPropertyNotFoundException>(() => assetQuoter.GetPropertyId(fakeAddress, fakeCity, fakeState, fakeZip));
        }

        [Fact]
        public async Task GetPropertyId_PropertyFound_ExpectedResult()
        {
            zillowClient.Setup<Task<XDocument>>(z => z.GetSearchResults(fakeAddress, fakeCityStateZip)).ReturnsAsync(fakeFoundZillowSearchResult);
            AssetQuoter assetQuoter = new AssetQuoter(zillowClient.Object, financeClient.Object);
            string propertyId = await assetQuoter.GetPropertyId(fakeAddress, fakeCity, fakeState, fakeZip);
            Assert.Equal(fakeZpId, propertyId);
        }

        [Fact]
        public async Task GetPropertyValue_ExpectedResult()
        {
            zillowClient.Setup<Task<XDocument>>(z => z.GetZestimate(fakeZpId)).ReturnsAsync(fakeZestimateSearchResult);
            AssetQuoter assetQuoter = new AssetQuoter(zillowClient.Object, financeClient.Object);
            AssetQuoter.PropertyValue propVal = await assetQuoter.GetPropertyValue(fakeZpId);
            Assert.Equal(fakeZestimateAmount, propVal.amount);
        }

        [Fact]
        public async Task GetQuote_InvalidSymbol_ExceptionThrown()
        {
            financeClient.Setup<Task<AssetQuote>>(y => y.GetQuote(string.Empty)).ReturnsAsync(new AssetQuote());
            AssetQuoter assetQuoter = new AssetQuoter(zillowClient.Object, financeClient.Object);
            await Assert.ThrowsAsync<ArgumentException>(async () => await assetQuoter.GetQuote(string.Empty));
        }

        [Fact]
        public async Task GetQuotes_InvalidSymbols_ExceptionThrown()
        {
            financeClient.Setup<Task<List<AssetQuote>>>(y => y.GetQuotes(new List<string>())).ReturnsAsync(new List<AssetQuote>());
            AssetQuoter assetQuoter = new AssetQuoter(zillowClient.Object, financeClient.Object);
            await Assert.ThrowsAsync<ArgumentException>(async () => await assetQuoter.GetQuotes(new List<string>()));
        }
    }
}
