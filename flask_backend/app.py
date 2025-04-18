from flask import Flask, jsonify, request, session
from flask_cors import CORS
from flask_bcrypt import Bcrypt
import pymysql
import subprocess
import os

app = Flask(__name__)
app.secret_key = "supersecretkey"  # Secret key untuk session

# 🔥 Mengaktifkan CORS agar bisa diakses dari React
CORS(app)  # Mengizinkan akses dari React
CORS(app, supports_credentials=True, origins=["http://localhost:3000"])

bcrypt = Bcrypt(app)

# Konfigurasi MySQL
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'scrape_db'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

# Koneksi ke MySQL
def db_connection():
    return pymysql.connect(
        host=app.config['MYSQL_HOST'],
        user=app.config['MYSQL_USER'],
        password=app.config['MYSQL_PASSWORD'],
        database=app.config['MYSQL_DB'],
        cursorclass=pymysql.cursors.DictCursor
    )

# ==============================
# 🔒 REGISTER USER
# ==============================
@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    if not all([name, email, password]):
        return jsonify({"message": "Semua kolom harus diisi!"}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    try:
        conn = db_connection()
        cursor = conn.cursor()

        # Cek apakah email sudah terdaftar
        cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
        if cursor.fetchone():
            return jsonify({"message": "Email sudah digunakan!"}), 400

        # Tentukan role (admin jika email mengandung @admin.com)
        role = "admin" if "@admin.com" in email else "user"

        # Simpan user ke database
        cursor.execute("INSERT INTO users (name, email, password, role) VALUES (%s, %s, %s, %s)", 
                       (name, email, hashed_password, role))
        conn.commit()
        conn.close()
        return jsonify({"message": "Registrasi berhasil!"}), 201

    except Exception as e:
        return jsonify({"message": str(e)}), 500

# ==============================
# 🔑 LOGIN USER
# ==============================
@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    conn = pymysql.connect(
        host=app.config['MYSQL_HOST'],
        user=app.config['MYSQL_USER'],
        password=app.config['MYSQL_PASSWORD'],
        database=app.config['MYSQL_DB'],
        cursorclass=pymysql.cursors.DictCursor
    )
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
    user = cursor.fetchone()

    if not user or not bcrypt.check_password_hash(user['password'], password):
        return jsonify({"message": "Email atau password salah!"}), 401

    # Simpan user ke dalam session
    session['user_id'] = user['id']
    session['user_role'] = user['role']  # Menyimpan peran (user/admin)

    return jsonify({
        "message": "Login berhasil!",
        "user": {
            "id": user['id'],
            "name": user['name'],
            "email": user['email'],
            "role": user['role'],
            "alamat": user.get('alamat', ''),
            "no_tlfn": user.get('no_tlfn', '')
        }
    }), 200

# ==============================
# 🚪 LOGOUT USER
# ==============================
@app.route('/api/logout', methods=['POST'])
def logout():
    session.clear()  # Hapus semua sesi
    return jsonify({"message": "Logout berhasil!"}), 200

# ==========================
# 👤 UPDATE USER PROFILE
# ==========================
@app.route('/api/user/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    if 'user_id' not in session or session['user_id'] != user_id:
        return jsonify({"error": "Akses ditolak"}), 403  # Pastikan hanya pemilik akun yang bisa edit
    
    data = request.json
    name = data.get('name')
    email = data.get('email')
    alamat = data.get('alamat')
    no_tlfn = data.get('no_tlfn')

    try:
        conn = db_connection()
        cursor = conn.cursor()

        # Perbarui profil user
        cursor.execute("""
            UPDATE users SET name = %s, email = %s, alamat = %s, no_tlfn = %s WHERE id = %s
        """, (name, email, alamat, no_tlfn, user_id))
        conn.commit()

        # Ambil data user yang diperbarui
        cursor.execute("SELECT id, name, email, alamat, no_tlfn FROM users WHERE id = %s", (user_id,))
        updated_user = cursor.fetchone()
        conn.close()

        return jsonify({"message": "Profil berhasil diperbarui", "user": updated_user}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ==========================
# ❌ DELETE USER ACCOUNT
# ==========================
@app.route('/api/user/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    if 'user_id' not in session or session['user_id'] != user_id:
        return jsonify({"error": "Akses ditolak"}), 403  # Pastikan hanya pemilik akun yang bisa hapus

    try:
        conn = db_connection()
        cursor = conn.cursor()

        # Hapus user dari database
        cursor.execute("DELETE FROM users WHERE id = %s", (user_id,))
        conn.commit()
        conn.close()

        session.clear()  # Hapus sesi pengguna setelah akun dihapus
        return jsonify({"message": "Akun berhasil dihapus"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ==============================
# 🔍 SCRAPING API (Tanpa Autentikasi)
# ==============================
# Endpoint untuk menjalankan scraping
@app.route('/scrape', methods=['POST'])
def scrape():
    try:
        # Mendapatkan URL dari request body
        data = request.get_json()
        url = data.get('url')

        if not url:
            return jsonify({"error": "URL tidak ditemukan!"})

        # Menjalankan scraper.py dengan URL sebagai argumen
        script_path = os.path.join(os.getcwd(), "scraper.py")
        result = subprocess.run(["python", script_path, url], capture_output=True, text=True)

        # Cek jika scraper gagal
        if result.returncode != 0:
            return jsonify({"error": "Scraping gagal!", "details": result.stderr})

        # Membaca data dari output stdout (JSON)
        scraped_data = result.stdout.strip()

        return jsonify({"message": "Scraping selesai!", "products": eval(scraped_data)})  

    except Exception as e:
        return jsonify({"error": str(e)})
    
# ==============================
# 🔍 GET USER PROFILE
# ==============================
@app.route('/api/user/<int:user_id>', methods=['GET'])
def get_user_profile(user_id):
    if 'user_id' not in session or session['user_id'] != user_id:
        return jsonify({"message": "Akses ditolak!"}), 403

    try:
        conn = db_connection()
        cursor = conn.cursor()

        # Ambil data user berdasarkan ID
        cursor.execute("SELECT id, name, email, alamat, no_tlfn, role FROM users WHERE id = %s", (user_id,))
        user = cursor.fetchone()
        conn.close()

        if user:
            return jsonify(user), 200
        return jsonify({"message": "User tidak ditemukan!"}), 404

    except Exception as e:
        return jsonify({"message": str(e)}), 500
    
# ==============================
# 📌 GET ALL USERS (Admin Only)
# ==============================
@app.route('/api/users', methods=['GET'])
def get_all_users():
    if 'user_id' not in session or session.get('user_role') != 'admin':
        return jsonify({"message": "Unauthorized access!"}), 403

    try:
        conn = db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT id, name, email, alamat, no_tlfn FROM users")
        users = cursor.fetchall()
        conn.close()
        return jsonify(users), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ==============================
# 🚀 Jalankan server Flask
# ==============================
if __name__ == '__main__':
    app.run(debug=True, port=5000)