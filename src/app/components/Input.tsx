// props
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
label:string
classLabel?:string
}

export function Input({label, classLabel, ...props} : InputProps){

return (
  <label className={`flex flex-col ${classLabel}`}>
    {label}
    <input {...props} />
  </label>
)

}