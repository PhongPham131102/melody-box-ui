import { useState, useRef, useEffect, ReactNode } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function TabList({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={twMerge(
        clsx("w-full bg-secondary-1 rounded-[6px] flex relative", className)
      )}
    >
      {children}
    </div>
  );
}

function TabTrigger({
  tabKey,
  label,
  isActive,
  onClick,
  className = "",
}: {
  tabKey: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
  className?: string;
}) {
  return (
    <div
      onClick={onClick}
      className={twMerge(
        clsx(
          "w-full py-2 text-sm text-center cursor-pointer transition-all duration-200 !z-20",
          isActive ? "text-white font-bold" : "text-white",
          className
        )
      )}
    >
      {label}
    </div>
  );
}

function TabContent({
  activeTab,
  tabKey,
  children,
  className = "",
}: {
  activeTab: string;
  tabKey: string;
  children: ReactNode;
  className?: string;
}) {
  if (activeTab !== tabKey) return null;
  return <div className={twMerge(clsx("", className))}>{children}</div>;
}

export default function Tabs({
  tabs,
  className = {
    tabContentClassName: "",
    tabListClassName: "",
    tabTriggerClassName: "",
  },
}: {
  tabs: { key: string; label: string; content: ReactNode }[];

  className?: {
    tabListClassName?: string;
    tabTriggerClassName?: string;
    tabContentClassName?: string;
  };
}) {
  const [activeTab, setActiveTab] = useState(tabs[0].key);
  const [tabStyle, setTabStyle] = useState({ width: 0, left: 0 });
  const tabRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const currentIndex = tabs.findIndex((tab) => tab.key === activeTab);
    const currentTab = tabRefs.current[currentIndex];
    if (currentTab) {
      setTabStyle({
        width: currentTab.offsetWidth,
        left: currentTab.offsetLeft,
      });
    }
  }, [activeTab]);

  return (
    <div className="w-full flex flex-col gap-2 h-full">
      <TabList className={className.tabListClassName}>
        {tabs.map((tab, index) => (
          <div
            key={tab.key}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            className="relative w-full z-20"
          >
            <TabTrigger
              tabKey={tab.key}
              label={tab.label}
              isActive={activeTab === tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={className.tabTriggerClassName}
            />
          </div>
        ))}

        <div
          className="bg-secondary-text absolute bottom-0 top-0 transition-all duration-300 rounded z-10"
          style={{ width: `${tabStyle.width}px`, left: `${tabStyle.left}px` }}
        />
      </TabList>

      {tabs.map((tab) => (
        <TabContent
          key={tab.key}
          activeTab={activeTab}
          tabKey={tab.key}
          className={className.tabContentClassName}
        >
          {tab.content}
        </TabContent>
      ))}
    </div>
  );
}
