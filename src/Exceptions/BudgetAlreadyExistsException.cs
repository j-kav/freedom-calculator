using System;

namespace FreedomCalculator2.Exceptions
{
    public class BudgetAlreadyExistsException : Exception
    {
        public override string Message
        {
            get
            {
                return "Budget already exists";
            }
        }
    }
}
