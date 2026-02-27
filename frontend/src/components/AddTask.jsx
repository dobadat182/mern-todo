import { ArrowUp } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Field } from "./ui/field";

const AddTask = () => {
  return (
    <Field orientation="horizontal">
      <Input
        type="text"
        placeholder="Add a new task"
        className="h-12 text-base bg-slate-100 border-0 focus:ring-0 focus-visible:ring-0 placeholder:text-slate-300"
      />

      <Button className="bg-black p-4 h-12 hover:bg-black/80 cursor-pointer">
        <ArrowUp className="w-4 h-4 text-white" />
      </Button>
    </Field>
  );
};

export default AddTask;
