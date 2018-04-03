<template>
    <div id="container">
        <div class="feature-text">
            <span>Welcome to Freedom Calculator. Track your assets and liabilities and calculate net worth.</span>
        </div>
        <div>
            <img src="images/assets-vs-liabilities.png" />
        </div>
        <div class="feature-text">
            <span>See how your net worth grows over time.</span>
        </div>
        <div>
            <img src="images/net-worth.png" />
        </div>
        <div class="feature-text">
            <span>Determine how much you need to save for financial independence and when you will get there.</span>
        </div>
        <div>
            <img src="images/fi-estimate.png" />
            <br/>
            <span>Time Until Financial Independence:
                <em>8 years</em>
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Home'
}
</script>

<style scoped=true>
#container {
    display: grid;
    grid-gap: 1em;
    justify-items: center;
    margin: 1em;
}

img {
    align-self: center;
}

@media screen and (min-width: 680px) {
    #container {
        align-items: center;
        grid-template-columns: 1fr 1fr;
        margin: 0;
    }

    div.feature-text {
        margin-left: 2em;
        margin-right: 2em;
    }
}
</style>