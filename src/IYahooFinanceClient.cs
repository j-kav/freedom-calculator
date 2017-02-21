﻿using FreedomCalculator2.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FreedomCalculator2
{
    public interface IYahooFinanceClient
    {
        Task<AssetQuote> GetQuote(string symbol);
        Task<List<AssetQuote>> GetQuotes(List<string> symbols);
    }
}
