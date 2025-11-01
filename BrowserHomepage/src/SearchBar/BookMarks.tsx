import { FaLinkedin, FaInstagram, FaGithub, FaFacebook } from "react-icons/fa";
import { FaXTwitter, FaEarthAsia } from "react-icons/fa6";
import type {RootState} from '../Redux/store';
import { useSelector } from "react-redux";

export default function BookMarks() {
    const currentMode = useSelector((state: RootState) => state.theme.mode);

    return (
        <div className="flex justify-center gap-5 mt-5">

            <a href="https://www.linkedin.com/in/ashokbhaargaw/" target="_blank" rel="noreferrer" className='flex place-items-center flex-col'>
                <FaLinkedin size={28} color="#4285F4" />
                <label className='text-slate-500 text-sm dark:text-slate-300'>LinkedIn </label>
            </a>
            <a href="https://www.facebook.com/ashokbhaargaw/" target="_blank" rel="noreferrer" className='flex place-items-center flex-col'>
                <FaFacebook size={28} color="#4285F4" />
                <label className='text-slate-500 text-sm dark:text-slate-300'>Facebook </label>
            </a>
            <a href="https://www.instagram.com/dev.ashokbhaargaw/" target="_blank" rel="noreferrer" className='flex place-items-center flex-col'>
                <FaInstagram size={28} color="#E1306C" />
                <label className='text-slate-500 text-sm dark:text-slate-300'>Instagram </label>
            </a>
            <a href="https://github.com/AshokBhaargaw/" target="_blank" rel="noreferrer" className='flex place-items-center flex-col'>
                <FaGithub size={28} color={currentMode == 'light' ? "#000000" : "#eee"} />
                <label className='text-slate-500 text-sm dark:text-slate-300'>Github </label>
            </a>
            <a href="https://x.com/AshokBhaargaw" target="_blank" rel="noreferrer" className='flex place-items-center flex-col'>
                <FaXTwitter size={28} color={currentMode == 'light' ? "#000000" : "#eee"} />
                <label className='text-slate-500 text-sm dark:text-slate-300'>Twitter </label>
            </a>
        </div>
    )
}
