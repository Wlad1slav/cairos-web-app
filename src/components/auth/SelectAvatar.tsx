import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button";
import {avatars} from "@/lib/constants";
import Image from "next/image";
import React from "react";

function SelectAvatar({stateAction}: {
    stateAction: React.Dispatch<React.SetStateAction<string | undefined>>;
}) {
    return (
        <Dialog>
            <DialogTrigger className="w-full">
                <Button className="w-full" variant="outline" type="button">
                    Вибрати собі аватар
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Виберіть собі аватар</DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-4 gap-1">
                    {
                        avatars.map(avatar => (
                            <Image
                                key={avatar.src}
                                src={avatar.src}
                                alt=""
                                width={150}
                                height={150}
                                className="rounded cursor-pointer hover:opacity-80 transition"
                                onClick={() => stateAction(avatar.id)}
                            />
                        ))
                    }
                </div>

            </DialogContent>
        </Dialog>
    );
}

export default SelectAvatar;
