import Event from "../../utils/EventRegister";

const _openMessage = (text) => {
    Event.emitEvent("toastOpen", {
        text: text,
    })
};

export default {
    _openMessage,
}
