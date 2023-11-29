import {
  analytics,
  apps,
  chat,
  crm,
  home,
  logo,
  menu,
  notification,
  revenue,
  ProductIcon,
  ProductIcon2,
  ProductIcon3,
  ProductIcon4,
} from "@/constants";
import { useUserStore } from "@/store/userStore";
import Image from "next/image";
import React, { useEffect } from "react";
import { CiSettings } from "react-icons/ci";
import { IoReceiptOutline } from "react-icons/io5";
import { PiSignOutThin } from "react-icons/pi";
import {
  MdCardGiftcard,
  MdOutlineBugReport,
  MdOutlineSwitchAccount,
} from "react-icons/md";
import { useAppStore } from "@/store/appStore";
import { ChevronDown, ChevronRight, ChevronUp } from "lucide-react";
import dynamic from "next/dynamic";

function NavBar() {
  const user = useUserStore((state) => state.user) || {};
  const [isAppMenuOpen, setIsAppMenuOpen] = React.useState(false);
  const [isSettingMenuOpen, setIsSettingMenuOpen] = React.useState(false);

  const navigation = [
    { title: "Home", icon: home },
    { title: "Analytics", icon: analytics },
    { title: "Revenue", icon: revenue },
    { title: "CRM", icon: crm },
    { title: "Apps", icon: apps },
  ];

  const settingMenu = [
    { title: "Settings", icon: <CiSettings /> },
    {
      title: "Purchase History",
      icon: <IoReceiptOutline color="#56616B" />,
    },
    {
      title: "Refer and Earn",
      icon: <MdCardGiftcard stroke={1} color="#56616B" />,
    },
    { title: "Integrations", icon: apps },
    {
      title: "Report Bug",
      icon: <MdOutlineBugReport stroke={1} color="#56616B" />,
    },
    {
      title: "Switch Account",
      icon: <MdOutlineSwitchAccount stroke={1} color="#56616B" />,
    },
    { title: "Sign out", icon: <PiSignOutThin /> },
  ];

  const appMenu = [
    {
      title: "Link In Bio",
      text: "Manage your link in Bio",
      image: ProductIcon,
    },
    {
      title: "Store",
      text: "Manage your Store activites",
      image: ProductIcon2,
    },
    {
      title: "Media Kit",
      text: "Manage your Media Kit",
      image: ProductIcon3,
    },
    {
      title: "Invoicing",
      text: "Manage your Invoices",
      image: ProductIcon4,
    },
    {
      title: "Bookings",
      text: "Manage your Bookings",
      image: ProductIcon,
    },
  ];

  // if (hydrate) return <></>;

  return (
    <div className="navContainer">
      <Image src={logo} alt="mainstack" width={36} height={36} />
      <nav role="nav" className="flex items-center gap-5 ">
        {navigation.map((nav, i) => {
          if (nav.title === "Revenue") {
            return (
              <div
                data-testid="navId"
                key={i + nav.title}
                className="navItem bg-black300"
              >
                <Image src={nav.icon} alt={nav.title} width={20} height={20} />
                <h6 className="navTitle text-white">{nav.title}</h6>
              </div>
            );
          } else if (nav.title === "Apps") {
            return (
              <div
                key={i + nav.title}
                className={`relative cursor-pointer`}
                onClick={() => setIsAppMenuOpen(!isAppMenuOpen)}
              >
                <div
                  className={`navItem ${
                    isAppMenuOpen ? "bg-black300" : "hover:bg-gray50"
                  } `}
                >
                  <Image
                    src={nav.icon}
                    alt={nav.title}
                    width={20}
                    height={20}
                  />
                  <h6
                    className={`navTitle ${
                      isAppMenuOpen ? "text-white" : "text-gray400"
                    }`}
                  >
                    {nav.title}
                  </h6>
                  {isAppMenuOpen && (
                    <>
                      |{" "}
                      <div className="flex items-center space-x-3">
                        <p className="text-sm text-white">Link in Bio</p>
                        {isAppMenuOpen ? (
                          <ChevronUp color="#fff" size={20} />
                        ) : (
                          <ChevronDown color="#fff" size={20} />
                        )}
                      </div>
                    </>
                  )}
                </div>
                <div
                  className={`min-h-20 ${
                    isAppMenuOpen ? "absolute" : "hidden"
                  } -bottom-[433px] -left-[82px] z-30 w-[386px] origin-top rounded-2xl bg-white p-4 shadow-AppBar transition-all duration-1000 ease-linear`}
                >
                  <div className="mt-1 flex flex-col space-y-1">
                    {appMenu.map((data, i) => (
                      <div
                        key={i}
                        className="group flex cursor-pointer items-center justify-between rounded-xl border border-transparent p-4 hover:border-gray50"
                      >
                        <div className="flex items-center justify-between space-x-3">
                          <div className="rounded-lg border border-gray50 p-2">
                            <Image
                              src={data?.image}
                              alt={"menu"}
                              width={20}
                              height={20}
                            />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-black300">
                              {data?.title}
                            </p>
                            <p className="text-xs text-gray400">{data?.text}</p>
                          </div>
                        </div>
                        <ChevronRight
                          className="hidden group-hover:block"
                          size={16}
                          color="gray"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          } else {
            return (
              <div key={i + nav.title} className="navItem hover:bg-gray50">
                <Image src={nav.icon} alt={nav.title} width={20} height={20} />
                <h6 className="navTitle text-gray400">{nav.title}</h6>
              </div>
            );
          }
        })}
      </nav>
      <div className="flex items-center gap-2">
        <div className="cursor-pointer px-2 py-2.5">
          <Image
            src={notification}
            alt={"notification"}
            width={20}
            height={20}
          />
        </div>
        <div className="cursor-pointer px-2 py-2.5">
          <Image src={chat} alt={"chat"} width={20} height={20} />
        </div>
        <div className="relative">
          <div
            onClick={() => setIsSettingMenuOpen(!isSettingMenuOpen)}
            className="flex cursor-pointer items-center gap-2 rounded-full bg-gray100 py-1 pl-1.5 pr-3"
          >
            <div className="nameCircle flex h-8 w-8 items-center justify-center rounded-full font-semibold text-white">
              {user?.first_name?.[0]?.toUpperCase() ?? ""}
              {user?.last_name?.[0]?.toUpperCase() ?? ""}
            </div>
            <Image src={menu} alt={"menu"} width={20} height={20} />
          </div>
          <div
            className={`min-h-20 ${
              isSettingMenuOpen ? "absolute" : "hidden"
            } -bottom-[409px] -left-[202px] z-30 w-[286px] origin-top rounded-2xl bg-white p-6 shadow-AppBar transition-all duration-1000 ease-linear`}
          >
            <div className="flex items-center space-x-3">
              <div className="nameCircle flex h-8 w-8 items-center justify-center rounded-full font-semibold text-white">
                {user?.first_name?.[0]?.toUpperCase() || ""}
                {user?.last_name?.[0]?.toUpperCase() || ""}
              </div>
              <div>
                <h5 className="text-sm font-semibold">
                  {user?.first_name || ""} {user?.last_name || ""}
                </h5>
                <p className="text-xs font-normal text-gray400">
                  {user?.email}
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-col space-y-6">
              {settingMenu.map((data, i) => (
                <div
                  key={i}
                  className="flex cursor-pointer items-center space-x-3"
                >
                  {data?.title === "Integrations" ? (
                    <Image
                      // @ts-ignore
                      src={data?.icon}
                      alt={"menu"}
                      width={20}
                      height={20}
                    />
                  ) : (
                    <>{data?.icon}</>
                  )}
                  <p className="text-sm text-gray400">{data?.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(NavBar), { ssr: false });
