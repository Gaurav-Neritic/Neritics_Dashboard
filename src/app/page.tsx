import Activity from "@/components/Activity";
import DashBoardStats from "@/components/DashBoardStats";
import OverView from "@/components/Overview";

export default function Home() {
  return (
    <section className="p-5">
      <DashBoardStats />
      <OverView />
      <Activity />
    </section>
  );
}
