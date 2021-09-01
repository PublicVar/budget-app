<script>
  import { globalTotal, totalExpenses, totalIncome } from "./store";
</script>

<p class="total">Total : {$globalTotal} €</p>
<p class="income">Revenus : {$totalIncome} €</p>
<p class="expenses">Dépenses : {$totalExpenses} €</p>

<style>
  p {
    text-align: right;
    margin: 0 0 0.4em 0;
  }
  .total {
    font-size: 1.5em;
    font-weight: bold;
  }
  .income,
  .expenses {
    font-size: 1em;
  }
  .income {
    color: rgb(5, 170, 27);
  }
  .expenses {
    color: rgb(214, 91, 19);
  }
</style>
