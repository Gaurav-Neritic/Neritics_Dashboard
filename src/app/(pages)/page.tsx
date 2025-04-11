import Activity from "@/components/MainPage/Activity";
import DashBoardStats from "@/components/MainPage/DashBoardStats";
import OverView from "@/components/MainPage/Overview";

export default function Home() {
  return (
    <section className="p-5">
      <DashBoardStats />
      <OverView />
      <Activity />
    </section>
  );
}
