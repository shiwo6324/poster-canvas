import { TextInput, Checkbox, Button, Group, Box, Modal } from '@mantine/core'
import { useForm } from '@mantine/form'
import request from '../utils/request'
import useUserStore, { setUserToken } from '../store/userStore'

interface AuthFormValuesProps {
  username: string
  password: string
  registerAndLogin: boolean
}

const Auth = () => {
  const { token } = useUserStore()
  const form = useForm<AuthFormValuesProps>({
    initialValues: {
      username: '',
      password: '',
      registerAndLogin: false,
    },
  })

  if (token !== null) {
    return
  }

  const handleLogin = async (values: AuthFormValuesProps) => {
    const res: any = await request.post('api/user/login', values)
    if (res.accessToken) {
      setUserToken(res.accessToken as string)
    }
  }
  const handleOnSubmit = async (values: AuthFormValuesProps) => {
    if (values.registerAndLogin) {
      await request.post('/api/users', values)
      await handleLogin(values)
    } else {
      await handleLogin(values)
    }
  }
  return (
    <Modal opened={true} onClose={close} title="Authentication">
      <Box maw={340} mx="auto">
        <form onSubmit={form.onSubmit(handleOnSubmit)}>
          <TextInput
            withAsterisk
            label="username"
            placeholder="请输入用户名"
            {...form.getInputProps('username')}
          />

          <TextInput
            type="password"
            withAsterisk
            label="password"
            placeholder="请输入密码"
            {...form.getInputProps('password')}
          />
          <Checkbox
            mt="md"
            label="注册并登录"
            {...form.getInputProps('registerAndLogin', { type: 'checkbox' })}
          />

          <Group justify="flex-end" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Box>
    </Modal>
  )
}

export default Auth
