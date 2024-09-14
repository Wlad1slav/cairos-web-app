import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Checkbox} from "@/components/ui/checkbox";
import React from "react";
import {ChecklistProps} from "@/lib/types";

const Checklist: React.FC<ChecklistProps> = ({ items, name, control }) => {
    return (
        <FormField
            control={control}
            name={name}
            render={() => (
                <FormItem className="flex flex-col gap-2">
                    {items.map((item) => (
                        <FormField
                            key={item.label}
                            control={control}
                            name={name}
                            render={({ field }) => {
                                return (
                                    <FormItem
                                        key={item.label}
                                        className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value?.includes(item.label)}
                                                onCheckedChange={(checked) => {
                                                    return checked
                                                        ? field.onChange([...field.value, item.label])
                                                        : field.onChange(
                                                            field.value?.filter(
                                                                (value: string) => value !== item.label
                                                            )
                                                        )
                                                }}
                                            />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            <p className="mb-1.5">{item.label}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {item.description}
                                            </p>
                                        </FormLabel>
                                    </FormItem>
                                )
                            }}
                        />
                    ))}
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export default Checklist;
