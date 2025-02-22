import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdMenu, MdClose, MdCloudDone, MdCloud } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../providers/AuthContextProvider';
import Container from './Container';
import { useSaveStatus } from '../../providers/SaveStatusContextProvider';
import { useTranslation } from 'react-i18next';

const NavBar = () => {
	const { user, signOut } = useAuth();
	const { isSaving } = useSaveStatus();
	const [t, i18n] = useTranslation('global');
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
				user.role === '0'
					? { to: '/admin-panel', label: 'Admin Panel' }
					: null,
		  ]
		: [
				{ to: '/', label: t('NavBar.linkHome') },
				{ to: '/signin', label: t('NavBar.linkSignIn') },
				{ to: '/signup', label: t('NavBar.linkSignUp') },
		  ];

	const renderMenuItems = () => (
		<>
			{menuLinks.map(({ to, label }) => (
				<li key={to} className="w-full">
					<Link
						to={to}
						onClick={menuOpen ? toggleMenu : undefined}
						className="hover:underline block w-full text-center py-4 text-nowrap"
					>
						{label}
					</Link>
				</li>
			))}
			{user && (
				<li className="w-full">
					<button
						onClick={() => {
							signOut();
							if (menuOpen) toggleMenu();
						}}
						className="text-white w-full text-center py-4"
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
			<div className="relative flex items-center justify-center">
				<MdCloud className="text-white text-sm" />
				<div className="absolute w-7 h-7 border-2 border-white border-t-transparent rounded-full animate-spin" />
			</div>
		) : (
			<MdCloudDone className="text-white text-lg" />
		);
	};

	const onDragEnd = (event, info) => {
		if (info.offset.y > 50) {
			toggleMenu();
		}
	};

	document.title = `TaskDoneify | ${t('GLOBAL.title')}`;

	return (
		<>
			<Container>
				<section>
					<nav className="flex justify-between items-center">
						<div className="flex items-center">
							<Link
								to="/"
								className="text-white text-2xl font-bold mr-2"
							>
								TaskDoneify
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
						<ul className="hidden md:flex gap-5 items-center">
							{renderMenuItems()}
						</ul>
					</nav>
				</section>
			</Container>

			{/* Mobile Menu - Bottom Sheet */}
			<AnimatePresence>
				{menuOpen && (
					<>
						{/* Overlay */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 0.5 }}
							exit={{ opacity: 0 }}
							onClick={toggleMenu}
							className="fixed inset-0 bg-black md:hidden"
						/>

						{/* Bottom Sheet Navigation */}
						<motion.div
							drag="y"
							dragConstraints={{ top: 0, bottom: 0 }}
							dragElastic={0.2}
							dragDirectionLock
							onDragEnd={onDragEnd}
							dragSnapToOrigin
							initial={{ y: '100%' }}
							animate={{ y: 0 }}
							exit={{ y: '100%' }}
							transition={{
								type: 'spring',
								damping: 25,
								stiffness: 500,
							}}
							className="fixed bottom-0 left-0 right-0 bg-elevation-300 rounded-t-xl shadow-lg md:hidden touch-none"
						>
							<div className="w-16 h-1 bg-gray-300 rounded-full mx-auto my-3" />
							<ul className="flex flex-col items-center pb-8">
								{renderMenuItems()}
							</ul>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</>
	);
};

export default NavBar;
