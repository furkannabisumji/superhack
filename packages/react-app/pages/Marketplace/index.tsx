import ProductCard from "@/components/ProductCard";
import LeftSide from "@/components/refactors/leftSide";
import RightSide from "@/components/refactors/rightSide";

const marketplace = () => {
  return (
    <div className="flex flex-row md:mx-auto ">
      <LeftSide />
      <div className="bg-white ml-64 rounded shadow-xl w-full overflow-hidden ">
        <div className="h-[140px] bg-gradient-to-r from-slate-400 to-slate-500">
          <div className="flex flex-row px-2 md:px-10 py-20 justify-between">
            <h1 className="text-3xl">MarketPlace</h1>
          </div>
        </div>
        <div className="px-5 py-2 flex flex-col gap-3 pb-6">
          {/* user products */}
          <div className="mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
            <ProductCard title={""} price={""} onBuyClick={() => {}} />
            <ProductCard title={""} price={""} onBuyClick={() => {}} />
            <ProductCard title={""} price={""} onBuyClick={() => {}} />
          </div>
        </div>
      </div>
      <RightSide />
    </div>
  );
};

export default marketplace;
