using System.Threading.Tasks;
using System.Xml.Linq;

namespace FreedomCalculator2
{
    public interface IZillowClient
    {
        Task<XDocument> GetSearchResults(string address, string cityStateZip);
        Task<XDocument> GetZestimate(string zpid);
    }
}
