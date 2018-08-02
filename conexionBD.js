module.exports={
	port: process.env.PORT || 8080,
	bd: process.env.MONGODB || 'mongodb://localhost:27017/BD_pruebaCrudMongo',
	SECRET_TOKEN: 'miclavetoken'
}