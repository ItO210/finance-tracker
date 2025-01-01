import AChart from "./AChart";
import CardCarousel from "./CardCarousel";
import TransactionList from "./TransactionList";
import UpcomingPayments from "./UpcomingPayments";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-8 grid-rows-8 gap-4 w-full h-full p-10">
      <div className="col-span-4 row-span-4 border rounded-2xl shadow-inner">
        <CardCarousel />
      </div>
      <div className="col-span-4 row-span-6 border rounded-2xl shadow-inner">
        <AChart />
      </div>
      <div className="col-span-4 row-span-4 border rounded-2xl shadow-inner">
        <TransactionList />
      </div>
      <div className="col-span-4 row-span-2 border rounded-2xl shadow-inner">
        <UpcomingPayments />
      </div>
    </div>
  );
};

export default Dashboard;
