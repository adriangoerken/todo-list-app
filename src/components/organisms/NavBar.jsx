import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdMenu, MdClose, MdCloudDone, MdSync } from 'react-icons/md';
import { useAuth } from '../../providers/AuthContextProvider';
import Container from './Container';
import { useSaveStatus } from '../../providers/SaveStatusContextProvider';
import { useTranslation } from 'react-i18next';

const NavBar = () => {
	const { user, signOut } = useAuth();
	const { isSaving } = useSaveStatus();
	const [t] = useTranslation('global');
	const [menuOpen, setMenuOpen] = useState(false);

	const location = useLocation();
	const currentPath = location.pathname;

	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
	};

	const menuLinks = user
		? [
				{ to: '/home', label: t('NavBar.linkHome') },
				{ to: '/settings', label: t('NavBar.linkSettings') },
		  ]
		: [
				{ to: '/', label: t('NavBar.linkHome') },
				{ to: '/signin', label: t('NavBar.linkSignIn') },
				{ to: '/signup', label: t('NavBar.linkSignUp') },
		  ];

	const renderMenuItems = () => (
		<>
			{menuLinks.map(({ to, label }) => (
				<li key={to}>
					<Link to={to} onClick={menuOpen ? toggleMenu : undefined}>
						{label}
					</Link>
				</li>
			))}
			{user && (
				<li>
					<button
						onClick={() => {
							signOut();
							if (menuOpen) toggleMenu();
						}}
						className="text-white"
					>
						{t('NavBar.linkSignOut')}
					</button>
				</li>
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
		<Container>
			<section>
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
					{/* Mobile Menu Icon */}
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
					{/* Desktop Menu */}
					<ul className={`hidden md:flex gap-5 items-center`}>
						{renderMenuItems()}
					</ul>
				</nav>
				{/* Mobile Menu */}
				<ul
					className={`md:hidden flex flex-col gap-5 mt-4 items-end ${
						menuOpen ? 'block' : 'hidden'
					}`}
				>
					{renderMenuItems()}
				</ul>
			</section>
		</Container>
	);
};

export default NavBar;
