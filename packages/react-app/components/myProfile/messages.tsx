type Props = {};

function Messages({}: Props) {
  return (
    <div className="bg-white md:mx-auto rounded shadow-xl w-full md:w-2/3 overflow-hidden -mt-10">
      <div className="h-[140px] bg-gradient-to-r from-slate-400 to-slate-500">
        <div className="flex flex-row px-10 py-20 justify-between">
          <h1 className="text-3xl">Messages</h1>
        </div>
      </div>
      <div>{/* messages */}</div>
    </div>
  );
}

export default Messages;
