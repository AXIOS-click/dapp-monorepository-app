rs.initiate({
  _id: "rs0",
  members: [
    { _id: 0, host: "mongo-dapp-container:27017" }
  ]
});
db.createUser({
  user: "dappAdmin",
  pwd: "S3cur3P@ssw0rdM0ng0",
  roles: [{ role: "root", db: "admin" }]
})
