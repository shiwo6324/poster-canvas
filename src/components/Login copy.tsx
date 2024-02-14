import docCookies from 'src/utils/cookies'
import { login } from 'src/request/login'
import { register } from 'src/request/register'
import { logout } from 'src/request/logout'
import { Box, Button, Checkbox, Group, Modal, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'

type FieldType = {
  name: string
  password: string
  registerAndLogin?: boolean
}

const Login = () => {
  const form = useForm({
    initialValues: {
      name: '',
      password: '',
      registerAndLogin: false,
    },

    validate: {
      name: (value) => (value.length < 1 ? '用户名不能为空' : null),
      password: (value) => (value.length < 1 ? '密码不能为空' : null),
    },
  })
  // 校验登录
  const auth = docCookies.getItem('sessionId')
  const name = docCookies.getItem('username')

  const handleOk = () => {
    window.location.reload()
  }
  // 用户已经登录
  if (auth) {
    return (
      <Button
        onClick={() =>
          logout(() => {
            handleOk()
          })
        }
      >
        {name} 退出
      </Button>
    )
  }
  // 用户没有登录
  const onFinish = ({ name, password, registerAndLogin }: FieldType) => {
    if (registerAndLogin) {
      handleRegisterAndLogin({ name, password })
    }
    login({ name, password }, () => {
      handleOk()
    })
  }

  const handleRegisterAndLogin = (values: { name: string; password: string }) => {
    register(values, () => {
      login({ ...values, name: values.name }, () => {
        handleOk()
      })
    })
  }

  return (
    <>
      <Modal opened={true} onClose={close} title="Authentication">
        <Box maw={340} mx="auto">
          <form onSubmit={form.onSubmit(onFinish)}>
            <TextInput
              withAsterisk
              label="用户名"
              placeholder="请输入用户名"
              {...form.getInputProps('name')}
            />
            <TextInput
              withAsterisk
              label="密码"
              placeholder="请输入密码"
              {...form.getInputProps('password')}
            />

            <Checkbox
              mt="md"
              label="注册并登录"
              {...form.getInputProps('registerAndLogin', { type: 'checkbox' })}
            />

            <Group justify="flex-end" mt="md">
              <Button type="submit">登录</Button>
            </Group>
          </form>
        </Box>
      </Modal>

      {/* <Button onClick={open}>Open modal</Button> */}
    </>
    // <Modal title="注册与登录" closable={false} open={true} footer={[]}>
    //   <Form
    //     name="basic"
    //     labelCol={{ span: 8 }}
    //     wrapperCol={{ span: 16 }}
    //     style={{ maxWidth: 600 }}
    //     initialValues={{ remember: true }}
    //     onFinish={onFinish}
    //     onFinishFailed={onFinishFailed}
    //     autoComplete="off"
    //   >
    //     <Form.Item<FieldType>
    //       label="用户名"
    //       name="username"
    //       rules={[{ required: true, message: '请输入用户名!' }]}
    //     >
    //       <Input />
    //     </Form.Item>

    //     <Form.Item<FieldType>
    //       label="密码"
    //       name="password"
    //       rules={[{ required: true, message: '请输入密码!' }]}
    //     >
    //       <Input.Password />
    //     </Form.Item>
    //     <Form.Item<FieldType>
    //       name="registerAndLogin"
    //       valuePropName="checked"
    //       wrapperCol={{ offset: 8, span: 16 }}
    //     >
    //       <Checkbox>注册并登录</Checkbox>
    //     </Form.Item>
    //     <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
    //       <Button type="primary" htmlType="submit">
    //         提交
    //       </Button>
    //     </Form.Item>
    //   </Form>
    // </Modal>
  )
}

export default Login
