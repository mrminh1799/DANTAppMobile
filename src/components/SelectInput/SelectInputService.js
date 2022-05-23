import Event from "../../utils/EventRegister";

const _openSelect = (data, onChange, value, search, isObject = true) => {
    Event.emitEvent("modalOpen", {
        visible: true,
        data: data,
        onChange: onChange,
        value: value,
        search: search ? search : true,
        isObject: isObject
    })
};

export default {
    _openSelect,
}
