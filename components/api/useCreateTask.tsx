import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { useCreateTask } from "./todo";
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



export const useCreateTaskForm = (callback: any) => {
    const initialValue = {
        task: "",
        description: "",
        task_status: "PENDING"
    };


    const schema = Yup.object().shape({});
    const addTask = useCreateTask()

    const { handleSubmit, control, setValue, reset } = useForm({
        defaultValues: initialValue,
        mode: "onChange",
        resolver: yupResolver(schema),
    });
    const onSubmit = (value: any) => {
        addTask.mutate({ ...value, ...callback });
    };
    return {
        onSubmit: handleSubmit(onSubmit),
        control: control,
        setValue: setValue,
        loading: addTask.isLoading,
        reset: reset
    };






};