/* eslint-disable */
import { request } from 'umi';

/**
 * 获取任务列表
 * POST
 * /task/list
 *
 **/
export async function list(options) {
  return request('/api/task/list', {
    method: 'POST',
    ...(options || {}),
  });
}

/**
 * 新建任务
 * POST
 * /task/add
 *
 **/
export async function add(options) {
  return request('/api/task/add', {
    method: 'POST',
    ...(options || {}),
  });
}

/**
 * 提交开发
 * POST
 * /task/commit
 *
 **/
export async function commit(options) {
  return request('/api/task/commit', {
    method: 'POST',
    ...(options || {}),
  });
}

/**
 * 开发完成
 * POST
 * /task/complete
 *
 **/
export async function complete(options) {
  return request('/api/task/complete', {
    method: 'POST',
    ...(options || {}),
  });
}
