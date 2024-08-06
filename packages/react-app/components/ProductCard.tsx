type Props = {
  title: string;
  text?: string;
  price: string;
  onBuyClick: () => void;
  loading?: boolean;
  className?: string;
};

function ProductCard({
  title,
  text = "",
  price,
  onBuyClick,
  loading,
  className = "",
}: Props) {
  return (
    <div className="w-56 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
      <a href="#">
        <img
          src="https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
          alt="Product"
          className="h-56 w-72 object-cover rounded-t-xl"
        />
        <div className="px-4 py-3">
          <span className="text-gray-400 mr-3 uppercase text-xs">Brand</span>
          <p className="text-lg font-bold text-black truncate block capitalize">
            Product Name
          </p>
          <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-2">
              <p className="text-lg font-semibold text-black cursor-auto my-3">
                $149
              </p>
              <del>
                <p className="text-sm text-gray-600 cursor-auto ml-2">$199</p>
              </del>
            </div>

            <div className=" ">
              <button
                className="rounded-full border border-slate-500 bg-white hover:bg-slate-500 hover:text-white  py-1.5 px-5 text-black transition-all text-center text-sm font-inter flex items-center justify-center"
                onClick={onBuyClick}
              >
                Buy
              </button>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}

export default ProductCard;
