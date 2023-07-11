import React, { useState, useEffect } from "react";
import {
	BsEmojiDizzy,
	BsEmojiExpressionless,
	BsEmojiLaughing,
} from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { closeToast } from "../../redux/alertsSlice";

const Toast = () => {
	const { toast } = useSelector((state) => state.alerts);
	const dispatch = useDispatch();
	const [show, setShow] = useState(false);
	const { type, duration, title, msj } = toast;

	useEffect(() => {
		if (toast.msj !== "") {
			setShow(true);
		}
		setTimeout(() => {
			hiddeToast();
		}, duration | 3000);
	}, []);

	const hiddeToast = () => {
		setShow(false);
		dispatch(closeToast());
	};

	if (show)
		return (
			<div
				className={`flex items-center p-4 mb-4 w-full max-w-xs bg-primaryDark rounded-lg shadow shadow-primaryPurple hover:scale-[1.01]  hover:shadow-primaryPurple transition-all ease-in-out duration-100
      fixed top-16 md:top-7 right-4 z-[1000]  
      animate-toastin
      border-l-8 border-l-primaryPink    
      `}
				role="alert"
			>
				<div className="text-primaryPink">
					{type === "error" && <BsEmojiDizzy size={40} />}
					{type === "warning" && <BsEmojiExpressionless size={40} />}
					{type === "success" && <BsEmojiLaughing size={40} />}
				</div>

				<div className="ml-3 text-sm font-normal text-white">
					<p className="text-lg font-semibold">{title}</p>
					<p>{msj}</p>
				</div>
				<button
					type="button"
					className="ml-auto -mx-1.5 -my-1.5 bg-white text-primaryPink hover:text-white hover:bg-primaryPink rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
					data-dismiss-target="#toast-success"
					aria-label="Close"
					onClick={hiddeToast}
				>
					<span className="sr-only">Close</span>
					<svg
						aria-hidden="true"
						className="w-5 h-5"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fillRule="evenodd"
							d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
							clipRule="evenodd"
						></path>
					</svg>
				</button>
			</div>
		);
};

export default Toast;
