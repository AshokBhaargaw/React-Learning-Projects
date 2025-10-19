import DarkMode from "./DarkMode";

export default function Header() {
    return (
        <div className='min-w-100 flex justify-between place-items-center'>
            <h1 className='text-2xl font-bold font-serif my-5'>AB Browser Home Page</h1>
            <DarkMode />
        </div>
    )
}
