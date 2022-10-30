import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { useCreateTask, useUpdateTask } from "./todo";
enum status {
    "COMPLETED", "PENDING", "ACTIVE"

}
type CreateTask = {
    task: string
    description: string
    status: status
    createdAt?: Date
    updatedAt?: Date

}



export const useUpdateTaskForm = (callback: any) => {
    const schema = Yup.object().shape({});
    const addTask = useUpdateTask()
    const { handleSubmit, control, setValue, reset, watch } = useForm({
        defaultValues: { task_status: "" },
        mode: "onChange",
        resolver: yupResolver(schema),
    });
    const onSubmit = (val: any, id: any) => {
        addTask.mutate({ id, ...val, ...callback });
    };
    return {
        onSubmit: handleSubmit(onSubmit),
        control: control,
        setValue: setValue,
        loading: addTask.isLoading,
        reset: reset,
        watch: watch
    };






};