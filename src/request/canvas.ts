import axios from 'axios'
import { common, end, myAxios } from './index'
import { ListItem } from '../pages/ListPage'

// 查询, 没有设置登录权限
export function getCanvas(
  values: number, //id
  successCallback?: (res: any) => void,
  failedCallback?: () => void,
) {
  axios.get('/api/web/content/get?id=' + values).then((res) => {
    common(res, successCallback, failedCallback)
  })
}

// 保存
export function saveCanvas(
  values: { id?: number | null; content: string; type?: string; title?: string },
  successCallback: (id: number) => void,
  failedCallback?: () => void,
) {
  myAxios.post('/api/web/content/save', values).then((res: any) => {
    const id = res.data.result.id
    common(res, () => successCallback(id))

    // successCallback(id)
  })
}

// 查询页面列表
export function getCanvasList(
  values: any,
  successCallback: (data: any) => void,
  failedCallback?: () => void,
) {
  myAxios.get(end + '/api/web/content/list?pageSize=1000' + values).then((res) => {
    common(res, successCallback, failedCallback)
  })
}

// 查询模板列表
export function getTemplateList(
  values: any,
  successCallback: () => void,
  failedCallback?: () => void,
) {
  myAxios.get(end + '/api/web/template/list?pageSize=1000' + values).then((res) => {
    common(res, successCallback, failedCallback)
  })
}

// 删除
export function deleteCanvas(
  values: { id: number },
  successCallback: () => void,
  failedCallback?: () => void,
) {
  myAxios.post(end + '/api/web/content/delete', { id: values }).then((res) => {
    common(res, successCallback)
  })
}

export function saveAsTemplate(
  { item }: { item: ListItem },
  successCallback: () => void,
  failedCallback?: () => void,
) {
  myAxios
    .post(end + '/api/web/content/save', {
      id: null,
      type: 'template',
      title: item.title + '模板',
      content: item.content,
    })
    .then((res) => {
      common(res, successCallback)
    })
}

export function fetchTemplates(successCallback: () => void, failedCallback?: () => void) {
  myAxios.get(end + '/api/web/template/list?pageSize=1000').then((res) => {
    common(res, successCallback)
  })
}
