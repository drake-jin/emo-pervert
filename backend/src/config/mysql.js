module.exports = {
  crawlers: {
    multipleStatements: true,
    connectionLimit: 2,
    host: 'test-cluster.cluster-ci3zskgsgm48.ap-northeast-2.rds.amazonaws.com',
    user: 'root',
    password: 'choco2323!',
    database: 'crawlers',
  },
  moducampus: {
    multipleStatements: true,
    connectionLimit: 2,
    host: 'moducampus-mysql.ci3zskgsgm48.ap-northeast-2.rds.amazonaws.com',
    user: 'root',
    password: 'FV64GcNZPm8T',
    database: 'moducampus',
  },
}
