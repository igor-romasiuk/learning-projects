type TodoFormProps = {
    value: string
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  }

export default function TodoForm({value, onSubmit, onChange}: TodoFormProps) {
    return (
        <form onSubmit={onSubmit}>
            <input type="text" value={value} onChange={onChange} />

            <button type="submit">Add</button>
        </form>
    )
}
