using System;

namespace FreedomCalculator2.Exceptions
{
    public class ZillowPropertyNotFoundException : Exception
    {
        public override string Message
        {
            get
            {
                return "Property not found on Zillow";
            }
        }
    }
}
