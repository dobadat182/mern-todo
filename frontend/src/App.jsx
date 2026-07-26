import { TaskDashboard } from "@/features/tasks";
import { Toaster } from "@/components/ui/toast";

function App() {
  return (
    <Toaster>
      <TaskDashboard />
    </Toaster>
  );
}

export default App;
