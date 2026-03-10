import sqlite3
import json
from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS

app = Flask(__name__="", static_folder='.', static_path='')
CORS(app)

DATABASE = 'data/listings.db'

def init_db():
    """Инициализация базы данных"""
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    # Создание таблицы listings
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS listings (
            id INTEGER PRIMARY KEY,
            title TEXT NOT NULL,
            type TEXT NOT NULL,
            price INTEGER NOT NULL,
            address TEXT NOT NULL,
            bedrooms INTEGER,
            area INTEGER,
            floor TEXT,
            land INTEGER,
            badge TEXT,
            description TEXT,
            features TEXT,
            images TEXT
        )
    ''')
    
    # Проверка наличия данных
    cursor.execute('SELECT COUNT(*) FROM listings')
    count = cursor.fetchone()[0]
    
    if count == 0:
        # Вставка начальных данных
        listings_data = [
            (1, "2-к квартира, 64 м²", "flat", 8500000, "Челябинск, пр. Ленина, 45", 2, 64, "5/12", None, "В работе", 
             "Просторная двухкомнатная квартира в центре города. Развитая инфраструктура, рядом школы, детские сады, торговые центры. Квартира с ремонтом, готова к заселению.",
             json.dumps(["Кондиционер", "Балкон", "Парковка", "Лифт"]),
             json.dumps([
                 "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop",
                 "https://images.unsplash.com/photo-1484154218962-a1c002085d2f?w=800&auto=format&fit=crop",
                 "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=800&auto=format&fit=crop"
             ])),
            (2, "Дом с участком, 120 м²", "house", 12300000, "Челябинская обл., пос. Рощино", 4, 120, None, 6, "Срочно",
             "Загородный дом с земельным участком в экологически чистом районе. Дом построен из кирпича, есть гараж и баня. Отличное место для семейного отдыха.",
             json.dumps(["Гараж", "Баня", "Сад", "Газ"]),
             json.dumps([
                 "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&auto=format&fit=crop",
                 "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop",
                 "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&auto=format&fit=crop"
             ])),
            (3, "Студия, 32 м²", "flat", 4200000, "Челябинск, ул. Кирова, 88", 1, 32, "8/16", None, "Новинка",
             "Современная студия в новом жилом комплексе. Панорамные окна, дизайнерский ремонт. Идеально для молодёжи или под сдачу.",
             json.dumps(["Панорамные окна", "Дизайнерский ремонт", "Консьерж", "Спортзал"]),
             json.dumps([
                 "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop",
                 "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop",
                 "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&auto=format&fit=crop"
             ])),
            (4, "3-к квартира, 98 м²", "flat", 15800000, "Челябинск, ул. Вайнера, 12", 3, 98, "10/24", None, "В работе",
             "Роскошная трёхкомнатная квартира в престижном районе. Вид на город, премиальный ремонт, закрытый двор. Все удобства для комфортной жизни.",
             json.dumps(["Вид на город", "Премиум ремонт", "Закрытый двор", "Подземный паркинг"]),
             json.dumps([
                 "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop",
                 "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop",
                 "https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=800&auto=format&fit=crop"
             ])),
            (5, "Гараж, 24 м²", "garage", 850000, "Челябинск, ГСК «Автолюбитель»", None, 24, None, None, "Продано",
             "Капитальный гараж в охраняемом кооперативе. Есть смотровая яма, электричество. Удобный подъезд.",
             json.dumps(["Свет", "Яма", "Охрана", "Ворота"]),
             json.dumps([])),
            (6, "Помещение, 150 м²", "commercial", 25000000, "Челябинск, пр. Комсомольский, 28", None, 150, "1", None, "В работе",
             "Коммерческое помещение на первой линии. Высокий пешеходный трафик, отдельный вход, витринные окна. Подходит под офис, магазин, салон.",
             json.dumps(["Первая линия", "Витринные окна", "Отдельный вход", "Парковка"]),
             json.dumps([
                 "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=800&auto=format&fit=crop",
                 "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop",
                 "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&auto=format&fit=crop"
             ])),
            (7, "1-к квартира, 42 м²", "flat", 5900000, "Челябинск, ул. Труда, 156", 1, 42, "7/18", None, "В работе",
             "Уютная однокомнатная квартира в современном доме. Рядом метро, торговые центры, парки. Отличный вариант для жизни или инвестиций.",
             json.dumps(["Метро рядом", "ТЦ рядом", "Парк", "Детская площадка"]),
             json.dumps([
                 "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop",
                 "https://images.unsplash.com/photo-1484154218962-a1c002085d2f?w=800&auto=format&fit=crop"
             ])),
            (8, "Коттедж, 250 м²", "house", 28500000, "Челябинская обл., пос. Кременкуль", 5, 250, None, 12, "Эксклюзив",
             "Роскошный коттедж в элитном посёлке. Авторский проект, качественные материалы, ландшафтный дизайн. Бассейн, сауна, гараж на 2 авто.",
             json.dumps(["Бассейн", "Сауна", "Гараж на 2 авто", "Ландшафт"]),
             json.dumps([
                 "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop",
                 "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop",
                 "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&auto=format&fit=crop"
             ]))
        ]
        
        cursor.executemany('''
            INSERT INTO listings (id, title, type, price, address, bedrooms, area, floor, land, badge, description, features, images)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', listings_data)
        
        conn.commit()
        print("База данных инициализирована и заполнена данными")
    
    conn.close()

@app.route('/')
def serve_index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('.', path)

@app.route('/api/listings')
def get_listings():
    """Получить все объекты"""
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM listings')
    rows = cursor.fetchall()
    conn.close()
    
    listings = []
    for row in rows:
        listing = dict(row)
        listing['features'] = json.loads(listing['features'])
        listing['images'] = json.loads(listing['images'])
        listings.append(listing)
    
    return jsonify(listings)

@app.route('/api/listings/<int:listing_id>')
def get_listing(listing_id):
    """Получить объект по ID"""
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM listings WHERE id = ?', (listing_id,))
    row = cursor.fetchone()
    conn.close()
    
    if row:
        listing = dict(row)
        listing['features'] = json.loads(listing['features'])
        listing['images'] = json.loads(listing['images'])
        return jsonify(listing)
    return jsonify({'error': 'Not found'}), 404

@app.route('/api/listings/type/<listing_type>')
def get_listings_by_type(listing_type):
    """Получить объекты по типу"""
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    if listing_type == 'all':
        cursor.execute('SELECT * FROM listings')
    else:
        cursor.execute('SELECT * FROM listings WHERE type = ?', (listing_type,))
    
    rows = cursor.fetchall()
    conn.close()
    
    listings = []
    for row in rows:
        listing = dict(row)
        listing['features'] = json.loads(listing['features'])
        listing['images'] = json.loads(listing['images'])
        listings.append(listing)
    
    return jsonify(listings)

if __name__ == '__main__':
    init_db()
    print("Запуск сервера на http://localhost:5000")
    app.run(debug=True, port=5000)
