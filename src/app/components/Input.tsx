// props
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
label:string
classLabel?:string
children?:React.ReactNode
}

export function Input({label, classLabel, children, ...props} : InputProps){

return (
  <label className={`flex flex-col ${classLabel} relative`}>
    {label}
    <input {...props} />
    {children}
  </label>
)

}