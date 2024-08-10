type Props = {};

function Messages({}: Props) {
  return (
    <div className="bg-white">
      <div className="h-[140px] ">
        <div className="flex flex-row px-10 py-20 justify-between">
          <h1 className="md:text-3xl text-xl">Messages</h1>
        </div>
      </div>
      <div>{/* messages */}</div>
    </div>
  );
}

export default Messages;
