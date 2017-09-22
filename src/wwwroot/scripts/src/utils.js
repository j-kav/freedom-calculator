const safeWithdrawlRate = 0.04
const compoundingInterestRate = 0.08

export default {
    // Convert number into US dollar format
    usdFormatter: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    }),
    // Determine how much money needed for safe withdrawl rate to meet monthly expenses
    // (making financial independence possible)
    // @param {Number} monthlyExpenses - average amount of mandatory monthly expenses
    // <returns></returns>
    calculateAmountToCoverExpenses: function (monthlyExpenses) {
        return (12 * monthlyExpenses) / safeWithdrawlRate;
    },
    // From the compound interest formula:
    //     A = P(1 + (r/n)^nt
    //     A: accumulated amount
    //     P: beginning principal
    //     r: interest rate
    //     n: number of compounds per year
    //     t: number of years
    // For this method, we know the target A, but we need to solve for t
    //     A/P = (1 + (r/n))^nt
    //     ln(A/P) = nt(ln(1 + r/n))
    //     nt = ln(A/P)/ln(1 + r/n)
    //     t = ln(A/P)/n(ln(1 + r/n))
    // @param {Number} amount - amount needed for financial independence
    // @param {Number} principal - amount saved so far
    // @param {Number} numberCompoundsPerYear - should normally be 12
    // @return {Number} the time predicted it will take to achieve financial independence
    compoundInterestTime: function (amount, principal, numberCompoundsPerYear) {
        if (amount === 0) {
            return 0
        }
        if (principal <= 0) {
            return Number.POSITIVE_INFINITY
        }
        const quotient = amount / principal
        const numerator = Math.log(quotient)
        const denominator = numberCompoundsPerYear * (Math.log(1 + (compoundingInterestRate / numberCompoundsPerYear)))
        return Math.max(0, Math.round(numerator / denominator, 2));
    }
}
