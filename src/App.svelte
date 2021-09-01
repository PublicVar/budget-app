<script>
  import { expensesPieData } from "./store";
  import BudgetList from "./BudgetList.svelte";
  import AddBudgetItem from "./AddBudgetItem.svelte";
  import PieChart from "./PieChart.svelte";
</script>

<main>
  <h1>Calculer le budget</h1>
  <AddBudgetItem />
  <BudgetList />
  <PieChart label="Dépenses par catégorie" {...$expensesPieData} />
</main>

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  main {
    padding: 1em;
    width: 600px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 2em;
    font-weight: 300;
  }
</style>
