import CardCarousel from "./CardCarousel";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-8 grid-rows-8 gap-4 w-full h-full p-10">
      <div className="col-span-4 row-span-4 border rounded-lg">
        <CardCarousel />
      </div>
      <div className="col-span-4 row-span-6 border rounded-lg">
        THIS WILL BE GRAPHS
      </div>
      <div className="col-span-4 row-span-4 border rounded-lg">
        THIS WILL BE RECENT TRANSACTIONS
      </div>
      <div className="col-span-4 row-span-2 border rounded-lg">
        THIS WILL BE UPCOMING PYMENTS
      </div>
    </div>
  );
};

export default Dashboard;
