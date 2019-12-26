(async () => {
    //基于Promise的mysql简化语句中间件
    const Sequelize = require("sequelize");
    //建立连接
    const sequelize = new Sequelize("xyh", "root", "15773517076", {
        host: "localhost",
        dialect: "mysql",
        operatorsAliases: false
    });

    // 定义模型
    const Fruit = sequelize.define("Fruit", {
        name: {type: Sequelize.STRING(20), allowNull: false},
        price: {type: Sequelize.FLOAT, allowNull: false},
        stock: {type: Sequelize.INTEGER, defaultValue: 0},
        //避免自动生成时间戳
        timestamps: false
    });

    // 同步数据库，force: true则会删除已存在表
    let ret = await Fruit.sync({force: true});

    //新增字段
    ret = await Fruit.create({
        name: "香蕉",
        price: 3.5
    });
    //更新字段
    await Fruit.update(
        {price: 4},
        {where: {name: '香蕉'}}
    );
    //查询字段
    const Op = Sequelize.Op;
    ret = await Fruit.findAll({
        // where: { price: { [Op.lt]:4 }, stock: { [Op.gte]: 100 } }
        where: { price: { [Op.lt]: 4, [Op.gt]: 2 } }
    });
    console.log('findAll', JSON.stringify(ret, '', '\t'))
})();

