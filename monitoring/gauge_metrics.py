# mongo_collection_size_exporter.py
from prometheus_client import start_http_server, Gauge
from pymongo import MongoClient
import time

# Conectar a MongoDB
client = MongoClient("mongodb://dappAdmin:S3cur3P%40ssw0rdM0ng0@mongo-dapp-container:27017/dapp?authSource=admin&directConnection=true")
db = client["dapp"]

# Crear una métrica Gauge para el tamaño de las colecciones
collection_size_gauge = Gauge('mongodb_collection_size_bytes', 'Size of MongoDB collections in bytes', ['collection'])

def collect_collection_sizes():
    for collection_name in db.list_collection_names():
        stats = db.command("collstats", collection_name)
        collection_size = stats["size"]
        collection_size_gauge.labels(collection=collection_name).set(collection_size)

if __name__ == '__main__':
    start_http_server(8000)  # Exponer métricas en el puerto 8000
    while True:
        collect_collection_sizes()
        time.sleep(30)  # Consultar cada 30 segundos
