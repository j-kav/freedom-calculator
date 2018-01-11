<template>
    <div class="chart-container" style="position: relative; height:50vh; width:50vw">
        <canvas id="netWorthChart"></canvas>
    </div>
</template>

<script>
    import Chart from 'chart.js'
    import utils from '../utils'

    export default {
        name: 'NetWorth',
        data: function () {
            return {
                utils: utils
            }
        },
        mounted() {
            var ctx = document.getElementById('netWorthChart')
            const budgets = this.$store.state.budgets.slice(0).reverse() // sorted decending
            const labelValues = budgets.map(b => b.year + '-' + b.month)
            const dataValues = budgets.map(b => b.netWorth)
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labelValues,
                    datasets: [{
                        label: 'Net Worth Over Time',
                        backgroundColor: 'rgb(133, 187, 101)',
                        borderColor: 'rgb(133, 187, 101)',
                        data: dataValues
                    }]
                },
                options: {}
            })
        }
    }
</script>