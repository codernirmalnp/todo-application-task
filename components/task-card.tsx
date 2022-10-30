import { log } from 'console'
import moment from 'moment'
import React, { useEffect, useMemo, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useQueryClient } from 'react-query'
import { useUpdateTaskForm } from './api/useUpdateTask'
import OptionField from './form/option-fields'
const getStatusColor = (value: any) => {
    switch (value) {
        case "COMPLETED":
            return <p style={{ color: "red" }}>{value}</p>
        case "ACTIVE":
            return <p style={{ color: "green" }}>{value}</p>
        default:
            return <p style={{ color: "orange" }}>{value}</p>

    }

}

export const TaskCard = (props: any) => {
    const { value, i } = props
    const queryClient = useQueryClient()
    const successCb = () => {
        toast.success("Task Created Successfully")
        queryClient.invalidateQueries("task");
        reset({})
    };
    const errorCb = (err: any) => {
        toast.error(err.message)
    };
    const { onSubmit, control, setValue, reset, watch } = useUpdateTaskForm({ successCb, errorCb });
    return (
        <div className="card" key={value.id}>
            <div>
                <h2>{value?.task?.toUpperCase()}</h2>
                <p> {value?.description}</p>
                <>{getStatusColor(value?.task_status)}</>
                <p> {moment(value?.created_at).format('DD-MMM-YYYY')}</p>
                <p>{moment(value?.updated_at).format('DD-MMM-YYYY')}</p>
            </div>
            <OptionField name={`task_status`} defaultValue={value?.task_status} control={control} type="option" label="Status" placeholder='Status' option={[{ label: "COMPLETED", value: "COMPLETED" }, { label: "PENDING", value: "PENDING" }, { label: "ACTIVE", value: "ACTIVE" }]} callback={(val: any) => {
                onSubmit(value.id)
            }}></OptionField>
        </div>

    )


}
