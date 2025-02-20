import { Button, Form, Input, Modal, Table, DatePicker } from 'antd';
import { useEffect, useState } from 'react';
import { useModel } from 'umi';

const StudyProgress = () => {
	const { data, getDataUser } = useModel('randomuser');
	const [visible, setVisible] = useState<boolean>(false);
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const [row, setRow] = useState<any>();

	useEffect(() => {
		getDataUser();
	}, []);

	const columns = [
		{
			title: 'Môn học',
			dataIndex: 'subjectName',
			key: 'subjectName',
			width: 200,
		},
		{
			title: 'Thời gian học',
			dataIndex: 'studyTime',
			key: 'studyTime',
			width: 200,
		},
		{
			title: 'Thời lượng (phút)',
			dataIndex: 'duration',
			key: 'duration',
			width: 150,
		},
		{
			title: 'Nội dung đã học',
			dataIndex: 'content',
			key: 'content',
			width: 300,
		},
		{
			title: 'Ghi chú',
			dataIndex: 'note',
			key: 'note',
			width: 200,
		},
		{
			title: 'Hành động',
			width: 200,
			align: 'center',
			render: (record: any) => {
				return (
					<div>
						<Button
							onClick={() => {
								setVisible(true);
								setRow(record);
								setIsEdit(true);
							}}
						>
							Sửa
						</Button>
						<Button
							style={{ marginLeft: 10 }}
							onClick={() => handleDelete(record.subjectName)}
							type='primary'
							danger
						>
							Xóa
						</Button>
					</div>
				);
			},
		},
	];

	const handleDelete = (subjectName: string) => {
		const dataLocal = JSON.parse(localStorage.getItem('data') || '[]');
		const newData = dataLocal.filter((item: any) => item.subjectName !== subjectName);
		localStorage.setItem('data', JSON.stringify(newData));
		getDataUser();
	};

	const handleSubmit = (values: any) => {
		const dataLocal = JSON.parse(localStorage.getItem('data') || '[]');
		const newData = isEdit
			? dataLocal.map((item: any) =>
					item.subjectName === row?.subjectName ? { ...item, ...values } : item
			  )
			: [...dataLocal, values];

		localStorage.setItem('data', JSON.stringify(newData));
		setVisible(false);
		getDataUser();
	};

	return (
		<div>
			<Button
				type='primary'
				onClick={() => {
					setVisible(true);
					setIsEdit(false);
					setRow(null);
				}}
			>
				Thêm môn học
			</Button>
			<Table dataSource={data} columns={columns} rowKey="subjectName" />
			<Modal
				destroyOnClose
				footer={false}
				title={isEdit ? 'Chỉnh sửa môn học' : 'Thêm môn học'}
				visible={visible}
				onCancel={() => setVisible(false)}
			>
				<Form initialValues={row} onFinish={handleSubmit}>
					<Form.Item label='Tên môn học' name='subjectName' rules={[{ required: true, message: 'Vui lòng nhập tên môn học!' }]}>
						<Input />
					</Form.Item>
					<Form.Item label='Thời gian học' name='studyTime' rules={[{ required: true, message: 'Vui lòng chọn thời gian học!' }]}>
						<DatePicker showTime format="YYYY-MM-DD HH:mm" />
					</Form.Item>
					<Form.Item label='Thời lượng (phút)' name='duration' rules={[{ required: true, message: 'Vui lòng nhập thời lượng!' }]}>
						<Input type="number" />
					</Form.Item>
					<Form.Item label='Nội dung đã học' name='content'>
						<Input.TextArea rows={3} />
					</Form.Item>
					<Form.Item label='Ghi chú' name='note'>
						<Input.TextArea rows={2} />
					</Form.Item>
					<div className='form-footer'>
						<Button htmlType='submit' type='primary'>
							{isEdit ? 'Lưu' : 'Thêm'}
						</Button>
						<Button onClick={() => setVisible(false)}>Hủy</Button>
					</div>
				</Form>
			</Modal>
		</div>
	);
};

export default StudyProgress;
