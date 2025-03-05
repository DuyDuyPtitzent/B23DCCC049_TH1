import { Form, Input, Button, Checkbox, Space } from 'antd';
import type { TodoItem } from '@/services/todo';
import { FC } from 'react';

interface TodoFormProps {
	initialValues?: Partial<TodoItem> | null;
	onSubmit: (values: Omit<TodoItem, 'id' | 'createdAt'>) => void;
}

const TodoForm: FC<TodoFormProps> = ({ initialValues, onSubmit }) => {
	const [form] = Form.useForm();

	return (
		<Form form={form} initialValues={initialValues || {}} onFinish={onSubmit} layout='vertical'>
			<Form.Item name='title' label='MỤC TIÊU' rules={[{ required: true, message: 'Hãy nhập mục tiêu của bạn !' }]}>
				<Input placeholder='Mục tiêu của bạn !' />
			</Form.Item>

			<Form.Item
				name='description'
				label='MÔ TẢ'
				rules={[{ required: true, message: 'Hãy nhập mục tiêu của bạn !' }]}
			>
				<Input.TextArea placeholder='Mô tả chi tiết mục tiêu của bạn !	' rows={4} />
			</Form.Item>

			<Form.Item name='completed' valuePropName='checked'>
				<Checkbox>Đã hoàn thành</Checkbox>
			</Form.Item>

			<Form.Item>
				<Space>
					<Button type='primary' htmlType='submit'>
						{initialValues ? 'Update' : 'Add'} Todo
					</Button>
					<Button onClick={() => form.resetFields()}>Reset</Button>
				</Space>
			</Form.Item>
		</Form>
	);
};

export default TodoForm;