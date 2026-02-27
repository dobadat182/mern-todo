import AddTask from "@/components/AddTask";
import StatsAndFilter from "@/components/StatsAndFilter";
import TaskListPagination from "@/components/TaskListPagination";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TaskList from "@/components/TaskList";
import { Card } from "@/components/ui/card";

const Home = () => {
  return (
    <div className="min-h-screen w-full relative">
      {/* Dashed Grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
    linear-gradient(to right, #e7e5e4 1px, transparent 1px),
    linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
  `,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 0 0",
          maskImage: `
    repeating-linear-gradient(
      to right,
      black 0px,
      black 3px,
      transparent 3px,
      transparent 8px
    ),
    repeating-linear-gradient(
      to bottom,
      black 0px,
      black 3px,
      transparent 3px,
      transparent 8px
    )
  `,
          WebkitMaskImage: `
    repeating-linear-gradient(
      to right,
      black 0px,
      black 3px,
      transparent 3px,
      transparent 8px
    ),
    repeating-linear-gradient(
      to bottom,
      black 0px,
      black 3px,
      transparent 3px,
      transparent 8px
    )
  `,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />
      {/* Your Content/Components */}
      <div className="min-h-screen w-screen relative z-10 flex justify-center items-center">
        <div className="container max-w-4xl mx-auto p-4 ">
          <div className="bg-white rounded-xl p-5 shadow border border-gray-200 flex flex-col gap-4">
            {/* <Header /> */}
            <AddTask />
            <StatsAndFilter />
            <TaskList />
            <TaskListPagination />
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
