import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdMenu, MdClose, MdCloudDone, MdSync } from 'react-icons/md';
import { useAuth } from '../../providers/AuthContextProvider';
import Container from './Container';
import { useSaveStatus } from '../../providers/SaveStatusContextProvider';

const NavBar = () => {
	const { user, signOut } = useAuth();
	const { isSaving } = useSaveStatus();
	const [menuOpen, setMenuOpen] = useState(false);
	const location = useLocation();
	const currentPath = location.pathname;

	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
	};

	const renderMenuItems = () => (
		<>
			{user ? (
				<>
					<li>
						<Link
							to="/home"
							onClick={menuOpen ? toggleMenu : undefined}
						>
							Home
						</Link>
					</li>
					<li>
						<Link
							to="/settings"
							onClick={menuOpen ? toggleMenu : undefined}
						>
							Settings
						</Link>
					</li>
					<li>
						<button
							onClick={() => {
								signOut();
								if (menuOpen) toggleMenu();
							}}
							className="text-white"
						>
							Sign Out
						</button>
					</li>
				</>
			) : (
				<>
					<li>
						<Link
							to="/"
							onClick={menuOpen ? toggleMenu : undefined}
						>
							Home
						</Link>
					</li>
					<li>
						<Link
							to="/signin"
							onClick={menuOpen ? toggleMenu : undefined}
						>
							Sign In
						</Link>
					</li>
					<li>
						<Link
							to="/signup"
							onClick={menuOpen ? toggleMenu : undefined}
						>
							Sign Up
						</Link>
					</li>
				</>
			)}
		</>
	);

	const renderSaveStatus = () => {
		if (currentPath !== '/home') return null;

		return isSaving ? (
			<MdSync className="text-white" />
		) : (
			<MdCloudDone className="text-white" />
		);
	};

	return (
		<section>
			<Container>
				<nav className="flex justify-between items-center">
					<div className="flex items-center">
						<Link
							to="/"
							className="text-white text-xl font-bold mr-2"
						>
							WorkingTitle
						</Link>
						{renderSaveStatus()}
					</div>
					<div
						onClick={toggleMenu}
						className="md:hidden ml-auto text-white cursor-pointer"
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
						{renderMenuItems()}
					</ul>
				</nav>
				{/* Mobile Menu */}
				<ul
					className={`flex flex-col gap-5 mt-4 items-end md:hidden ${
						menuOpen ? 'block' : 'hidden'
					}`}
				>
					{renderMenuItems()}
				</ul>
			</Container>
		</section>
	);
};

export default NavBar;
