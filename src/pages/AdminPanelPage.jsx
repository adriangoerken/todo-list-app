import React, { useEffect, useState } from 'react';
import Container from '../components/organisms/Container';
import { useAuth } from '../providers/AuthContextProvider';
import H2 from '../components/atoms/H2';
import { useNavigate } from 'react-router-dom';
import { getData } from '../api/api';
import { handleError } from '../utils/errorHandler';

const AdminPanel = () => {
	const { user, setUser } = useAuth();
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();
	const [users, setUsers] = useState([]);

	const fetchUsers = async () => {
		setLoading(true);

		const url =
			'http://localhost/projects/todo-list-app/backend/api/admin/getallusers';

		const response = await getData(url, user.accessToken);

		if (response.success) {
			setUser((prevUser) => ({
				...prevUser,
				accessToken: response.data.accessToken,
			}));

			setUsers(response.data.users);
			setLoading(false);
		} else {
			setTimeout(() => {
				handleError(response.error || t('GLOBAL.errDefault'));
			}, 1);
		}
	};

	useEffect(() => {
		if (user.role !== '0') {
			navigate('/');
		}
	}, []);

	useEffect(() => {
		fetchUsers();
	}, []);

	return (
		<section>
			<Container className="flex flex-col gap-8">
				{/* User Management */}
				<div>
					<H2 text="User Management" />
					<ul className="mt-4">
						<li className="list-disc list-inside">
							{/* View User List: See a list of all registered users. */}
						</li>
						<li className="list-disc list-inside">
							Permissions and Roles: Assign roles like "Admin",
							"Manager", "User", with different access levels and
							capabilities.
						</li>
						<li className="list-disc list-inside">
							Initiate Password Reset
						</li>
					</ul>
					{/* List of all users */}
					<section>
						<h3 className="text-lg font-semibold mt-4">
							List of all users
						</h3>
						<table class="min-w-full border border-gray-200 rounded-lg shadow-sm">
							<thead>
								<tr>
									<th class="py-3 px-6 text-left text-sm font-medium">
										Id
									</th>
									<th class="py-3 px-6 text-left text-sm font-medium">
										Email
									</th>
									<th class="py-3 px-6 text-left text-sm font-medium">
										Role
									</th>
									<th class="py-3 px-6 text-left text-sm font-medium">
										Signup Date
									</th>
									<th class="py-3 px-6 text-left text-sm font-medium">
										Signup Number
									</th>
								</tr>
							</thead>
							<tbody>
								{users.map((user, index) => (
									<tr class="border-b border-gray-200">
										<td class="py-3 px-6">{user.id}</td>
										<td class="py-3 px-6">{user.email}</td>
										<td class="py-3 px-6">{user.role}</td>
										<td class="py-3 px-6">
											{user.signup_date}
										</td>
										<td class="py-3 px-6">
											{user.signup_number}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</section>
				</div>

				{/* Task Analytics */}
				<div>
					<h2 className="text-xl font-semibold mb-4">
						Task Analytics
					</h2>
					<ul className="mt-4">
						<li className="list-disc list-inside">
							Statistics Dashboard: Show analytics on task
							completion rates.
						</li>
						<li className="list-disc list-inside">
							Trends and Insights: Identify trends in task
							management, such as peak usage times or common task
							categories.
						</li>
					</ul>
				</div>

				{/* App Configuration */}
				<div>
					<h2 className="text-xl font-semibold mb-4">
						App Configuration
					</h2>
					<ul className="mt-4">
						<li className="list-disc list-inside">
							Settings: Adjust app-wide settings like task
							priorities, edit and create translation files.
						</li>
					</ul>
				</div>

				{/* Data Backup and Restore */}
				<div>
					<h2 className="text-xl font-semibold mb-4">
						Data Backup and Restore
					</h2>
					<ul className="mt-4">
						<li className="list-disc list-inside">
							Backup: Regularly back up user data and app
							configuration.
						</li>
						<li className="list-disc list-inside">
							Restore: Restore data from backups in case of
							issues.
						</li>
					</ul>
				</div>

				{/* Security */}
				<div>
					<h2 className="text-xl font-semibold mb-4">Security</h2>
					<ul className="mt-4">
						<li className="list-disc list-inside">
							Access Logs: Monitor and log access to sensitive
							areas of the app.
						</li>
					</ul>
				</div>
			</Container>
		</section>
	);
};

export default AdminPanel;
