<template>
    <div>
        <h2>Budget details - {{ budget.month }}/{{ budget.year }}</h2>
        <div>
            <label>Projected Net Earned Income</label>
            <div class="field align-right">
                <input v-model="budget.projectedEarnedIncome" type="number" @change.prevent="updateBudget">
            </div>
            <span v-if="message" :class="messageClass">{{ message }}</span>
        </div>
        <div>
            <label>Net Earned Income</label>
            <div class="field align-right">
                <span class="link" @click="showEarnedIncomeItems=true">{{ utils.usdFormatter.format(budget.totalEarnedIncome) }}</span>
            </div>
            <modal v-if="showEarnedIncomeItems" @close="showEarnedIncomeItems=false">
                <h3 slot="header">Earned Income Items</h3>
                <budgetEarnedIncomeItems v-if="showEarnedIncomeItems" slot="body" :budget="budget" @close="showEarnedIncomeItems=false" />
            </modal>
        </div>
        <div>
            <label>Net Passive Income</label>
            <div class="field align-right">
                <span class="link" @click="showPassiveIncomeItems=true">{{ utils.usdFormatter.format(budget.totalPassiveIncome) }}</span>
            </div>
            <modal v-if="showPassiveIncomeItems" @close="showPassiveIncomeItems=false">
                <h3 slot="header">Passive Income Items</h3>
                <budgetPassiveIncomeItems v-if="showPassiveIncomeItems" slot="body" :budget="budget" @close="showPassiveIncomeItems=false" />
            </modal>
        </div>
        <div>
            <label>Total Income</label>
            <div class="field align-right">
                <span>{{ utils.usdFormatter.format(totalIncome) }}</span>
            </div>
        </div>
        <div>
            <label>Expenses</label>
            <div class="field align-right">
                <span class="link" @click="showExpenses=true">{{ `${utils.usdFormatter.format(budget.totalActualExpenses)} / ${utils.usdFormatter.format(budget.totalProjectedExpenses)}` }}</span>
            </div>
            <modal v-if="showExpenses" @close="showExpenses=false">
                <h3 slot="header">Expenses</h3>
                <budgetExpenses v-if="showExpenses" slot="body" :budget="budget" @close="showExpenses=false" />
            </modal>
        </div>
        <div>
            <label>Income Surplus/Deficit</label>
            <div class="field align-right">
                <span :class="surplusDeficitClass">{{ utils.usdFormatter.format(surplusDeficit) }}</span>
            </div>
        </div>
        <div>
            <label>Investments/Savings</label>
            <div class="field align-right">
                <span class="link" @click="showInvestmentItems=true">{{ utils.usdFormatter.format(budget.totalInvestments) }}</span>
            </div>
            <modal v-if="showInvestmentItems" @close="showInvestmentItems=false">
                <h3 slot="header">Investment Items</h3>
                <budgetInvestmentItems v-if="showInvestmentItems" slot="body" :budget="budget" @close="showInvestmentItems=false" />
            </modal>
        </div>
        <div>
            <label>Savings Rate</label>
            <div class="field align-right">
                <span>{{ budget.savingsRatePercent }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import api from '../api'
import BudgetEarnedIncomeItems from './BudgetEarnedIncomeItems.vue'
import BudgetPassiveIncomeItems from './BudgetPassiveIncomeItems.vue'
import BudgetInvestmentItems from './BudgetInvestmentItems.vue'
import BudgetExpenses from './BudgetExpenses.vue'
import Modal from './Modal.vue'
import utils from '../utils'

export default {
    name: 'BudgetDetail',
    components: {
        budgetEarnedIncomeItems: BudgetEarnedIncomeItems,
        budgetPassiveIncomeItems: BudgetPassiveIncomeItems,
        budgetInvestmentItems: BudgetInvestmentItems,
        budgetExpenses: BudgetExpenses,
        modal: Modal
    },
    data() {
        return {
            budget: null,
            showEarnedIncomeItems: false,
            showPassiveIncomeItems: false,
            showInvestmentItems: false,
            showExpenses: false,
            utils: utils,
            error: false,
            message: null
        }
    },
    computed: {
        messageClass() {
            return {
                error: this.error,
                success: !this.error
            }
        },
        totalIncome() {
            return this.budget.totalEarnedIncome + this.budget.totalPassiveIncome
        },
        surplusDeficit() {
            return this.totalIncome - this.budget.totalActualExpenses
        },
        surplusDeficitClass() {
            return {
                error: this.surplusDeficit < 0,
                success: this.surplusDeficit >= 0
            }
        }
    },
    created() {
        this.budget = this.$store.getters.budgetById(this.$route.params.id)
    },
    methods: {
        async updateBudget() {
            try {
                this.budget.netWorth = this.$store.getters.netWorth
                await api.updateBudget(this.budget)
                this.$store.commit('updateBudget', this.budget)
                this.error = false
                this.message = 'updated'
            } catch (error) {
                this.error = true
                this.message = error
            }
        }
    }
}
</script>

<style scoped>
input[type='number'] {
    width: 100px;
}
</style>