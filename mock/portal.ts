import { Request, Response } from 'express';

export default {
  'POST /api/login': (req: Request, res: Response) => {
    res.send({
      display_name: 'displayname',
      avatar:
        'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    });
  },
  'POST /api/join': (req: Request, res: Response) => {
    res.send({
      display_name: req.body.user_name,
      avatar:
        'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    });
  },
  'POST /api/settings/security/password': (req: Request, res: Response) => {
    res.send({ result: true });
  },
  'POST /api/settings/userinfo': (req: Request, res: Response) => {
    res.send(req.body);
  },
  'GET /api/': (req: Request, res: Response) => {
    res.send({
      logo:
        'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
      title: 'Ant Design',
      description: 'Ant Design 是西湖区最具影响力的 Web 设计规范',
      user: {
        user_name: 'hello',
        apps: [{ name: 'admin', title: 'admin site' }],
      },
    });
  },
};
