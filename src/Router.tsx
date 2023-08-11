import { Routes, Route } from 'react-router-dom';
import App from './App';
import Header from './components/Header';
import errorPage from './components/errorPage';
import Donation from './components/Donation';
import Newsletter from './components/Newsletter';
import SignUp from './components/SignUp';
import { createContext, useState } from 'react';
import Profile from './components/Profile';
import { useEffect } from 'react';
import { getUserStatus } from './functions/DBGetUserStatus';

export const UserContext = createContext<any>(null);
export const LoadingContext = createContext<any>(false);
const Router = () => {
	const [user, setUser] = useState<any>(null);
	useEffect(() => {
		const fetchUserStatus = async () => {
			try {
				const userStatus = await getUserStatus();
				setUser(userStatus);
			} catch (error) {
				console.error('Error fetching user status:', error);
				setUser(null);
			}
		};
		fetchUserStatus();
	}, []);
	return (
		<>
			<UserContext.Provider value={{ user, setUser }}>
				<Header />
				<main>
					<Routes>
						<Route path="/" Component={App} />
						<Route path="/donation" Component={Donation} />
						<Route path="/newsletter" Component={Newsletter} />
						<Route path="/signup" Component={SignUp} />
						<Route path="/profile" Component={Profile} />
						<Route path="*" Component={errorPage} />
					</Routes>
				</main>
			</UserContext.Provider>
		</>
	);
};

export default Router;
