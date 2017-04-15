export default {
    // Convert number into US dollar format
    usdFormmater: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    })
}
