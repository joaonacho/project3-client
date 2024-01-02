import { createContext, useEffect, useState } from "react";
import { verify } from "../api";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const UserContext = createContext();

function UserProviderWrapper({ children }) {
	const [user, setUser] = useState(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [openUserMenu, setOpenUserMenu] = useState(false);

	const handleOpenUserMenu = () => setOpenUserMenu((prev) => !prev);

	const storeToken = (token) => {
		localStorage.setItem("authToken", token);
	};

	const removeToken = () => {
		localStorage.removeItem("authToken");
	};

	const authenticateUser = () => {
		const storedToken = localStorage.getItem("authToken");

		if (storedToken) {
			//Verify if the token is still valid
			(async () => {
				try {
					const response = await verify(storedToken);
					const user = response.data;
					setUser(user);
					setIsLoggedIn(true);
					setIsLoading(false);
				} catch (e) {
					setUser(null);
					setIsLoggedIn(false);
				} finally {
					setIsLoading(false);
				}
			})();
		} else {
			setUser(null);
			setIsLoggedIn(false);
			setIsLoading(false);
		}
	};

	const navigate = useNavigate();

	const logoutUser = () => {
		removeToken();
		authenticateUser();
		setOpenUserMenu((prev) => (prev = false));
		toast.info("Goodbye for now!");
		navigate("/");
	};

	useEffect(() => {
		authenticateUser();
	}, []);

	return (
		<UserContext.Provider
			value={{
				user,
				setUser,
				isLoggedIn,
				storeToken,
				authenticateUser,
				logoutUser,
				isLoading,
				handleOpenUserMenu,
				openUserMenu,
			}}>
			{children}
		</UserContext.Provider>
	);
}

export { UserProviderWrapper, UserContext };
