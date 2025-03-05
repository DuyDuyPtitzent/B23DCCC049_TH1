import type { IColumn } from '@/components/Table/typing';
import { Button, Modal, Table, Input, Form } from 'antd';
import { useEffect, useState } from 'react';
import { useModel } from 'umi';

type RecordType = {
	address: string;
	balance: string;
};

const RandomUser = () => {
	const { setRow, isEdit, setVisible, setIsEdit, visible } = useModel('randomuser');
	const [localData, setLocalData] = useState<RecordType[]>([]);
	const [form] = Form.useForm();

	// Lấy dữ liệu từ Local Storage khi tải trang
	useEffect(() => {
		const storedData = JSON.parse(localStorage.getItem('subjects') || '[]');
		setLocalData(storedData);
	}, []);

	// Cập nhật localStorage khi localData thay đổi
	useEffect(() => {
		localStorage.setItem('subjects', JSON.stringify(localData));
	}, [localData]);

	// Xử lý thêm dữ liệu
	const handleAddSubject = (values: any) => {
		const newSubject: RecordType = {
			address: values.namesubject,
			balance: values.idsubject,
		};
		setLocalData([...localData, newSubject]);
		setVisible(false);
		form.resetFields();
	};

	const columns: IColumn<RecordType>[] = [
		{
			title: 'Name Subject',
			dataIndex: 'address',
			key: 'name',
			width: 200,
		},
		{
			title: 'ID Subject',
			dataIndex: 'balance',
			key: 'age',
			width: 100,
		},
		{
			title: 'Action',
			width: 200,
			align: 'center',
			render: (record) => {
				return (
					<div>
						<Button
							onClick={() => {
								setVisible(true);
								setRow(record);
								setIsEdit(true);
								form.setFieldsValue({
									namesubject: record.address,
									idsubject: record.balance,
								});
							}}
						>
							Edit
						</Button>
						<Button
							style={{ marginLeft: 10 }}
							onClick={() => {
								// Xóa khỏi localStorage
								const newData = localData.filter((item) => item.address !== record.address);
								setLocalData(newData);
							}}
							type='primary'
						>
							Delete
						</Button>
					</div>
				);
			},
		},
	];

	return (
		<div>
			<Button
				type='primary'
				onClick={() => {
					setVisible(true);
					setIsEdit(false);
					form.resetFields();
				}}
			>
				Add Subject
			</Button>

			<Table dataSource={localData} columns={columns} />

			<Modal
				destroyOnClose
				footer={false}
				title={isEdit ? 'Edit Subject' : 'Add Subject'}
				visible={visible}
				onCancel={() => setVisible(false)}
			>
				<Form form={form} onFinish={handleAddSubject}>
					<Form.Item
						label="Name Subject"
						name="namesubject"
						rules={[{ required: true, message: 'Please enter the subject name!' }]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="ID Subject"
						name="idsubject"
						rules={[{ required: true, message: 'Please enter the subject ID!' }]}
					>
						<Input />
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit">
							{isEdit ? 'Save Changes' : 'Add'}
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
};

export default RandomUser;
