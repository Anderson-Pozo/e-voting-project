import { useEffect, useRef, useState } from "react";
import { format } from 'date-fns';
import Link from "next/link";

interface Props {
    id: string;
    initialHour: Date;
    finalHour: Date;
    processDate: string;
    // isActive: boolean;
    name: string;
    // period: string;
    image?: string;
}
// TODO: Upload image 

export const EProcessCard = ({ id, name, image, processDate, initialHour, finalHour }: Props) => {
    const ref = useRef<HTMLUListElement>(null)
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        const checkIfClickedOutside = (e: any) => {
            if (toggle && ref.current && !ref.current.contains(e.target)) setToggle(false)
        }
        document.addEventListener("mousedown", checkIfClickedOutside)
        return () => { document.removeEventListener("mousedown", checkIfClickedOutside) }
    }, [toggle])


    return (
        // <Link href={`/proceso/1212/hello`}>
        <div className="bg-white border border-gray-200 rounded-lg shadow px-4 max-w-[15%] min-w-[15%]">
            <div className="flex justify-end pt-3">
                <div className="relative">
                    <button
                        className="inline-block text-gray-500 dark:text-gray-400 focus:ring-4 focus:outline-none rounded-lg text-sm p-1.5" type="button"
                        onClick={() => setToggle(!toggle)}
                    >
                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path></svg>
                    </button>
                    {
                        toggle &&
                        <ul
                            ref={ref}
                            className={`absolute z-[1000] float-left m-0 min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg`}
                        >
                            <li>
                                <a
                                    className="block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400"
                                    href="#"
                                >
                                    Editar
                                </a>
                            </li>
                            <li>
                                <a
                                    className="block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal text-red-500 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400"
                                    href="#"
                                >
                                    Eliminar
                                </a>
                            </li>
                        </ul>
                    }
                </div>
            </div>

            {/* <Link href={`/proceso/${name.toLowerCase().replace(" ", "-")}/`}> */}
            <Link href={`/proceso/${id}/`}>
                <div className="flex flex-col items-center pb-3">
                    <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src="https://flowbite.com/docs/images/logo.svg" alt="Bonnie image" />
                    <h5 className="mb-1 text-base font-medium text-gray-900">
                        {name}
                    </h5>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        {format(new Date(processDate), "dd/MM/yyyy")}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        {`${format(new Date(initialHour), "hh:mm a")} - ${format(new Date(finalHour), "hh:mm a")}`}
                    </span>
                </div>
            </Link>
        </div>
        // </Link>
    )
}
