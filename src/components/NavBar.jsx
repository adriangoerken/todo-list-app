import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdMenu, MdClose } from 'react-icons/md';
import { useAuth } from '../providers/AuthContextProvider';
import Container from './Container';

const NavBar = () => {
	const { user, signOut } = useAuth();
	const [menuOpen, setMenuOpen] = useState(false);
	const location = useLocation();
	const currentPath = location.pathname;

	const getTitle = () => {
		switch (currentPath) {
			case '/home':
				return 'Journal';
			case '/templates':
				return 'Templates';
			default:
				return '';
		}
	};

	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
	};

	return (
		<section className="bg-gray-800 sticky top-0">
			<Container>
				<nav className="flex justify-between items-center">
					<div className="flex items-center">
						<span className="text-white text-xl font-bold">
							{getTitle()}
						</span>
					</div>
					<div
						onClick={toggleMenu}
						className="md:hidden ml-auto text-white"
					>
						{menuOpen ? (
							<MdClose size={24} />
						) : (
							<MdMenu size={24} />
						)}
					</div>
					<ul
						className={`flex gap-5 ${
							menuOpen ? 'hidden' : 'hidden md:flex'
						}`}
					>
						<li className={user ? '' : 'hidden'}>
							<Link to="/home">Home</Link>
						</li>
						<li className={user ? '' : 'hidden'}>
							<Link to="/templates">Templates</Link>
						</li>
						<li className={user ? 'hidden' : ''}>
							<Link to="/signin">Sign In</Link>
						</li>
						<li className={user ? 'hidden' : ''}>
							<Link to="/signup">Sign Up</Link>
						</li>
						<li
							className={
								user && user.role === '0' ? '' : 'hidden'
							}
						>
							<Link to="/admin">Admin</Link>
						</li>
						<li className={`ml-auto ${user ? '' : 'hidden'}`}>
							<button onClick={signOut} className="text-white">
								Sign Out
							</button>
						</li>
					</ul>
				</nav>
				{/* Mobile Menu */}
				<ul
					className={`flex flex-col gap-5 mt-4 items-end md:hidden ${
						menuOpen ? 'block' : 'hidden'
					}`}
				>
					<li className={user ? '' : 'hidden'}>
						<Link to="/home" onClick={toggleMenu}>
							Home
						</Link>
					</li>
					<li className={user ? '' : 'hidden'}>
						<Link to="/templates">Templates</Link>
					</li>
					<li className={user ? 'hidden' : ''}>
						<Link to="/signin" onClick={toggleMenu}>
							Sign In
						</Link>
					</li>
					<li className={user ? 'hidden' : ''}>
						<Link to="/signup" onClick={toggleMenu}>
							Sign Up
						</Link>
					</li>
					<li className={user && user.role === '0' ? '' : 'hidden'}>
						<Link to="/admin" onClick={toggleMenu}>
							Admin
						</Link>
					</li>
					<li className={user ? '' : 'hidden'}>
						<button
							onClick={() => {
								signOut();
								toggleMenu();
							}}
							className="text-white"
						>
							Sign Out
						</button>
					</li>
				</ul>
			</Container>
		</section>
	);
};

export default NavBar;
