// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment';

const genList = (current, pageSize) => {
  const tableListDataSource = [];

  for (let i = 0; i < pageSize; i += 1) {
    const index = (current - 1) * 10 + i;
    tableListDataSource.push({
      disabled: i % 6 === 0,
      href: 'https://ant.design',
      avatar: [
        'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
        'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
      ][i % 2],
      owner: '曲丽丽',
      callNo: Math.floor(Math.random() * 1000),
      createdAt: moment().format('YYYY-MM-DD'),
      progress: Math.ceil(Math.random() * 100),
      ///////////
      key: index,
      userId: index,
      userName: `TradeCode ${index}`,
      desc: '这是一段描述',
      platform: Math.ceil(Math.random() * 17) === 16 ? 17 : Math.ceil(Math.random() * 10) % 17,
      logType: Math.floor(Math.random() * 10) % 3,
      device: ['PC', 'MOBILE_IOS', 'MOBILE_ANDROID'][Math.floor(Math.random() * 10) % 3],
      uploadTime: moment().format('YYYY-MM-DD'),
      // updateTime: moment().format('YYYY-MM-DD'),
      ip:
        Math.floor(Math.random() * 10) +
        '.' +
        Math.floor(Math.random() * 10) +
        '.' +
        Math.floor(Math.random() * 10) +
        '.' +
        Math.floor(Math.random() * 10),

      ///
      recId: index,
      name: `name ${index}`,
      version: Math.floor(Math.random() * 10),
      siteName: `siteName ${index}`,
      siteId: Math.ceil(Math.random() * 14),
      addTime: moment().format('YYYY-MM-DD'),
      adderName: index,
      adderId: `adderName ${index}`,
      updateTime: moment().format('YYYY-MM-DD'),
      updaterName: `updaterName ${index}`,
      updaterId: index,
      status: [0, 1, 1, 3, 4, 5, 6, 7][Math.floor(Math.random() * 8)],
      taskDesc: '这是一个描述~！',
    });
  }

  tableListDataSource.reverse();
  return tableListDataSource;
};

let tableListDataSource = genList(1, 90);

// 任务列表
function getTask(req, res, u, b) {
  let realUrl = u;

  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }
  const body = (b && b.body) || req.body;
  const { current = 1, pageSize = 20 } = body;
  // const { current = 1, pageSize = 20 } = req.query;
  // const params = parse(realUrl, true).query;

  let dataSource = [...tableListDataSource].slice((current - 1) * pageSize, current * pageSize);

  // if (params.sorter) {
  //   dataSource = dataSource.sort((prev, next) => {
  //     let sortNumber = 0;
  //     Object.keys(sorter).forEach((key) => {
  //       if (sorter[key] === 'descend') {
  //         if (prev[key] - next[key] > 0) {
  //           sortNumber += -1;
  //         } else {
  //           sortNumber += 1;
  //         }
  //
  //         return;
  //       }
  //
  //       if (prev[key] - next[key] > 0) {
  //         sortNumber += 1;
  //       } else {
  //         sortNumber += -1;
  //       }
  //     });
  //     return sortNumber;
  //   });
  // }
  //
  // if (params.filter) {
  //   const filter = JSON.parse(params.filter);
  //
  //   if (Object.keys(filter).length > 0) {
  //     dataSource = dataSource.filter((item) => {
  //       return Object.keys(filter).some((key) => {
  //         if (!filter[key]) {
  //           return true;
  //         }
  //
  //         if (filter[key].includes(`${item[key]}`)) {
  //           return true;
  //         }
  //
  //         return false;
  //       });
  //     });
  //   }
  // }
  //
  // if (params.name) {
  //   dataSource = dataSource.filter((data) => data?.name?.includes(params.name || ''));
  // }

  const result = {
    success: true,
    code: 1,
    message: 'success',
    data: dataSource,
    total: tableListDataSource.length,
    pageSize,
    current,
  };
  return res.json(result);
}

// 新建任务
function addTask(req, res, u, b) {
  let realUrl = u;

  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }
  const body = (b && b.body) || req.body;

  console.log('addTask-body', body);

  const result = {
    success: true,
    code: 1,
    message: 'success',
  };
  return res.json(result);
}

// 提交开发
function commitTask(req, res, u, b) {
  let realUrl = u;

  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }
  const body = (b && b.body) || req.body;

  console.log('commitTask-body', body);

  const result = {
    success: true,
    code: 1,
    message: 'success',
  };
  return res.json(result);
}

// 开发完成
function completeTask(req, res, u, b) {
  let realUrl = u;

  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }
  const body = (b && b.body) || req.body;

  console.log('commitTask-body', body);

  const result = {
    success: true,
    code: 1,
    message: 'success',
  };
  return res.json(result);
}

export default {
  'POST /api/task/list': getTask,
  'POST /api/task/add': addTask,
  'POST /api/task/commit': commitTask,
  'POST /api/task/complete': completeTask,
};
