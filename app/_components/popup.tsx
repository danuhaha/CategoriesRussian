import React from "react";

type PopupProps = {
    show: boolean;
    message: string;
};

function Popup(props: PopupProps) {
    if (!props.show) {
        return null;
    } else {
        return (
            <div
                className="absolute left-1/2 transform -translate-x-1/2 top-[58px] px-2 py-1 text-sm bg-black bg-opacity-70 text-white rounded-lg mx-auto text-center max-w-max">
                {props.message}
            </div>
        );
    }
}

export default Popup;
