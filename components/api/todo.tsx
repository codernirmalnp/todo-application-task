import React from 'react'

import { useMutation, useQuery, useQueryClient, } from "react-query";
import axios from 'axios';


const fetchTask = (page: number) => {
    return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/task?page=${page}`)
}
const createTask = (data: any) => {
    return axios.post(`${process.env.NEXT_PUBLIC_API_URL}/task`, data)
}
const updateTask = (data: any, id: any) => {
    return axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/task/${id}`, data)
}



export const useFetchTask = (page: number) => {
    return useQuery(["task", page], () => fetchTask(page))
}

export const useCreateTask = () => {

    const queryClient = useQueryClient();
    queryClient.setMutationDefaults(["add-task"], {
        mutationFn: (data) => createTask(data),
        onMutate: async (variables) => {

            const { successCb, errorCb } = variables;
            return { successCb, errorCb };
        },
        onSuccess: (result, variables, context) => {
            if (context.successCb) {
                context.successCb(result);
            }
        },
        onError: (error, variables, context) => {
            if (context.errorCb) {
                context.errorCb(error);
            }
        },
    });
    return useMutation(["add-task"]);


}
export const useUpdateTask = () => {

    const queryClient = useQueryClient();
    queryClient.setMutationDefaults(["update-task"], {
        mutationFn: (data) => updateTask(data, data.id),
        onMutate: async (variables) => {

            const { successCb, errorCb } = variables;
            return { successCb, errorCb };
        },
        onSuccess: (result, variables, context) => {
            if (context.successCb) {
                context.successCb(result);
            }
        },
        onError: (error, variables, context) => {
            if (context.errorCb) {
                context.errorCb(error);
            }
        },
    });
    return useMutation(["update-task"]);


}








