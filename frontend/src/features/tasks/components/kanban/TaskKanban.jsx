function TaskKanbanColumn() {
  return (
    <section className="flex min-h-[75svh] flex-1 flex-col rounded-xl border bg-muted/30">
      <div className="flex flex-1 items-center justify-center">
        <h4>Coming Soon...</h4>
      </div>
    </section>
  );
}

export function TaskKanban({ tasks }) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-1">
      <TaskKanbanColumn
        key={"coming soon... (kanban)"}
        title={"coming soon... (kanban)"}
        icon={"coming soon... (kanban)"}
        tasks={["coming soon... (kanban)"]}
      />
    </div>
  );
}
