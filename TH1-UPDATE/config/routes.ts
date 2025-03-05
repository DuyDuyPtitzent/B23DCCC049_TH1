import route from "mock/route";

export default [
	{
		path: '/user',
		layout: false,
		routes: [
			{
				path: '/user/login',
				layout: false,
				name: 'login',
				component: './user/Login',
			},
			{
				path: '/user',
				redirect: '/user/login',
			},
		],
	},

	///////////////////////////////////
	// DEFAULT MENU
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: './TrangChu',
		icon: 'HomeOutlined',
	},
	{
		path: '/gioi-thieu',
		name: 'About',
		component: './TienIch/GioiThieu',
		hideInMenu: true,
	},
	// {
	// 	path: '/gioi-thieu',
	// 	name: 'About',
	// 	hideInMenu: false,
	// 	routes:
	// 		[
	// 			{
	// 				path: '/abcde-f',
	// 				name: 'About acd',
	// 				component: './TienIch/GioiThieu',
	// 			}
	// 		]
	// },
	// {
	// 	path: '/random-user',
	// 	name: 'RandomUser',
	// 	component: './RandomUser',
	// 	icon: 'ArrowsAltOutlined',
	// },
	


	// DANH MUC HE THONG
	{
		name: 'Quản lý học tập',
		path: '/quan_ly_hoc_tap',
		icon: 'copy',
		routes: [
			// {
			// 	name: 'ChucVu',
			// 	path: 'chuc-vu',
			// 	component: './DanhMuc/ChucVu',
			// },
			{
				name: 'Quản lý môn học',
				path: 'mon_hoc',
				component: './Subject',
			},
			// {
			// 	path: '/todolist',
			// 	name: 'Todolist',
			// 	component: './Todolist',
			// 	icon: 'CheckCircleOutlined',
			// },
			
			{
				path: 'muctieuhoctap',
				name: 'Mục tiêu học tập',
				component: './TodoList',
				// icon: 'QuestionCircleOutlined',
			},
			{
				path: 'trochoidoanso',
				name: 'Trò chơi đoán số',
				component: './trochoidoanso/trochoidoanso',
				// icon: 'QuestionCircleOutlined',
			},
		
		],
	},

	{
		path: '/notification',
		routes: [
			{
				path: './subscribe',
				exact: true,
				component: './ThongBao/Subscribe',
			},
			{
				path: './check',
				exact: true,
				component: './ThongBao/Check',
			},
			{
				path: './',
				exact: true,
				component: './ThongBao/NotifOneSignal',
			},
		],
		layout: false,
		hideInMenu: true,
	},
	{
		path: '/',
	},
	{
		path: '/403',
		component: './exception/403/403Page',
		layout: false,
	},
	{
		path: '/hold-on',
		component: './exception/DangCapNhat',
		layout: false,
	},
	{
		component: './exception/404',
	},
];
