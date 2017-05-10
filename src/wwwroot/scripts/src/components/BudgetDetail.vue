<template>
    <div>
        <p>Budget details</p>
        <div>
            <label>Date</label>
            <span>{{ budget.month }}/{{ budget.year }}</span>
        </div>
        <div>
            <label>Net Earned Income</label>
            <span class="link" @click="showEarnedIncomeItems=true">{{ earnedIncome }}</span>
            <modal v-if="showEarnedIncomeItems" @close="showEarnedIncomeItems=false">
                <h3 slot="header">Earned Income Items</h3>
                <budgetEarnedIncomeItems slot="body" v-if="showEarnedIncomeItems" v-bind:budget="budget" @close="showEarnedIncomeItems=false"></budgetEarnedIncomeItems>
            </modal>
        </div>
        <div>
            <label>Net Passive Income</label>
            <span class="link" @click="showPassiveIncomeItems=true">{{ passiveIncome }}</span>
            <modal v-if="showPassiveIncomeItems" @close="showPassiveIncomeItems=false">
                <h3 slot="header">Passive Income Items</h3>
                <budgetPassiveIncomeItems slot="body" v-if="showPassiveIncomeItems" v-bind:budget="budget" @close="showPassiveIncomeItems=false"></budgetPassiveIncomeItems>
            </modal>
        </div>
    </div>
</template>

<script>
    import api from '../api'
    import BudgetEarnedIncomeItems from './BudgetEarnedIncomeItems.vue'
    import BudgetPassiveIncomeItems from './BudgetPassiveIncomeItems.vue'
    import Modal from './Modal.vue'

    export default {
        name: 'BudgetDetail',
        components: {
            'budgetEarnedIncomeItems': BudgetEarnedIncomeItems,
            'budgetPassiveIncomeItems': BudgetPassiveIncomeItems,
            'modal': Modal
        },
        created() {
            this.budget = this.$store.getters.budgetById(this.$route.params.id)
        },
        data: function () {
            return {
                budget: null,
                showEarnedIncomeItems: false,
                showPassiveIncomeItems: false
            }
        },
        computed: {
            earnedIncome() {
                let earnedInc = 0
                for (const item of this.budget.earnedIncome) {
                    earnedInc += Number.parseFloat(item.amount)
                }
                return earnedInc
            },
            passiveIncome() {
                let passiveInc = 0
                for (const item of this.budget.passiveIncome) {
                    passiveInc += Number.parseFloat(item.amount)
                }
                return passiveInc
            }
        },
        methods: {
            updateBudget: function () {
                api.updateBudget(this.budget.budgetId, this.budget).then(() => {
                    this.$store.commit('updateBudget', this.budget)
                    this.error = false
                    this.message = 'updated'
                }).catch((error) => {
                    this.error = true
                    this.message = error
                })
            }
        }
    }

</script>

<style scoped>
    span.link {
        text-decoration: underline;
        cursor: pointer;
    }
</style>