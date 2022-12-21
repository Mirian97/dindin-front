import "./style.css";

function Input({ textLabel, name, type, value, form, setForm }) {
    function handleChangeInputValue(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <div className="input-label flex-column">
            <label htmlFor={name}>
                {textLabel}
            </label>
            <input
                name={name}
                id={name}
                type={type}
                value={value}
                onChange={handleChangeInputValue}
            />
        </div>
    )
}

export default Input;