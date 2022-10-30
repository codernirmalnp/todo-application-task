import { log } from "console";
import React, { useEffect, useState } from "react";
import {
    useController,
    UseControllerProps,
    FieldValues,
} from "react-hook-form";
type option = {
    label: string,
    value: string | number
}
type status = Array<option>
type InputProps = {
    name: string;
    control: any;
    type: string;
    placeholder: string;
    label: string;
    icon?: React.ReactNode;
    callback?: any
    option: status
    defaultValue?: option,
    classes?: {
        input?: string;
        label?: string;
        root?: string;
        error?: string;
    };
};
export type Props<T extends FieldValues> = InputProps & UseControllerProps<T>;
const OptionField = <T extends FieldValues>({
    control,
    name,
    placeholder,
    classes,
    label,
    option,
    callback,
    defaultValue

}: Props<T>) => {
    const {
        field: { onBlur, value, ref, onChange },
        fieldState: { isTouched, error },
    } = useController({
        name,
        control,

    });
  
    return (
        <div className={classes?.root}>
            <label htmlFor={label} className={classes?.label}>
                {label}
            </label>

            <div >
                <select className={classes?.input}
                    placeholder={placeholder}
                    onChange={(e) => {
                        onChange(e.target.value)
                        callback && callback(e.target.value)
                    }} // send value to hook form
                    onBlur={onBlur} // notify when input is touched/blur
                    value={value || defaultValue} // input value
                    name={name} // send down the input name
                    ref={ref}
                >
                    {option.map((value: option) => {
                        return <option key={value.value} value={value.value} >{value.label}</option>
                    })}

                </select>




            </div>
            {error ? <p className={classes?.error}>{error?.message}</p> : null}
        </div >
    );
};
export default OptionField;
