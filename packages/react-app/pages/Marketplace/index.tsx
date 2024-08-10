import ProductCard from "@/components/ProductCard";

const Marketplace = () => {
  return (
    <div className="bg-white md:mx-auto rounded shadow-xl w-full overflow-hidden ">
      <div className="h-[140px] bg-gradient-to-r from-slate-400 to-slate-500">
        <div className="flex flex-row px-2 md:px-10 py-20 justify-between">
          <h1 className="text-3xl">Products</h1>
          <button
            className="rounded-full border border-slate-500 bg-white hover:bg-slate-500 hover:text-white  py-1.5 px-5 text-black transition-all text-center text-sm font-inter flex items-center justify-center"
            onClick={() => {}}
          >
            Mint NFTs
          </button>
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
  );
};

export default Marketplace;
