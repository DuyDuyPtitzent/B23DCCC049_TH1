import { Button, Form, Input } from 'antd';
import { useModel } from 'umi';

const FormRandomUser = () => {
	const { data, getDataUser, row, isEdit, setVisible } = useModel('randomuser');

	return (
		<Form
			onFinish={(values) => {
				console.log('🚀 ~ RandomUser ~ values:', values);
				const index = data.findIndex((item: any) => item.address === row?.address);
				const dataTemp: RandomUser.Record[] = [...data];
				dataTemp.splice(index, 1, values);
				const dataLocal = isEdit ? dataTemp : [values, ...data];
				localStorage.setItem('data', JSON.stringify(dataLocal));
				setVisible(false);
				getDataUser();
			}}
		>
			<Form.Item
				initialValue={row?.address}
				label='Name Subject'
				name='address'
				rules={[{ required: true, message: 'Please input name subject!' }]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				initialValue={row?.balance}
				label='ID Subject'
				name='balance'
				rules={[{ required: true, message: 'Please input id subject!' }]}
			>
				<Input />
			</Form.Item>

			<div className='form-footer'>
				<Button htmlType='submit' type='primary'>
					{isEdit ? 'Save' : 'Insert'}
				</Button>
				<Button onClick={() => setVisible(false)}>Cancel</Button>
			</div>
		</Form>
	);
};

export default FormRandomUser;
