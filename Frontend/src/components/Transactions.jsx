import TransactionList from "./TransactionList";
import TransactionForm from "./TransactionForm";

const Transactions = () => {
  return (
    <div className="flex w-full h-full p-10">
      <div className="flex w-1/2 h-full border">
        <TransactionList />
      </div>
      <div className="flex w-1/2 h-full border">
        <TransactionForm />
      </div>
    </div>
  );
};

export default Transactions;
