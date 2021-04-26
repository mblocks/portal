export default {
    'POST /api/login': (req, res) => {
        res.send({ display_name: 'displayname', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png' });
    },
    'POST /api/join': (req, res) => {
        res.send({ display_name: req.body.user_name, avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png' });
    },
    'POST /api/settings/security/password': (req, res) => {
        res.send({ result:true });
    },
    'POST /api/settings/userinfo': (req, res) => {
        res.send(req.body);
    },
    'GET /api/': (req, res) => {
        res.send({
            logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
            title: 'Ant Design',
            description: 'Ant Design 是西湖区最具影响力的 Web 设计规范',
            //user: { user_name: 'hello' }
        });
    },
}
