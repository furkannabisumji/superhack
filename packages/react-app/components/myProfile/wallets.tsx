type Props = {};

function Wallets({}: Props) {
  return (
    <div className="bg-white md:mx-auto rounded shadow-xl w-full md:w-2/3 overflow-hidden -mt-10">
      <div className="h-[140px] bg-gradient-to-r from-slate-400 to-slate-500">
        <div className="flex flex-row px-10 py-20 justify-between">
          <h1 className="text-3xl">Connected Wallets</h1>
          {/* will show a pop up of available wallets */}
          {/* base or minipay */}
          <button
            className="rounded-full border border-slate-500 bg-white hover:bg-slate-500 hover:text-white  py-1.5 px-5 text-black transition-all text-center text-sm font-inter flex items-center justify-center"
            onClick={() => {}}
          >
            Connect wallet
          </button>
        </div>
      </div>
      <div>{/* connected wallets */}</div>
    </div>
  );
}

export default Wallets;
