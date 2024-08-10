import ProfileCard from "../profileCard";
import SideBarCard from "../sideBarCard";

type Props = {};

function LeftSide({}: Props) {
  return (
    <div className="md:flex md:flex-col hidden -mt-20 md:-mt-10 gap-10  min-h-screen fixed top-32 left-5 bottom-0 pr-5 md:w-1/6">
      <ProfileCard />
      <SideBarCard />
    </div>
  );
}

export default LeftSide;
