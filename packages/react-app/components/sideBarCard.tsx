import HouseIcon from "@mui/icons-material/House";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import EmailIcon from "@mui/icons-material/Email";
import ArticleIcon from "@mui/icons-material/Article";
import HelpIcon from "@mui/icons-material/Help";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import Link from "next/link";
type Props = {};

function SideBarCard({}: Props) {
  return (
    <div className="md:flex md:flex-col hidden p-3 gap-5 bg-white text-gray-500 rounded-xl">
      <div className="flex flex-row gap-5">
        <HouseIcon />
        <Link href="/">
          <h1>Feed</h1>
        </Link>
      </div>
      <div className="flex flex-row gap-5">
        <EmailIcon />
        <Link href="/">
          <h1>Messages</h1>
        </Link>
      </div>
      {/* <div className="flex flex-row gap-5">
        <LocalGroceryStoreIcon />
        <Link href="/marketplace">
          <h1>MarketPlace</h1>
        </Link>
      </div> */}
      <div className="flex flex-row gap-5">
        <AccountBalanceIcon />
        <Link href="/DAO">
          <h1>Governance</h1>
        </Link>
      </div>
      <div className="flex flex-row gap-5">
        <ShowChartIcon />
        <Link href="/Staking">
          <h1>Staking</h1>
        </Link>
      </div>
      <div className="flex flex-row gap-5">
        <AgricultureIcon />
        <Link href="/Yield">
          <h1>Yield Farming</h1>
        </Link>
      </div>

      <hr className="pt-5" />

      <div className="flex flex-row gap-5">
        <ArticleIcon />
        <Link href="/">
          <h1>Docs</h1>
        </Link>
      </div>

      <div className="flex flex-row gap-5">
        <HelpIcon />
        <Link href="/">
          <h1>Help</h1>
        </Link>
      </div>
    </div>
  );
}

export default SideBarCard;
